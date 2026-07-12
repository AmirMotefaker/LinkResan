package repositories

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

type LinkRepository interface {
    Create(link *models.Link) error
    FindByShortCode(code string) (*models.Link, error)
    CreateClick(click *models.Click) error
    IncrementClickCount(linkID uint) error
}

type linkRepository struct {
    db *gorm.DB
}

func NewLinkRepository(db *gorm.DB) LinkRepository {
    return &linkRepository{db: db}
}

func (r *linkRepository) Create(link *models.Link) error {
    return r.db.Create(link).Error
}

func (r *linkRepository) FindByShortCode(code string) (*models.Link, error) {
    var link models.Link
    err := r.db.Where("short_code = ? AND is_active = ?", code, true).First(&link).Error
    if err != nil {
        return nil, err
    }
    return &link, nil
}

func (r *linkRepository) CreateClick(click *models.Click) error {
    return r.db.Create(click).Error
}

func (r *linkRepository) IncrementClickCount(linkID uint) error {
    return r.db.Model(&models.Link{}).Where("id = ?", linkID).UpdateColumn("click_count", gorm.Expr("click_count + ?", 1)).Error
}