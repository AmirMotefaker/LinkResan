package models

import (
    "time"

    "gorm.io/gorm"
)

type User struct {
    ID           uint           `gorm:"primaryKey"`
    Email        string         `gorm:"uniqueIndex;size:255"`
    PhoneNumber  string         `gorm:"uniqueIndex;size:15"`
    PasswordHash string         `gorm:"size:255;not null"`
    IsActive     bool           `gorm:"default:true"`
    IsPremium    bool           `gorm:"default:false"`
    CreatedAt    time.Time
    UpdatedAt    time.Time
    DeletedAt    gorm.DeletedAt `gorm:"index"`
}

type Link struct {
    ID          uint           `gorm:"primaryKey"`
    UserID      *uint          `gorm:"index"`
    User        User           `gorm:"foreignKey:UserID"`
    OriginalURL string         `gorm:"type:text;not null"`
    ShortCode   string         `gorm:"uniqueIndex;size:20;not null"`
    IsCustom    bool           `gorm:"default:false"`
    ExpiresAt   *time.Time
    ClickLimit  *int
    ClickCount  int64          `gorm:"default:0"`
    IsActive    bool           `gorm:"default:true"`
    CreatedAt   time.Time
    UpdatedAt   time.Time
    DeletedAt   gorm.DeletedAt `gorm:"index"`
}

type Click struct {
    ID         uint      `gorm:"primaryKey"`
    LinkID     uint      `gorm:"index;not null"`
    Link       Link      `gorm:"foreignKey:LinkID"`
    IPAddress  string    `gorm:"type:text"` // تغییر از inet به text برای جلوگیری از ارور دیتابیس
    UserAgent  string    `gorm:"type:text"`
    Referrer   string    `gorm:"type:text"`
    Country    string    `gorm:"size:50"`
    City       string    `gorm:"size:50"`
    DeviceType string    `gorm:"size:50"`
    Browser    string    `gorm:"size:50"`
    IsUnique   bool      `gorm:"default:false"`
    CreatedAt  time.Time
}