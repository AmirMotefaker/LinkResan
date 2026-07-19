package services

import (
    "context"
    "encoding/json"
    "errors"
    "math/rand"
    "strings"
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
    BulkCreateShortLinks(userID uint, urls []string) ([]models.Link, error)
    GetLinkByCode(shortCode, host string) (*models.Link, error)
    TrackClick(linkID uint, userID uint, ipAddress, userAgent, referrer string) // تغییر کرد
    GetUserLinks(userID uint) ([]models.Link, error)
    DeleteLink(userID uint, linkID uint) error
    GetAnalytics(userID uint) ([]repositories.DailyClickData, error)
    GetClickStats(userID uint) (map[string][]repositories.NameCount, error)
}

type linkService struct {
    linkRepo       repositories.LinkRepository
    domainRepo     repositories.DomainRepository
    redisClient    *redis.Client
    webhookService WebhookService // اضافه شد
}

// آپدیت شد: webhookService تزریق شد
func NewLinkService(linkRepo repositories.LinkRepository, domainRepo repositories.DomainRepository, rdb *redis.Client, webhookService WebhookService) LinkService {
    return &linkService{linkRepo: linkRepo, domainRepo: domainRepo, redisClient: rdb, webhookService: webhookService}
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

func (s *linkService) BulkCreateShortLinks(userID uint, urls []string) ([]models.Link, error) {
    var createdLinks []models.Link

    for _, u := range urls {
        if u == "" {
            continue
        }
        if !strings.HasPrefix(u, "http://") && !strings.HasPrefix(u, "https://") {
            u = "https://" + u
        }

        shortCode := generateShortCode()
        link := &models.Link{
            UserID:      &userID,
            OriginalURL: u,
            ShortCode:   shortCode,
            IsActive:    true,
        }

        err := s.linkRepo.Create(link)
        if err == nil {
            createdLinks = append(createdLinks, *link)
        }
    }

    if len(createdLinks) == 0 {
        return nil, errors.New("هیچ لینکی ساخته نشد")
    }

    return createdLinks, nil
}

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
            link := &models.Link{ID: cached.ID, OriginalURL: cached.OriginalURL, PasswordHash: cached.PasswordHash}
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

    cachedData := CachedLink{ID: link.ID, OriginalURL: link.OriginalURL, PasswordHash: link.PasswordHash}
    jsonData, _ := json.Marshal(cachedData)
    s.redisClient.Set(ctx, cacheKey, jsonData, 1*time.Hour)

    return link, nil
}

// آپدیت شد: userID اضافه شد و وب‌هوک ارسال می‌شود
func (s *linkService) TrackClick(linkID uint, userID uint, ipAddress, userAgent, referrer string) {
    browser, device := parseUserAgent(userAgent)
    
    click := &models.Click{
        LinkID:     linkID,
        IPAddress:  ipAddress,
        UserAgent:  userAgent,
        Referrer:   referrer,
        Browser:    browser,
        DeviceType: device,
    }
    
    _ = s.linkRepo.CreateClick(click)
    _ = s.linkRepo.IncrementClickCount(linkID)

    // ارسال رویداد به وب‌هوک‌ها
    if userID > 0 && s.webhookService != nil {
        clickData := map[string]interface{}{
            "event":      "click",
            "link_id":    linkID,
            "ip_address": ipAddress,
            "user_agent": userAgent,
            "referrer":   referrer,
            "browser":    browser,
            "device":     device,
            "timestamp":  time.Now().Unix(),
        }
        s.webhookService.TriggerWebhooks(userID, clickData)
    }
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

func (s *linkService) GetClickStats(userID uint) (map[string][]repositories.NameCount, error) {
    return s.linkRepo.GetClickStats(userID)
}

func parseUserAgent(ua string) (browser, device string) {
    uaLower := strings.ToLower(ua)

    if strings.Contains(uaLower, "edg") {
        browser = "Edge"
    } else if strings.Contains(uaLower, "chrome") {
        browser = "Chrome"
    } else if strings.Contains(uaLower, "firefox") {
        browser = "Firefox"
    } else if strings.Contains(uaLower, "safari") {
        browser = "Safari"
    } else {
        browser = "Other"
    }

    if strings.Contains(uaLower, "android") {
        device = "Android"
    } else if strings.Contains(uaLower, "iphone") || strings.Contains(uaLower, "ipad") {
        device = "iOS"
    } else if strings.Contains(uaLower, "windows") {
        device = "Windows"
    } else if strings.Contains(uaLower, "mac os") || strings.Contains(uaLower, "macintosh") {
        device = "macOS"
    } else if strings.Contains(uaLower, "linux") {
        device = "Linux"
    } else {
        device = "Other"
    }
    return
}