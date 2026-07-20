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
    Login(email, password string, clientIP string) (string, *models.User, error)
    GoogleLogin(credential string) (string, *models.User, error)
    GetUserByID(userID uint) (*models.User, error)
    RequestPasswordReset(email string) error
    ResetPassword(token, newPassword string) error
    CreateTeam(userID uint) error
    InviteUserToTeam(inviterID uint, email string) error
    GetTeamMembers(userID uint) ([]models.User, error)
    UpdateProfile(userID uint, name, avatarURL string) error
    ChangePassword(userID uint, oldPassword, newPassword string) error
    GetAdminStats() (map[string]int64, error)
    GetAllUsers() ([]models.User, error)
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

func (s *authService) Login(email, password string, clientIP string) (string, *models.User, error) {
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

    // استخراج کشور و شهر از IP در پس‌زمینه (Asynchronous)
    go func(ip string) {
        if ip == "" || ip == "127.0.0.1" || ip == "::1" {
            s.userRepo.UpdateUserLoginInfo(user.ID, ip, "Local", "Localhost")
            return
        }
        
        var country, city string = "نامشخص", "نامشخص"
        client := &http.Client{Timeout: 3 * time.Second}
        resp, err := client.Get("http://ip-api.com/json/" + ip + "?fields=country,city,status&lang=fa")
        if err == nil {
            defer resp.Body.Close()
            var geoData map[string]string
            json.NewDecoder(resp.Body).Decode(&geoData)
            if geoData["status"] == "success" {
                country = geoData["country"]
                city = geoData["city"]
            }
        }
        s.userRepo.UpdateUserLoginInfo(user.ID, ip, country, city)
    }(clientIP)

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
    emailBody := `
    <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; background-color: #f3f4f6; padding: 40px 0; margin: 0;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">لینک رسان</h1>
            </div>
            <div style="padding: 40px;">
                <h2 style="color: #111827; text-align: center; margin-top: 0;">بازنشانی رمز عبور</h2>
                <p style="color: #4b5563; font-size: 16px; line-height: 1.6; text-align: center;">
                    سلام،<br><br>
                    ما درخواستی برای بازنشانی رمز عبور حساب کاربری شما دریافت کردیم. برای تنظیم رمز عبور جدید، روی دکمه زیر کلیک کنید:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="` + resetLink + `" style="background-color: #4f46e5; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                        بازنشانی رمز عبور
                    </a>
                </div>
                <p style="color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
                    اگر شما این درخواست را نداده‌اید، لطفاً این ایمیل را نادیده بگیرید. رمز عبور شما تغییر نخواهد کرد.
                    <br><br>
                    <small style="color: #9ca3af;">این لینک تنها ۱ ساعت اعتبار دارد.</small>
                </p>
            </div>
        </div>
    </div>
    `

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

func (s *authService) CreateTeam(userID uint) error {
    return s.userRepo.UpdateUserTeamID(userID, userID)
}

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

func (s *authService) GetTeamMembers(userID uint) ([]models.User, error) {
    user, err := s.userRepo.FindByID(userID)
    if err != nil || user.TeamID == nil {
        return nil, errors.New("تیمی وجود ندارد")
    }
    return s.userRepo.FindUsersByTeamID(*user.TeamID)
}

func (s *authService) UpdateProfile(userID uint, name, avatarURL string) error {
    return s.userRepo.UpdateUserProfile(userID, name, avatarURL)
}

func (s *authService) ChangePassword(userID uint, oldPassword, newPassword string) error {
    user, err := s.userRepo.FindByID(userID)
    if err != nil {
        return errors.New("user not found")
    }

    err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(oldPassword))
    if err != nil {
        return errors.New("رمز عبور فعلی اشتباه است")
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
    if err != nil {
        return err
    }

    return s.userRepo.UpdateUserPassword(userID, string(hashedPassword))
}

func (s *authService) GetAdminStats() (map[string]int64, error) {
    return s.userRepo.GetAdminStats()
}

func (s *authService) GetAllUsers() ([]models.User, error) {
    return s.userRepo.GetAllUsers()
}