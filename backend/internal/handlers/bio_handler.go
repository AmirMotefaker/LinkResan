package handlers

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
)

type BioHandler struct {
    bioService services.BioService
}

func NewBioHandler(bioService services.BioService) *BioHandler {
    return &BioHandler{bioService: bioService}
}

// Get Bio Page (If not exists, create it)
func (h *BioHandler) GetMyBio(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    email := c.Locals("email").(string) // باید در میدل‌ور ست شده باشد

    page, err := h.bioService.GetOrCreateBio(uint(userID), email)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch bio page"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"bio_page": page})
}

// Update Bio Page Settings (Slug, Title, BioText)
func (h *BioHandler) UpdateBio(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)

    var req struct {
        Slug    string `json:"slug"`
        Title   string `json:"title"`
        BioText string `json:"bio_text"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
    }

    page, err := h.bioService.UpdateBio(uint(userID), req.Slug, req.Title, req.BioText)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"bio_page": page})
}

// Add a new link to Bio Page
func (h *BioHandler) AddBioLink(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)

    var req struct {
        Title string `json:"title"`
        URL   string `json:"url"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
    }

    link, err := h.bioService.AddBioLink(uint(userID), req.Title, req.URL)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(fiber.StatusCreated).JSON(fiber.Map{"link": link})
}

// Delete a link from Bio Page
func (h *BioHandler) DeleteBioLink(c *fiber.Ctx) error {
    linkID, err := c.ParamsInt("id")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid link ID"})
    }

    userID := c.Locals("user_id").(float64)
    err = h.bioService.DeleteBioLink(uint(userID), uint(linkID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete link"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Link deleted successfully"})
}

// Public Route: Get Bio Page by Slug
func (h *BioHandler) GetPublicBio(c *fiber.Ctx) error {
    slug := c.Params("slug")

    page, err := h.bioService.GetPublicBio(slug)
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Bio page not found"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"bio_page": page})
}

// Public Route: Track Bio Link Click
func (h *BioHandler) TrackBioLink(c *fiber.Ctx) error {
    linkID, err := c.ParamsInt("id")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
    }
    
    err = h.bioService.TrackBioLinkClick(uint(linkID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to track"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Tracked"})
}