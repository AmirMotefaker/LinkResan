package handlers

import (
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
    OriginalURL string `json:"original_url"`
}

func (h *LinkHandler) CreateShortLink(c *fiber.Ctx) error {
    var req CreateLinkRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
    }

    if req.OriginalURL == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "original_url is required"})
    }

    // استخراج user_id از توکن (که در میدل‌ور ست شده است)
    userID := c.Locals("user_id").(float64) // JWT پیش‌فرض اعداد را float64 برمی‌گرداند

    // ارسال user_id به سرویس برای ساخت لینک
    link, err := h.linkService.CreateShortLink(uint(userID), req.OriginalURL)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create short link"})
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "original_url": link.OriginalURL,
        "short_code":   link.ShortCode,
        "short_url":    "http://localhost:8080/" + link.ShortCode,
    })
}

// هندلر داشبورد: گرفتن تمام لینک‌های کاربر
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

func (h *LinkHandler) ResolveShortLink(c *fiber.Ctx) error {
    shortCode := c.Params("code")

    ipAddress := c.IP()
    userAgent := c.Get("User-Agent")
    referrer := c.Get("Referer")

    link, err := h.linkService.ResolveShortLink(shortCode, ipAddress, userAgent, referrer)
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Link not found or expired"})
    }

    return c.Redirect(link.OriginalURL, fiber.StatusMovedPermanently)
}