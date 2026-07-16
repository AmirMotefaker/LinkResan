package repositories

import (
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/gorm"
)

// ساختار برای ذخیره داده‌های آماری
type DailyClickData struct {
    Date  string `json:"date"`
    Count int    `json:"count"`
}

type LinkRepository interface {
    Create(link *models.Link) error
    FindByShortCode(code string) (*models.Link, error)
    CreateClick(click *models.Click) error
    IncrementClickCount(linkID uint) error
    FindByUserID(userID uint) ([]models.Link, error)
    DeleteByIDAndUserID(linkID uint, userID uint) error
    GetDailyClicks(userID uint) ([]DailyClickData, error) // اضافه شد
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

func (r *linkRepository) FindByUserID(userID uint) ([]models.Link, error) {
    var links []models.Link
    err := r.db.Where("user_id = ?", userID).Order("created_at desc").Find(&links).Error
    if err != nil {
        return nil, err
    }
    return links, nil
}

func (r *linkRepository) DeleteByIDAndUserID(linkID uint, userID uint) error {
    result := r.db.Where("id = ? AND user_id = ?", linkID, userID).Delete(&models.Link{})
    if result.Error != nil {
        return result.Error
    }
    if result.RowsAffected == 0 {
        return gorm.ErrRecordNotFound
    }
    return nil
}

// تابع جدید برای دریافت آمار ۷ روز اخیر (حتی روزهای بدون کلیک)
func (r *linkRepository) GetDailyClicks(userID uint) ([]DailyClickData, error) {
    var dbResults []DailyClickData
    sevenDaysAgo := time.Now().AddDate(0, 0, -6) // شامل امروز می‌شود ۷ روز

    // استفاده از TO_CHAR برای فرمت کردن تاریخ به صورت رشته استاندارد
    err := r.db.Model(&models.Click{}).
        Select("TO_CHAR(created_at, 'YYYY-MM-DD') as date, count(*) as count").
        Joins("JOIN links ON links.id = clicks.link_id").
        Where("links.user_id = ? AND clicks.created_at >= ?", userID, sevenDaysAgo).
        Group("TO_CHAR(created_at, 'YYYY-MM-DD')").
        Order("date asc").
        Scan(&dbResults).Error

    if err != nil {
        return nil, err
    }

    // ایجاد یک آرایه ۷ روزه و پر کردن آن (حتی روزهایی که کلیک نداشتند)
    finalResults := make([]DailyClickData, 0, 7)
    now := time.Now()
    for i := 6; i >= 0; i-- {
        day := now.AddDate(0, 0, -i).Format("2006-01-02")
        count := 0
        for _, dbRes := range dbResults {
            if dbRes.Date == day {
                count = dbRes.Count
                break
            }
        }
        finalResults = append(finalResults, DailyClickData{Date: day, Count: count})
    }

    return finalResults, nil
}