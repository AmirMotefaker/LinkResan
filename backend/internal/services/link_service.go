package services

import (
    "context"
    "encoding/json"
    "errors"
    "math/rand"
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
    "github.com/redis/go-redis/v9"
)

// ساختار داده‌ای که در Redis کش می‌شود
type CachedLink struct {
    ID          uint   `json:"id"`
    OriginalURL string `json:"original_url"`
}

type LinkService interface {
    CreateShortLink(userID uint, originalURL, customCode string) (*models.Link, error)
    ResolveShortLink(shortCode, ipAddress, userAgent, referrer string) (*models.Link, error)
    GetUserLinks(userID uint) ([]models.Link, error)
    DeleteLink(userID uint, linkID uint) error
}

type linkService struct {
    linkRepo    repositories.LinkRepository
    redisClient *redis.Client
}

func NewLinkService(linkRepo repositories.LinkRepository, rdb *redis.Client) LinkService {
    return &linkService{linkRepo: linkRepo, redisClient: rdb}
}

func generateShortCode() string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const codeLength = 6

    seededRand := rand.New(rand.NewSource(time.Now().UnixNano()))
    b := make([]byte, codeLength)
    for i := range b {
        b[i] = charset[seededRand.Intn(len(charset))]
    }
    return string(b)
}

// CreateShortLink با قابلیت اسلاگ دلخواه
func (s *linkService) CreateShortLink(userID uint, originalURL, customCode string) (*models.Link, error) {
    shortCode := generateShortCode()
    isCustom := false

    // اگر کاربر کد دلخواه وارد کرده بود
    if customCode != "" {
        // چک کردن اینکه آیا این کد قبلا استفاده شده است یا خیر
        existingLink, err := s.linkRepo.FindByShortCode(customCode)
        if err == nil && existingLink != nil {
            return nil, errors.New("این نام دلخواه قبلاً انتخاب شده است")
        }
        shortCode = customCode
        isCustom = true
    }

    link := &models.Link{
        UserID:      &userID,
        OriginalURL: originalURL,
        ShortCode:   shortCode,
        IsCustom:    isCustom,
        IsActive:    true,
    }

    err := s.linkRepo.Create(link)
    if err != nil {
        return nil, err
    }

    return link, nil
}

func (s *linkService) ResolveShortLink(shortCode, ipAddress, userAgent, referrer string) (*models.Link, error) {
    ctx := context.Background()
    cacheKey := "shortlink:" + shortCode

    // ۱. بررسی اینکه آیا لینک در Redis وجود دارد؟
    val, err := s.redisClient.Get(ctx, cacheKey).Result()
    if err == nil {
        // کش هیت (Cache Hit): لینک در Redis پیدا شد!
        var cached CachedLink
        if json.Unmarshal([]byte(val), &cached) == nil {
            link := &models.Link{
                ID:          cached.ID,
                OriginalURL: cached.OriginalURL,
            }

            // ثبت کلیک به صورت ناهمگام (بدون متوقف کردن ریدایرکت)
            go s.trackClick(link.ID, ipAddress, userAgent, referrer)

            return link, nil
        }
    }

    // ۲. کش میس (Cache Miss): لینک در Redis نبود، پس از دیتابیس می‌خوانیم
    link, err := s.linkRepo.FindByShortCode(shortCode)
    if err != nil {
        return nil, err
    }

    // ۳. ذخیره لینک در Redis برای دفعات بعدی (با زمان انقضا ۱ ساعته)
    cachedData := CachedLink{
        ID:          link.ID,
        OriginalURL: link.OriginalURL,
    }
    jsonData, _ := json.Marshal(cachedData)
    s.redisClient.Set(ctx, cacheKey, jsonData, 1*time.Hour)

    // ثبت کلیک به صورت ناهمگام
    go s.trackClick(link.ID, ipAddress, userAgent, referrer)

    return link, nil
}

func (s *linkService) GetUserLinks(userID uint) ([]models.Link, error) {
    return s.linkRepo.FindByUserID(userID)
}

func (s *linkService) DeleteLink(userID uint, linkID uint) error {
    return s.linkRepo.DeleteByIDAndUserID(linkID, userID)
}

// تابع ثبت کلیک که در بک‌گراند اجرا می‌شود
func (s *linkService) trackClick(linkID uint, ipAddress, userAgent, referrer string) {
    click := &models.Click{
        LinkID:    linkID,
        IPAddress: ipAddress,
        UserAgent: userAgent,
        Referrer:  referrer,
    }
    _ = s.linkRepo.CreateClick(click)
    _ = s.linkRepo.IncrementClickCount(linkID)
}