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
        AppName:      "LinkResan API v1.0 (Community)",
        ServerHeader: "Fiber",
    })

    app.Use(cors.New(cors.Config{
        AllowOrigins: "*",
        AllowHeaders: "Origin, Content-Type, Accept, Authorization, X-API-Key",
        AllowMethods: "GET, POST, HEAD, PUT, DELETE, PATCH",
    }))

    // --- Repositories ---
    linkRepo := repositories.NewLinkRepository(database.DB)
    userRepo := repositories.NewUserRepository(database.DB)
    domainRepo := repositories.NewDomainRepository(database.DB)
    bioRepo := repositories.NewBioRepository(database.DB)

    // --- Services ---
    // تغییر کرد: webhookService و apiKeyService برابر nil قرار داده شدند
    linkService := services.NewLinkService(linkRepo, domainRepo, rdb, nil)
    authService := services.NewAuthService(userRepo, cfg)
    domainService := services.NewDomainService(domainRepo)
    bioService := services.NewBioService(bioRepo)
    aiService := services.NewAIService(cfg.GroqAPIKey)
    cronService := services.NewCronService(linkRepo, userRepo)
    cronService.Start()

    // --- Handlers ---
    linkHandler := handlers.NewLinkHandler(linkService, authService)
    authHandler := handlers.NewAuthHandler(authService)
    domainHandler := handlers.NewDomainHandler(domainService, authService)
    bioHandler := handlers.NewBioHandler(bioService)
    aiHandler := handlers.NewAIHandler(aiService)

    // --- Routes ---
    api := app.Group("/api")

    api.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"status": "success", "message": "LinkResan Community API is running!"})
    })

    // AI Routes
    api.Post("/ai/suggest-slug", aiHandler.SuggestSlug)

    // Auth Routes
    api.Post("/register", authHandler.Register)
    api.Post("/login", authHandler.Login)
    api.Post("/google-login", authHandler.GoogleLogin)
    api.Post("/forgot-password", authHandler.ForgotPassword)
    api.Post("/reset-password", authHandler.ResetPassword)

    // User Routes
    api.Get("/me", middleware.Protected(authService, nil), authHandler.GetMe)
    api.Put("/me", middleware.Protected(authService, nil), authHandler.UpdateProfile)
    api.Post("/change-password", middleware.Protected(authService, nil), authHandler.ChangePassword)

    // Link Routes
    api.Post("/links", middleware.Protected(authService, nil), linkHandler.CreateShortLink)
    api.Post("/links/bulk", middleware.Protected(authService, nil), linkHandler.BulkCreateLinks)
    api.Get("/links", middleware.Protected(authService, nil), linkHandler.GetUserLinks)
    api.Get("/links/analytics", middleware.Protected(authService, nil), linkHandler.GetAnalytics)
    api.Get("/links/stats", middleware.Protected(authService, nil), linkHandler.GetClickStats)
    api.Delete("/links/:id", middleware.Protected(authService, nil), linkHandler.DeleteLink)

    // Domain Routes
    api.Post("/domains", middleware.Protected(authService, nil), domainHandler.CreateDomain)
    api.Get("/domains", middleware.Protected(authService, nil), domainHandler.GetUserDomains)
    api.Delete("/domains/:id", middleware.Protected(authService, nil), domainHandler.DeleteDomain)

    // Bio Routes
    api.Get("/bio", middleware.Protected(authService, nil), bioHandler.GetMyBio)
    api.Put("/bio", middleware.Protected(authService, nil), bioHandler.UpdateBio)
    api.Post("/bio/links", middleware.Protected(authService, nil), bioHandler.AddBioLink)
    api.Delete("/bio/links/:id", middleware.Protected(authService, nil), bioHandler.DeleteBioLink)

    api.Get("/bio/:slug", bioHandler.GetPublicBio)
    api.Post("/bio/links/track/:id", bioHandler.TrackBioLink)

    // Public Link Resolution Routes
    api.Get("/links/info/:code", linkHandler.GetLinkInfo)
    api.Post("/links/verify/:code", linkHandler.VerifyLinkPassword)

    log.Printf("Server starting on port %s...", cfg.Port)
    log.Fatal(app.Listen(":" + cfg.Port))
}