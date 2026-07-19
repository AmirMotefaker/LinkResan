package middleware

import (
    "strings"

    "github.com/AmirMotefaker/LinkResan/backend/internal/services"
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("linkresan_super_secret_key_2024")

// آپدیت شد: apiKeyService برای بررسی کلیدهای API اضافه شد
func Protected(authService services.AuthService, apiKeyService services.ApiKeyService) fiber.Handler {
    return func(c *fiber.Ctx) error {
        // ۱. ابتدا بررسی توکن JWT (برای کاربران مرورگر)
        authHeader := c.Get("Authorization")
        if authHeader != "" {
            tokenString := strings.Split(authHeader, " ")
            if len(tokenString) == 2 && tokenString[0] == "Bearer" {
                token, err := jwt.Parse(tokenString[1], func(token *jwt.Token) (interface{}, error) {
                    if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                        return nil, fiber.ErrUnauthorized
                    }
                    return jwtKey, nil
                })

                if err == nil && token.Valid {
                    claims, ok := token.Claims.(jwt.MapClaims)
                    if ok {
                        c.Locals("user_id", claims["user_id"])
                        c.Locals("email", claims["email"])
                        return c.Next()
                    }
                }
            }
        }

        // ۲. اگر توکن نبود، بررسی کلید API (برای توسعه‌دهندگان)
        apiKey := c.Get("X-API-Key")
        if apiKey != "" {
            userID, err := apiKeyService.ValidateApiKey(apiKey)
            if err == nil {
                c.Locals("user_id", float64(userID))
                return c.Next()
            }
        }

        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized. Provide JWT or API Key."})
    }
}