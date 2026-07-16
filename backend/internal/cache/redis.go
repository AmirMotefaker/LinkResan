package cache

import (
    "context"
    "crypto/tls"
    "log"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/redis/go-redis/v9"
)

var Ctx = context.Background()

func ConnectRedis(cfg *config.Config) *redis.Client {
    rdb := redis.NewClient(&redis.Options{
        Addr:     cfg.RedisAddr,
        Password: cfg.RedisPassword,
        DB:       0,
        TLSConfig: &tls.Config{}, // فعال کردن TLS برای اتصال امن به Upstash
    })

    _, err := rdb.Ping(Ctx).Result()
    if err != nil {
        log.Fatalf("Failed to connect to Redis: %v", err)
    }

    log.Println("Redis connected successfully!")
    return rdb
}