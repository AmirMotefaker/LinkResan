package services

import (
    "errors"
    "strings"

    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
)

type BioService interface {
    GetOrCreateBio(userID uint, email string) (*models.BioPage, error)
    UpdateBio(userID uint, slug, title, bioText string) (*models.BioPage, error)
    AddBioLink(userID uint, title, url string) (*models.BioLink, error)
    DeleteBioLink(userID uint, linkID uint) error
    GetPublicBio(slug string) (*models.BioPage, error)
    TrackBioLinkClick(linkID uint) error
}

type bioService struct {
    bioRepo BioRepository
}

func NewBioService(bioRepo BioRepository) BioService {
    return &bioService{bioRepo: bioRepo}
}

func (s *bioService) GetOrCreateBio(userID uint, email string) (*models.BioPage, error) {
    page, err := s.bioRepo.GetByUserID(userID)
    if err == nil {
        return page, nil
    }

    // اگر صفحه وجود نداشت، یک صفحه جدید با slug پیش‌فرض بساز
    defaultSlug := strings.Split(email, "@")[0]
    // بررسی یکتا بودن slug پیش‌فرض
    _, err = s.bioRepo.GetBySlug(defaultSlug)
    if err == nil {
        defaultSlug = defaultSlug + "-" + string(rune(userID)) // اضافه کردن عدد در صورت تکراری بودن
    }

    newPage := &models.BioPage{
        UserID:  userID,
        Slug:    defaultSlug,
        Title:   "صفحه من",
        BioText: "به صفحه من خوش آمدید",
    }

    err = s.bioRepo.Create(newPage)
    if err != nil {
        return nil, err
    }
    return newPage, nil
}

func (s *bioService) UpdateBio(userID uint, slug, title, bioText string) (*models.BioPage, error) {
    page, err := s.bioRepo.GetByUserID(userID)
    if err != nil {
        return nil, errors.New("bio page not found")
    }

    // چک کردن یکتا بودن slug جدید
    if slug != page.Slug {
        existing, err := s.bioRepo.GetBySlug(slug)
        if err == nil && existing.ID != page.ID {
            return nil, errors.New("این آدرس قبلاً توسط شخص دیگری استفاده شده است")
        }
        page.Slug = slug
    }

    page.Title = title
    page.BioText = bioText

    err = s.bioRepo.Update(page)
    if err != nil {
        return nil, err
    }
    return page, nil
}

func (s *bioService) AddBioLink(userID uint, title, url string) (*models.BioLink, error) {
    page, err := s.bioRepo.GetByUserID(userID)
    if err != nil {
        return nil, errors.New("bio page not found")
    }

    link := &models.BioLink{
        BioPageID: page.ID,
        Title:     title,
        URL:       url,
    }

    err = s.bioRepo.AddLink(link)
    if err != nil {
        return nil, err
    }
    return link, nil
}

func (s *bioService) DeleteBioLink(userID uint, linkID uint) error {
    // در اینجا می‌توانیم چک کنیم که آیا این لینک متعلق به کاربر است یا خیر (برای سادگی فعلاً حذف می‌کنیم)
    return s.bioRepo.DeleteLink(linkID)
}

func (s *bioService) GetPublicBio(slug string) (*models.BioPage, error) {
    return s.bioRepo.GetBySlug(slug)
}

func (s *bioService) TrackBioLinkClick(linkID uint) error {
    return s.bioRepo.IncrementBioLinkClicks(linkID)
}