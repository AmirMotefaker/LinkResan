package handlers

import (
    "strings"
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
    "golang.org/x/crypto/bcrypt"
)

type LinkHandler struct {
    linkService services.LinkService
    authService services.AuthService // اضافه شد
}

// تغییر کرد: authService تزریق شد
func NewLinkHandler(linkService services.LinkService, authService services.AuthService) *LinkHandler {
    return &LinkHandler{linkService: linkService, authService: authService}
}

type CreateLinkRequest struct {
    OriginalURL string     `json:"original_url"`
    CustomCode  string     `json:"custom_code"`
    ExpiresAt   *time.Time `json:"expires_at"`
    ClickLimit  *int       `json:"click_limit"`
    DomainID    *uint      `json:"domain_id"`
    Password    string     `json:"password"`
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

    // چک کردن وضعیت Pro کاربر
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil || user == nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
    }

    // اعمال محدودیت‌ها برای کاربران رایگان
    if !user.IsPremium {
        if req.ExpiresAt != nil || req.ClickLimit != nil || req.Password != "" || req.DomainID != nil {
            return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "استفاده از تاریخ انقضا، محدودیت کلیک، رمز عبور و دامنه اختصاصی فقط برای پلن Pro فعال است."})
        }
    }

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

func (h *LinkHandler) GetClickStats(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    stats, err := h.linkService.GetClickStats(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch stats"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"stats": stats})
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

func (h *LinkHandler) GetLinkInfo(c *fiber.Ctx) error {
    shortCode := c.Params("code")
    host := c.Hostname()

    link, err := h.linkService.GetLinkByCode(shortCode, host)
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Link not found or expired"})
    }

    go h.linkService.TrackClick(link.ID, c.IP(), c.Get("User-Agent"), c.Get("Referer"))

    if link.PasswordHash != nil {
        return c.Status(fiber.StatusOK).JSON(fiber.Map{"requires_password": true})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "requires_password": false,
        "original_url":      link.OriginalURL,
    })
}

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

    if bcrypt.CompareHashAndPassword([]byte(*link.PasswordHash), []byte(req.Password)) != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "رمز عبور اشتباه است"})
    }

    _ = strings.ToLower
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"original_url": link.OriginalURL})
}