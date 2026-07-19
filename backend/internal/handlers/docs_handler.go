package handlers

import (
    "github.com/gofiber/fiber/v2"
)

type DocsHandler struct{}

func NewDocsHandler() *DocsHandler {
    return &DocsHandler{}
}

// OpenAPI YAML/JSON Spec
func (h *DocsHandler) GetOpenAPISpec(c *fiber.Ctx) error {
    spec := fiber.Map{
        "openapi": "3.0.0",
        "info": fiber.Map{
            "title":       "LinkResan API",
            "description": "پلتفرم کوتاه‌کننده لینک حرفه‌ای برای کاربران ایرانی.",
            "version":     "1.0.0",
        },
        "servers": []fiber.Map{
            {"url": "https://linkresan-api.onrender.com", "description": "Production Server"},
        },
        "components": fiber.Map{
            "securitySchemes": fiber.Map{
                "ApiKeyAuth": fiber.Map{
                    "type":        "apiKey",
                    "in":          "header",
                    "name":        "X-API-Key",
                    "description": "کلید API شما با پیشوند lr_",
                },
                "BearerAuth": fiber.Map{
                    "type":        "http",
                    "scheme":      "bearer",
                    "bearerFormat": "JWT",
                    "description": "توکن JWT دریافت شده از ورود",
                },
            },
        },
        "paths": fiber.Map{
            "/api/links": fiber.Map{
                "post": fiber.Map{
                    "summary": "ساخت لینک کوتاه جدید",
                    "security": []fiber.Map{{"ApiKeyAuth": fiber.Map{}}, {"BearerAuth": fiber.Map{}}},
                    "requestBody": fiber.Map{
                        "required": true,
                        "content": fiber.Map{
                            "application/json": fiber.Map{
                                "schema": fiber.Map{
                                    "type": "object",
                                    "properties": fiber.Map{
                                        "original_url": fiber.Map{"type": "string", "example": "https://example.com/long-url"},
                                        "custom_code":  fiber.Map{"type": "string", "example": "my-link"},
                                    },
                                },
                            },
                        },
                    },
                    "responses": fiber.Map{
                        "201": fiber.Map{"description": "لینک ساخته شد"},
                        "401": fiber.Map{"description": "احراز هویت ناموفق"},
                    },
                },
                "get": fiber.Map{
                    "summary": "دریافت لیست لینک‌های کاربر",
                    "security": []fiber.Map{{"ApiKeyAuth": fiber.Map{}}, {"BearerAuth": fiber.Map{}}},
                    "responses": fiber.Map{
                        "200": fiber.Map{"description": "لیست لینک‌ها"},
                    },
                },
            },
            "/api/links/analytics": fiber.Map{
                "get": fiber.Map{
                    "summary": "دریافت آمار کلیک‌های ۷ روز اخیر",
                    "security": []fiber.Map{{"ApiKeyAuth": fiber.Map{}}, {"BearerAuth": fiber.Map{}}},
                    "responses": fiber.Map{
                        "200": fiber.Map{"description": "آمار هفتگی"},
                    },
                },
            },
        },
    }
    return c.JSON(spec)
}

// Swagger UI HTML
func (h *DocsHandler) SwaggerUI(c *fiber.Ctx) error {
    html := `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="LinkResan API Documentation" />
  <title>LinkResan API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
    body { margin: 0; }
    .topbar { background-color: #2563eb; }
    .topbar-wrapper a { color: #fff; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/api/docs/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis],
        layout: "BaseLayout",
      });
    };
  </script>
</body>
</html>
    `
    c.Set("Content-Type", "text/html")
    return c.SendString(html)
}