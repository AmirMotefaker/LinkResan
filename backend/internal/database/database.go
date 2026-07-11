package database

import (
    "fmt"
    "log"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

var DB *gorm.DB

func Connect(cfg *config.Config) {
    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=Asia/Tehran",
        cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort, cfg.DBSSLMode)

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    log.Println("Database connected successfully!")

    // مایگریشن (ساخت خودکار جداول در دیتابیس)
    err = db.AutoMigrate(&models.User{}, &models.Link{}, &models.Click{})
    if err != nil {
        log.Fatal("Failed to migrate database:", err)
    }

    log.Println("Database migrated successfully!")
    DB = db
}