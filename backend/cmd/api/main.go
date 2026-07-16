package main

import (
    "log"

    "github.com/AmirMotefaker/LinkResan/backend/internal/cache"
    "github.com/AmirMotefaker/LinkResan/backend/internal/config"
    "github.com/AmirMotefaker/LinkResan/backend/internal/database"
    "github.com/AmirMotefaker/LinkResan/backend/internal/handlers"
    "github.com/AmirMotefaker/LinkResan/backend/internal/middleware"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
    // ۱. بارگذاری تنظیمات (.env)
    cfg := config.LoadConfig()

    // ۲. اتصال به دیتابیس‌ها (PostgreSQL و Redis)
    database.Connect(cfg)
    rdb := cache.ConnectRedis(cfg)

    // ۳. راه‌اندازی سرور Fiber
    app := fiber.New(fiber.Config{
        AppName:      "LinkResan API v1.0",
        ServerHeader: "Fiber",
    })

    // تنظیمات CORS برای ارتباط با هر دامنه‌ای (برای دیپلوی)
    app.Use(cors.New(cors.Config{
        AllowOrigins: "*",
        AllowHeaders: "Origin, Content-Type, Accept, Authorization",
        AllowMethods: "GET, POST, HEAD, PUT, DELETE, PATCH",
    }))

    // --- تزریق وابستگی‌ها (Dependency Injection) ---
    linkRepo := repositories.NewLinkRepository(database.DB)
    userRepo := repositories.NewUserRepository(database.DB)

    linkService := services.NewLinkService(linkRepo, rdb) // سرویس لینک با قابلیت کش ردیس
    authService := services.NewAuthService(userRepo)      // سرویس احراز هویت

    linkHandler := handlers.NewLinkHandler(linkService)
    authHandler := handlers.NewAuthHandler(authService)

    // --- تعریف مسیرها (Routes) ---
    api := app.Group("/api")

    // روت تست سلامت سرور
    api.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "status":  "success",
            "message": "LinkResan API is running perfectly!",
        })
    })

    // روت‌های احراز هویت (باز برای همه)
    api.Post("/register", authHandler.Register)
    api.Post("/login", authHandler.Login)

    // روت‌های محافظت شده (نیازمند توکن JWT)
    api.Post("/links", middleware.Protected(), linkHandler.CreateShortLink)
    api.Get("/links", middleware.Protected(), linkHandler.GetUserLinks)
    api.Delete("/links/:id", middleware.Protected(), linkHandler.DeleteLink) // اضافه شد

    // روت ریدایرکت (باز است برای همه کاربران اینترنت)
    app.Get("/:code", linkHandler.ResolveShortLink)

    // ۴. شروع به گوش دادن به پورت
    log.Printf("Server starting on port %s...", cfg.Port)
    log.Fatal(app.Listen(":" + cfg.Port))
}