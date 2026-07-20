package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    DatabaseURL        string
    Port               string
    RedisAddr          string
    RedisPassword      string
    ZarinpalMerchantID string
    ZarinpalCallbackURL string
    ResendAPIKey       string
    AppURL             string // آدرس سایت برای لینک بازنشانی
    GeminiAPIKey        string // اضافه شد
}

func LoadConfig() *Config {
    err := godotenv.Load(".env")
    if err != nil {
        log.Println("No .env file found, using system environment variables")
    }

    return &Config{
        DatabaseURL:        getEnv("DATABASE_URL", "postgres://postgres:your_password@localhost:5432/linkresan_db?sslmode=disable"),
        Port:               getEnv("PORT", "8080"),
        RedisAddr:          getEnv("REDIS_ADDR", "localhost:6379"),
        RedisPassword:      getEnv("REDIS_PASSWORD", ""),
        ZarinpalMerchantID: getEnv("ZARINPAL_MERCHANT_ID", ""),
        ZarinpalCallbackURL: getEnv("ZARINPAL_CALLBACK_URL", "https://linkresan.ir/api/payment/verify"),
        ResendAPIKey:       getEnv("RESEND_API_KEY", ""),
        AppURL:             getEnv("APP_URL", "https://linkresan.ir"),
        GeminiAPIKey:        getEnv("GEMINI_API_KEY", ""),
    }
}

func getEnv(key, defaultValue string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return defaultValue
}