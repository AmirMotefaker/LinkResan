package services

import (
    "bytes"
    "encoding/json"
    "errors"
    "io"
    "net/http"
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
    "golang.org/x/crypto/bcrypt"
    "github.com/golang-jwt/jwt/v5"
    "github.com/google/uuid"
)

var jwtKey = []byte("linkresan_super_secret_key_2024")

type AuthService interface {
    Register(email, password string) (*models.User, error)
    Login(email, password string) (string, *models.User, error)
    GoogleLogin(credential string) (string, *models.User, error)
    GetUserByID(userID uint) (*models.User, error)
    RequestPasswordReset(email string) error
    ResetPassword(token, newPassword string) error
    CreateTeam(userID uint) error      // اضافه شد
    InviteUserToTeam(inviterID uint, email string) error // اضافه شد
    GetTeamMembers(userID uint) ([]models.User, error)  // اضافه شد
}

type authService struct {
    userRepo repositories.UserRepository
    cfg      *config.Config
}

func NewAuthService(userRepo repositories.UserRepository, cfg *config.Config) AuthService {
    return &authService{userRepo: userRepo, cfg: cfg}
}

func (s *authService) Register(email, password string) (*models.User, error) {
    _, err := s.userRepo.FindByEmail(email)
    if err == nil {
        return nil, errors.New("email already exists")
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        return nil, err
    }

    user := &models.User{
        Email:        email,
        PasswordHash: string(hashedPassword),
        IsActive:     true,
    }

    err = s.userRepo.Create(user)
    if err != nil {
        return nil, err
    }

    return user, nil
}

func (s *authService) Login(email, password string) (string, *models.User, error) {
    user, err := s.userRepo.FindByEmail(email)
    if err != nil {
        return "", nil, errors.New("user not found")
    }

    err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
    if err != nil {
        return "", nil, errors.New("invalid password")
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user_id": user.ID,
        "email":   user.Email,
        "exp":     time.Now().Add(24 * time.Hour).Unix(),
    })

    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        return "", nil, err
    }

    return tokenString, user, nil
}

func (s *authService) GoogleLogin(credential string) (string, *models.User, error) {
    resp, err := http.Get("https://oauth2.googleapis.com/tokeninfo?id_token=" + credential)
    if err != nil || resp.StatusCode != http.StatusOK {
        return "", nil, errors.New("invalid google token")
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    var googleData map[string]string
    json.Unmarshal(body, &googleData)

    email := googleData["email"]
    if email == "" {
        return "", nil, errors.New("could not get email from google")
    }

    user, err := s.userRepo.FindByEmail(email)
    if err != nil {
        user = &models.User{
            Email:        email,
            PasswordHash: "google_oauth_user",
            IsActive:     true,
        }
        err = s.userRepo.Create(user)
        if err != nil {
            return "", nil, err
        }
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user_id": user.ID,
        "email":   user.Email,
        "exp":     time.Now().Add(24 * time.Hour).Unix(),
    })

    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        return "", nil, err
    }

    return tokenString, user, nil
}

func (s *authService) GetUserByID(userID uint) (*models.User, error) {
    return s.userRepo.FindByID(userID)
}

func (s *authService) RequestPasswordReset(email string) error {
    user, err := s.userRepo.FindByEmail(email)
    if err != nil || user.Email == "" {
        return nil
    }

    tokenStr := uuid.New().String()
    resetToken := &models.PasswordReset{
        Email:     email,
        Token:     tokenStr,
        ExpiresAt: time.Now().Add(1 * time.Hour),
    }

    err = s.userRepo.CreatePasswordResetToken(resetToken)
    if err != nil {
        return err
    }

    resetLink := s.cfg.AppURL + "/reset-password?token=" + tokenStr
    emailBody := `<html><body dir="rtl"><h2>بازنشانی رمز عبور لینک رسان</h2><p>برای تغییر رمز عبور خود روی لینک زیر کلیک کنید:</p><a href="` + resetLink + `" style="display:inline-block;padding:10px 20px;background-color:#6366f1;color:white;text-decoration:none;border-radius:8px;">بازنشانی رمز عبور</a><p>اگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید.</p></body></html>`

    payload := map[string]interface{}{
        "from":    "LinkResan <onboarding@resend.dev>",
        "to":      []string{email},
        "subject": "بازنشانی رمز عبور لینک رسان",
        "html":    emailBody,
    }
    jsonData, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", "https://api.resend.com/emails", bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer "+s.cfg.ResendAPIKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil || resp.StatusCode != http.StatusOK {
        return errors.New("failed to send email")
    }
    defer resp.Body.Close()
    io.Copy(io.Discard, resp.Body)

    return nil
}

func (s *authService) ResetPassword(token, newPassword string) error {
    resetToken, err := s.userRepo.FindValidToken(token)
    if err != nil {
        return errors.New("invalid or expired token")
    }

    user, err := s.userRepo.FindByEmail(resetToken.Email)
    if err != nil {
        return errors.New("user not found")
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
    if err != nil {
        return err
    }

    err = s.userRepo.UpdateUserPassword(user.ID, string(hashedPassword))
    if err != nil {
        return err
    }

    s.userRepo.MarkTokenAsUsed(resetToken)
    return nil
}

// اضافه شد: ساخت تیم (کاربر خودش را مدیر تیم می‌کند)
func (s *authService) CreateTeam(userID uint) error {
    return s.userRepo.UpdateUserTeamID(userID, userID)
}

// اضافه شد: دعوت کاربر به تیم با ایمیل
func (s *authService) InviteUserToTeam(inviterID uint, email string) error {
    inviter, err := s.userRepo.FindByID(inviterID)
    if err != nil || inviter.TeamID == nil {
        return errors.New("شما تیمی نساخته‌اید")
    }

    invitee, err := s.userRepo.FindByEmail(email)
    if err != nil {
        return errors.New("کاربر با این ایمیل در لینک رسان ثبت‌نام نکرده است")
    }

    return s.userRepo.UpdateUserTeamID(invitee.ID, *inviter.TeamID)
}

// اضافه شد: گرفتن لیست اعضای تیم
func (s *authService) GetTeamMembers(userID uint) ([]models.User, error) {
    user, err := s.userRepo.FindByID(userID)
    if err != nil || user.TeamID == nil {
        return nil, errors.New("تیمی وجود ندارد")
    }
    return s.userRepo.FindUsersByTeamID(*user.TeamID)
}