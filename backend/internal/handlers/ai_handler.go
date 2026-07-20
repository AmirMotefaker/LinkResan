package handlers

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
)

type AIHandler struct {
    aiService services.AIService
}

func NewAIHandler(aiService services.AIService) *AIHandler {
    return &AIHandler{aiService: aiService}
}

func (h *AIHandler) SuggestSlug(c *fiber.Ctx) error {
    var req struct {
        URL string `json:"url"`
    }
    if err := c.BodyParser(&req); err != nil || req.URL == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "URL is required"})
    }

    slug, err := h.aiService.SuggestSlug(req.URL)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "AI service unavailable"})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"slug": slug})
}