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
    paymentRepo := repositories.NewPaymentRepository(database.DB) // اضافه شد

    // --- Services ---
    linkService := services.NewLinkService(linkRepo, domainRepo, rdb)
    authService := services.NewAuthService(userRepo)
    domainService := services.NewDomainService(domainRepo)
    bioService := services.NewBioService(bioRepo)
    paymentService := services.NewPaymentService(paymentRepo, cfg) // اضافه شد

    // --- Handlers ---
    linkHandler := handlers.NewLinkHandler(linkService, authService) // آپدیت شد
    authHandler := handlers.NewAuthHandler(authService)
    domainHandler := handlers.NewDomainHandler(domainService, authService) // آپدیت شد
    bioHandler := handlers.NewBioHandler(bioService)
    paymentHandler := handlers.NewPaymentHandler(paymentService, authService)

    // --- Routes ---
    api := app.Group("/api")

    api.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"status": "success", "message": "LinkResan API is running perfectly!"})
    })

    api.Post("/register", authHandler.Register)
    api.Post("/login", authHandler.Login)
    api.Post("/google-login", authHandler.GoogleLogin)

    // Payment Routes
    api.Post("/payment/request", middleware.Protected(), paymentHandler.RequestPayment)
    api.Get("/payment/verify", paymentHandler.VerifyPayment)

    // Protected Link Routes
    api.Post("/links", middleware.Protected(), linkHandler.CreateShortLink)
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

    log.Printf("Server starting on port %s...", cfg.Port)
    log.Fatal(app.Listen(":" + cfg.Port))
}