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
    "golang.org/x/crypto/bcrypt"
)

type CachedLink struct {
    ID           uint    `json:"id"`
    OriginalURL  string  `json:"original_url"`
    PasswordHash *string `json:"password_hash"`
}

type LinkService interface {
    CreateShortLink(userID uint, originalURL, customCode, password string, expiresAt *time.Time, clickLimit *int, domainID *uint) (*models.Link, error)
    GetLinkByCode(shortCode, host string) (*models.Link, error)
    TrackClick(linkID uint, ipAddress, userAgent, referrer string)
    GetUserLinks(userID uint) ([]models.Link, error)
    DeleteLink(userID uint, linkID uint) error
    GetAnalytics(userID uint) ([]repositories.DailyClickData, error)
}

type linkService struct {
    linkRepo    repositories.LinkRepository
    domainRepo  repositories.DomainRepository
    redisClient *redis.Client
}

func NewLinkService(linkRepo repositories.LinkRepository, domainRepo repositories.DomainRepository, rdb *redis.Client) LinkService {
    return &linkService{linkRepo: linkRepo, domainRepo: domainRepo, redisClient: rdb}
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

// اضافه شدن password
func (s *linkService) CreateShortLink(userID uint, originalURL, customCode, password string, expiresAt *time.Time, clickLimit *int, domainID *uint) (*models.Link, error) {
    shortCode := generateShortCode()
    isCustom := false

    if customCode != "" {
        existingLink, err := s.linkRepo.FindByShortCodeAndDomain(customCode, domainID)
        if err == nil && existingLink != nil {
            return nil, errors.New("این نام دلخواه قبلاً انتخاب شده است")
        }
        shortCode = customCode
        isCustom = true
    }

    var passHash *string
    if password != "" {
        hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
        if err == nil {
            str := string(hashed)
            passHash = &str
        }
    }

    link := &models.Link{
        UserID:       &userID,
        OriginalURL:  originalURL,
        ShortCode:    shortCode,
        IsCustom:     isCustom,
        IsActive:     true,
        ExpiresAt:    expiresAt,
        ClickLimit:   clickLimit,
        DomainID:     domainID,
        PasswordHash: passHash,
    }

    err := s.linkRepo.Create(link)
    if err != nil {
        return nil, err
    }

    return link, nil
}

// این تابع فقط لینک را پیدا می‌کند و ریدایرکت انجام نمی‌دهد
func (s *linkService) GetLinkByCode(shortCode, host string) (*models.Link, error) {
    ctx := context.Background()
    
    var domainID *uint
    
    if host != "linkresan.ir" && host != "www.linkresan.ir" && host != "localhost:8080" && host != "127.0.0.1:8080" {
        domain, err := s.domainRepo.FindByName(host)
        if err == nil && domain != nil {
            domainID = &domain.ID
        }
    }

    cacheKey := "shortlink:" + host + ":" + shortCode

    val, err := s.redisClient.Get(ctx, cacheKey).Result()
    if err == nil {
        var cached CachedLink
        if json.Unmarshal([]byte(val), &cached) == nil {
            link := &models.Link{
                ID:           cached.ID,
                OriginalURL:  cached.OriginalURL,
                PasswordHash: cached.PasswordHash,
            }
            return link, nil
        }
    }

    link, err := s.linkRepo.FindByShortCodeAndDomain(shortCode, domainID)
    if err != nil {
        return nil, err
    }

    if link.ExpiresAt != nil && link.ExpiresAt.Before(time.Now()) {
        return nil, errors.New("این لینک منقضی شده است")
    }

    if link.ClickLimit != nil && link.ClickCount >= int64(*link.ClickLimit) {
        return nil, errors.New("محدودیت کلیک این لینک به پایان رسیده است")
    }

    cachedData := CachedLink{
        ID:           link.ID,
        OriginalURL:  link.OriginalURL,
        PasswordHash: link.PasswordHash,
    }
    jsonData, _ := json.Marshal(cachedData)
    s.redisClient.Set(ctx, cacheKey, jsonData, 1*time.Hour)

    return link, nil
}

// تابع ثبت کلیک که به صورت عمومی در دسترس هندلر قرار گرفت
func (s *linkService) TrackClick(linkID uint, ipAddress, userAgent, referrer string) {
    click := &models.Click{
        LinkID:    linkID,
        IPAddress: ipAddress,
        UserAgent: userAgent,
        Referrer:  referrer,
    }
    _ = s.linkRepo.CreateClick(click)
    _ = s.linkRepo.IncrementClickCount(linkID)
}

func (s *linkService) GetUserLinks(userID uint) ([]models.Link, error) {
    return s.linkRepo.FindByUserID(userID)
}

func (s *linkService) DeleteLink(userID uint, linkID uint) error {
    return s.linkRepo.DeleteByIDAndUserID(linkID, userID)
}

func (s *linkService) GetAnalytics(userID uint) ([]repositories.DailyClickData, error) {
    return s.linkRepo.GetDailyClicks(userID)
}