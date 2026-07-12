package main

import (
    "log"

    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/AmirMotefaker/LinkResan/backend/internal/database"
    "github.com/AmirMotefaker/LinkResan/backend/internal/handlers"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
)

func main() {
    // ۱. بارگذاری تنظیمات
    cfg := config.LoadConfig()

    // ۲. اتصال به دیتابیس
    database.Connect(cfg)

    // ۳. راه‌اندازی سرور
    app := fiber.New(fiber.Config{
        AppName:      "LinkResan API v1.0",
        ServerHeader: "Fiber",
    })

    // --- تزریق وابستگی‌ها (Dependency Injection) ---
    linkRepo := repositories.NewLinkRepository(database.DB)
    linkService := services.NewLinkService(linkRepo)
    linkHandler := handlers.NewLinkHandler(linkService)

    // --- تعریف مسیرها (Routes) ---
    api := app.Group("/api")

    // روت سلامت سرور
    api.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "status":  "success",
            "message": "LinkResan API is running perfectly!",
        })
    })

    // روت ساخت لینک کوتاه (POST /api/links)
    api.Post("/links", linkHandler.CreateShortLink)

	// روت ریدایرکت (GET /:code)
    app.Get("/:code", linkHandler.ResolveShortLink)

    // ۴. شروع سرور
    log.Printf("Server starting on port %s...", cfg.ServerPort)
    log.Fatal(app.Listen(":" + cfg.ServerPort))
}