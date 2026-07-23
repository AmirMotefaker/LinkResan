<div align="center" dir="rtl">

<a href="https://www.linkresan.ir/">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:DB2777&height=230&section=header&text=LinkResan&fontSize=72&fontColor=FFFFFF&animation=fadeIn&fontAlignY=35&desc=Fast%20%C2%B7%20Open-Source%20%C2%B7%20Persian-First%20URL%20Shortener&descAlignY=57&descSize=18" width="100%" alt="LinkResan — Persian-first open-source URL shortener" />
</a>

# 🔗 لینک‌رسا | LinkResan

### پلتفرم متن‌باز کوتاه‌سازی، مدیریت و تحلیل لینک برای کاربران فارسی‌زبان

ساخته‌شده با **Go، Next.js، React Native، PostgreSQL و Redis**؛  
مجهز به اسلاگ دلخواه، QR Code، تاریخ انقضا، صفحه بیو، مدیریت تیمی، درگاه پرداخت، اپلیکیشن موبایل و داشبورد تحلیلی.

<br/>

<p dir="rtl">
  <a href="https://linkresan.ir"><img src="https://img.shields.io/badge/Website-linkresan.ir-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website"/></a>
  <a href="https://github.com/AmirMotefaker/LinkResan/releases/latest"><img src="https://img.shields.io/github/v/release/AmirMotefaker/LinkResan?style=for-the-badge&logo=github&label=Release" alt="Latest Release"/></a>
  <a href="https://github.com/AmirMotefaker/LinkResan/commits/main"><img src="https://img.shields.io/github/last-commit/AmirMotefaker/LinkResan?style=for-the-badge&logo=git&label=Last%20Commit" alt="Last Commit"/></a>
  <a href="https://github.com/AmirMotefaker/LinkResan/stargazers"><img src="https://img.shields.io/github/stars/AmirMotefaker/LinkResan?style=for-the-badge&logo=github&label=Stars" alt="Stars"/></a>
  <a href="https://github.com/AmirMotefaker/LinkResan/issues"><img src="https://img.shields.io/github/issues/AmirMotefaker/LinkResan?style=for-the-badge&logo=github" alt="Issues"/></a>
</p>

<p dir="rtl">
  <a href="https://linkresan.ir">نسخه آنلاین</a> · 
  <a href="https://github.com/AmirMotefaker/LinkResan/releases/latest">آخرین Release</a> · 
  <a href="#release-history">تاریخچه نسخه‌ها</a> · 
  <a href="#api-reference">مستندات API</a> · 
  <a href="#roadmap">نقشه راه</a> · 
  <a href="https://github.com/AmirMotefaker/LinkResan/issues/new">گزارش مشکل</a>
</p>

<br/>

<p dir="rtl">
  <img src="https://img.shields.io/badge/Go-1.25.0-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go"/>
  <img src="https://img.shields.io/badge/Fiber-2.52-00ACD7?style=flat-square&logo=go&logoColor=white" alt="Fiber"/>
  <img src="https://img.shields.io/badge/Next.js-16.2.10-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React_Native-Expo-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Native"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Redis-Cache-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis"/>
  <img src="https://img.shields.io/badge/PWA-Installable-5A0FC8?style=flat-square&logo=pwa&logoColor=white" alt="PWA"/>
  <img src="https://img.shields.io/badge/Zarinpal-Payment-FFD700?style=flat-square&logo=bitcoin&logoColor=black" alt="Zarinpal"/>
</p>

</div>

---

<a id="latest-release"></a>

## 🚀 آخرین نسخه — v5.1.0

> **Mobile App, Dark Mode & Developer Tools**  
> پروژه از یک پلتفرم وب به یک اکوسیستم کامل (وب، موبایل و ابزار توسعه‌دهنده) تبدیل شد.

### مهم‌ترین قابلیت‌های نسخه v5.1.0

- 📱 **اپلیکیشن موبایل (React Native):** اپلیکیشن نیتیو برای اندروید و iOS با تب‌بار پایین، صفحه ساخت لینک و تنظیمات.
- 🌙 **دارک مد (Dark Mode):** پشتیبانی کامل از حالت تاریک در تمامی صفحات وب‌سایت با قابلیت ذخیره انتخاب کاربر.
- 🔑 **مدیریت کلیدهای API:** امکان ساخت کلیدهای امن (lr_) برای توسعه‌دهندگان جهت اتصال اسکریپت‌ها به لینک رسان.
- 📖 **مستندات Swagger/OpenAPI:** رابط کاربری زیبا و راست‌چین برای مستندات فنی API.
- 🚀 **صفحات فرود اختصاصی فیچرها:** صفحات سئو‌محور برای توضیحات فنی امکانات (سرعت، امنیت، آمار).
- 💰 **موتور درآمدزایی:** اتصال به درگاه زرین‌پال، صفحات قیمت‌گذاری ۴ طبقه‌ای و اعمال خودکار محدودیت‌ها (Feature Gating).
- 👥 **مدیریت تیمی و وب‌هوک‌ها:** امکان ساخت تیم، دعوت کاربران و ارسال وب‌هوک هنگام کلیک.
- ⏱️ **پاکسازی خودکار (Cron Jobs):** حذف خودکار لینک‌های منقضی شده و توکن‌های استفاده شده.

<div align="center">

[مشاهده جزئیات کامل v5.1.0](https://github.com/AmirMotefaker/LinkResan/releases/tag/v5.1.0)

</div>

---

<a id="table-of-contents"></a>

## 📑 فهرست مطالب

- [معرفی پروژه](#overview)
- [چرا لینک‌رسان؟](#why-linkresan)
- [قابلیت‌های فعلی](#features)
- [معماری سیستم](#architecture)
- [تکنولوژی‌های استفاده شده](#tech-stack)
- [راه‌اندازی محلی](#getting-started)
- [مستندات API](#api-reference)
- [استقرار روی سرور](#deployment)
- [نقشه راه (Roadmap)](#roadmap)
- [مشارکت در پروژه](#contributing)
- [لایسنس](#license)

---

<a id="overview"></a>

## معرفی پروژه

**LinkResan** یک اکوسیستم Full-Stack، رایگان و متن‌باز برای کوتاه‌سازی و مدیریت لینک است که با تمرکز بر تجربه کاربران فارسی‌زبان طراحی شده است.

کاربران می‌توانند:

۱. از طریق وب‌سایت یا اپلیکیشن موبایل با ایمیل یا گوگل ثبت‌نام کنند.
۲. لینک‌های طولانی را با اسلاگ دلخواه کوتاه کنند.
۳. برای لینک‌های خود رمز عبور، تاریخ انقضا و محدودیت کلیک تعیین کنند.
۴. دامنه‌های اختصاصی خود را متصل کنند.
۵. در داشبورد حرفه‌ای، لینک‌های خود را مدیریت و حذف کنند.
۶. آمار دقیق کلیک‌ها (مرورگر، سیستم‌عامل، نمودار هفتگی) را مشاهده کنند.
۷. QR Code هر لینک را تولید و دانلود کنند.
۸. یک صفحه بیو (Linktree) زیبا بسازند.
۹. با پرداخت اشتراک ماهانه/سالانه، امکانات حرفه‌ای را فعال کنند.
۱۰. با استفاده از کلید API، لینک‌ها را مستقیماً از کدهای خود بسازند.

> [!IMPORTANT]
> نسخه `v5.1.0` یک پلتفرم کاملاً تجاری، چند سکویی (وب و موبایل) و آماده استفاده عمومی است.

---

<a id="why-linkresan"></a>

## چرا لینک‌رسان؟

| ویژگی | توضیح |
|---|---|
| 🇮🇷 فارسی‌محور | طراحی RTL، اعداد فارسی، تقویم شمسی و منطقه زمانی تهران |
| 📱 چند سکویی | وب‌سایت PWA + اپلیکیشن موبایل نیتیو (React Native) |
| 🌙 دارک مد | پشتیبانی کامل از حالت تاریک در تمامی صفحات |
| 💰 درآمدزایی | درگاه پرداخت زرین‌پال، پلن‌های رایگان تا سازمانی، Feature Gating |
| 🔑 ابزار توسعه‌دهنده | کلیدهای API امن و مستندات Swagger/OpenAPI |
| ⚡ سریع | Resolve لینک با Redis Cache و Backend نوشته‌شده با Go |
| 📊 آنالیتیکس | تشخیص مرورگر و سیستم‌عامل، نمودار هفت‌روزه و سازنده UTM |
| 🌐 برندینگ | دامنه‌های اختصاصی (Custom Domains) برای کسب‌وکارها |
| 🌲 Link-in-Bio | ساخت صفحات فرود یک‌صفحه‌ای رقیب Linktree |
| 👥 تیمی | امکان دعوت کاربران و همکاری روی یک مجموعه لینک |
| 🔐 امنیت | JWT، Google OAuth، Password Reset، Bcrypt، رمزگذاری لینک‌ها |
| ☁️ Cloud Ready | دیتابیس ابری PostgreSQL، Redis TLS، هاست Render و Vercel |

---

<a id="features"></a>

## ✨ قابلیت‌های فعلی

### 🔐 حساب کاربری و احراز هویت
- ثبت‌نام با ایمیل و رمز عبور (Bcrypt)
- ورود با گوگل (Google OAuth 2.0)
- سیستم بازگردانی رمز عبور با ارسال ایمیل (Resend API)
- توکن JWT با اعتبار ۲۴ ساعت
- مدیریت کلیدهای API (تولید، نام‌گذاری و حذف امن)
- احراز هویت دوگانه (Dual-Auth): پشتیبانی همزمان از توکن JWT (مرورگر) و هدر X-API-Key (اسکریپت‌ها)

### ✂️ مدیریت لینک‌ها
- تولید کد تصادفی شش‌کاراکتری
- پشتیبانی از اسلاگ دلخواه (Custom Alias)
- ساخت انبوه لینک با آپلود فایل CSV (Bulk Links)
- تاریخ انقضا با تقویم شمسی و انتخابگر ساعت
- محدودیت تعداد کلیک برای هر لینک
- لینک‌های محافظت شده با رمز عبور
- سازنده تگ UTM برای ردیابی کمپین‌ها

### ⚡ Redirect و Cache
- Lookup اولیه در Redis
- Fallback به PostgreSQL در Cache Miss
- Redirect با کد `302 Found` و Headerهای ضدکش (Anti-Cache)
- ثبت Click Event در Goroutine (Async)

### 📊 آنالیتیکس پیشرفته
- نمودار کلیک‌های هفت روز اخیر با Recharts
- تشخیص مرورگر (Chrome, Safari, Firefox, Edge)
- تشخیص سیستم‌عامل (iOS, Android, Windows, macOS)
- محاسبه آمار بر اساس منطقه زمانی تهران
- نمایش اعداد فارسی در نمودارها و داشبورد

### 🗂️ داشبورد و مدیریت
- جدول حرفه‌ای لینک‌ها با شماره ردیف و تاریخ شمسی
- کپی لینک، بازکردن لینک و حذف امن لینک
- تولید و دانلود QR Code با فرمت PNG
- مدیریت وب‌هوک‌ها و کلیدهای API در داشبورد
- مدیریت تیم (ساخت تیم، دعوت با ایمیل، لیست اعضا)
- صفحه ارتقا به پلن‌های پولی

### 🌲 صفحه فرود بیو (Link-in-bio)
- ساخت صفحه پروفایل یک‌صفحه‌ای (رقیب Linktree)
- انتخاب آدرس اختصاصی (`linkresan.ir/b/name`)
- افزودن، حذف و مدیریت لینک‌های داخل صفحه
- ردیابی کلیک‌های هر دکمه در صفحه بیو
- رندر سمت سرور (SSR) برای سئوی بهتر

### 💰 تجاری‌سازی (Monetization)
- اتصال به درگاه بانکی زرین‌پال
- سیستم ۴ پلنه (رایگان، پایه، حرفه‌ای، سازمانی)
- سوییچ قیمت‌گذاری ماهانه و سالانه
- اعمال خودکار محدودیت‌ها برای کاربران رایگان (Feature Gating)
- فعال‌سازی خودکار پلن Pro پس از پرداخت موفق

### 🌐 برندینگ، موبایل و سئو
- اتصال دامنه‌های اختصاصی (Custom Domains)
- دیپ‌لینکینگ شبکه‌های اجتماعی (Universal Links)
- طراحی کاملاً ریسپانسیو (Mobile-First)
- تبدیل به PWA (قابلیت نصب روی موبایل و دسکتاپ)
- Service Worker برای حالت آفلاین
- **اپلیکیشن موبایل نیتیو (React Native):** دارای تب‌بار پایین، صفحه ساخت لینک و خروج امن.
- **دارک مد (Dark Mode):** یکپارچه در تمام صفحات وب.
- **صفحات فرود اختصاصی:** توضیحات فنی دقیق برای هر فیچر (`/features/speed` و...).
- بهینه‌سازی موتورهای جستجو (SEO) با Sitemap و Robots.txt

### ☁️ زیرساخت و اتوماسیون
- دیتابیس ابری PostgreSQL با Neon
- دیتابیس ابری Redis با Upstash و TLS
- سرویس Cron Jobs برای پاکسازی خودکار دیتابیس (حذف لینک‌های منقضی)
- مستندات فنی Swagger/OpenAPI در مسیر `/docs`

---

<a id="architecture"></a>

## 🏗️ معماری سیستم

```mermaid
flowchart LR
    USER["👤 کاربر"] --> WEB["Next.js 16<br/>React 19 + TypeScript"]
    MOBILE["📱 اپ موبایل<br/>React Native"] -->|"REST /api"| API["Go 1.25<br/>Fiber API"]
    WEB -->|"REST /api"| API

    subgraph BACKEND["Backend Layers"]
        API --> AUTH["JWT/API-Key Middleware"]
        API --> HANDLER["Handlers"]
        API --> DOCS["Swagger UI"]
        HANDLER --> SERVICE["Services"]
        SERVICE --> REPO["Repositories"]
    end

    REPO --> PG[("PostgreSQL")]
    SERVICE <--> REDIS[("Redis Cache")]

    SERVICE -. "Async Click Event" .-> PG
    SERVICE -. "Webhook Trigger" .-> EXT["سرور خارجی"]
    
    CRON["Cron Job (00:00)"] -. "Cleanup" .-> PG

    VISITOR["🌐 بازدیدکننده"] -->|"GET /:code"| API
    API -->|"302 Redirect"| TARGET["Original URL"]
```

---

<a id="tech-stack"></a>

## 🧰 تکنولوژی‌های استفاده شده

### بخش بک‌اند (Backend)
| فناوری | کاربرد |
|---|---|
| زبان Go `1.25.0` | بک‌اند اصلی |
| فریم‌ورک Fiber `v2.52` | HTTP Framework |
| ابزار GORM `v1.31` | ORM و مایگریشن |
| دیتابیس PostgreSQL | پایگاه داده اصلی |
| کش Redis (Upstash) | کاهش بار دیتابیس |
| کتابخانه golang-jwt `v5` | احراز هویت JWT |
| سرویس robfig/cron `v3` | زمان‌بند پاکسازی خودکار |
| سرویس Resend API | ارسال ایمیل |
| درگاه Zarinpal API | پرداخت بانکی |

### بخش فرانت‌اند وب (Web Frontend)
| فناوری | کاربرد |
|---|---|
| فریم‌ورک Next.js `16` | App Router، SSR و رندرینگ |
| کتابخانه React `19` | رابط کاربری |
| زبان TypeScript | Type Safety |
| فریم‌ورک Tailwind CSS `4` | استایل‌دهی و دارک مد |
| کامپوننت Recharts | نمودارهای تحلیلی |
| کامپوننت qrcode.react | تولید QR Code |
| پلاگین react-multi-date-picker | تقویم شمسی و Time Picker |
| کتابخانه Framer Motion | انیمیشن‌ها |
| پلاگین @react-oauth/google | ورود با گوگل |

### بخش اپلیکیشن موبایل (Mobile App)
| فناوری | کاربرد |
|---|---|
| فریم‌ورک React Native `0.86` | اپلیکیشن نیتیو اندروید و iOS |
| پلتفرم Expo `SDK 57` | توسعه و تست سریع |
| کتابخانه Expo Router | مسیریابی استاندارد |
| ماژول AsyncStorage | ذخیره‌سازی محلی توکن |
| پکیج lucide-react-native | آیکون‌های مدرن |

### بخش زیرساخت پروداکشن (Production)
| سرویس | کاربرد |
|---|---|
| هاست Vercel | میزبانی Frontend |
| هاست Render | میزبانی Backend |
| سرویس Neon | دیتابیس PostgreSQL |
| سرویس Upstash | دیتابیس Redis |

---

<a id="getting-started"></a>

## 🚀 راه‌اندازی محلی

### پیش‌نیازها
- زبان Go نسخه `1.25.0+`
- محیط Node.js نسخه `20.9+`
- دیتابیس PostgreSQL
| دیتابیس Redis دارای TLS
- اپلیکیشن Expo Go (روی گوشی موبایل)

### ۱. Clone کردن پروژه

```bash
git clone https://github.com/AmirMotefaker/LinkResan.git
cd LinkResan
```

### ۲. اجرای بک‌اند (Backend)

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

ZARINPAL_MERCHANT_ID=your-zarinpal-merchant-id
ZARINPAL_CALLBACK_URL=http://localhost:3000/api/payment/verify

RESEND_API_KEY=your-resend-api-key
APP_URL=http://localhost:3000
```

اجرا:
```bash
go run ./cmd/api
```

### ۳. اجرای فرانت‌اند وب (Frontend)

در ترمینال جدید:

```bash
cd frontend
npm ci
```

فایل `frontend/.env.local` را بسازید:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

اجرا:
```bash
npm run dev
```

### ۴. اجرای اپلیکیشن موبایل (Mobile)

در ترمینال جدید:

```bash
cd mobile
npm install
```

اجرا:
```bash
npx expo start
```
*(سپس با اپلیکیشن Expo Go روی گوشی خود، QR Code را اسکن کنید یا دکمه `w` را برای اجرا در مرورگر بزنید).*

---

<a id="api-reference"></a>

## 📡 مستندات API

### آدرس پایه (Base URL)
```text
API Group: https://linkresan-api.onrender.com/api
Swagger UI: https://linkresan-api.onrender.com/docs
```

### احراز هویت
مسیرهای خصوصی به یکی از هدرهای زیر نیاز دارند:
```http
Authorization: Bearer <JWT_TOKEN>
# یا
X-API-Key: <API_KEY>
```

### مسیرهای اصلی (Endpoints)

| متد | مسیر | توضیح | احراز هویت |
|---|---|---|:---:|
| `GET` | `/api/health` | بررسی سلامت سرور | ❌ |
| `POST` | `/api/register` | ثبت‌نام با ایمیل | ❌ |
| `POST` | `/api/login` | ورود و دریافت JWT | ❌ |
| `POST` | `/api/google-login` | ورود با گوگل | ❌ |
| `POST` | `/api/forgot-password` | درخواست بازنشانی رمز | ❌ |
| `POST` | `/api/reset-password` | تغییر رمز با توکن | ❌ |
| `POST` | `/api/links` | ساخت لینک پیشرفته | ✅ |
| `POST` | `/api/links/bulk` | ساخت انبوه لینک (CSV) | ✅ |
| `GET` | `/api/links` | دریافت لینک‌های کاربر | ✅ |
| `GET` | `/api/links/analytics` | آمار هفت روز اخیر | ✅ |
| `GET` | `/api/links/stats` | آمار مرورگر و سیستم‌عامل | ✅ |
| `DELETE` | `/api/links/:id` | حذف لینک | ✅ |
| `POST` | `/api/domains` | افزودن دامنه اختصاصی | ✅ |
| `GET` | `/api/bio` | دریافت اطلاعات صفحه بیو | ✅ |
| `PUT` | `/api/bio` | آپدیت صفحه بیو | ✅ |
| `POST` | `/api/team/create` | ساخت تیم | ✅ |
| `POST` | `/api/team/invite` | دعوت کاربر به تیم | ✅ |
| `POST` | `/api/webhooks` | ثبت وب‌هوک | ✅ |
| `POST` | `/api/api-keys` | ساخت کلید API | ✅ |
| `POST` | `/api/payment/request` | درخواست پرداخت زرین‌پال | ✅ |
| `GET` | `/:code` | Resolve و Redirect لینک | ❌ |
| `GET` | `/b/:slug` | دریافت صفحه بیو کاربر | ❌ |

---

<a id="deployment"></a>

## ☁️ استقرار روی سرور (Deployment)

پروژه به صورت کامل روی سرویس‌های ابری رایگان مستقر شده است:

```mermaid
flowchart TB
    DOMAIN["linkresan.ir"] --> WEB["Vercel<br/>Next.js PWA"]
    MOBILE["Mobile App<br/>Expo"] --> API
    WEB --> API["Render<br/>Go Fiber"]
    API --> PG[("Neon PostgreSQL")]
    API --> RD[("Upstash Redis TLS")]
    API --> ZP["Zarinpal Payment Gateway"]
    API --> RS["Resend Email API"]
```

---

<a id="roadmap"></a>

## 🗺️ نقشه راه (Roadmap)

- [x] Core Shortener & Redirect (v0.1)
- [x] Authentication & JWT (v0.2)
- [x] Cloud Deployment (Render, Vercel, Neon, Upstash) (v1.3)
- [x] Custom Alias & QR Code (v1.7)
- [x] Expiration & Click Limit (Shamsi Calendar) (v1.9)
- [x] Advanced Analytics (Browser/OS) & UTM Builder (v2.0)
- [x] Custom Domains & Password Protected Links (v2.2)
- [x] Link-in-bio (Micro Landing Pages) (v2.5)
- [x] Google OAuth & PWA (v2.7)
- [x] Monetization Engine (Zarinpal) & 4-Tier Pricing (v3.0)
- [x] Feature Gating (Pro Plan Limitations) (v3.1)
- [x] SEO Optimization (SSR, Sitemap) (v3.2)
- [x] Password Reset System (Resend) (v3.3)
- [x] Bulk Link Creation (CSV Upload) (v3.5)
- [x] Team Management & Collaboration (v3.6)
- [x] Webhooks & Developer Integrations (v3.7)
- [x] Automated Database Cleanup (Cron Jobs) (v4.0)
- [x] Dark Mode (v5.1)
- [x] API Key Management for Developers (v5.1)
- [x] Swagger / OpenAPI Documentation (v5.1)
- [x] Mobile Apps (React Native) (v5.0)
- [ ] Push Notifications for Mobile App
- [ ] Dark Mode for Mobile App

---

<a id="contributing"></a>

## 🤝 مشارکت در پروژه

از Contribution، گزارش Bug و پیشنهاد Feature جدید استقبال می‌کنیم.

۱. ریپازیتوری را Fork کنید.
۲. برنچ جدید بسازید: `git checkout -b feat/your-feature`
۳. تغییرات را Commit کنید: `git commit -m "feat: add your feature"`
۴. Push کنید: `git push origin feat/your-feature`
۵. Pull Request بسازید.

---

<a id="license"></a>

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است. استفاده از آن برای همه آزاد است.

---

<div align="center">

### ساخته‌شده با ❤️ برای توسعه‌دهندگان و کسب‌وکارهای ایرانی

توسط [**امیر متفکر**](https://amirmotefaker.ir)  
پروژه [**LinkResan**](https://github.com/AmirMotefaker/LinkResan)

<br/>

[🚀 شروع رایگان در linkresan.ir](https://linkresan.ir)

[⬆ بازگشت به بالا](#table-of-contents)

</div>

<img
  src="https://capsule-render.vercel.app/api?type=waving&color=0:7C3AED,35:4F46E5,70:1D4ED8,100:0F172A&height=125&section=footer"
  width="100%"
  alt=""
/>
