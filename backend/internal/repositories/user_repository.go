package repositories

import (
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

type UserRepository interface {
    Create(user *models.User) error
    FindByEmail(email string) (*models.User, error)
    FindByID(id uint) (*models.User, error)
    CreatePasswordResetToken(token *models.PasswordReset) error
    FindValidToken(token string) (*models.PasswordReset, error)
    MarkTokenAsUsed(token *models.PasswordReset) error
    UpdateUserPassword(userID uint, newHash string) error
}

type userRepository struct {
    db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
    return &userRepository{db: db}
}

func (r *userRepository) Create(user *models.User) error {
    return r.db.Create(user).Error
}

func (r *userRepository) FindByEmail(email string) (*models.User, error) {
    var user models.User
    err := r.db.Where("email = ?", email).First(&user).Error
    if err != nil {
        return nil, err
    }
    return &user, nil
}

func (r *userRepository) FindByID(id uint) (*models.User, error) {
    var user models.User
    err := r.db.First(&user, id).Error
    if err != nil {
        return nil, err
    }
    return &user, nil
}

func (r *userRepository) CreatePasswordResetToken(token *models.PasswordReset) error {
    return r.db.Create(token).Error
}

func (r *userRepository) FindValidToken(token string) (*models.PasswordReset, error) {
    var t models.PasswordReset
    err := r.db.Where("token = ? AND is_used = ? AND expires_at > ?", token, false, time.Now()).First(&t).Error
    if err != nil {
        return nil, err
    }
    return &t, nil
}

func (r *userRepository) MarkTokenAsUsed(token *models.PasswordReset) error {
    return r.db.Model(token).Update("is_used", true).Error
}

func (r *userRepository) UpdateUserPassword(userID uint, newHash string) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Update("password_hash", newHash).Error
}