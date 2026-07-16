package handlers

import (
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
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

    link, err := h.linkService.CreateShortLink(uint(userID), req.OriginalURL, req.CustomCode, req.ExpiresAt, req.ClickLimit)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "original_url": link.OriginalURL,
        "short_code":   link.ShortCode,
        "short_url":    "https://linkresan.ir/" + link.ShortCode,
    })
}

func (h *LinkHandler) GetUserLinks(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)

    links, err := h.linkService.GetUserLinks(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch links"})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "links": links,
        "count": len(links),
    })
}

// هندلر جدید برای گرفتن آمار نمودار
func (h *LinkHandler) GetAnalytics(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)

    data, err := h.linkService.GetAnalytics(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch analytics"})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "analytics": data,
    })
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

func (h *LinkHandler) ResolveShortLink(c *fiber.Ctx) error {
    shortCode := c.Params("code")

    ipAddress := c.IP()
    userAgent := c.Get("User-Agent")
    referrer := c.Get("Referer")

    link, err := h.linkService.ResolveShortLink(shortCode, ipAddress, userAgent, referrer)
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "Link not found, expired, or reached click limit",
        })
    }

    // هدرهای ضد کش برای ثبت دقیق آمار
    c.Set("Cache-Control", "no-cache, no-store, must-revalidate")
    c.Set("Pragma", "no-cache")
    c.Set("Expires", "0")

    return c.Redirect(link.OriginalURL, fiber.StatusFound)
}