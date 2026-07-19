package handlers

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
)

type WebhookHandler struct {
    webhookService services.WebhookService
}

func NewWebhookHandler(webhookService services.WebhookService) *WebhookHandler {
    return &WebhookHandler{webhookService: webhookService}
}

func (h *WebhookHandler) CreateWebhook(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)

    var req struct {
        URL string `json:"url"`
    }
    if err := c.BodyParser(&req); err != nil || req.URL == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "URL is required"})
    }

    webhook, err := h.webhookService.CreateWebhook(uint(userID), req.URL)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create webhook"})
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{"webhook": webhook})
}

func (h *WebhookHandler) GetUserWebhooks(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    webhooks, err := h.webhookService.GetUserWebhooks(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch webhooks"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"webhooks": webhooks})
}

func (h *WebhookHandler) DeleteWebhook(c *fiber.Ctx) error {
    webhookID, err := c.ParamsInt("id")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid webhook ID"})
    }
    userID := c.Locals("user_id").(float64)

    err = h.webhookService.DeleteWebhook(uint(userID), uint(webhookID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete webhook"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Webhook deleted successfully"})
}