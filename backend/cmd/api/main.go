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
    domainRepo := repositories.NewDomainRepository(database.DB)
    bioRepo := repositories.NewBioRepository(database.DB)
    paymentRepo := repositories.NewPaymentRepository(database.DB)
    webhookRepo := repositories.NewWebhookRepository(database.DB)

    // --- Services ---
    webhookService := services.NewWebhookService(webhookRepo)
    linkService := services.NewLinkService(linkRepo, domainRepo, rdb, webhookService)
    authService := services.NewAuthService(userRepo, cfg)
    domainService := services.NewDomainService(domainRepo)
    bioService := services.NewBioService(bioRepo)
    paymentService := services.NewPaymentService(paymentRepo, cfg)

    // --- Handlers ---
    linkHandler := handlers.NewLinkHandler(linkService, authService)
    authHandler := handlers.NewAuthHandler(authService)
    domainHandler := handlers.NewDomainHandler(domainService, authService)
    bioHandler := handlers.NewBioHandler(bioService)
    paymentHandler := handlers.NewPaymentHandler(paymentService, authService)
    webhookHandler := handlers.NewWebhookHandler(webhookService)

    // --- Routes ---
    api := app.Group("/api")

    api.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"status": "success", "message": "LinkResan API is running perfectly!"})
    })

    // Auth & Password Reset Routes
    api.Post("/register", authHandler.Register)
    api.Post("/login", authHandler.Login)
    api.Post("/google-login", authHandler.GoogleLogin)
    api.Post("/forgot-password", authHandler.ForgotPassword)
    api.Post("/reset-password", authHandler.ResetPassword)

    // Payment Routes
    api.Post("/payment/request", middleware.Protected(), paymentHandler.RequestPayment)
    api.Get("/payment/verify", paymentHandler.VerifyPayment)

    // User & Team Routes (Protected)
    api.Get("/me", middleware.Protected(), authHandler.GetMe)
    api.Post("/team/create", middleware.Protected(), authHandler.CreateTeam)
    api.Post("/team/invite", middleware.Protected(), authHandler.InviteUser)
    api.Get("/team/members", middleware.Protected(), authHandler.GetTeamMembers)

    // Protected Link Routes
    api.Post("/links", middleware.Protected(), linkHandler.CreateShortLink)
    api.Post("/links/bulk", middleware.Protected(), linkHandler.BulkCreateLinks)
    api.Get("/links", middleware.Protected(), linkHandler.GetUserLinks)
    api.Get("/links/analytics", middleware.Protected(), linkHandler.GetAnalytics)
    api.Get("/links/stats", middleware.Protected(), linkHandler.GetClickStats)
    api.Delete("/links/:id", middleware.Protected(), linkHandler.DeleteLink)

    // Protected Domain Routes
    api.Post("/domains", middleware.Protected(), domainHandler.CreateDomain)
    api.Get("/domains", middleware.Protected(), domainHandler.GetUserDomains)
    api.Delete("/domains/:id", middleware.Protected(), domainHandler.DeleteDomain)

    // Protected Bio Routes
    api.Get("/bio", middleware.Protected(), bioHandler.GetMyBio)
    api.Put("/bio", middleware.Protected(), bioHandler.UpdateBio)
    api.Post("/bio/links", middleware.Protected(), bioHandler.AddBioLink)
    api.Delete("/bio/links/:id", middleware.Protected(), bioHandler.DeleteBioLink)

    // Public Bio Routes
    api.Get("/bio/:slug", bioHandler.GetPublicBio)
    api.Post("/bio/links/track/:id", bioHandler.TrackBioLink)

    // Webhooks Routes (Protected)
    api.Post("/webhooks", middleware.Protected(), webhookHandler.CreateWebhook)
    api.Get("/webhooks", middleware.Protected(), webhookHandler.GetUserWebhooks)
    api.Delete("/webhooks/:id", middleware.Protected(), webhookHandler.DeleteWebhook)

    // Public Link Resolution Routes
    api.Get("/links/info/:code", linkHandler.GetLinkInfo)
    api.Post("/links/verify/:code", linkHandler.VerifyLinkPassword)

    log.Printf("Server starting on port %s...", cfg.Port)
    log.Fatal(app.Listen(":" + cfg.Port))
}