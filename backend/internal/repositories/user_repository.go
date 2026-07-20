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
    UpdateUserTeamID(userID uint, teamID uint) error
    FindUsersByTeamID(teamID uint) ([]models.User, error)
    DeleteExpiredTokens() error
    UpdateUserProfile(userID uint, name, avatarURL string) error
    UpdateUserLoginInfo(userID uint, ip, country, city string) error
    UpdateUserPlan(userID uint, plan string) error
    GetAllUsers() ([]models.User, error)
    GetAdminStats() (map[string]int64, error)
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

func (r *userRepository) UpdateUserTeamID(userID uint, teamID uint) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Update("team_id", teamID).Error
}

func (r *userRepository) FindUsersByTeamID(teamID uint) ([]models.User, error) {
    var users []models.User
    err := r.db.Where("team_id = ?", teamID).Find(&users).Error
    return users, err
}

func (r *userRepository) DeleteExpiredTokens() error {
    now := time.Now()
    return r.db.Where("is_used = ? OR expires_at < ?", true, now).Delete(&models.PasswordReset{}).Error
}

func (r *userRepository) UpdateUserProfile(userID uint, name, avatarURL string) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Updates(map[string]interface{}{
        "name":       name,
        "avatar_url": avatarURL,
    }).Error
}

func (r *userRepository) UpdateUserLoginInfo(userID uint, ip, country, city string) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Updates(map[string]interface{}{
        "last_login_ip": ip,
        "country":       country,
        "city":          city,
        "last_login_at": time.Now(),
    }).Error
}

func (r *userRepository) UpdateUserPlan(userID uint, plan string) error {
    return r.db.Model(&models.User{}).Where("id = ?", userID).Update("plan", plan).Error
}

func (r *userRepository) GetAllUsers() ([]models.User, error) {
    var users []models.User
    err := r.db.Order("created_at desc").Find(&users).Error
    return users, err
}

func (r *userRepository) GetAdminStats() (map[string]int64, error) {
    var totalUsers, freeUsers, basicUsers, proUsers, enterpriseUsers, totalLinks, totalClicks int64

    r.db.Model(&models.User{}).Count(&totalUsers)
    r.db.Model(&models.User{}).Where("plan = ?", "free").Count(&freeUsers)
    r.db.Model(&models.User{}).Where("plan = ?", "basic").Count(&basicUsers)
    r.db.Model(&models.User{}).Where("plan = ?", "pro").Count(&proUsers)
    r.db.Model(&models.User{}).Where("plan = ?", "enterprise").Count(&enterpriseUsers)
    r.db.Model(&models.Link{}).Count(&totalLinks)
    r.db.Model(&models.Click{}).Count(&totalClicks)

    return map[string]int64{
        "users":      totalUsers,
        "freeUsers":  freeUsers,
        "basicUsers": basicUsers,
        "proUsers":   proUsers,
        "entUsers":   enterpriseUsers,
        "links":      totalLinks,
        "clicks":     totalClicks,
    }, nil
}