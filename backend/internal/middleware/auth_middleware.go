package middleware

import (
    "strings"

    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("linkresan_super_secret_key_2024")

func Protected() fiber.Handler {
    return func(c *fiber.Ctx) error {
        authHeader := c.Get("Authorization")
        if authHeader == "" {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing authorization header"})
        }

        tokenString := strings.Split(authHeader, " ")
        if len(tokenString) != 2 || tokenString[0] != "Bearer" {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid authorization format"})
        }

        token, err := jwt.Parse(tokenString[1], func(token *jwt.Token) (interface{}, error) {
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fiber.ErrUnauthorized
            }
            return jwtKey, nil
        })

        if err != nil || !token.Valid {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
        }

        claims, ok := token.Claims.(jwt.MapClaims)
        if ok {
            c.Locals("user_id", claims["user_id"])
            c.Locals("email", claims["email"]) // اضافه شد
        }

        return c.Next()
    }
}