package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    DatabaseURL  string // آدرس کامل پستگرس ابری
    Port         string // پورتی که هاست ابری به ما میدهد
    RedisAddr    string
    RedisPassword string
}

func LoadConfig() *Config {
    err := godotenv.Load(".env")
    if err != nil {
        log.Println("No .env file found, using system environment variables")
    }

    return &Config{
        DatabaseURL:  getEnv("DATABASE_URL", "postgres://postgres:your_password@localhost:5432/linkresan_db?sslmode=disable"),
        Port:         getEnv("PORT", "8080"), // هاست‌های ابری معمولا متغیر PORT را میدهند
        RedisAddr:    getEnv("REDIS_ADDR", "localhost:6379"),
        RedisPassword: getEnv("REDIS_PASSWORD", ""),
    }
}

func getEnv(key, defaultValue string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return defaultValue
}