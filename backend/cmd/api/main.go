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
        AllowHeaders: "Origin, Content-Type, Accept, Authorization, X-API-Key",
        AllowMethods: "GET, POST, HEAD, PUT, DELETE, PATCH",
    }))

    // --- Repositories ---
    linkRepo := repositories.NewLinkRepository(database.DB)
    userRepo := repositories.NewUserRepository(database.DB)
    domainRepo := repositories.NewDomainRepository(database.DB)
    bioRepo := repositories.NewBioRepository(database.DB)
    paymentRepo := repositories.NewPaymentRepository(database.DB)
    webhookRepo := repositories.NewWebhookRepository(database.DB)
    apiKeyRepo := repositories.NewApiKeyRepository(database.DB)

    // --- Services ---
    webhookService := services.NewWebhookService(webhookRepo)
    linkService := services.NewLinkService(linkRepo, domainRepo, rdb, webhookService)
    authService := services.NewAuthService(userRepo, cfg)
    domainService := services.NewDomainService(domainRepo)
    bioService := services.NewBioService(bioRepo)
    paymentService := services.NewPaymentService(paymentRepo, cfg)
    apiKeyService := services.NewApiKeyService(apiKeyRepo)
    cronService := services.NewCronService(linkRepo, userRepo)
    cronService.Start()

    // --- Handlers ---
    linkHandler := handlers.NewLinkHandler(linkService, authService)
    authHandler := handlers.NewAuthHandler(authService)
    domainHandler := handlers.NewDomainHandler(domainService, authService)
    bioHandler := handlers.NewBioHandler(bioService)
    paymentHandler := handlers.NewPaymentHandler(paymentService, authService)
    webhookHandler := handlers.NewWebhookHandler(webhookService)
    apiKeyHandler := handlers.NewApiKeyHandler(apiKeyService)
    docsHandler := handlers.NewDocsHandler() // اضافه شد

    // --- Routes ---
    api := app.Group("/api")

    api.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"status": "success", "message": "LinkResan API is running perfectly!"})
    })

    // API Documentation Routes (Swagger)
    app.Get("/docs", docsHandler.SwaggerUI)
    api.Get("/docs/openapi.json", docsHandler.GetOpenAPISpec)

    // Auth & Password Reset Routes
    api.Post("/register", authHandler.Register)
    api.Post("/login", authHandler.Login)
    api.Post("/google-login", authHandler.GoogleLogin)
    api.Post("/forgot-password", authHandler.ForgotPassword)
    api.Post("/reset-password", authHandler.ResetPassword)

    // Payment Routes
    api.Post("/payment/request", middleware.Protected(authService, apiKeyService), paymentHandler.RequestPayment)
    api.Get("/payment/verify", paymentHandler.VerifyPayment)

    // User & Team Routes (Protected)
    api.Get("/me", middleware.Protected(authService, apiKeyService), authHandler.GetMe)
    api.Post("/team/create", middleware.Protected(authService, apiKeyService), authHandler.CreateTeam)
    api.Post("/team/invite", middleware.Protected(authService, apiKeyService), authHandler.InviteUser)
    api.Get("/team/members", middleware.Protected(authService, apiKeyService), authHandler.GetTeamMembers)

    // Protected Link Routes
    api.Post("/links", middleware.Protected(authService, apiKeyService), linkHandler.CreateShortLink)
    api.Post("/links/bulk", middleware.Protected(authService, apiKeyService), linkHandler.BulkCreateLinks)
    api.Get("/links", middleware.Protected(authService, apiKeyService), linkHandler.GetUserLinks)
    api.Get("/links/analytics", middleware.Protected(authService, apiKeyService), linkHandler.GetAnalytics)
    api.Get("/links/stats", middleware.Protected(authService, apiKeyService), linkHandler.GetClickStats)
    api.Delete("/links/:id", middleware.Protected(authService, apiKeyService), linkHandler.DeleteLink)

    // Protected Domain Routes
    api.Post("/domains", middleware.Protected(authService, apiKeyService), domainHandler.CreateDomain)
    api.Get("/domains", middleware.Protected(authService, apiKeyService), domainHandler.GetUserDomains)
    api.Delete("/domains/:id", middleware.Protected(authService, apiKeyService), domainHandler.DeleteDomain)

    // Protected Bio Routes
    api.Get("/bio", middleware.Protected(authService, apiKeyService), bioHandler.GetMyBio)
    api.Put("/bio", middleware.Protected(authService, apiKeyService), bioHandler.UpdateBio)
    api.Post("/bio/links", middleware.Protected(authService, apiKeyService), bioHandler.AddBioLink)
    api.Delete("/bio/links/:id", middleware.Protected(authService, apiKeyService), bioHandler.DeleteBioLink)

    // Public Bio Routes
    api.Get("/bio/:slug", bioHandler.GetPublicBio)
    api.Post("/bio/links/track/:id", bioHandler.TrackBioLink)

    // Webhooks Routes (Protected)
    api.Post("/webhooks", middleware.Protected(authService, apiKeyService), webhookHandler.CreateWebhook)
    api.Get("/webhooks", middleware.Protected(authService, apiKeyService), webhookHandler.GetUserWebhooks)
    api.Delete("/webhooks/:id", middleware.Protected(authService, apiKeyService), webhookHandler.DeleteWebhook)

    // API Keys Routes (Protected)
    api.Post("/api-keys", middleware.Protected(authService, apiKeyService), apiKeyHandler.CreateApiKey)
    api.Get("/api-keys", middleware.Protected(authService, apiKeyService), apiKeyHandler.GetApiKeys)
    api.Delete("/api-keys/:id", middleware.Protected(authService, apiKeyService), apiKeyHandler.DeleteApiKey)

    // Public Link Resolution Routes
    api.Get("/links/info/:code", linkHandler.GetLinkInfo)
    api.Post("/links/verify/:code", linkHandler.VerifyLinkPassword)

    log.Printf("Server starting on port %s...", cfg.Port)
    log.Fatal(app.Listen(":" + cfg.Port))
}