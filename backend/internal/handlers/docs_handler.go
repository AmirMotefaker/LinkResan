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

// Swagger UI HTML (طراحی مجدد و زیباسازی شده)
func (h *DocsHandler) SwaggerUI(c *fiber.Ctx) error {
    html := `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>مستندات API لینک رسان</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; font-family: 'Vazirmatn', sans-serif; background-color: #f9fafb; }
    
    /* هدر برند لینک رسان */
    .lr-header { 
      background: linear-gradient(to right, #2563eb, #4f46e5); 
      padding: 1.5rem 2rem; 
      display: flex; 
      align-items: center; 
      justify-content: space-between;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .lr-header h1 { color: white; font-size: 1.5rem; margin: 0; display: flex; align-items: center; gap: 0.5rem; }
    .lr-header a { color: #bfdbfe; font-size: 0.875rem; text-decoration: none; transition: color 0.2s; }
    .lr-header a:hover { color: white; }

    /* تنظیمات Swagger UI */
    .swagger-ui { padding: 2rem; }
    .swagger-ui .topbar { display: none; } /* مخفی کردن هدر پیش‌فرض */
    .swagger-ui .info { margin: 2rem 0; }
    .swagger-ui .opblock.opblock-post { background: rgba(37, 99, 235, 0.1); border-color: #2563eb; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .swagger-ui .opblock.opblock-get { background: rgba(34, 197, 94, 0.1); border-color: #22c55e; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .swagger-ui .btn.authorize { background-color: #2563eb; color: white; border: 2px solid #2563eb; font-family: 'Vazirmatn', sans-serif; }
    .swagger-ui .btn.authorize svg { fill: white; }
    .swagger-ui .btn.try-out__btn { background-color: #f3f4f6; color: #374151; border-color: #d1d5db; }
  </style>
</head>
<body>
  <div class="lr-header">
    <h1>🔗 مستندات API لینک رسان</h1>
    <a href="https://linkresan.ir">بازگشت به سایت</a>
  </div>
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