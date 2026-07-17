package handlers

import (
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
    "golang.org/x/crypto/bcrypt"
)

type LinkHandler struct {
    linkService services.LinkService
}

func NewLinkHandler(linkService services.LinkService) *LinkHandler {
    return &LinkHandler{linkService: linkService}
}

type CreateLinkRequest struct {
    OriginalURL string     `json:"original_url"`
    CustomCode  string     `json:"custom_code"`
    ExpiresAt   *time.Time `json:"expires_at"`
    ClickLimit  *int       `json:"click_limit"`
    DomainID    *uint      `json:"domain_id"`
    Password    string     `json:"password"` // اضافه شد
}

func (h *LinkHandler) CreateShortLink(c *fiber.Ctx) error {
    var req CreateLinkRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
    }

    if req.OriginalURL == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "original_url is required"})
    }

    userID := c.Locals("user_id").(float64)
    baseURL := "https://linkresan.ir"

    link, err := h.linkService.CreateShortLink(uint(userID), req.OriginalURL, req.CustomCode, req.Password, req.ExpiresAt, req.ClickLimit, req.DomainID)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "original_url": link.OriginalURL,
        "short_code":   link.ShortCode,
        "short_url":    baseURL + "/" + link.ShortCode,
        "domain_id":    link.DomainID,
    })
}

func (h *LinkHandler) GetUserLinks(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    links, err := h.linkService.GetUserLinks(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch links"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"links": links, "count": len(links)})
}

func (h *LinkHandler) GetAnalytics(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    data, err := h.linkService.GetAnalytics(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch analytics"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"analytics": data})
}

func (h *LinkHandler) DeleteLink(c *fiber.Ctx) error {
    linkID, err := c.ParamsInt("id")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid link ID"})
    }
    userID := c.Locals("user_id").(float64)
    err = h.linkService.DeleteLink(uint(userID), uint(linkID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete link"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Link deleted successfully"})
}

// هندلر جدید: بررسی اطلاعات لینک (آیا رمز دارد؟)
func (h *LinkHandler) GetLinkInfo(c *fiber.Ctx) error {
    shortCode := c.Params("code")
    host := c.Hostname()

    link, err := h.linkService.GetLinkByCode(shortCode, host)
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Link not found or expired"})
    }

    // ثبت آمار کلیک به صورت ناهمگام
    go h.linkService.TrackClick(link.ID, c.IP(), c.Get("User-Agent"), c.Get("Referer"))

    // اگر لینک رمز داشت
    if link.PasswordHash != nil {
        return c.Status(fiber.StatusOK).JSON(fiber.Map{"requires_password": true})
    }

    // اگر رمز نداشت، لینک اصلی را بفرست
    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "requires_password": false,
        "original_url":      link.OriginalURL,
    })
}

// هندلر جدید: بررسی رمز عبور
func (h *LinkHandler) VerifyLinkPassword(c *fiber.Ctx) error {
    shortCode := c.Params("code")
    host := c.Hostname()

    var req struct {
        Password string `json:"password"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
    }

    link, err := h.linkService.GetLinkByCode(shortCode, host)
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Link not found"})
    }

    if link.PasswordHash == nil {
        return c.Status(fiber.StatusOK).JSON(fiber.Map{"original_url": link.OriginalURL})
    }

    // مقایسه رمز وارد شده با هش دیتابیس
    if bcrypt.CompareHashAndPassword([]byte(*link.PasswordHash), []byte(req.Password)) != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "رمز عبور اشتباه است"})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"original_url": link.OriginalURL})
}