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

    token, user, err := h.authService.Login(req.Email, req.Password, c.IP())
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message":    "Login successful",
        "token":      token,
        "is_premium": user.IsPremium,
        "is_admin":   user.IsAdmin,
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

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message":    "Login successful",
        "token":      token,
        "is_premium": user.IsPremium,
        "is_admin":   user.IsAdmin,
    })
}

func (h *AuthHandler) ForgotPassword(c *fiber.Ctx) error {
    var req struct {
        Email string `json:"email"`
    }
    if err := c.BodyParser(&req); err != nil || req.Email == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "ایمیل الزامی است"})
    }

    err := h.authService.RequestPasswordReset(req.Email)
    if err != nil {
        // برگرداندن متن دقیق ارور برای دیباگ
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "اگر ایمیل معتبر باشد، لینک بازنشانی برای شما ارسال شد."})
}

func (h *AuthHandler) ResetPassword(c *fiber.Ctx) error {
    var req struct {
        Token    string `json:"token"`
        Password string `json:"password"`
    }
    if err := c.BodyParser(&req); err != nil || req.Token == "" || req.Password == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "توکن و رمز عبور الزامی است"})
    }

    err := h.authService.ResetPassword(req.Token, req.Password)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "رمز عبور با موفقیت تغییر کرد."})
}

func (h *AuthHandler) GetMe(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "id":         user.ID,
        "email":      user.Email,
        "name":       user.Name,
        "avatar_url": user.AvatarURL,
        "is_premium": user.IsPremium,
        "is_admin":   user.IsAdmin,
        "team_id":    user.TeamID,
    })
}

func (h *AuthHandler) UpdateProfile(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)

    var req struct {
        Name      string `json:"name"`
        AvatarURL string `json:"avatar_url"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
    }

    err := h.authService.UpdateProfile(uint(userID), req.Name, req.AvatarURL)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update profile"})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Profile updated successfully"})
}

func (h *AuthHandler) ChangePassword(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)

    var req struct {
        OldPassword string `json:"old_password"`
        NewPassword string `json:"new_password"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
    }

    err := h.authService.ChangePassword(uint(userID), req.OldPassword, req.NewPassword)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Password changed successfully"})
}

func (h *AuthHandler) CreateTeam(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    err := h.authService.CreateTeam(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "تیم با موفقیت ساخته شد"})
}

func (h *AuthHandler) InviteUser(c *fiber.Ctx) error {
    inviterID := c.Locals("user_id").(float64)
    var req struct {
        Email string `json:"email"`
    }
    if err := c.BodyParser(&req); err != nil || req.Email == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "ایمیل الزامی است"})
    }

    err := h.authService.InviteUserToTeam(uint(inviterID), req.Email)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "کاربر با موفقیت به تیم اضافه شد"})
}

func (h *AuthHandler) GetTeamMembers(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    members, err := h.authService.GetTeamMembers(uint(userID))
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"members": members})
}

// هندلرهای ادمین
func (h *AuthHandler) GetAdminStats(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil || !user.IsAdmin {
        return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Access denied"})
    }

    stats, err := h.authService.GetAdminStats()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch stats"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"stats": stats})
}

func (h *AuthHandler) GetAllUsers(c *fiber.Ctx) error {
    userID := c.Locals("user_id").(float64)
    user, err := h.authService.GetUserByID(uint(userID))
    if err != nil || !user.IsAdmin {
        return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Access denied"})
    }

    users, err := h.authService.GetAllUsers()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch users"})
    }
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"users": users})
}