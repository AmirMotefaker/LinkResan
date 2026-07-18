package services

import (
    "encoding/json"
    "errors"
    "io"
    "net/http"
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
    "golang.org/x/crypto/bcrypt"
    "github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("linkresan_super_secret_key_2024")

type AuthService interface {
    Register(email, password string) (*models.User, error)
    Login(email, password string) (string, *models.User, error)
    GoogleLogin(credential string) (string, *models.User, error)
    GetUserByID(userID uint) (*models.User, error) // اضافه شد
}

type authService struct {
    userRepo repositories.UserRepository
}

func NewAuthService(userRepo repositories.UserRepository) AuthService {
    return &authService{userRepo: userRepo}
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

// تغییر کرد: حالا یوزر را هم برمی‌گرداند تا فرانت‌اند بدونه Pro است یا خیر
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

// اضافه شد
func (s *authService) GetUserByID(userID uint) (*models.User, error) {
    return s.userRepo.FindByID(userID)
}