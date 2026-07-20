package services

import (
    "bytes"
    "encoding/json"
    "errors"
    "net/http"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
    "gorm.io/gorm"
)

type PaymentService interface {
    CreatePayment(userID uint, amount int, description string) (string, error)
    VerifyPayment(authority string, status string) error
}

type paymentService struct {
    repo repositories.PaymentRepository
    cfg  *config.Config
}

func NewPaymentService(repo repositories.PaymentRepository, cfg *config.Config) PaymentService {
    return &paymentService{repo: repo, cfg: cfg}
}

func (s *paymentService) CreatePayment(userID uint, amount int, description string) (string, error) {
    trans := &models.Transaction{
        UserID:      userID,
        Amount:      amount,
        Description: description,
        Status:      "pending",
    }
    err := s.repo.CreateTransaction(trans)
    if err != nil {
        return "", err
    }

    payload := map[string]interface{}{
        "merchant_id":  s.cfg.ZarinpalMerchantID,
        "amount":       amount,
        "callback_url": s.cfg.ZarinpalCallbackURL,
        "description":  description,
    }
    jsonData, _ := json.Marshal(payload)

    resp, err := http.Post("https://api.zarinpal.com/pg/v4/payment/request.json", "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)

    data := result["data"].(map[string]interface{})
    code := int(data["code"].(float64))
    authority := data["authority"].(string)

    if code != 100 {
        return "", errors.New("zarinpal error: could not create payment")
    }

    trans.Authority = authority
    s.repo.UpdateTransaction(trans)

    return "https://www.zarinpal.com/pg/StartPay/" + authority, nil
}

func (s *paymentService) VerifyPayment(authority string, status string) error {
    trans, err := s.repo.FindByAuthority(authority)
    if err != nil {
        return errors.New("transaction not found")
    }

    if status != "OK" {
        trans.Status = "failed"
        s.repo.UpdateTransaction(trans)
        return errors.New("payment failed by user")
    }

    payload := map[string]interface{}{
        "merchant_id": s.cfg.ZarinpalMerchantID,
        "amount":      trans.Amount,
        "authority":   authority,
    }
    jsonData, _ := json.Marshal(payload)

    resp, err := http.Post("https://api.zarinpal.com/pg/v4/payment/verify.json", "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)

    data := result["data"].(map[string]interface{})
    code := int(data["code"].(float64))

    if code == 100 || code == 101 {
        trans.Status = "paid"
        s.repo.UpdateTransaction(trans)
        
        // آپدیت پلن کاربر به pro
        s.repo.UpdateUserPlan(trans.UserID, "pro")
        s.repo.UpdateUserPremiumStatus(trans.UserID, true)
        
        return nil
    }

    trans.Status = "failed"
    s.repo.UpdateTransaction(trans)
    return errors.New("payment verification failed")
}

// برای جلوگیری از ارور unused import
var _ = gorm.ErrRecordNotFound


// در اینترفیس PaymentRepository:
    UpdateUserPlan(userID uint, plan string) error

// در ساختار paymentRepository:
    func (r *paymentRepository) UpdateUserPlan(userID uint, plan string) error {
        return r.db.Model(&models.User{}).Where("id = ?", userID).Update("plan", plan).Error
    }