package repositories

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

type BioRepository interface {
    GetByUserID(userID uint) (*models.BioPage, error)
    GetBySlug(slug string) (*models.BioPage, error)
    Create(page *models.BioPage) error
    Update(page *models.BioPage) error
    AddLink(link *models.BioLink) error
    DeleteLink(linkID uint) error
    IncrementBioLinkClicks(linkID uint) error
}

type bioRepository struct {
    db *gorm.DB
}

func NewBioRepository(db *gorm.DB) BioRepository {
    return &bioRepository{db: db}
}

func (r *bioRepository) GetByUserID(userID uint) (*models.BioPage, error) {
    var page models.BioPage
    err := r.db.Preload("Links", "bio_page_id IS NOT NULL").Where("user_id = ?", userID).First(&page).Error
    if err != nil {
        return nil, err
    }
    return &page, nil
}

func (r *bioRepository) GetBySlug(slug string) (*models.BioPage, error) {
    var page models.BioPage
    err := r.db.Preload("Links").Where("slug = ?", slug).First(&page).Error
    if err != nil {
        return nil, err
    }
    return &page, nil
}

func (r *bioRepository) Create(page *models.BioPage) error {
    return r.db.Create(page).Error
}

func (r *bioRepository) Update(page *models.BioPage) error {
    return r.db.Save(page).Error
}

func (r *bioRepository) AddLink(link *models.BioLink) error {
    return r.db.Create(link).Error
}

func (r *bioRepository) DeleteLink(linkID uint) error {
    return r.db.Delete(&models.BioLink{}, linkID).Error
}

func (r *bioRepository) IncrementBioLinkClicks(linkID uint) error {
    return r.db.Model(&models.BioLink{}).Where("id = ?", linkID).UpdateColumn("clicks", gorm.Expr("clicks + ?", 1)).Error
}