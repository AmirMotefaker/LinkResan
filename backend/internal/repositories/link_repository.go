package repositories

import (
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

type DailyClickData struct {
    Date  string `json:"date"`
    Count int    `json:"count"`
}

type NameCount struct {
    Name  string `json:"name"`
    Count int    `json:"count"`
}

type LinkRepository interface {
    Create(link *models.Link) error
    FindByShortCodeAndDomain(code string, domainID *uint) (*models.Link, error)
    CreateClick(click *models.Click) error
    IncrementClickCount(linkID uint) error
    FindByUserID(userID uint) ([]models.Link, error)
    DeleteByIDAndUserID(linkID uint, userID uint) error
    GetDailyClicks(userID uint) ([]DailyClickData, error)
    GetClickStats(userID uint) (map[string][]NameCount, error)
    DeleteExpiredLinks() error // اضافه شد
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

func (r *linkRepository) FindByShortCodeAndDomain(code string, domainID *uint) (*models.Link, error) {
    var link models.Link
    query := r.db.Where("short_code = ? AND is_active = ?", code, true)
    if domainID == nil {
        query = query.Where("domain_id IS NULL")
    } else {
        query = query.Where("domain_id = ?", *domainID)
    }
    err := query.First(&link).Error
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

func (r *linkRepository) FindByUserID(userID uint) ([]models.Link, error) {
    var links []models.Link
    err := r.db.Where("user_id = ?", userID).Order("created_at desc").Find(&links).Error
    return links, err
}

func (r *linkRepository) DeleteByIDAndUserID(linkID uint, userID uint) error {
    result := r.db.Where("id = ? AND user_id = ?", linkID, userID).Delete(&models.Link{})
    return result.Error
}

func (r *linkRepository) GetDailyClicks(userID uint) ([]DailyClickData, error) {
    type RawClick struct {
        CreatedAt time.Time
    }
    var rawClicks []RawClick

    tehran, _ := time.LoadLocation("Asia/Tehran")
    now := time.Now().In(tehran)
    sevenDaysAgo := now.AddDate(0, 0, -6)

    err := r.db.Model(&models.Click{}).
        Joins("JOIN links ON links.id = clicks.link_id").
        Where("links.user_id = ? AND clicks.created_at >= ?", userID, sevenDaysAgo).
        Select("clicks.created_at").
        Scan(&rawClicks).Error

    if err != nil {
        return nil, err
    }

    counts := make(map[string]int)
    for _, rc := range rawClicks {
        dayStr := rc.CreatedAt.In(tehran).Format("2006-01-02")
        counts[dayStr]++
    }

    finalResults := make([]DailyClickData, 0, 7)
    for i := 6; i >= 0; i-- {
        day := now.AddDate(0, 0, -i).Format("2006-01-02")
        finalResults = append(finalResults, DailyClickData{Date: day, Count: counts[day]})
    }

    return finalResults, nil
}

func (r *linkRepository) GetClickStats(userID uint) (map[string][]NameCount, error) {
    var browsers []NameCount
    r.db.Model(&models.Click{}).
        Joins("JOIN links ON links.id = clicks.link_id").
        Where("links.user_id = ?", userID).
        Select("browser as name, count(*) as count").
        Group("browser").
        Order("count desc").
        Scan(&browsers)

    var devices []NameCount
    r.db.Model(&models.Click{}).
        Joins("JOIN links ON links.id = clicks.link_id").
        Where("links.user_id = ?", userID).
        Select("device_type as name, count(*) as count").
        Group("device_type").
        Order("count desc").
        Scan(&devices)

    return map[string][]NameCount{
        "browsers": browsers,
        "devices":  devices,
    }, nil
}

// اضافه شد: پاکسازی لینک‌های منقضی شده و رسیده به حد نصاب کلیک
func (r *linkRepository) DeleteExpiredLinks() error {
    now := time.Now()
    
    // حذف لینک‌هایی که تاریخ انقضایشان گذشته است
    if err := r.db.Where("expires_at IS NOT NULL AND expires_at < ?", now).Delete(&models.Link{}).Error; err != nil {
        return err
    }
    
    // حذف لینک‌هایی که به محدودیت کلیک رسیده‌اند
    if err := r.db.Where("click_limit IS NOT NULL AND click_count >= click_limit").Delete(&models.Link{}).Error; err != nil {
        return err
    }
    
    return nil
}