package handlers

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
)

type AuthHandler struct {
    authService services.AuthService
}

func NewAuthHandler(authService services.AuthService) *AuthHandler {
    return &AuthHandler{authService: authService}
}

type RegisterRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

func (h *AuthHandler) Register(c *fiber.Ctx) error {
    var req RegisterRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
    }

    if req.Email == "" || req.Password == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Email and password are required"})
    }

    user, err := h.authService.Register(req.Email, req.Password)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "message": "User registered successfully",
        "user_id": user.ID,
        "email":   user.Email,
    })
}

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

func (h *AuthHandler) Login(c *fiber.Ctx) error {
    var req LoginRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
    }

    token, user, err := h.authService.Login(req.Email, req.Password)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
    }

    // اضافه شدن is_premium
    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message":   "Login successful",
        "token":     token,
        "is_premium": user.IsPremium,
    })
}

type GoogleLoginRequest struct {
    Credential string `json:"credential"`
}

func (h *AuthHandler) GoogleLogin(c *fiber.Ctx) error {
    var req GoogleLoginRequest
    if err := c.BodyParser(&req); err != nil || req.Credential == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
    }

    token, user, err := h.authService.GoogleLogin(req.Credential)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
    }

    // اضافه شدن is_premium
    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message":   "Login successful",
        "token":     token,
        "is_premium": user.IsPremium,
    })
}