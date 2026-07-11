package main

import (
    "log"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/AmirMotefaker/LinkResan/backend/internal/database"
    "github.com/gofiber/fiber/v2"
)

func main() {
    // ۱. بارگذاری تنظیمات (.env)
    cfg := config.LoadConfig()

    // ۲. اتصال به دیتابیس
    database.Connect(cfg)

    // ۳. راه‌اندازی سرور Fiber
    app := fiber.New(fiber.Config{
        AppName:      "LinkResan API v1.0",
        ServerHeader: "Fiber",
    })

    // یک روت ساده برای تست سلامت سرور
    app.Get("/api/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "status":  "success",
            "message": "LinkResan API is running perfectly!",
        })
    })

    // ۴. شروع به گوش دادن به پورت
    log.Printf("Server starting on port %s...", cfg.ServerPort)
    log.Fatal(app.Listen(":" + cfg.ServerPort))
}