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
    cfg := config.LoadConfig()

    database.Connect(cfg)
    rdb := cache.ConnectRedis(cfg)

    app := fiber.New(fiber.Config{
        AppName:      "LinkResan API v1.0",
        ServerHeader: "Fiber",
    })

    app.Use(cors.New(cors.Config{
        AllowOrigins: "*",
        AllowHeaders: "Origin, Content-Type, Accept, Authorization",
        AllowMethods: "GET, POST, HEAD, PUT, DELETE, PATCH",
    }))

    // --- Repositories ---
    linkRepo := repositories.NewLinkRepository(database.DB)
    userRepo := repositories.NewUserRepository(database.DB)
    domainRepo := repositories.NewDomainRepository(database.DB) // اضافه شد

    // --- Services ---
    linkService := services.NewLinkService(linkRepo, domainRepo, rdb) // آپدیت شد
    authService := services.NewAuthService(userRepo)
    domainService := services.NewDomainService(domainRepo) // اضافه شد

    // --- Handlers ---
    linkHandler := handlers.NewLinkHandler(linkService)
    authHandler := handlers.NewAuthHandler(authService)
    domainHandler := handlers.NewDomainHandler(domainService) // اضافه شد

    // --- Routes ---
    api := app.Group("/api")

    api.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "status":  "success",
            "message": "LinkResan API is running perfectly!",
        })
    })

    api.Post("/register", authHandler.Register)
    api.Post("/login", authHandler.Login)

    // Protected Routes
    api.Post("/links", middleware.Protected(), linkHandler.CreateShortLink)
    api.Get("/links", middleware.Protected(), linkHandler.GetUserLinks)
    api.Get("/links/analytics", middleware.Protected(), linkHandler.GetAnalytics)
    api.Delete("/links/:id", middleware.Protected(), linkHandler.DeleteLink)

    // Domain Routes (Protected)
    api.Post("/domains", middleware.Protected(), domainHandler.CreateDomain)       // اضافه شد
    api.Get("/domains", middleware.Protected(), domainHandler.GetUserDomains)      // اضافه شد
    api.Delete("/domains/:id", middleware.Protected(), domainHandler.DeleteDomain) // اضافه شد

    app.Get("/:code", linkHandler.ResolveShortLink)

    log.Printf("Server starting on port %s...", cfg.Port)
    log.Fatal(app.Listen(":" + cfg.Port))
}