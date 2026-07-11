package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

// Config نگهدارنده تمام متغیرهای محیطی است
type Config struct {
    DBHost     string
    DBPort     string
    DBUser     string
    DBPassword string
    DBName     string
    DBSSLMode  string
    ServerPort string
}

func LoadConfig() *Config {
    // بارگذاری فایل .env
    err := godotenv.Load(".env")
    if err != nil {
        log.Println("No .env file found, using system environment variables")
    }

    return &Config{
        DBHost:     getEnv("DB_HOST", "localhost"),
        DBPort:     getEnv("DB_PORT", "5432"),
        DBUser:     getEnv("DB_USER", "postgres"),
        DBPassword: getEnv("DB_PASSWORD", ""),
        DBName:     getEnv("DB_NAME", "linkresan_db"),
        DBSSLMode:  getEnv("DB_SSLMODE", "disable"),
        ServerPort: getEnv("SERVER_PORT", "8080"),
    }
}

// تابع کمکی برای خواندن متغیر با مقدار پیش‌فرض
func getEnv(key, defaultValue string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return defaultValue
}