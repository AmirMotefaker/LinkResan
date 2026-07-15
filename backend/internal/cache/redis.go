package cache

import (
    "context"
    "log"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/redis/go-redis/v9"
)

var Ctx = context.Background()

func ConnectRedis(cfg *config.Config) *redis.Client {
    rdb := redis.NewClient(&redis.Options{
        Addr:     cfg.RedisAddr,
        Password: cfg.RedisPassword,
        DB:       0, // استفاده از دیتابیس پیش‌فرض Redis
    })

    // تست اتصال
    _, err := rdb.Ping(Ctx).Result()
    if err != nil {
        log.Fatalf("Failed to connect to Redis: %v", err)
    }

    log.Println("Redis connected successfully!")
    return rdb
}