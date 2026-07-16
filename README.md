<div align="center">

<img
src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:DB2777&height=230&section=header&text=LinkResan&fontSize=72&fontColor=FFFFFF&animation=fadeIn&fontAlignY=35&desc=Fast%20%C2%B7%20Open-Source%20%C2%B7%20Persian-First%20URL%20Shortener&descAlignY=57&descSize=18"
width="100%"
alt="LinkResan — Persian-first open-source URL shortener"
/>

<h1>🔗 لینک‌رسان | LinkResan</h1>

<p>
  کوتاه‌کننده لینک Full-Stack، متن‌باز و فارسی‌محور؛ ساخته‌شده با
  <strong>Go</strong>، <strong>Next.js</strong>، <strong>PostgreSQL</strong> و <strong>Redis</strong>.
</p>

<p>
  <a href="https://linkresan.ir"><strong>مشاهده نسخه آنلاین</strong></a>
  ·
  <a href="#api-reference"><strong>مستندات API</strong></a>
  ·
  <a href="#roadmap"><strong>نقشه راه</strong></a>
  ·
  <a href="https://github.com/AmirMotefaker/LinkResan/issues"><strong>گزارش مشکل</strong></a>
</p>

<p>
  <a href="https://github.com/AmirMotefaker/LinkResan/releases">
    <img src="https://img.shields.io/github/v/release/AmirMotefaker/LinkResan?style=for-the-badge&logo=github&label=Release" alt="Latest release"/>
  </a>
  <a href="https://github.com/AmirMotefaker/LinkResan/commits/main">
    <img src="https://img.shields.io/github/last-commit/AmirMotefaker/LinkResan?style=for-the-badge&logo=git&label=Last%20Commit" alt="Last commit"/>
  </a>
  <a href="https://github.com/AmirMotefaker/LinkResan/stargazers">
    <img src="https://img.shields.io/github/stars/AmirMotefaker/LinkResan?style=for-the-badge&logo=github&label=Stars" alt="GitHub stars"/>
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/Go-1.25-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go 1.25"/>
  <img src="https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16.2"/>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=111827" alt="React 19.2"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Redis-Cache-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis"/>
</p>

</div>

---

<a id="table-of-contents"></a>

## فهرست مطالب

* [معرفی](#overview)
* [وضعیت پروژه](#project-status)
* [قابلیت‌ها](#features)
* [معماری](#architecture)
* [تکنولوژی‌ها](#tech-stack)
* [ساختار پروژه](#project-structure)
* [راه‌اندازی محلی](#getting-started)
* [متغیرهای محیطی](#environment-variables)
* [مستندات API](#api-reference)
* [جریان عملکرد](#request-flow)
* [اسکریپت‌ها](#scripts)
* [استقرار](#deployment)
* [نکات امنیتی و محدودیت‌های فعلی](#security-and-limitations)
* [نقشه راه](#roadmap)
* [مشارکت](#contributing)
* [لایسنس](#license)

---

<a id="overview"></a>

## معرفی

**LinkResan** یک سرویس کوتاه‌کننده لینک برای کاربران فارسی‌زبان است که مسیر کامل ساخت، مدیریت و بازکردن لینک کوتاه را در یک پروژه Full-Stack ارائه می‌دهد.

این پروژه از یک معماری لایه‌ای الهام‌گرفته از Clean Architecture استفاده می‌کند:

* رابط کاربری فارسی و RTL با Next.js App Router
* API سریع با Go و Fiber
* ذخیره داده‌ها با PostgreSQL و GORM
* کش لینک‌ها با Redis برای کاهش زمان Resolve
* احراز هویت مبتنی بر JWT و هش رمز عبور با bcrypt
* ثبت غیرهمزمان کلیک‌ها بدون مسدودکردن مسیر Redirect

> [!IMPORTANT]
> LinkResan در وضعیت **MVP فعال** قرار دارد. قابلیت‌های اصلی کوتاه‌سازی، احراز هویت، کش و شمارش کلیک پیاده‌سازی شده‌اند؛ برخی امکانات تحلیلی و مدیریتی هنوز در Roadmap هستند.

---

<a id="project-status"></a>

## وضعیت پروژه

| مورد                | وضعیت                                |
| ------------------- | ------------------------------------ |
| وب‌سایت رسمی        | [linkresan.ir](https://linkresan.ir) |
| آخرین نسخه منتشرشده | `v1.5.0`                             |
| شاخه اصلی           | `main`                               |
| نوع پروژه           | Full-Stack Monorepo                  |
| رابط کاربری         | فارسی، RTL و Responsive              |
| سطح بلوغ            | MVP / Active Development             |
| API                 | REST                                 |
| احراز هویت          | JWT با اعتبار ۲۴ ساعته               |
| Redirect            | `301 Moved Permanently`              |
| کش لینک             | Redis با TTL یک‌ساعته                |

---

<a id="features"></a>

## قابلیت‌ها

### قابلیت‌های پیاده‌سازی‌شده

| قابلیت                 | توضیح                                                          |
| ---------------------- | -------------------------------------------------------------- |
| 🔐 ثبت‌نام و ورود      | ثبت‌نام با ایمیل، هش رمز با bcrypt و صدور JWT                  |
| ✂️ ساخت لینک کوتاه     | تولید Short Code شش‌کاراکتری برای کاربران واردشده              |
| ⚡ Resolve سریع         | خواندن مقصد لینک از Redis و مراجعه به PostgreSQL در Cache Miss |
| 📊 شمارش کلیک          | افزایش `ClickCount` و ثبت اطلاعات پایه کلیک به‌صورت Goroutine  |
| 🗂️ داشبورد کاربر      | نمایش لینک‌های ساخته‌شده و تعداد کلیک هر لینک                  |
| 📋 کپی سریع            | کپی لینک کوتاه در صفحه اصلی و داشبورد                          |
| 🛡️ مسیرهای محافظت‌شده | محافظت از عملیات ساخت و مشاهده لینک‌ها با Bearer Token         |
| 🩺 Health Check        | بررسی سلامت API از مسیر `/api/health`                          |
| 🌐 رابط فارسی          | طراحی RTL با فونت Vazirmatn و Tailwind CSS                     |
| 🗃️ مهاجرت خودکار      | ساخت و به‌روزرسانی جداول با GORM AutoMigrate                   |

### وضعیت امکانات پیشرفته

| قابلیت                           | وضعیت فعلی                                                |
| -------------------------------- | --------------------------------------------------------- |
| نمایش مجموع کلیک‌ها              | ✅ پیاده‌سازی‌شده                                          |
| ذخیره IP، User-Agent و Referrer  | ✅ پیاده‌سازی‌شده                                          |
| تحلیل مرورگر، دستگاه، کشور و شهر | 🟡 فیلدهای دیتابیس آماده‌اند؛ منطق استخراج و UI کامل نیست |
| Custom Alias                     | ⏳ برنامه‌ریزی‌شده                                         |
| تاریخ انقضا                      | ⏳ فیلد مدل موجود است؛ Enforcement پیاده‌سازی نشده         |
| محدودیت کلیک                     | ⏳ فیلد مدل موجود است؛ Enforcement پیاده‌سازی نشده         |
| QR Code                          | ⏳ برنامه‌ریزی‌شده                                         |
| حذف و ویرایش لینک                | ⏳ برنامه‌ریزی‌شده                                         |
| Refresh Token                    | ⏳ برنامه‌ریزی‌شده                                         |
| تست خودکار و CI                  | ⏳ برنامه‌ریزی‌شده                                         |

---

<a id="architecture"></a>

## معماری

```mermaid
flowchart LR
    U["👤 کاربر"] --> F["Next.js 16<br/>React 19 + TypeScript"]
    F -->|"REST /api"| A["Go 1.25<br/>Fiber API"]

    subgraph Backend["Backend Layers"]
        A --> H["Handlers"]
        H --> S["Services"]
        S --> R["Repositories"]
    end

    R --> P[("PostgreSQL")]
    S <--> C[("Redis Cache")]

    S -. "Async click tracking" .-> P

    V["بازدیدکننده لینک کوتاه"] -->|"GET /:code"| A
    A -->|"301 Redirect"| D["Original URL"]
```

### مسئولیت لایه‌ها

| لایه           | مسئولیت                                                 |
| -------------- | ------------------------------------------------------- |
| `handlers`     | دریافت درخواست HTTP، اعتبارسنجی اولیه و تولید پاسخ      |
| `services`     | منطق احراز هویت، تولید کد، Resolve، Cache و ثبت کلیک    |
| `repositories` | دسترسی به داده‌های User، Link و Click با GORM           |
| `middleware`   | اعتبارسنجی Bearer Token و قراردادن `user_id` در Context |
| `database`     | اتصال PostgreSQL و اجرای AutoMigrate                    |
| `cache`        | اتصال TLS به Redis                                      |
| `models`       | تعریف مدل‌های User، Link و Click                        |

---

<a id="tech-stack"></a>

## تکنولوژی‌ها

### Backend

| فناوری            | نسخه / پکیج | کاربرد                   |
| ----------------- | ----------- | ------------------------ |
| Go                | `1.25`      | زبان اصلی Backend        |
| Fiber             | `v2.52.14`  | HTTP framework           |
| GORM              | `v1.31.2`   | ORM و Migration          |
| PostgreSQL Driver | `v1.6.0`    | اتصال GORM به PostgreSQL |
| go-redis          | `v9.21.0`   | Cache و Resolve سریع     |
| golang-jwt        | `v5.3.1`    | تولید و اعتبارسنجی JWT   |
| x/crypto          | `v0.54.0`   | bcrypt                   |
| godotenv          | `v1.5.1`    | بارگذاری `.env`          |

### Frontend

| فناوری            | نسخه               | کاربرد                      |
| ----------------- | ------------------ | --------------------------- |
| Next.js           | `16.2.10`          | App Router و اجرای Frontend |
| React / React DOM | `19.2.4`           | رابط کاربری                 |
| TypeScript        | `5+`               | Type Safety                 |
| Tailwind CSS      | `4.x`              | Styling                     |
| shadcn            | `4.13.0`           | زیرساخت کامپوننت‌های UI     |
| Base UI           | `1.6.0`            | Primitiveهای رابط کاربری    |
| Framer Motion     | `12.42.2`          | زیرساخت Animation           |
| Lucide React      | `1.24.0`           | آیکن‌ها                     |
| Vazirmatn         | `next/font/google` | فونت فارسی و RTL            |
| ESLint            | `9.x`              | بررسی کیفیت کد              |

---

<a id="project-structure"></a>

## ساختار پروژه

```text
LinkResan/
├── backend/
│   ├── cmd/
│   │   └── api/
│   │       └── main.go
│   ├── internal/
│   │   ├── cache/
│   │   │   └── redis.go
│   │   ├── config/
│   │   │   └── config.go
│   │   ├── database/
│   │   │   └── database.go
│   │   ├── handlers/
│   │   │   ├── auth_handler.go
│   │   │   └── link_handler.go
│   │   ├── middleware/
│   │   │   └── auth_middleware.go
│   │   ├── models/
│   │   │   └── models.go
│   │   ├── repositories/
│   │   │   ├── link_repository.go
│   │   │   └── user_repository.go
│   │   └── services/
│   │       ├── auth_service.go
│   │       └── link_service.go
│   ├── go.mod
│   └── go.sum
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── public/
│   ├── components.json
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

---

<a id="getting-started"></a>

## راه‌اندازی محلی

### پیش‌نیازها

* [Go 1.25+](https://go.dev/dl/)
* [Node.js 20.9+](https://nodejs.org/)
* PostgreSQL
* یک Redis Endpoint با TLS؛ مانند Upstash
* Git

> [!NOTE]
> Next.js 16 حداقل به Node.js `20.9` نیاز دارد. Backend نیز در `go.mod` روی Go `1.25` تنظیم شده است.

### ۱. دریافت پروژه

```bash
git clone https://github.com/AmirMotefaker/LinkResan.git
cd LinkResan
```

### ۲. اجرای Backend

```bash
cd backend
go mod download
```

یک فایل `.env` داخل پوشه `backend` بسازید:

```dotenv
DATABASE_URL=postgres://postgres:password@localhost:5432/linkresan_db?sslmode=disable
PORT=8080

# Backend فعلی برای Redis از TLS استفاده می‌کند.
REDIS_ADDR=your-redis-host:6379
REDIS_PASSWORD=your-redis-password
```

سپس API را اجرا کنید:

```bash
go run ./cmd/api
```

خروجی مورد انتظار:

```text
Cloud Database connected successfully!
Database migrated successfully!
Redis connected successfully!
Server starting on port 8080...
```

بررسی سلامت API:

```bash
curl http://localhost:8080/api/health
```

### ۳. اجرای Frontend

در یک Terminal جدید:

```bash
cd frontend
npm ci
```

فایل `frontend/.env.local` را بسازید:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

سپس:

```bash
npm run dev
```

Frontend در آدرس زیر در دسترس خواهد بود:

```text
http://localhost:3000
```

---

<a id="environment-variables"></a>

## متغیرهای محیطی

### Backend — `backend/.env`

| متغیر            |     اجباری    | مقدار نمونه      | توضیح                                |
| ---------------- | :-----------: | ---------------- | ------------------------------------ |
| `DATABASE_URL`   |       ✅       | `postgres://...` | Connection String دیتابیس PostgreSQL |
| `PORT`           |       ❌       | `8080`           | پورت HTTP Server                     |
| `REDIS_ADDR`     |       ✅       | `host:6379`      | آدرس Redis                           |
| `REDIS_PASSWORD` | بسته به سرویس | `secret`         | رمز اتصال Redis                      |

### Frontend — `frontend/.env.local`

| متغیر                 | اجباری | مقدار نمونه                 | توضیح                |
| --------------------- | :----: | --------------------------- | -------------------- |
| `NEXT_PUBLIC_API_URL` |    ✅   | `http://localhost:8080/api` | Base URL مسیرهای API |

> [!WARNING]
> فایل‌های محیطی را Commit نکنید. الگوهای `.env` در `.gitignore` قرار دارند.

---

<a id="api-reference"></a>

## مستندات API

### Base URLs

```text
Local API Root: http://localhost:8080
Local API Group: http://localhost:8080/api
```

### خلاصه Endpointها

| متد    | مسیر            | توضیح                 | احراز هویت |
| ------ | --------------- | --------------------- | :--------: |
| `GET`  | `/api/health`   | بررسی سلامت API       |      ❌     |
| `POST` | `/api/register` | ثبت‌نام کاربر         |      ❌     |
| `POST` | `/api/login`    | ورود و دریافت JWT     |      ❌     |
| `POST` | `/api/links`    | ساخت لینک کوتاه       |      ✅     |
| `GET`  | `/api/links`    | دریافت لینک‌های کاربر |      ✅     |
| `GET`  | `/:code`        | Resolve و Redirect    |      ❌     |

### Health Check

```bash
curl http://localhost:8080/api/health
```

```json
{
  "status": "success",
  "message": "LinkResan API is running perfectly!"
}
```

### ثبت‌نام

```bash
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "strong-password"
  }'
```

پاسخ موفق:

```json
{
  "message": "User registered successfully",
  "user_id": 1,
  "email": "user@example.com"
}
```

### ورود

```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "strong-password"
  }'
```

پاسخ موفق:

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

### ساخت لینک کوتاه

```bash
curl -X POST http://localhost:8080/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "original_url": "https://example.com/a/very/long/url"
  }'
```

پاسخ موفق:

```json
{
  "original_url": "https://example.com/a/very/long/url",
  "short_code": "aB3xY9",
  "short_url": "http://localhost:8080/aB3xY9"
}
```

### دریافت لینک‌های کاربر

```bash
curl http://localhost:8080/api/links \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

پاسخ نمونه:

```json
{
  "links": [
    {
      "ID": 1,
      "OriginalURL": "https://example.com",
      "ShortCode": "aB3xY9",
      "ClickCount": 12,
      "IsActive": true
    }
  ],
  "count": 1
}
```

### Resolve لینک کوتاه

```bash
curl -I http://localhost:8080/aB3xY9
```

در صورت معتبر بودن کد، پاسخ `301 Moved Permanently` به مقصد اصلی برگردانده می‌شود.

---

<a id="request-flow"></a>

## جریان عملکرد

### ساخت لینک

```mermaid
sequenceDiagram
    actor User as کاربر
    participant UI as Next.js UI
    participant API as Fiber API
    participant Auth as JWT Middleware
    participant Service as Link Service
    participant DB as PostgreSQL

    User->>UI: واردکردن URL
    UI->>API: POST /api/links + Bearer Token
    API->>Auth: اعتبارسنجی JWT
    Auth-->>API: user_id
    API->>Service: CreateShortLink
    Service->>Service: تولید کد ۶ کاراکتری
    Service->>DB: ذخیره Link
    DB-->>Service: Link
    Service-->>API: Link
    API-->>UI: short_url
```

### بازکردن لینک کوتاه

```mermaid
sequenceDiagram
    actor Visitor as بازدیدکننده
    participant API as Fiber API
    participant Redis as Redis
    participant DB as PostgreSQL
    participant Tracker as Click Tracker

    Visitor->>API: GET /:code
    API->>Redis: GET shortlink:{code}

    alt Cache Hit
        Redis-->>API: Original URL
    else Cache Miss
        Redis-->>API: nil
        API->>DB: FindByShortCode
        DB-->>API: Link
        API->>Redis: SET TTL=1h
    end

    API-->>Visitor: 301 Redirect
    API--)Tracker: Goroutine
    Tracker->>DB: Create Click + Increment Count
```

---

<a id="scripts"></a>

## اسکریپت‌ها

### Frontend

| دستور           | کاربرد                              |
| --------------- | ----------------------------------- |
| `npm run dev`   | اجرای Development Server با Next.js |
| `npm run build` | ساخت Production Build               |
| `npm run start` | اجرای Production Server             |
| `npm run lint`  | اجرای ESLint                        |

### Backend

| دستور                | کاربرد                                  |
| -------------------- | --------------------------------------- |
| `go run ./cmd/api`   | اجرای API                               |
| `go build ./cmd/api` | ساخت Binary                             |
| `go test ./...`      | اجرای تست‌ها پس از اضافه‌شدن Test Suite |
| `go mod download`    | دریافت Dependencyها                     |
| `go mod tidy`        | همگام‌سازی `go.mod` و `go.sum`          |

---

<a id="deployment"></a>

## استقرار

### Frontend

Frontend را می‌توان روی Vercel مستقر کرد:

1. پوشه Root پروژه در تنظیمات Build روی `frontend` قرار بگیرد.
2. متغیر `NEXT_PUBLIC_API_URL` تعریف شود.
3. دامنه اختصاصی به پروژه متصل شود.

### Backend

Backend به یک محیط اجرای Go نیاز دارد:

```bash
go build -o linkresan-api ./cmd/api
./linkresan-api
```

سرویس Backend باید به این زیرساخت‌ها دسترسی داشته باشد:

* PostgreSQL
* Redis با TLS
* متغیرهای محیطی Production
* Reverse Proxy یا دامنه API
* HTTPS

### پیشنهاد معماری Production

```mermaid
flowchart TB
    DNS["Domain / DNS"] --> WEB["Vercel<br/>Next.js Frontend"]
    WEB --> API["Go Fiber API"]
    API --> PG[("Managed PostgreSQL")]
    API --> RD[("Managed Redis / TLS")]
```

---

<a id="security-and-limitations"></a>

## نکات امنیتی و محدودیت‌های فعلی

پیش از استفاده جدی در Production، موارد زیر باید اصلاح یا تکمیل شوند:

* کلید امضای JWT باید از کد خارج و از متغیر محیطی مانند `JWT_SECRET` خوانده شود.
* `AllowOrigins: "*"` باید به دامنه‌های مورداعتماد محدود شود.
* URL ورودی باید Parse و بر اساس Schemeهای مجاز اعتبارسنجی شود.
* تولید Short Code باید Collision Retry داشته باشد.
* آدرس عمومی لینک کوتاه نباید روی `localhost` Hardcode باشد و بهتر است از `PUBLIC_BASE_URL` خوانده شود.
* TLS اتصال Redis باید برای محیط Local و Production قابل‌تنظیم باشد.
* Redis بهتر است Fallback داشته باشد تا قطعی Cache باعث توقف کامل API نشود.
* JWT در Frontend بهتر است داخل Cookie امن، `HttpOnly` و `SameSite` نگهداری شود.
* ثبت‌نام باید اعتبارسنجی ایمیل، حداقل قدرت رمز و Rate Limit داشته باشد.
* فیلد اختیاری `PhoneNumber` بهتر است nullable باشد تا Unique Index با مقدار خالی تداخل ایجاد نکند.
* Type Assertion مربوط به `user_id` باید بدون احتمال Panic انجام شود.
* خطاهای دیتابیس نباید مستقیماً یا با Status نامناسب به کاربر نمایش داده شوند.
* اجرای Goroutine برای ثبت کلیک در مقیاس بالا بهتر است با Queue یا Worker Pool جایگزین شود.
* `ExpiresAt` و `ClickLimit` در مدل وجود دارند، اما هنگام Resolve بررسی نمی‌شوند.
* Test Suite، CI، Structured Logging، Observability و Rate Limiting هنوز اضافه نشده‌اند.

> [!CAUTION]
> از کلیدها، رمزها، Connection Stringها یا جزئیات آسیب‌پذیری‌های امنیتی در Issue عمومی استفاده نکنید.

---

<a id="roadmap"></a>

## نقشه راه

### Core

* [x] ثبت‌نام و ورود با JWT
* [x] هش رمز عبور با bcrypt
* [x] ساخت لینک کوتاه برای کاربر
* [x] Resolve لینک کوتاه
* [x] Redis Cache
* [x] ثبت کلیک و افزایش شمارنده
* [x] داشبورد فهرست لینک‌ها
* [x] Health Check
* [x] دامنه اختصاصی

### Product

* [ ] Custom Alias
* [ ] QR Code
* [ ] ویرایش و حذف لینک
* [ ] فعال/غیرفعال‌کردن لینک
* [ ] تاریخ انقضا
* [ ] محدودیت کلیک
* [ ] جست‌وجو، فیلتر و Pagination
* [ ] Export آمار به CSV
* [ ] صفحه عمومی آمار لینک

### Analytics

* [ ] تشخیص Device Type
* [ ] تشخیص Browser و OS
* [ ] GeoIP برای Country و City
* [ ] Unique Visitors
* [ ] نمودار روزانه و ماهانه
* [ ] Referrer Analytics
* [ ] UTM Analytics

### Engineering

* [ ] انتقال JWT Secret به Environment
* [ ] Validation و Rate Limiting
* [ ] Refresh Token و Secure Cookie
* [ ] Redis Fallback و Circuit Breaker
* [ ] Queue برای Click Events
* [ ] Unit و Integration Tests
* [ ] GitHub Actions CI
* [ ] Dockerfile و Docker Compose
* [ ] OpenAPI / Swagger
* [ ] Structured Logging
* [ ] Metrics و Tracing
* [ ] فایل‌های `LICENSE`، `CONTRIBUTING.md` و `SECURITY.md`

---

<a id="contributing"></a>

## مشارکت

مشارکت در LinkResan خوش‌آمد است.

1. پروژه را Fork کنید.
2. یک Branch جدید بسازید:

```bash
git checkout -b feat/your-feature
```

3. تغییرات را Commit کنید:

```bash
git commit -m "feat: add your feature"
```

4. Branch را Push کنید:

```bash
git push origin feat/your-feature
```

5. یک Pull Request با توضیح روشن، Screenshot و روش تست ایجاد کنید.

### پیشنهاد برای Commit Message

این پروژه می‌تواند از الگوی Conventional Commits استفاده کند:

```text
feat: add custom aliases
fix: validate malformed URLs
docs: improve local setup guide
refactor: extract JWT configuration
test: add link service tests
chore: add CI workflow
```

---

<a id="license"></a>

## لایسنس

پروژه در README قبلی تحت **MIT License** معرفی شده است. برای ثبت رسمی لایسنس در GitHub و شفافیت حقوقی، فایل `LICENSE` باید در ریشه مخزن اضافه شود.

---

<details>
<summary><strong>English overview</strong></summary>

<br/>

**LinkResan** is a Persian-first, open-source URL shortener built as a full-stack monorepo.

It currently includes:

* Email/password authentication with bcrypt and JWT
* Authenticated short-link creation
* Six-character short codes
* PostgreSQL persistence through GORM
* Redis-backed URL resolution with a one-hour TTL
* Asynchronous click recording
* A Persian RTL dashboard built with Next.js 16 and React 19
* A Go Fiber REST API

The project is an active MVP. Advanced analytics, custom aliases, expiration enforcement, QR codes, testing, CI and production hardening are part of the roadmap.

</details>

---

<div align="center">

ساخته‌شده با ❤️ توسط <a href="https://github.com/AmirMotefaker"><strong>امیر متفکر</strong></a>

<br/><br/>

<a href="#table-of-contents">بازگشت به بالا ↑</a>

</div>

<img
src="https://capsule-render.vercel.app/api?type=waving&color=0:DB2777,50:7C3AED,100:4F46E5&height=120&section=footer"
width="100%"
alt=""
/>
