package handlers

import (
    "encoding/csv"
    "io"
    "strings"
    "time"

    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
    "golang.org/x/crypto/bcrypt"
)

type LinkHandler struct {
    linkService services.LinkService
    authService services.AuthService
}

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

    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil || user == nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
    }

    if !user.IsPremium {
        if req.ExpiresAt != nil || req.ClickLimit != nil || req.Password != "" || req.DomainID != nil {
            return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "استفاده از تاریخ انقضا، محدودیت کلیک، رمز عبور و دامنه اختصاصی فقط برای پلن Pro فعال است."})
        }
    }

    // اگر کاربر در تیم بود، لینک به نام مدیر تیم ثبت شود
    targetUserID := uint(userID)
    if user.TeamID != nil && *user.TeamID != user.ID {
        targetUserID = *user.TeamID
    }

    link, err := h.linkService.CreateShortLink(targetUserID, req.OriginalURL, req.CustomCode, req.Password, req.ExpiresAt, req.ClickLimit, req.DomainID)
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

func (h *LinkHandler) BulkCreateLinks(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
    }

    // اگر کاربر در تیم بود، لینک‌ها به نام مدیر تیم ثبت شود
    targetUserID := uint(userID)
    if user.TeamID != nil && *user.TeamID != user.ID {
        targetUserID = *user.TeamID
    }

    file, err := c.FormFile("file")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "فایل CSV آپلود نشده است"})
    }

    src, err := file.Open()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "خطا در باز کردن فایل"})
    }
    defer src.Close()

    reader := csv.NewReader(src)
    records, err := reader.ReadAll()
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "فرمت فایل CSV نامعتبر است"})
    }

    var urls []string
    for _, record := range records {
        if len(record) > 0 {
            url := strings.TrimSpace(record[0])
            if url != "" && strings.ToLower(url) != "url" && strings.ToLower(url) != "link" {
                urls = append(urls, url)
            }
        }
    }

    if len(urls) == 0 {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "هیچ لینکی در فایل یافت نشد"})
    }

    if len(urls) > 100 {
        urls = urls[:100]
    }

    links, err := h.linkService.BulkCreateShortLinks(targetUserID, urls)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    c.Set("Content-Type", "text/csv")
    c.Set("Content-Disposition", "attachment; filename=shortened_links.csv")

    output := "Original URL,Short URL\n"
    for _, link := range links {
        output += link.OriginalURL + ",https://linkresan.ir/" + link.ShortCode + "\n"
    }

    return c.Status(fiber.StatusOK).SendString(output)
}

func (h *LinkHandler) GetUserLinks(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
    }

    // اگر کاربر در تیم بود، لینک‌های مدیر تیم را ببیند
    targetUserID := uint(userID)
    if user.TeamID != nil && *user.TeamID != user.ID {
        targetUserID = *user.TeamID
    }

    links, err := h.linkService.GetUserLinks(targetUserID)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch links"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"links": links, "count": len(links)})
}

func (h *LinkHandler) GetAnalytics(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
    }

    targetUserID := uint(userID)
    if user.TeamID != nil && *user.TeamID != user.ID {
        targetUserID = *user.TeamID
    }

    data, err := h.linkService.GetAnalytics(targetUserID)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch analytics"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"analytics": data})
}

func (h *LinkHandler) GetClickStats(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
    }

    targetUserID := uint(userID)
    if user.TeamID != nil && *user.TeamID != user.ID {
        targetUserID = *user.TeamID
    }

    stats, err := h.linkService.GetClickStats(targetUserID)
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

    // گرفتن UserID مالک لینک برای وب‌هوک
    userID := uint(0)
    if link.UserID != nil {
        userID = *link.UserID
    }

    go h.linkService.TrackClick(link.ID, userID, c.IP(), c.Get("User-Agent"), c.Get("Referer"))

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
    _ = io.EOF
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"original_url": link.OriginalURL})
}