package repositories

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

type PaymentRepository interface {
    CreateTransaction(trans *models.Transaction) error
    UpdateTransaction(trans *models.Transaction) error
    FindByAuthority(authority string) (*models.Transaction, error)
    UpdateUserPremiumStatus(userID uint, isPremium bool) error
}

type paymentRepository struct {
    db *gorm.DB
}

func NewPaymentRepository(db *gorm.DB) PaymentRepository {
    return &paymentRepository{db: db}
}

func (r *paymentRepository) CreateTransaction(trans *models.Transaction) error {
    return r.db.Create(trans).Error
}

func (r *paymentRepository) UpdateTransaction(trans *models.Transaction) error {
    return r.db.Save(trans).Error
}

func (r *paymentRepository) FindByAuthority(authority string) (*models.Transaction, error) {
    var trans models.Transaction
    err := r.db.Where("authority = ?", authority).First(&trans).Error
    if err != nil {
        return nil, err
    }
    return &trans, nil
}

func (r *paymentRepository) UpdateUserPremiumStatus(userID uint, isPremium bool) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Update("is_premium", isPremium).Error
}