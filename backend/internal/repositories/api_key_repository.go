package repositories

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

type ApiKeyRepository interface {
    Create(apiKey *models.ApiKey) error
    FindByUserID(userID uint) ([]models.ApiKey, error)
    FindByKey(key string) (*models.ApiKey, error)
    DeleteByIDAndUserID(apiKeyID uint, userID uint) error
}

type apiKeyRepository struct {
    db *gorm.DB
}

func NewApiKeyRepository(db *gorm.DB) ApiKeyRepository {
    return &apiKeyRepository{db: db}
}

func (r *apiKeyRepository) Create(apiKey *models.ApiKey) error {
    return r.db.Create(apiKey).Error
}

func (r *apiKeyRepository) FindByUserID(userID uint) ([]models.ApiKey, error) {
    var keys []models.ApiKey
    err := r.db.Where("user_id = ?", userID).Find(&keys).Error
    return keys, err
}

func (r *apiKeyRepository) FindByKey(key string) (*models.ApiKey, error) {
    var apiKey models.ApiKey
    err := r.db.Where("key = ? AND is_active = ?", key, true).First(&apiKey).Error
    if err != nil {
        return nil, err
    }
    return &apiKey, nil
}

func (r *apiKeyRepository) DeleteByIDAndUserID(apiKeyID uint, userID uint) error {
    result := r.db.Where("id = ? AND user_id = ?", apiKeyID, userID).Delete(&models.ApiKey{})
    return result.Error
}