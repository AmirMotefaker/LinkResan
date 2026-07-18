package database

import (
    "log"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

var DB *gorm.DB

func Connect(cfg *config.Config) {
    db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    log.Println("Cloud Database connected successfully!")

    // مایگریشن (ساخت خودکار جداول در دیتابیس)
    err = db.AutoMigrate(
        &models.User{},
        &models.Link{},
        &models.Click{},
        &models.CustomDomain{},
        &models.BioPage{},
        &models.BioLink{},
        &models.Transaction{},
        &models.PasswordReset{},
    )
    if err != nil {
        log.Fatal("Failed to migrate database:", err)
    }

    log.Println("Database migrated successfully!")
    DB = db
}