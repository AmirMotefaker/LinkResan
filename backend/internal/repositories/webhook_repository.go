package repositories

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

type WebhookRepository interface {
    Create(webhook *models.Webhook) error
    FindByUserID(userID uint) ([]models.Webhook, error)
    DeleteByIDAndUserID(webhookID uint, userID uint) error
}

type webhookRepository struct {
    db *gorm.DB
}

func NewWebhookRepository(db *gorm.DB) WebhookRepository {
    return &webhookRepository{db: db}
}

func (r *webhookRepository) Create(webhook *models.Webhook) error {
    return r.db.Create(webhook).Error
}

func (r *webhookRepository) FindByUserID(userID uint) ([]models.Webhook, error) {
    var webhooks []models.Webhook
    err := r.db.Where("user_id = ? AND is_active = ?", userID, true).Find(&webhooks).Error
    return webhooks, err
}

func (r *webhookRepository) DeleteByIDAndUserID(webhookID uint, userID uint) error {
    result := r.db.Where("id = ? AND user_id = ?", webhookID, userID).Delete(&models.Webhook{})
    return result.Error
}