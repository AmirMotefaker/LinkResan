package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    DBHost        string
    DBPort        string
    DBUser        string
    DBPassword    string
    DBName        string
    DBSSLMode     string
    ServerPort    string
    RedisAddr     string
    RedisPassword string
}

func LoadConfig() *Config {
    err := godotenv.Load(".env")
    if err != nil {
        log.Println("No .env file found, using system environment variables")
    }

    return &Config{
        DBHost:        getEnv("DB_HOST", "localhost"),
        DBPort:        getEnv("DB_PORT", "5432"),
        DBUser:        getEnv("DB_USER", "postgres"),
        DBPassword:    getEnv("DB_PASSWORD", ""),
        DBName:        getEnv("DB_NAME", "linkresan_db"),
        DBSSLMode:     getEnv("DB_SSLMODE", "disable"),
        ServerPort:    getEnv("SERVER_PORT", "8080"),
        RedisAddr:     getEnv("REDIS_ADDR", "localhost:6379"),
        RedisPassword: getEnv("REDIS_PASSWORD", ""),
    }
}

func getEnv(key, defaultValue string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return defaultValue
}