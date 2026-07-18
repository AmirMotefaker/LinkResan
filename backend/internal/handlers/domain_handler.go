package handlers

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
)

type DomainHandler struct {
    domainService services.DomainService
    authService   services.AuthService // اضافه شد
}

// تغییر کرد: authService تزریق شد
func NewDomainHandler(domainService services.DomainService, authService services.AuthService) *DomainHandler {
    return &DomainHandler{domainService: domainService, authService: authService}
}

type CreateDomainRequest struct {
    Domain string `json:"domain"`
}

func (h *DomainHandler) CreateDomain(c *fiber.Ctx) error {
    var req CreateDomainRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
    }

    userID := c.Locals("user_id").(float64)

    // چک کردن وضعیت Pro کاربر
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil || user == nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
    }

    if !user.IsPremium {
        return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "افزودن دامنه اختصاصی فقط برای پلن Pro فعال است. لطفاً اکانت خود را ارتقا دهید."})
    }

    domain := &models.CustomDomain{
        UserID: uint(userID),
        Domain: req.Domain,
    }

    err = h.domainService.CreateDomain(domain)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Domain already exists or invalid"})
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "message": "Domain added successfully. Please configure DNS.",
        "domain":  domain,
    })
}

func (h *DomainHandler) GetUserDomains(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    domains, err := h.domainService.GetUserDomains(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch domains"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"domains": domains})
}

func (h *DomainHandler) DeleteDomain(c *fiber.Ctx) error {
    domainID, err := c.ParamsInt("id")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid domain ID"})
    }
    userID := c.Locals("user_id").(float64)
    err = h.domainService.DeleteDomain(uint(userID), uint(domainID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete domain"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Domain deleted successfully"})
}