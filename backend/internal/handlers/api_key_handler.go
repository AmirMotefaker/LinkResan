package handlers

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
)

type ApiKeyHandler struct {
    apiKeyService services.ApiKeyService
}

func NewApiKeyHandler(apiKeyService services.ApiKeyService) *ApiKeyHandler {
    return &ApiKeyHandler{apiKeyService: apiKeyService}
}

func (h *ApiKeyHandler) CreateApiKey(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)

    var req struct {
        Name string `json:"name"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
    }

    apiKey, err := h.apiKeyService.CreateApiKey(uint(userID), req.Name)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create API key"})
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{"api_key": apiKey})
}

func (h *ApiKeyHandler) GetApiKeys(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    keys, err := h.apiKeyService.GetApiKeys(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch API keys"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"api_keys": keys})
}

func (h *ApiKeyHandler) DeleteApiKey(c *fiber.Ctx) error {
    apiKeyID, err := c.ParamsInt("id")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid API Key ID"})
    }
    userID := c.Locals("user_id").(float64)

    err = h.apiKeyService.DeleteApiKey(uint(userID), uint(apiKeyID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete API key"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "API Key deleted successfully"})
}