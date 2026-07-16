<div align="center">

<img
  src="https://capsule-render.vercel.app/api?type=waving&color=0:2563EB,45:4F46E5,75:7C3AED,100:DB2777&height=235&section=header&text=LinkResan&fontSize=72&fontColor=FFFFFF&animation=fadeIn&fontAlignY=34&desc=Fast%20%C2%B7%20Open-Source%20%C2%B7%20Persian-First%20URL%20Shortener&descAlignY=56&descSize=18"
  width="100%"
  alt="LinkResan — Persian-first open-source URL shortener"
/>

# 🔗 لینک‌رسان | LinkResan

### کوتاه‌کننده لینک Full-Stack، متن‌باز و فارسی‌محور

ساخته‌شده با **Go، Next.js، PostgreSQL و Redis**؛ با پشتیبانی از اسلاگ دلخواه، داشبورد مدیریت، شمارش کلیک و رابط کاربری RTL.

<br/>

[![Website](https://img.shields.io/badge/Website-linkresan.ir-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white)](https://linkresan.ir)
[![Latest Release](https://img.shields.io/github/v/release/AmirMotefaker/LinkResan?style=for-the-badge&logo=github&label=Release)](https://github.com/AmirMotefaker/LinkResan/releases/latest)
[![Last Commit](https://img.shields.io/github/last-commit/AmirMotefaker/LinkResan?style=for-the-badge&logo=git&label=Last%20Commit)](https://github.com/AmirMotefaker/LinkResan/commits/main)
[![Stars](https://img.shields.io/github/stars/AmirMotefaker/LinkResan?style=for-the-badge&logo=github&label=Stars)](https://github.com/AmirMotefaker/LinkResan/stargazers)

[مشاهده نسخه آنلاین](https://linkresan.ir)
·
[آخرین Release](https://github.com/AmirMotefaker/LinkResan/releases/latest)
·
[مستندات API](#api-reference)
·
[نقشه راه](#roadmap)
·
[گزارش مشکل](https://github.com/AmirMotefaker/LinkResan/issues)

<br/>

![Go](https://img.shields.io/badge/Go-1.25.0-00ADD8?style=flat-square&logo=go&logoColor=white)
![Fiber](https://img.shields.io/badge/Fiber-v2.52-00ACD7?style=flat-square&logo=go&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=111827)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=flat-square&logo=redis&logoColor=white)

</div>

---

<a id="latest-release"></a>

## 🚀 آخرین نسخه: v1.7.0

> **Custom Alias & UI/UX Enhancements — منتشرشده در ۱۶ ژوئیه ۲۰۲۶**

نسخه `v1.7.0` یکی از مهم‌ترین به‌روزرسانی‌های LinkResan است و قابلیت شخصی‌سازی لینک کوتاه و مدیریت بهتر لینک‌ها را به پروژه اضافه می‌کند.

### تغییرات اصلی v1.7.0

- ✅ افزودن **اسلاگ دلخواه** یا Custom Alias با بررسی یکتایی در دیتابیس
- ✅ افزودن امکان **حذف امن لینک از داشبورد**
- ✅ تغییر Redirect از `301` به `302 Found`
- ✅ افزودن Headerهای ضدکش برای بهبود دقت شمارش کلیک‌ها
- ✅ تغییر نوع ذخیره IP از `inet` به `text` برای سازگاری بهتر دیتابیس
- ✅ اضافه‌شدن Favicon اختصاصی LinkResan
- ✅ بازطراحی صفحه اصلی به‌صورت یک‌صفحه‌ای و بدون اسکرول
- ✅ بهبود Footer، اندازه آیکن‌ها و رنگ لینک‌ها
- ✅ قابل‌کلیک‌شدن لوگوی Header در صفحه اصلی و داشبورد
- ✅ اصلاح Cursor دکمه‌ها، لینک‌ها و ورودی‌های تعاملی

[مشاهده Release v1.7.0](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.7.0)

---

<a id="table-of-contents"></a>

## 📑 فهرست مطالب

- [معرفی](#overview)
- [قابلیت‌ها](#features)
- [وضعیت قابلیت‌ها](#feature-status)
- [معماری](#architecture)
- [جریان درخواست‌ها](#request-flow)
- [تکنولوژی‌ها](#tech-stack)
- [ساختار پروژه](#project-structure)
- [راه‌اندازی محلی](#getting-started)
- [متغیرهای محیطی](#environment-variables)
- [مستندات API](#api-reference)
- [اسکریپت‌ها](#scripts)
- [استقرار](#deployment)
- [امنیت و محدودیت‌ها](#security-and-limitations)
- [نقشه راه](#roadmap)
- [مشارکت](#contributing)
- [لایسنس](#license)

---

<a id="overview"></a>

## معرفی

**LinkResan** یک سرویس کوتاه‌کننده لینک برای کاربران فارسی‌زبان است که چرخه کامل ساخت، مدیریت و Resolve کردن لینک‌های کوتاه را در یک Monorepo ارائه می‌دهد.

این پروژه از دو بخش اصلی تشکیل شده است:

- **Frontend فارسی و RTL** با Next.js App Router، React و Tailwind CSS
- **REST API سریع** با Go، Fiber، PostgreSQL، GORM و Redis

هدف پروژه، ارائه جایگزینی متن‌باز، سریع و قابل‌توسعه برای سرویس‌های کوتاه‌کننده لینک خارجی است.

### LinkResan چه کاری انجام می‌دهد؟

1. کاربر ثبت‌نام یا وارد حساب خود می‌شود.
2. لینک اصلی را وارد می‌کند.
3. یک کد تصادفی شش‌کاراکتری یا اسلاگ دلخواه انتخاب می‌کند.
4. لینک کوتاه با دامنه `linkresan.ir` ساخته می‌شود.
5. هر بازدید از لینک کوتاه به مقصد اصلی Redirect می‌شود.
6. اطلاعات پایه هر کلیک به‌صورت غیرهمزمان ثبت می‌شود.
7. کاربر لینک‌ها و تعداد کلیک آن‌ها را در داشبورد مشاهده می‌کند.

> [!IMPORTANT]
> LinkResan در وضعیت **MVP فعال** قرار دارد. قابلیت‌های اصلی محصول پیاده‌سازی شده‌اند، اما برای استفاده Production در مقیاس بالا هنوز به Hardening امنیتی، تست خودکار، Rate Limiting و Observability نیاز دارد.

---

<a id="features"></a>

## ✨ قابلیت‌ها

### 🔐 احراز هویت

- ثبت‌نام با ایمیل و رمز عبور
- هش رمز عبور با `bcrypt`
- ورود و دریافت JWT
- اعتبار توکن به‌مدت ۲۴ ساعت
- محافظت از Routeهای ساخت، فهرست و حذف لینک
- خروج از حساب با حذف Token ذخیره‌شده در مرورگر

### ✂️ کوتاه‌سازی لینک

- تولید کد تصادفی شش‌کاراکتری
- پشتیبانی از **Custom Alias**
- بررسی یکتایی اسلاگ دلخواه در PostgreSQL
- ساخت لینک عمومی با ساختار زیر:

```text
https://linkresan.ir/{short-code}
```

### ⚡ Resolve و Cache

- بررسی Redis پیش از Query دیتابیس
- ذخیره نتیجه Resolve در Redis
- TTL یک‌ساعته برای Cache
- Redirect با Status Code برابر `302 Found`
- استفاده از Headerهای `no-cache` برای کاهش Cache شدن Redirect در مرورگر
- ثبت کلیک در Goroutine بدون مسدودکردن پاسخ Redirect

### 📊 داشبورد

- نمایش فهرست لینک‌های هر کاربر
- نمایش لینک کوتاه و لینک اصلی
- نمایش تاریخ ایجاد با فرمت فارسی
- نمایش تعداد کلیک‌ها
- کپی سریع لینک کوتاه
- بازکردن لینک در Tab جدید
- حذف لینک با تأیید کاربر
- هدایت کاربران بدون Token به صفحه ورود

### 🎨 رابط کاربری

- طراحی فارسی و راست‌به‌چپ
- فونت Vazirmatn
- طراحی Responsive
- صفحه اصلی یک‌صفحه‌ای
- Header و Footer مینیمال
- Favicon اختصاصی
- آیکن‌های Lucide
- Feedback بصری هنگام Loading و Copy
- پشتیبانی از ورود، ثبت‌نام، داشبورد و خروج

---

<a id="feature-status"></a>

## وضعیت قابلیت‌ها

| قابلیت | وضعیت | توضیح |
|---|:---:|---|
| ثبت‌نام و ورود | ✅ | JWT و bcrypt |
| ساخت لینک تصادفی | ✅ | کد شش‌کاراکتری |
| اسلاگ دلخواه | ✅ | اضافه‌شده در `v1.7.0` |
| بررسی یکتایی اسلاگ | ✅ | بررسی در PostgreSQL |
| Redis Cache | ✅ | TTL یک‌ساعته |
| شمارش کلیک | ✅ | ثبت غیرهمزمان |
| ذخیره IP | ✅ | نوع `text` در `v1.7.0` |
| ذخیره User-Agent و Referrer | ✅ | در جدول Click |
| داشبورد لینک‌ها | ✅ | نمایش لینک‌ها و کلیک‌ها |
| حذف لینک | ✅ | Soft Delete با GORM |
| Redirect ضدکش | ✅ | `302` به‌همراه Headerهای ضدکش |
| Favicon اختصاصی | ✅ | اضافه‌شده در `v1.7.0` |
| Custom Domain | ✅ | `linkresan.ir` |
| تحلیل Browser و Device | 🟡 | فیلد مدل وجود دارد؛ استخراج و UI کامل نیست |
| تحلیل Country و City | 🟡 | فیلد مدل وجود دارد؛ GeoIP پیاده‌سازی نشده |
| تاریخ انقضا | 🟡 | فیلد مدل وجود دارد؛ Enforcement انجام نمی‌شود |
| محدودیت کلیک | 🟡 | فیلد مدل وجود دارد؛ Enforcement انجام نمی‌شود |
| QR Code | ⏳ | برنامه‌ریزی‌شده |
| ویرایش لینک | ⏳ | برنامه‌ریزی‌شده |
| Refresh Token | ⏳ | برنامه‌ریزی‌شده |
| تست خودکار و CI | ⏳ | برنامه‌ریزی‌شده |

---

<a id="architecture"></a>

## 🏗️ معماری

```mermaid
flowchart LR
    USER["👤 کاربر"] --> WEB["Next.js 16<br/>React 19 + TypeScript"]
    WEB -->|"REST /api"| API["Go 1.25<br/>Fiber API"]

    subgraph BACKEND["Backend Layers"]
        API --> HANDLER["Handlers"]
        HANDLER --> SERVICE["Services"]
        SERVICE --> REPO["Repositories"]
    end

    REPO --> PG[("PostgreSQL")]
    SERVICE <--> REDIS[("Redis Cache")]

    SERVICE -. "Async Click Tracking" .-> PG

    VISITOR["🌐 بازدیدکننده"] -->|"GET /:code"| API
    API -->|"302 Redirect"| TARGET["Original URL"]
```

### لایه‌های Backend

| لایه | مسئولیت |
|---|---|
| `handlers` | Parse کردن Request، اعتبارسنجی اولیه و تولید Response |
| `services` | منطق احراز هویت، اسلاگ، Cache، Resolve و ثبت کلیک |
| `repositories` | عملیات PostgreSQL با GORM |
| `middleware` | اعتبارسنجی Bearer Token و قراردادن `user_id` در Context |
| `models` | تعریف ساختار User، Link و Click |
| `database` | اتصال PostgreSQL و اجرای AutoMigrate |
| `cache` | اتصال TLS به Redis |
| `config` | خواندن تنظیمات از Environment |

### مدل داده

```mermaid
erDiagram
    USER ||--o{ LINK : creates
    LINK ||--o{ CLICK : receives

    USER {
        uint ID PK
        string Email UK
        string PhoneNumber UK
        string PasswordHash
        bool IsActive
        bool IsPremium
        datetime CreatedAt
        datetime UpdatedAt
        datetime DeletedAt
    }

    LINK {
        uint ID PK
        uint UserID FK
        text OriginalURL
        string ShortCode UK
        bool IsCustom
        datetime ExpiresAt
        int ClickLimit
        int64 ClickCount
        bool IsActive
        datetime CreatedAt
        datetime UpdatedAt
        datetime DeletedAt
    }

    CLICK {
        uint ID PK
        uint LinkID FK
        text IPAddress
        text UserAgent
        text Referrer
        string Country
        string City
        string DeviceType
        string Browser
        bool IsUnique
        datetime CreatedAt
    }
```

---

<a id="request-flow"></a>

## 🔄 جریان درخواست‌ها

### ساخت لینک کوتاه

```mermaid
sequenceDiagram
    actor User as کاربر
    participant UI as Next.js UI
    participant API as Fiber API
    participant Auth as JWT Middleware
    participant Service as Link Service
    participant DB as PostgreSQL

    User->>UI: واردکردن URL و اسلاگ اختیاری
    UI->>API: POST /api/links + Bearer Token
    API->>Auth: اعتبارسنجی JWT
    Auth-->>API: user_id
    API->>Service: CreateShortLink(url, customCode)

    alt Custom Alias وارد شده
        Service->>DB: بررسی یکتایی ShortCode
        DB-->>Service: نتیجه بررسی
    else کد تصادفی
        Service->>Service: تولید کد ۶ کاراکتری
    end

    Service->>DB: ذخیره Link
    DB-->>Service: Link
    Service-->>API: Link
    API-->>UI: short_url
```

### Resolve لینک کوتاه

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
        Redis-->>API: Cached Link
    else Cache Miss
        Redis-->>API: nil
        API->>DB: FindByShortCode
        DB-->>API: Link
        API->>Redis: SET با TTL یک‌ساعته
    end

    API-->>Visitor: 302 Redirect + no-cache headers
    API--)Tracker: Goroutine
    Tracker->>DB: Create Click
    Tracker->>DB: Increment ClickCount
```

### حذف لینک

```mermaid
sequenceDiagram
    actor User as کاربر
    participant UI as Dashboard
    participant API as Fiber API
    participant Auth as JWT Middleware
    participant DB as PostgreSQL

    User->>UI: انتخاب حذف
    UI->>User: نمایش Confirm
    User->>UI: تأیید حذف
    UI->>API: DELETE /api/links/:id
    API->>Auth: اعتبارسنجی JWT
    Auth-->>API: user_id
    API->>DB: Delete where id AND user_id
    DB-->>API: Soft Delete Result
    API-->>UI: Link deleted successfully
    UI->>UI: حذف ردیف از State
```

---

<a id="tech-stack"></a>

## 🧰 تکنولوژی‌ها

### Backend

| فناوری | نسخه | کاربرد |
|---|---:|---|
| Go | `1.25.0` | زبان Backend |
| Fiber | `v2.52.14` | HTTP Framework |
| GORM | `v1.31.2` | ORM و Migration |
| PostgreSQL Driver | `v1.6.0` | اتصال GORM به PostgreSQL |
| go-redis | `v9.21.0` | Cache |
| golang-jwt | `v5.3.1` | JWT |
| x/crypto | `v0.54.0` | bcrypt |
| godotenv | `v1.5.1` | بارگذاری `.env` |

### Frontend

| فناوری | نسخه | کاربرد |
|---|---:|---|
| Next.js | `16.2.10` | App Router و Runtime |
| React | `19.2.4` | UI |
| React DOM | `19.2.4` | Rendering |
| TypeScript | `5+` | Type Safety |
| Tailwind CSS | `4.x` | Styling |
| Framer Motion | `12.42.2` | Animation |
| Lucide React | `1.24.0` | Icons |
| shadcn | `4.13.0` | UI Infrastructure |
| Base UI | `1.6.0` | Accessible Primitives |
| Vazirmatn | `next/font/google` | فونت فارسی |
| ESLint | `9.x` | Linting |

### زیرساخت

| سرویس | کاربرد |
|---|---|
| PostgreSQL | ذخیره کاربران، لینک‌ها و کلیک‌ها |
| Redis | Cache کردن Resolve لینک‌ها |
| Vercel | گزینه مناسب برای Frontend |
| Managed Go Host | اجرای Backend |
| Custom Domain | `linkresan.ir` |

---

<a id="project-structure"></a>

## 📁 ساختار پروژه

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
│
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
│   ├── lib/
│   │   └── utils.ts
│   ├── public/
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

<a id="getting-started"></a>

## 🚀 راه‌اندازی محلی

### پیش‌نیازها

- **Go 1.25.0+**
- **Node.js 20.9+**
- **npm**
- **PostgreSQL**
- **Redis با TLS**
- **Git**

> [!NOTE]
> پروژه در `go.mod` از Go `1.25.0` استفاده می‌کند. Next.js 16 نیز حداقل به Node.js `20.9` نیاز دارد.

> [!WARNING]
> اتصال Redis در نسخه `v1.7.0` همیشه با TLS ساخته می‌شود. برای اجرای بدون تغییر کد، از Redis دارای TLS مانند Upstash استفاده کنید. Redis محلی بدون TLS با پیاده‌سازی فعلی متصل نخواهد شد.

### ۱. Clone کردن پروژه

```bash
git clone https://github.com/AmirMotefaker/LinkResan.git
cd LinkResan
```

برای دریافت دقیق Release فعلی:

```bash
git checkout v1.7.0
```

### ۲. آماده‌سازی PostgreSQL

نمونه ساخت دیتابیس با CLI:

```bash
createdb linkresan_db
```

یا در `psql`:

```sql
CREATE DATABASE linkresan_db;
```

جداول هنگام اجرای Backend با `GORM AutoMigrate` ساخته می‌شوند.

### ۳. اجرای Backend

```bash
cd backend
go mod download
```

فایل `backend/.env` را بسازید:

```dotenv
DATABASE_URL=postgres://postgres:password@localhost:5432/linkresan_db?sslmode=disable
PORT=8080

REDIS_ADDR=your-tls-redis-host:6379
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

Health Check:

```bash
curl http://localhost:8080/api/health
```

### ۴. اجرای Frontend

در Terminal جدید:

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

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8080
```

---

<a id="environment-variables"></a>

## 🔑 متغیرهای محیطی

### Backend — `backend/.env`

| متغیر | اجباری | مقدار نمونه | توضیح |
|---|:---:|---|---|
| `DATABASE_URL` | ✅ | `postgres://...` | Connection String دیتابیس |
| `PORT` | ❌ | `8080` | پورت Fiber |
| `REDIS_ADDR` | ✅ | `host:6379` | آدرس Redis دارای TLS |
| `REDIS_PASSWORD` | وابسته به سرویس | `secret` | رمز Redis |

### Frontend — `frontend/.env.local`

| متغیر | اجباری | مقدار نمونه | توضیح |
|---|:---:|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | `http://localhost:8080/api` | Base URL مربوط به API Group |

> [!CAUTION]
> مقادیر واقعی Environment، رمز دیتابیس و Redis را در Git Commit نکنید.

### متغیرهای پیشنهادی برای نسخه‌های آینده

پیاده‌سازی فعلی این متغیرها را هنوز نمی‌خواند، اما انتقال مقادیر Hardcoded به Environment پیشنهاد می‌شود:

```dotenv
JWT_SECRET=replace-with-a-long-random-secret
PUBLIC_BASE_URL=https://linkresan.ir
CORS_ALLOWED_ORIGINS=https://linkresan.ir
REDIS_TLS_ENABLED=true
```

---

<a id="api-reference"></a>

## 📡 مستندات API

### Base URL محلی

```text
API Root:  http://localhost:8080
API Group: http://localhost:8080/api
```

### Authentication

Routeهای محافظت‌شده به Header زیر نیاز دارند:

```http
Authorization: Bearer <JWT_TOKEN>
```

### خلاصه Endpointها

| متد | مسیر | توضیح | Token |
|---|---|---|:---:|
| `GET` | `/api/health` | بررسی سلامت API | ❌ |
| `POST` | `/api/register` | ثبت‌نام | ❌ |
| `POST` | `/api/login` | ورود و دریافت JWT | ❌ |
| `POST` | `/api/links` | ساخت لینک تصادفی یا دلخواه | ✅ |
| `GET` | `/api/links` | دریافت لینک‌های کاربر | ✅ |
| `DELETE` | `/api/links/:id` | حذف لینک متعلق به کاربر | ✅ |
| `GET` | `/:code` | Resolve و Redirect | ❌ |

---

### Health Check

```bash
curl http://localhost:8080/api/health
```

پاسخ:

```json
{
  "status": "success",
  "message": "LinkResan API is running perfectly!"
}
```

---

### ثبت‌نام

```http
POST /api/register
Content-Type: application/json
```

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

---

### ورود

```http
POST /api/login
Content-Type: application/json
```

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

---

### ساخت لینک با کد تصادفی

```http
POST /api/links
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

```bash
curl -X POST http://localhost:8080/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "original_url": "https://example.com/a/very/long/url"
  }'
```

پاسخ نمونه:

```json
{
  "original_url": "https://example.com/a/very/long/url",
  "short_code": "aB3xY9",
  "short_url": "https://linkresan.ir/aB3xY9"
}
```

---

### ساخت لینک با اسلاگ دلخواه

فیلد `custom_code` اختیاری است.

```bash
curl -X POST http://localhost:8080/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "original_url": "https://example.com/products/summer-campaign",
    "custom_code": "summer-sale"
  }'
```

پاسخ نمونه:

```json
{
  "original_url": "https://example.com/products/summer-campaign",
  "short_code": "summer-sale",
  "short_url": "https://linkresan.ir/summer-sale"
}
```

در صورت تکراری بودن اسلاگ:

```json
{
  "error": "این نام دلخواه قبلاً انتخاب شده است"
}
```

> [!NOTE]
> در `v1.7.0` هنوز Validation مستقلی برای Characterهای مجاز، کلمات رزروشده یا Normalization اسلاگ پیاده‌سازی نشده است.

---

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
      "UserID": 1,
      "OriginalURL": "https://example.com",
      "ShortCode": "summer-sale",
      "IsCustom": true,
      "ExpiresAt": null,
      "ClickLimit": null,
      "ClickCount": 12,
      "IsActive": true,
      "CreatedAt": "2026-07-16T09:18:00Z",
      "UpdatedAt": "2026-07-16T09:18:00Z",
      "DeletedAt": null
    }
  ],
  "count": 1
}
```

> [!NOTE]
> مدل‌های فعلی `json` tag اختصاصی ندارند؛ به همین دلیل کلیدهای Link در Response با نام‌های Go مانند `OriginalURL` و `ClickCount` برگردانده می‌شوند.

---

### حذف لینک

تنها مالک لینک می‌تواند آن را حذف کند.

```bash
curl -X DELETE http://localhost:8080/api/links/1 \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

پاسخ موفق:

```json
{
  "message": "Link deleted successfully"
}
```

حذف با GORM و فیلد `DeletedAt` انجام می‌شود؛ بنابراین رفتار فعلی **Soft Delete** است.

---

### Resolve لینک کوتاه

```bash
curl -I http://localhost:8080/summer-sale
```

پاسخ موفق:

```http
HTTP/1.1 302 Found
Location: https://example.com/products/summer-campaign
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

اگر لینک پیدا نشود:

```json
{
  "error": "Link not found or expired"
}
```

---

### Status Codeهای اصلی

| Status | کاربرد |
|---:|---|
| `200 OK` | Login، دریافت لینک‌ها و حذف |
| `201 Created` | Register و ساخت لینک |
| `302 Found` | Redirect لینک کوتاه |
| `400 Bad Request` | Body نامعتبر، URL خالی یا Alias تکراری |
| `401 Unauthorized` | Token نامعتبر یا وجودنداشتن Token |
| `404 Not Found` | Short Code نامعتبر |
| `500 Internal Server Error` | خطای داخلی یا دیتابیس |

---

<a id="scripts"></a>

## 🧪 اسکریپت‌ها

### Frontend

| دستور | توضیح |
|---|---|
| `npm run dev` | اجرای Development Server |
| `npm run build` | ساخت Production Build |
| `npm run start` | اجرای Build تولیدشده |
| `npm run lint` | اجرای ESLint |

### Backend

| دستور | توضیح |
|---|---|
| `go run ./cmd/api` | اجرای API |
| `go build ./cmd/api` | Build کردن Binary |
| `go test ./...` | اجرای Test Suite پس از اضافه‌شدن تست‌ها |
| `go mod download` | دریافت Dependencyها |
| `go mod tidy` | مرتب‌سازی Moduleها |
| `go vet ./...` | بررسی Static کد Go |
| `gofmt -w .` | Format کردن کد Go |

### بررسی سریع API

```bash
curl http://localhost:8080/api/health
```

---

<a id="deployment"></a>

## ☁️ استقرار

### Frontend

Frontend برای استقرار روی Vercel مناسب است.

تنظیمات پیشنهادی:

| گزینه | مقدار |
|---|---|
| Root Directory | `frontend` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output | Next.js Default |
| Environment | `NEXT_PUBLIC_API_URL` |

### Backend

Build:

```bash
cd backend
go build -o linkresan-api ./cmd/api
```

اجرا:

```bash
./linkresan-api
```

Backend باید به این سرویس‌ها دسترسی داشته باشد:

- PostgreSQL
- Redis با TLS
- Environment Variables
- HTTPS
- Domain یا Reverse Proxy

### معماری پیشنهادی Production

```mermaid
flowchart TB
    DOMAIN["linkresan.ir"] --> WEB["Vercel<br/>Next.js Frontend"]
    WEB --> API["Managed Go Service<br/>Fiber API"]
    API --> PG[("Managed PostgreSQL")]
    API --> RD[("Managed Redis<br/>TLS")]
```

### Checklist استقرار

- [ ] استفاده از Secret قوی برای JWT
- [ ] محدودکردن CORS
- [ ] فعال‌بودن HTTPS
- [ ] تنظیم `NEXT_PUBLIC_API_URL`
- [ ] تنظیم Backup دیتابیس
- [ ] تنظیم Redis TLS
- [ ] افزودن Rate Limiting
- [ ] افزودن Health Check پلتفرم
- [ ] فعال‌کردن Structured Logging
- [ ] اضافه‌کردن Monitoring و Alerting

---

<a id="security-and-limitations"></a>

## 🛡️ امنیت و محدودیت‌های فعلی

موارد زیر از روی رفتار فعلی Release `v1.7.0` استخراج شده‌اند و برای Production Hardening پیشنهاد می‌شوند.

### Authentication

- JWT Secret در کد Hardcode شده است.
- Secret در Service و Middleware تکرار شده است.
- Token در `localStorage` ذخیره می‌شود.
- Refresh Token وجود ندارد.
- Revocation یا Blacklist توکن پیاده‌سازی نشده است.
- قدرت رمز عبور و فرمت ایمیل Validation کامل ندارد.

### URL و Custom Alias

- URL ورودی Parse و Normalize نمی‌شود.
- Schemeهای مجاز به‌صورت صریح محدود نشده‌اند.
- Custom Alias محدودیت Character و Reserved Word ندارد.
- تولید کد تصادفی Collision Retry صریح ندارد.
- Base URL خروجی روی `https://linkresan.ir/` Hardcode شده است.

### Redis و Cache

- اتصال Redis همیشه TLS است و قابل‌تنظیم نیست.
- خرابی Redis باعث توقف کامل Startup می‌شود.
- خطاهای `SET` Cache نادیده گرفته می‌شوند.
- هنگام حذف لینک، Cache مربوط به Short Code پاک نمی‌شود.
- در نتیجه بهتر است Delete Link با `DEL shortlink:{code}` همراه شود.
- Cache Fallback و Circuit Breaker وجود ندارد.

### API

- CORS روی `*` تنظیم شده است.
- Rate Limiting وجود ندارد.
- Request Validation محدود است.
- Error Responseها Schema یکپارچه ندارند.
- `user_id` با Type Assertion مستقیم از Context خوانده می‌شود.
- App Name در Fiber هنوز `LinkResan API v1.0` است و با Release هماهنگ نیست.

### Analytics

- Country، City، DeviceType، Browser و IsUnique در مدل وجود دارند.
- این فیلدها هنگام ثبت کلیک در `v1.7.0` پر نمی‌شوند.
- GeoIP و User-Agent Parsing هنوز پیاده‌سازی نشده‌اند.
- Goroutine مستقل برای هر کلیک در ترافیک بالا باید با Queue یا Worker Pool جایگزین شود.

### Link Lifecycle

- `ExpiresAt` هنگام Resolve بررسی نمی‌شود.
- `ClickLimit` هنگام Resolve بررسی نمی‌شود.
- `IsActive` در Query دیتابیس بررسی می‌شود، اما Cache تنها ID و URL را نگه می‌دارد.
- ویرایش، Pause و Reactivate لینک هنوز وجود ندارد.

### Engineering

- Unit Test و Integration Test وجود ندارد.
- GitHub Actions CI تعریف نشده است.
- Dockerfile و Docker Compose وجود ندارد.
- OpenAPI یا Swagger وجود ندارد.
- Structured Logging، Metrics و Distributed Tracing وجود ندارد.

> [!CAUTION]
> Secretها، Connection Stringها و رمزهای واقعی را در Issue، Log یا Commit عمومی منتشر نکنید.

---

<a id="roadmap"></a>

## 🗺️ نقشه راه

### Core

- [x] ثبت‌نام و ورود
- [x] bcrypt
- [x] JWT Authentication
- [x] ساخت لینک تصادفی
- [x] اسلاگ دلخواه
- [x] بررسی یکتایی Alias
- [x] Redis Cache
- [x] Redirect با `302`
- [x] Headerهای ضدکش
- [x] ثبت کلیک
- [x] داشبورد لینک‌ها
- [x] حذف لینک
- [x] Favicon اختصاصی
- [x] دامنه اختصاصی

### Product

- [ ] ویرایش لینک
- [ ] Pause و Resume لینک
- [ ] QR Code
- [ ] Enforcement تاریخ انقضا
- [ ] Enforcement محدودیت کلیک
- [ ] Password Reset
- [ ] تأیید ایمیل
- [ ] حساب Premium
- [ ] جست‌وجو و فیلتر لینک‌ها
- [ ] Pagination
- [ ] Export CSV
- [ ] صفحه عمومی آمار

### Analytics

- [ ] Unique Visitor واقعی
- [ ] Browser Detection
- [ ] OS Detection
- [ ] Device Detection
- [ ] GeoIP
- [ ] Country و City Analytics
- [ ] Referrer Analytics
- [ ] نمودار روزانه، هفتگی و ماهانه
- [ ] UTM Analytics

### Security

- [ ] انتقال JWT Secret به Environment
- [ ] Secure HttpOnly Cookie
- [ ] Refresh Token
- [ ] Token Revocation
- [ ] Rate Limiting
- [ ] URL Validation
- [ ] Alias Validation
- [ ] CORS Allowlist
- [ ] Security Headers
- [ ] Audit Log

### Infrastructure

- [ ] Dockerfile
- [ ] Docker Compose
- [ ] GitHub Actions
- [ ] Unit Tests
- [ ] Integration Tests
- [ ] End-to-End Tests
- [ ] OpenAPI / Swagger
- [ ] Structured Logging
- [ ] Metrics
- [ ] Tracing
- [ ] Error Tracking
- [ ] Redis Fallback
- [ ] Queue برای Click Event

### Documentation

- [x] README حرفه‌ای
- [ ] فایل `LICENSE`
- [ ] فایل `CONTRIBUTING.md`
- [ ] فایل `SECURITY.md`
- [ ] فایل `CODE_OF_CONDUCT.md`
- [ ] نمونه `.env.example`
- [ ] مستندات Deployment
- [ ] مستندات Architecture Decision Record

---

## 📌 تاریخچه نسخه

| نسخه | عنوان | تغییر اصلی |
|---|---|---|
| `v1.7.0` | Custom Alias & UI/UX Enhancements | Alias دلخواه، حذف لینک، Redirect 302 و بهبود UI |
| `v1.5.0` | Official Launch | انتشار رسمی روی `linkresan.ir` |

برای مشاهده همه نسخه‌ها:

[GitHub Releases](https://github.com/AmirMotefaker/LinkResan/releases)

---

<a id="contributing"></a>

## 🤝 مشارکت

Contributionها، Bug Reportها و پیشنهادهای فنی خوش‌آمد هستند.

### مراحل

1. Repository را Fork کنید.
2. Branch جدید بسازید:

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

5. Pull Request ایجاد کنید.

### Conventional Commits

```text
feat: add QR code generation
fix: invalidate redis cache after link deletion
docs: update API examples
refactor: move JWT secret to configuration
test: add link service unit tests
chore: add GitHub Actions workflow
```

### قبل از Pull Request

```bash
cd backend
gofmt -w .
go vet ./...
go test ./...

cd ../frontend
npm run lint
npm run build
```

### Pull Request خوب شامل چیست؟

- توضیح مسئله و راه‌حل
- Scope مشخص
- Screenshot برای تغییرات UI
- روش تست
- Breaking Changeها
- Issue مرتبط

---

## 🐛 گزارش مشکل

برای گزارش Bug از GitHub Issues استفاده کنید:

[ایجاد Issue جدید](https://github.com/AmirMotefaker/LinkResan/issues/new)

لطفاً این اطلاعات را درج کنید:

- نسخه پروژه
- سیستم‌عامل
- نسخه Go و Node.js
- مراحل بازتولید
- رفتار موردانتظار
- رفتار فعلی
- Log غیرحساس
- Screenshot در صورت نیاز

برای گزارش امنیتی، اطلاعات حساس را در Issue عمومی قرار ندهید.

---

<a id="license"></a>

## 📄 لایسنس

README پروژه LinkResan استفاده از **MIT License** را اعلام می‌کند.

برای شناسایی رسمی لایسنس توسط GitHub و ابزارهای خودکار، فایل مستقل `LICENSE` باید در ریشه Repository قرار گیرد.

---

<details>
<summary><strong>English overview</strong></summary>

<br/>

**LinkResan** is a Persian-first, open-source URL shortener built as a full-stack monorepo.

### Current release

The latest release is **v1.7.0 — Custom Alias & UI/UX Enhancements**, published on July 16, 2026.

### Implemented features

- Email/password registration and login
- Password hashing with bcrypt
- JWT authentication
- Random six-character short codes
- Custom aliases with database uniqueness checking
- PostgreSQL persistence through GORM
- Redis-backed URL resolution with a one-hour TTL
- `302 Found` redirects with anti-cache headers
- Asynchronous click recording
- Link dashboard with click counts
- Copy and open actions
- User-owned link deletion
- Persian RTL interface
- Custom domain: `linkresan.ir`

### Stack

- Go 1.25
- Fiber 2
- PostgreSQL
- Redis
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

LinkResan is an active MVP. Production hardening, advanced analytics, QR codes, expiration enforcement, automated testing and CI remain on the roadmap.

</details>

---

<div align="center">

### ساخته‌شده با ❤️ برای توسعه‌دهندگان ایرانی

توسط [**امیر متفکر**](https://amirmotefaker.ir)  
پروژه [**LinkResan**](https://github.com/AmirMotefaker/LinkResan)

<br/>

[⬆ بازگشت به بالا](#table-of-contents)

</div>

<img
  src="https://capsule-render.vercel.app/api?type=waving&color=0:DB2777,35:7C3AED,70:4F46E5,100:2563EB&height=125&section=footer"
  width="100%"
  alt=""
/>
