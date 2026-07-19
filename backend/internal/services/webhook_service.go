package services

import (
    "bytes"
    "encoding/json"
    "net/http"
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
)

type WebhookService interface {
    CreateWebhook(userID uint, url string) (*models.Webhook, error)
    GetUserWebhooks(userID uint) ([]models.Webhook, error)
    DeleteWebhook(userID uint, webhookID uint) error
    TriggerWebhooks(userID uint, clickData map[string]interface{})
}

type webhookService struct {
    webhookRepo repositories.WebhookRepository
}

func NewWebhookService(webhookRepo repositories.WebhookRepository) WebhookService {
    return &webhookService{webhookRepo: webhookRepo}
}

func (s *webhookService) CreateWebhook(userID uint, url string) (*models.Webhook, error) {
    webhook := &models.Webhook{
        UserID:   userID,
        URL:      url,
        IsActive: true,
    }
    err := s.webhookRepo.Create(webhook)
    return webhook, err
}

func (s *webhookService) GetUserWebhooks(userID uint) ([]models.Webhook, error) {
    return s.webhookRepo.FindByUserID(userID)
}

func (s *webhookService) DeleteWebhook(userID uint, webhookID uint) error {
    return s.webhookRepo.DeleteByIDAndUserID(webhookID, userID)
}

// تابعی که هنگام کلیک صدا زده می‌شود
func (s *webhookService) TriggerWebhooks(userID uint, clickData map[string]interface{}) {
    webhooks, err := s.webhookRepo.FindByUserID(userID)
    if err != nil || len(webhooks) == 0 {
        return
    }

    jsonData, _ := json.Marshal(clickData)

    // ارسال ناهمگام (Asynchronous) به تمام وب‌هوک‌های کاربر
    for _, wh := range webhooks {
        go func(url string, payload []byte) {
            req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
            req.Header.Set("Content-Type", "application/json")
            client := &http.Client{Timeout: 5 * time.Second}
            resp, err := client.Do(req)
            if err == nil {
                defer resp.Body.Close()
            }
        }(wh.URL, jsonData)
    }
}