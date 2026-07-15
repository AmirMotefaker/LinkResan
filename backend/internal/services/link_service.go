package services

import (
    "context"
    "encoding/json"
    "math/rand"
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
    "github.com/redis/go-redis/v9"
)

type CachedLink struct {
    ID          uint   `json:"id"`
    OriginalURL string `json:"original_url"`
}

type LinkService interface {
    CreateShortLink(userID uint, originalURL string) (*models.Link, error) // تغییر کرد
    ResolveShortLink(shortCode, ipAddress, userAgent, referrer string) (*models.Link, error)
    GetUserLinks(userID uint) ([]models.Link, error) // اضافه شد
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

// اضافه شدن userID به ورودی
func (s *linkService) CreateShortLink(userID uint, originalURL string) (*models.Link, error) {
    shortCode := generateShortCode()

    link := &models.Link{
        UserID:      &userID, // لینک به نام کاربر ثبت می‌شود
        OriginalURL: originalURL,
        ShortCode:   shortCode,
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

    val, err := s.redisClient.Get(ctx, cacheKey).Result()
    if err == nil {
        var cached CachedLink
        if json.Unmarshal([]byte(val), &cached) == nil {
            link := &models.Link{
                ID:          cached.ID,
                OriginalURL: cached.OriginalURL,
            }
            go s.trackClick(link.ID, ipAddress, userAgent, referrer)
            return link, nil
        }
    }

    link, err := s.linkRepo.FindByShortCode(shortCode)
    if err != nil {
        return nil, err
    }

    cachedData := CachedLink{
        ID:          link.ID,
        OriginalURL: link.OriginalURL,
    }
    jsonData, _ := json.Marshal(cachedData)
    s.redisClient.Set(ctx, cacheKey, jsonData, 1*time.Hour)

    go s.trackClick(link.ID, ipAddress, userAgent, referrer)

    return link, nil
}

// تابع جدید برای گرفتن لینک‌های کاربر
func (s *linkService) GetUserLinks(userID uint) ([]models.Link, error) {
    return s.linkRepo.FindByUserID(userID)
}

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