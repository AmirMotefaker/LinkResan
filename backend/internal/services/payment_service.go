package services

import (
    "bytes"
    "encoding/json"
    "errors"
    "net/http"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
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
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return "", err
    }

    data, ok := result["data"].(map[string]interface{})
    if !ok {
        return "", errors.New("invalid response from zarinpal")
    }

    code, ok := data["code"].(float64)
    if !ok {
        return "", errors.New("invalid code from zarinpal")
    }

    authority, ok := data["authority"].(string)
    if !ok {
        return "", errors.New("invalid authority from zarinpal")
    }

    if int(code) != 100 {
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
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return err
    }

    data, ok := result["data"].(map[string]interface{})
    if !ok {
        return errors.New("invalid response from zarinpal verify")
    }

    code, ok := data["code"].(float64)
    if !ok {
        return errors.New("invalid code from zarinpal verify")
    }

    if int(code) == 100 || int(code) == 101 {
        trans.Status = "paid"
        s.repo.UpdateTransaction(trans)

        // آپدیت پلن کاربر به pro و فعال‌سازی اشتراک
        s.repo.UpdateUserPlan(trans.UserID, "pro")
        s.repo.UpdateUserPremiumStatus(trans.UserID, true)

        return nil
    }

    trans.Status = "failed"
    s.repo.UpdateTransaction(trans)
    return errors.New("payment verification failed")
}