package services

import (
    "crypto/rand"
    "encoding/hex"
    "errors"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
)

type ApiKeyService interface {
    CreateApiKey(userID uint, name string) (*models.ApiKey, error)
    GetApiKeys(userID uint) ([]models.ApiKey, error)
    DeleteApiKey(userID uint, apiKeyID uint) error
    ValidateApiKey(key string) (uint, error) // برمی‌گرداند UserID را
}

type apiKeyService struct {
    repo repositories.ApiKeyRepository
}

func NewApiKeyService(repo repositories.ApiKeyRepository) ApiKeyService {
    return &apiKeyService{repo: repo}
}

// تابع تولید یک رشته تصادفی و امن
func generateSecureKey(length int) string {
    b := make([]byte, length)
    _, err := rand.Read(b)
    if err != nil {
        return ""
    }
    return hex.EncodeToString(b)
}

func (s *apiKeyService) CreateApiKey(userID uint, name string) (*models.ApiKey, error) {
    if name == "" {
        name = "Default API Key"
    }

    // تولید یک کلید ۳۲ کاراکتری با پیشوند lr_
    keyStr := "lr_" + generateSecureKey(16)

    apiKey := &models.ApiKey{
        UserID:   userID,
        Key:      keyStr,
        Name:     name,
        IsActive: true,
    }

    err := s.repo.Create(apiKey)
    if err != nil {
        return nil, err
    }
    return apiKey, nil
}

func (s *apiKeyService) GetApiKeys(userID uint) ([]models.ApiKey, error) {
    return s.repo.FindByUserID(userID)
}

func (s *apiKeyService) DeleteApiKey(userID uint, apiKeyID uint) error {
    return s.repo.DeleteByIDAndUserID(apiKeyID, userID)
}

func (s *apiKeyService) ValidateApiKey(key string) (uint, error) {
    apiKey, err := s.repo.FindByKey(key)
    if err != nil || apiKey == nil {
        return 0, errors.New("invalid api key")
    }
    return apiKey.UserID, nil
}