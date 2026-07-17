package repositories

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

type DomainRepository interface {
    Create(domain *models.CustomDomain) error
    FindByUserID(userID uint) ([]models.CustomDomain, error)
    DeleteByIDAndUserID(domainID uint, userID uint) error
    FindByName(domain string) (*models.CustomDomain, error)
}

type domainRepository struct {
    db *gorm.DB
}

func NewDomainRepository(db *gorm.DB) DomainRepository {
    return &domainRepository{db: db}
}

func (r *domainRepository) Create(domain *models.CustomDomain) error {
    return r.db.Create(domain).Error
}

func (r *domainRepository) FindByUserID(userID uint) ([]models.CustomDomain, error) {
    var domains []models.CustomDomain
    err := r.db.Where("user_id = ?", userID).Find(&domains).Error
    return domains, err
}

func (r *domainRepository) DeleteByIDAndUserID(domainID uint, userID uint) error {
    result := r.db.Where("id = ? AND user_id = ?", domainID, userID).Delete(&models.CustomDomain{})
    return result.Error
}

func (r *domainRepository) FindByName(domain string) (*models.CustomDomain, error) {
    var domainModel models.CustomDomain
    err := r.db.Where("domain = ?", domain).First(&domainModel).Error
    if err != nil {
        return nil, err
    }
    return &domainModel, nil
}