package services

import (
    "log"

    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
    "github.com/robfig/cron/v3"
)

type CronService interface {
    Start()
}

type cronService struct {
    linkRepo repositories.LinkRepository
    userRepo repositories.UserRepository
}

func NewCronService(linkRepo repositories.LinkRepository, userRepo repositories.UserRepository) CronService {
    return &cronService{linkRepo: linkRepo, userRepo: userRepo}
}

func (s *cronService) Start() {
    c := cron.New()

    // هر روز ساعت 00:00 (نصف شب) اجرا شود
    c.AddFunc("0 0 * * *", func() {
        log.Println("Starting daily cleanup job...")

        // ۱. پاکسازی لینک‌های منقضی شده
        err := s.linkRepo.DeleteExpiredLinks()
        if err != nil {
            log.Printf("Cleanup Error (Links): %v", err)
        } else {
            log.Println("Cleanup Success: Expired links deleted.")
        }

        // ۲. پاکسازی توکن‌های فراموشی رمز عبور استفاده شده یا منقضی شده
        err = s.userRepo.DeleteExpiredTokens()
        if err != nil {
            log.Printf("Cleanup Error (Tokens): %v", err)
        } else {
            log.Println("Cleanup Success: Expired tokens deleted.")
        }
    })

    c.Start()
    log.Println("Cron job scheduler started. Cleanup will run daily at 00:00.")
}