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
    // ساخت رکورد تراکنش در دیتابیس
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

    // ارسال درخواست به زرین‌پال
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

    // ذخیره authority در تراکنش
    trans.Authority = authority
    s.repo.UpdateTransaction(trans)

    // بازگرداندن لینک پرداخت برای فرانت‌اند
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

    // تایید پرداخت از زرین‌پال
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
		s.repo.UpdateUserPremiumStatus(trans.UserID, true)
        s.repo.UpdateTransaction(trans)
        return nil
    }

    trans.Status = "failed"
    s.repo.UpdateTransaction(trans)
    return errors.New("payment verification failed")
}

// تابع کمکی برای فعال کردن پلن پرو پس از پرداخت موفق
func (s *paymentService) ActivateUserPremium(userID uint) error {
    return s.repo.UpdateUserPremiumStatus(userID, true)
}

// برای جلوگیری از ارور unused import
var _ = gorm.ErrRecordNotFound