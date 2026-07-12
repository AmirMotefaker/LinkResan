package services

import (
    "math/rand"
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
)

type LinkService interface {
    CreateShortLink(originalURL string) (*models.Link, error)
    ResolveShortLink(shortCode, ipAddress, userAgent, referrer string) (*models.Link, error)
}

type linkService struct {
    linkRepo repositories.LinkRepository
}

func NewLinkService(linkRepo repositories.LinkRepository) LinkService {
    return &linkService{linkRepo: linkRepo}
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

func (s *linkService) CreateShortLink(originalURL string) (*models.Link, error) {
    shortCode := generateShortCode()

    link := &models.Link{
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

// منطق ریدایرکت و ثبت کلیک
func (s *linkService) ResolveShortLink(shortCode, ipAddress, userAgent, referrer string) (*models.Link, error) {
    // ۱. پیدا کردن لینک در دیتابیس
    link, err := s.linkRepo.FindByShortCode(shortCode)
    if err != nil {
        return nil, err
    }

    // ۲. ثبت اطلاعات کلیک کاربر
    click := &models.Click{
        LinkID:    link.ID,
        IPAddress: ipAddress,
        UserAgent: userAgent,
        Referrer:  referrer,
    }

    // ۳. آپدیت کردن تعداد کلیک‌ها
    _ = s.linkRepo.CreateClick(click)
    _ = s.linkRepo.IncrementClickCount(link.ID)

    return link, nil
}