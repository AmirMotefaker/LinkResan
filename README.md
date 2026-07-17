<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,50:7C3AED,100:DB2777&height=230&section=header&text=LinkResan&fontSize=72&fontColor=FFFFFF&animation=fadeIn&fontAlignY=35&desc=Fast%20%C2%B7%20Open-Source%20%C2%B7%20Persian-First%20URL%20Shortener&descAlignY=57&descSize=18" width="100%" alt="LinkResan — Persian-first open-source URL shortener" />

# 🔗 لینک‌رسان | LinkResan

### پلتفرم متن‌باز کوتاه‌سازی، مدیریت و تحلیل لینک برای کاربران فارسی‌زبان

ساخته‌شده با **Go، Next.js، PostgreSQL و Redis**؛  
مجهز به اسلاگ دلخواه، QR Code، تاریخ انقضا، محدودیت کلیک و داشبورد تحلیلی.

<br/>

[![Website](https://img.shields.io/badge/Website-linkresan.ir-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white)](https://linkresan.ir)
[![Latest Release](https://img.shields.io/github/v/release/AmirMotefaker/LinkResan?style=for-the-badge&logo=github&label=Release)](https://github.com/AmirMotefaker/LinkResan/releases/latest)
[![Last Commit](https://img.shields.io/github/last-commit/AmirMotefaker/LinkResan?style=for-the-badge&logo=git&label=Last%20Commit)](https://github.com/AmirMotefaker/LinkResan/commits/main)
[![Stars](https://img.shields.io/github/stars/AmirMotefaker/LinkResan?style=for-the-badge&logo=github&label=Stars)](https://github.com/AmirMotefaker/LinkResan/stargazers)
[![Issues](https://img.shields.io/github/issues/AmirMotefaker/LinkResan?style=for-the-badge&logo=github)](https://github.com/AmirMotefaker/LinkResan/issues)

[نسخه آنلاین](https://linkresan.ir)
·
[آخرین Release](https://github.com/AmirMotefaker/LinkResan/releases/latest)
·
[تاریخچه نسخه‌ها](#release-history)
·
[مستندات API](#api-reference)
·
[Roadmap](#roadmap)
·
[گزارش مشکل](https://github.com/AmirMotefaker/LinkResan/issues/new)

<br/>

![Go](https://img.shields.io/badge/Go-1.25.0-00ADD8?style=flat-square&logo=go&logoColor=white)
![Fiber](https://img.shields.io/badge/Fiber-2.52-00ACD7?style=flat-square&logo=go&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=111827)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=flat-square&logo=redis&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Analytics-22B5BF?style=flat-square)
![QR Code](https://img.shields.io/badge/QR_Code-PNG-111827?style=flat-square&logo=qrcode&logoColor=white)

</div>

---

<a id="latest-release"></a>

## 🚀 آخرین نسخه — v2.0.0

> **Advanced Analytics & Pro Features**  
> منتشرشده در ۱۶ ژوئیه ۲۰۲۶

نسخه `v2.0.0` لینک‌رسان را از یک کوتاه‌کننده لینک ساده به یک پلتفرم مدیریت و تحلیل لینک تبدیل می‌کند.

### مهم‌ترین قابلیت‌های v2.0.0

- 📈 نمودار تعداد کلیک‌های هفت روز اخیر با `Recharts`
- 🕒 محاسبه آمار روزانه بر اساس منطقه زمانی `Asia/Tehran`
- 📅 تعیین تاریخ و ساعت انقضا با تقویم شمسی
- 🎯 تعیین حداکثر تعداد کلیک برای هر لینک
- 🔒 غیرفعال‌شدن Resolve پس از انقضا یا رسیدن به Click Limit
- 🏷️ ساخت لینک با Custom Alias
- 📱 تولید QR Code در مرورگر
- 📥 دانلود QR Code با فرمت PNG و سطح تصحیح خطای `H`
- 🔢 نمایش اعداد فارسی در رابط کاربری
- ⚡ Redirect با `302 Found` و Headerهای ضدکش
- 🗂️ داشبورد حرفه‌ای مدیریت لینک‌ها
- 🗑️ حذف امن لینک متعلق به کاربر
- 🎨 بهبود کامل رابط کاربری، نمودار، Footer، Favicon و Cursorها

<div align="center">

[مشاهده جزئیات کامل v2.0.0](https://github.com/AmirMotefaker/LinkResan/releases/tag/v2.0.0)

</div>

---

<a id="table-of-contents"></a>

## 📑 فهرست مطالب

- [معرفی](#overview)
- [چرا لینک‌رسان؟](#why-linkresan)
- [قابلیت‌های فعلی](#features)
- [وضعیت قابلیت‌ها](#feature-status)
- [تاریخچه تمام نسخه‌ها](#release-history)
- [معماری](#architecture)
- [مدل داده](#data-model)
- [جریان درخواست‌ها](#request-flow)
- [تکنولوژی‌ها](#tech-stack)
- [ساختار پروژه](#project-structure)
- [راه‌اندازی محلی](#getting-started)
- [متغیرهای محیطی](#environment-variables)
- [مستندات API](#api-reference)
- [استقرار](#deployment)
- [امنیت و محدودیت‌های فعلی](#security-and-limitations)
- [Roadmap کامل](#roadmap)
- [مشارکت](#contributing)
- [لایسنس](#license)

---

<a id="overview"></a>

## معرفی

**LinkResan** یک پلتفرم Full-Stack، رایگان و متن‌باز برای کوتاه‌سازی و مدیریت لینک است که با تمرکز بر تجربه کاربران فارسی‌زبان طراحی شده است.

کاربران می‌توانند:

1. حساب کاربری بسازند و وارد شوند.
2. لینک‌های طولانی را کوتاه کنند.
3. برای لینک خود اسلاگ دلخواه تعیین کنند.
4. تاریخ و ساعت انقضا مشخص کنند.
5. حداکثر تعداد کلیک تعریف کنند.
6. لینک‌های خود را در داشبورد مدیریت کنند.
7. تعداد کلیک‌ها را مشاهده کنند.
8. روند کلیک‌های هفت روز اخیر را روی نمودار ببینند.
9. QR Code هر لینک را تولید و دانلود کنند.
10. لینک‌های قدیمی را از حساب خود حذف کنند.

Frontend پروژه با **Next.js App Router** و رابط RTL فارسی ساخته شده و Backend آن یک REST API لایه‌ای بر پایه **Go Fiber** است.

> [!IMPORTANT]
> `v2.0.0` یک نسخه کاربردی و قابل‌استفاده عمومی است. با این حال، برای استفاده سازمانی در مقیاس بالا همچنان باید موارد Roadmap فنی مانند تست خودکار، Rate Limiting، Secret Management، Queue و Observability تکمیل شوند.

---

<a id="why-linkresan"></a>

## چرا لینک‌رسان؟

| ویژگی | توضیح |
|---|---|
| 🇮🇷 فارسی‌محور | طراحی RTL، اعداد فارسی، تقویم شمسی و منطقه زمانی تهران |
| 🧩 متن‌باز | امکان بررسی، توسعه، Self-host و مشارکت جامعه |
| ⚡ سریع | Resolve لینک با Redis Cache و Backend نوشته‌شده با Go |
| 📊 قابل‌اندازه‌گیری | شمارش کلیک و نمودار هفت‌روزه |
| 🏷️ قابل‌شخصی‌سازی | پشتیبانی از Custom Alias |
| ⏳ قابل‌کنترل | تاریخ انقضا و محدودیت تعداد کلیک |
| 📱 مناسب کسب‌وکار | QR Code قابل‌دانلود برای منو، کارت ویزیت و کمپین |
| 🔐 حساب‌محور | JWT، مالکیت لینک و Routeهای محافظت‌شده |
| ☁️ Cloud Ready | PostgreSQL ابری، Redis TLS، Render و Vercel |
| 🧱 قابل‌توسعه | ساختار Handler، Service و Repository |

---

<a id="features"></a>

## ✨ قابلیت‌های فعلی

### 🔐 حساب کاربری و احراز هویت

- ثبت‌نام با ایمیل و رمز عبور
- هش رمز عبور با `bcrypt`
- ورود با JWT
- اعتبار توکن به‌مدت ۲۴ ساعت
- Middleware محافظت‌شده برای Routeهای خصوصی
- اتصال هر لینک به مالک آن
- جلوگیری از مشاهده و حذف لینک کاربران دیگر
- خروج از حساب در Frontend

### ✂️ ساخت لینک کوتاه

- تولید کد تصادفی شش‌کاراکتری
- پشتیبانی از اسلاگ دلخواه
- بررسی یکتایی اسلاگ در PostgreSQL
- ذخیره Original URL و Short Code
- نمایش لینک نهایی با دامنه رسمی:

```text
https://linkresan.ir/{short-code}
```

### ⚙️ تنظیمات پیشرفته لینک

- تاریخ انقضای اختیاری
- انتخاب تاریخ با تقویم شمسی
- انتخاب ساعت دیجیتال
- تبدیل تاریخ انتخاب‌شده به ISO 8601 برای Backend
- محدودیت تعداد کلیک
- بررسی Expiration هنگام Resolve
- بررسی Click Limit هنگام Resolve
- پیام خطای یکپارچه برای لینک نامعتبر، منقضی یا محدودشده

### ⚡ Redirect و Cache

- Lookup اولیه در Redis
- Fallback به PostgreSQL در Cache Miss
- ذخیره Cached Link با TTL یک‌ساعته
- Redirect با `302 Found`
- Headerهای ضدکش:

```http
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

- ثبت Click Event در Goroutine
- افزایش شمارنده کلیک بدون مسدودکردن پاسخ Redirect
- ذخیره IP، User-Agent و Referrer

### 📊 Analytics

- Endpoint محافظت‌شده برای Analytics
- دریافت Clickهای متعلق به لینک‌های کاربر
- تجمیع داده‌های هفت روز اخیر
- تولید خروجی شامل تمام هفت روز حتی در روزهای بدون کلیک
- تبدیل Timestampها به منطقه زمانی تهران
- نمایش نمودار Area Chart
- Tooltip فارسی
- اعداد فارسی روی محور و داشبورد
- نمایش مجموع کلیک هر لینک

### 🗂️ داشبورد مدیریت لینک

- جدول حرفه‌ای لینک‌ها
- شماره ردیف
- Short URL
- Original URL
- تاریخ و ساعت ساخت به فرمت فارسی
- تعداد کلیک‌ها
- کپی لینک
- بازکردن لینک
- تولید QR Code
- دانلود QR Code
- حذف لینک با Confirm
- نمایش Empty State
- هدایت کاربر بدون Token به صفحه Login

### 📱 QR Code

- تولید سمت Client با `qrcode.react`
- عدم نیاز به پردازش QR در Backend
- نمایش در Modal
- استفاده از Canvas
- دانلود PNG
- Error Correction Level برابر `H`
- مناسب برای چاپ و استفاده در تبلیغات

### 🎨 تجربه کاربری فارسی

- رابط راست‌به‌چپ
- فونت Vazirmatn
- اعداد فارسی
- تقویم شمسی
- طراحی Responsive
- صفحه اصلی فشرده و یک‌صفحه‌ای
- Favicon اختصاصی
- Header و Footer اختصاصی
- Loading State
- Copy Feedback
- Cursorهای تعاملی
- آیکن‌های Lucide

### ☁️ زیرساخت ابری

- Frontend قابل‌استقرار روی Vercel
- Backend مستقرشده روی Render
- PostgreSQL ابری با Neon
- Redis ابری با Upstash و TLS
- دامنه اختصاصی `linkresan.ir`
- HTTPS و SSL

---

<a id="feature-status"></a>

## ✅ وضعیت قابلیت‌ها

| حوزه | قابلیت | وضعیت | معرفی‌شده در |
|---|---|:---:|---|
| Core | ساخت لینک کوتاه | ✅ | `v0.1.0` |
| Core | Redirect به مقصد | ✅ | `v0.1.0` |
| Analytics | ذخیره IP و User-Agent | ✅ | `v0.1.0` |
| Auth | ثبت‌نام و ورود | ✅ | `v0.2.0` |
| Auth | JWT و bcrypt | ✅ | `v0.2.0` |
| Ownership | اتصال لینک به کاربر | ✅ | `v0.3.0` |
| Dashboard | دریافت لینک‌های کاربر | ✅ | `v0.3.0` |
| UI | Frontend با Next.js | ✅ | `v0.4.0` |
| Integration | اتصال Frontend و Backend | ✅ | `v0.5.0` |
| Product | MVP کامل | ✅ | `v1.0.0` |
| Documentation | README و آماده‌سازی Deployment | ✅ | `v1.1.0` |
| Cloud | تنظیمات Neon، Upstash و Render | ✅ | `v1.2.0` |
| Deployment | Backend عمومی | ✅ | `v1.3.0` |
| Launch | دامنه، Vercel و HTTPS | ✅ | `v1.5.0` |
| Dashboard | جدول حرفه‌ای و تاریخ شمسی | ✅ | `v1.6.0` |
| Management | حذف لینک | ✅ | `v1.6.0` |
| Customization | Custom Alias | ✅ | `v1.7.0` |
| Accuracy | Redirect 302 و Anti-cache | ✅ | `v1.7.0` |
| Branding | Favicon و بهبود UI | ✅ | `v1.7.0` |
| QR | تولید و دانلود QR Code | ✅ | `v1.8.0` |
| Link Control | تاریخ و ساعت انقضا | ✅ | `v1.9.0` |
| Link Control | محدودیت کلیک | ✅ | `v1.9.0` |
| Localization | اعداد فارسی و Time Picker | ✅ | `v1.9.0` |
| Analytics | نمودار هفت روز اخیر | ✅ | `v2.0.0` |
| Analytics | منطقه زمانی تهران | ✅ | `v2.0.0` |
| Analytics | Browser و Device Detection | ⏳ | Roadmap |
| Analytics | Country و City Detection | ⏳ | Roadmap |
| Analytics | Unique Visitors | ⏳ | Roadmap |
| Management | ویرایش لینک | ⏳ | Roadmap |
| Engineering | تست خودکار و CI | ⏳ | Roadmap |
| Platform | API Key و Webhook | ⏳ | Roadmap |

---

<a id="release-history"></a>

## 🧭 تاریخچه تمام نسخه‌ها

برای مشاهده Changelog کامل هر نسخه روی شماره یا عنوان Release کلیک کنید.

| نسخه | عنوان Release | خلاصه تغییرات | تاریخ |
|---|---|---|---|
| [**v2.0.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v2.0.0) | [Advanced Analytics & Pro Features](https://github.com/AmirMotefaker/LinkResan/releases/tag/v2.0.0) | نمودار هفت‌روزه، Expiration و Click Limit عملیاتی، QR، Alias، بومی‌سازی و اصلاح Timezone | ۲۰۲۶-۰۷-۱۶ |
| [**v1.9.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.9.0) | [Advanced Link Settings & Persian Localization](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.9.0) | تاریخ و ساعت انقضا، محدودیت کلیک، تقویم شمسی، ساعت دیجیتال و اعداد فارسی | ۲۰۲۶-۰۷-۱۶ |
| [**v1.8.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.8.0) | [QR Code Generator & Download](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.8.0) | تولید QR Code، Modal و دانلود PNG با کیفیت بالا | ۲۰۲۶-۰۷-۱۶ |
| [**v1.7.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.7.0) | [Custom Alias & UI/UX Enhancements](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.7.0) | اسلاگ دلخواه، Redirect 302، Anti-cache، Favicon و بهبودهای گسترده UI | ۲۰۲۶-۰۷-۱۶ |
| [**v1.6.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.6.0) | [Professional Dashboard & Link Management](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.6.0) | حذف امن لینک، جدول حرفه‌ای، تاریخ شمسی و نمایش دامنه واقعی | ۲۰۲۶-۰۷-۱۶ |
| [**v1.5.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.5.0) | [Official Launch](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.5.0) | اتصال `linkresan.ir`، استقرار Vercel و فعال‌شدن HTTPS | ۲۰۲۶-۰۷-۱۶ |
| [**v1.3.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.3.0) | [Backend Live on Render](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.3.0) | استقرار Go روی Render و اتصال امن Neon و Upstash | ۲۰۲۶-۰۷-۱۶ |
| [**v1.2.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.2.0) | [Cloud Ready Configuration](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.2.0) | بازطراحی Config و Database برای سرویس‌های Serverless و Cloud | ۲۰۲۶-۰۷-۱۵ |
| [**v1.1.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.1.0) | [Professional Documentation & Pre-deployment](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.1.0) | مستندات حرفه‌ای، Badgeها و بهینه‌سازی `.gitignore` | ۲۰۲۶-۰۷-۱۵ |
| [**v1.0.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.0.0) | [MVP Complete](https://github.com/AmirMotefaker/LinkResan/releases/tag/v1.0.0) | انتشار اولین محصول Full-Stack کامل با Auth، Dashboard، Redis و Click Analytics | ۲۰۲۶-۰۷-۱۵ |
| [**v0.5.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.5.0) | [Full-Stack Integration](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.5.0) | اتصال Next.js به Go API، CORS، JWT در مرورگر و ساخت لینک واقعی | ۲۰۲۶-۰۷-۱۵ |
| [**v0.4.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.4.0) | [Frontend & UI](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.4.0) | شروع Frontend با Next.js، Tailwind CSS 4، Vazirmatn و Landing Page | ۲۰۲۶-۰۷-۱۵ |
| [**v0.3.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.3.0) | [User Dashboard & Link Ownership](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.3.0) | مالکیت لینک، API داشبورد و جداسازی اطلاعات کاربران | ۲۰۲۶-۰۷-۱۵ |
| [**v0.2.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.2.0) | [Authentication & Security](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.2.0) | ثبت‌نام، ورود، bcrypt، JWT و Protected Middleware | ۲۰۲۶-۰۷-۱۵ |
| [**v0.1.0**](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.1.0) | [MVP — Shorten, Redirect & Click Tracking](https://github.com/AmirMotefaker/LinkResan/releases/tag/v0.1.0) | اولین نسخه کاری؛ ساخت لینک، Redirect و ثبت IP و User-Agent | ۲۰۲۶-۰۷-۱۲ |

> [!NOTE]
> شماره‌گذاری Releaseها مستقیماً از GitHub پروژه گرفته شده است؛ نسخه‌های `v1.4.0` و `v0.6.0` تا `v0.9.0` Release عمومی ندارند.

<details>
<summary><strong>نمایش مسیر تکامل محصول</strong></summary>

<br/>

```mermaid
timeline
    title LinkResan Product Evolution
    2026-07-12 : v0.1.0 Core MVP
               : Shorten, Redirect, Click Tracking
    2026-07-15 : v0.2.0 Authentication
               : v0.3.0 Ownership and Dashboard API
               : v0.4.0 Next.js Frontend
               : v0.5.0 Full-Stack Integration
               : v1.0.0 MVP Complete
               : v1.1.0 Documentation
               : v1.2.0 Cloud Ready
    2026-07-16 : v1.3.0 Backend Deployment
               : v1.5.0 Official Launch
               : v1.6.0 Link Management
               : v1.7.0 Custom Alias
               : v1.8.0 QR Code
               : v1.9.0 Expiration and Click Limit
               : v2.0.0 Advanced Analytics
```

</details>

---

<a id="architecture"></a>

## 🏗️ معماری

```mermaid
flowchart LR
    USER["👤 کاربر"] --> WEB["Next.js 16<br/>React 19 + TypeScript"]
    WEB -->|"REST /api"| API["Go 1.25<br/>Fiber API"]

    subgraph BACKEND["Backend Layers"]
        API --> AUTH["JWT Middleware"]
        API --> HANDLER["Handlers"]
        HANDLER --> SERVICE["Services"]
        SERVICE --> REPO["Repositories"]
    end

    REPO --> PG[("PostgreSQL")]
    SERVICE <--> REDIS[("Redis Cache")]

    SERVICE -. "Async Click Event" .-> PG

    VISITOR["🌐 بازدیدکننده"] -->|"GET /:code"| API
    API -->|"302 Redirect"| TARGET["Original URL"]
```

### مسئولیت لایه‌ها

| لایه | مسئولیت |
|---|---|
| `cmd/api` | Bootstrap، Dependency Injection، Routeها و اجرای Fiber |
| `config` | خواندن Environment Variables |
| `database` | اتصال PostgreSQL و اجرای AutoMigrate |
| `cache` | اتصال Redis با TLS |
| `models` | مدل‌های User، Link و Click |
| `repositories` | Queryها، Click Count و Analytics Aggregation |
| `services` | منطق Auth، Alias، Expiration، Click Limit و Cache |
| `handlers` | Parse Request و تبدیل Service Result به HTTP Response |
| `middleware` | اعتبارسنجی JWT و استخراج User ID |
| `frontend/app` | صفحه اصلی، Login و Dashboard |
| `frontend/components` | کامپوننت‌های UI قابل‌استفاده مجدد |

---

<a id="data-model"></a>

## 🗃️ مدل داده

```mermaid
erDiagram
    USER ||--o{ LINK : owns
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

### توضیح مدل‌ها

#### User

اطلاعات حساب، وضعیت کاربر و امکان توسعه پلن Premium را نگهداری می‌کند.

#### Link

اطلاعات مقصد، Short Code، مالک، Alias، Expiration، Click Limit، Click Count و وضعیت لینک را ذخیره می‌کند.

#### Click

هر بازدید را به‌همراه IP، User-Agent، Referrer و فیلدهای آماده برای Analytics پیشرفته ثبت می‌کند.

---

<a id="request-flow"></a>

## 🔄 جریان درخواست‌ها

### ساخت لینک پیشرفته

```mermaid
sequenceDiagram
    actor User as کاربر
    participant UI as Next.js
    participant API as Fiber API
    participant Auth as JWT Middleware
    participant Service as Link Service
    participant DB as PostgreSQL

    User->>UI: URL + Alias + Expiration + Click Limit
    UI->>UI: تبدیل تاریخ شمسی به ISO
    UI->>API: POST /api/links
    API->>Auth: اعتبارسنجی Bearer Token
    Auth-->>API: user_id
    API->>Service: CreateShortLink

    alt Custom Alias
        Service->>DB: FindByShortCode
        DB-->>Service: Unique / Duplicate
    else Random Code
        Service->>Service: Generate 6-character code
    end

    Service->>DB: Create Link
    DB-->>Service: Stored Link
    Service-->>API: Link
    API-->>UI: 201 + short_url
```

### Resolve لینک

```mermaid
sequenceDiagram
    actor Visitor as بازدیدکننده
    participant API as Fiber API
    participant Redis as Redis
    participant DB as PostgreSQL
    participant Worker as Async Tracker

    Visitor->>API: GET /:code
    API->>Redis: GET shortlink:{code}

    alt Cache Hit
        Redis-->>API: Cached URL
    else Cache Miss
        Redis-->>API: nil
        API->>DB: Find active Link
        DB-->>API: Link
        API->>API: Check ExpiresAt
        API->>API: Check ClickLimit
        API->>Redis: SET TTL 1 hour
    end

    API-->>Visitor: 302 + Anti-cache Headers
    API--)Worker: Track Click
    Worker->>DB: Insert Click
    Worker->>DB: Increment ClickCount
```

### Analytics هفت‌روزه

```mermaid
sequenceDiagram
    actor User as کاربر
    participant UI as Dashboard
    participant API as Analytics API
    participant Repo as Repository
    participant DB as PostgreSQL

    UI->>API: GET /api/links/analytics
    API->>Repo: GetDailyClicks(userID)
    Repo->>Repo: Current time in Asia/Tehran
    Repo->>DB: Clicks from last 7 days
    DB-->>Repo: Raw timestamps
    Repo->>Repo: Group by Tehran calendar day
    Repo-->>API: 7 daily data points
    API-->>UI: analytics[]
    UI->>UI: Render Recharts AreaChart
```

---

<a id="tech-stack"></a>

## 🧰 تکنولوژی‌ها

### Backend

| فناوری | نسخه | کاربرد |
|---|---:|---|
| Go | `1.25.0` | زبان Backend |
| Fiber | `v2.52.14` | HTTP Framework |
| GORM | `v1.31.2` | ORM، Query و AutoMigrate |
| PostgreSQL Driver | `v1.6.0` | اتصال GORM به PostgreSQL |
| go-redis | `v9.21.0` | Cache |
| golang-jwt | `v5.3.1` | JWT Authentication |
| x/crypto | `v0.54.0` | bcrypt |
| godotenv | `v1.5.1` | بارگذاری `.env` |

### Frontend

| فناوری | نسخه | کاربرد |
|---|---:|---|
| Next.js | `16.2.10` | App Router و Frontend Runtime |
| React | `19.2.4` | UI |
| React DOM | `19.2.4` | Rendering |
| TypeScript | `5+` | Type Safety |
| Tailwind CSS | `4.x` | Styling |
| Recharts | `3.9.2` | نمودار Analytics |
| qrcode.react | `4.2.0` | تولید QR Code |
| react-multi-date-picker | `4.5.2` | تقویم شمسی و Time Picker |
| react-date-object | `2.1.9` | تبدیل و مدیریت تاریخ |
| Framer Motion | `12.42.2` | Animation |
| Lucide React | `1.24.0` | Icons |
| Base UI | `1.6.0` | Accessible UI Primitives |
| shadcn | `4.13.0` | UI Infrastructure |
| Vazirmatn | `next/font/google` | فونت فارسی |
| ESLint | `9.x` | Linting |

### زیرساخت Production

| سرویس | کاربرد |
|---|---|
| Vercel | Frontend |
| Render | Go Backend |
| Neon | PostgreSQL |
| Upstash | Redis با TLS |
| `linkresan.ir` | دامنه رسمی |
| HTTPS | ارتباط امن |

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
│   │   ├── favicon.ico
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

- Go `1.25.0+`
- Node.js `20.9+`
- npm
- PostgreSQL
- Redis دارای TLS
- Git

> [!WARNING]
> پیاده‌سازی Redis در `v2.0.0` همیشه TLS را فعال می‌کند. برای اجرای بدون تغییر کد، از Redis دارای TLS مانند Upstash استفاده کنید. برای Redis محلی باید TLS قابل‌تنظیم شود.

### ۱. Clone کردن پروژه

```bash
git clone https://github.com/AmirMotefaker/LinkResan.git
cd LinkResan
```

استفاده از آخرین Release پایدار:

```bash
git checkout v2.0.0
```

### ۲. ساخت دیتابیس PostgreSQL

```bash
createdb linkresan_db
```

یا:

```sql
CREATE DATABASE linkresan_db;
```

مدل‌های `User`، `Link` و `Click` هنگام Startup با GORM AutoMigrate می‌شوند.

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

اجرا:

```bash
go run ./cmd/api
```

بررسی سلامت:

```bash
curl http://localhost:8080/api/health
```

### ۴. اجرای Frontend

در Terminal جدید:

```bash
cd frontend
npm ci
```

فایل `frontend/.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

اجرا:

```bash
npm run dev
```

| سرویس | آدرس |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend | `http://localhost:8080` |
| Health Check | `http://localhost:8080/api/health` |

---

<a id="environment-variables"></a>

## 🔑 متغیرهای محیطی

### Backend — `backend/.env`

| متغیر | اجباری | نمونه | توضیح |
|---|:---:|---|---|
| `DATABASE_URL` | ✅ | `postgres://...` | Connection String دیتابیس |
| `PORT` | ❌ | `8080` | پورت Fiber |
| `REDIS_ADDR` | ✅ | `host:6379` | آدرس Redis |
| `REDIS_PASSWORD` | وابسته به سرویس | `secret` | رمز Redis |

### Frontend — `frontend/.env.local`

| متغیر | اجباری | نمونه | توضیح |
|---|:---:|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | `http://localhost:8080/api` | Base URL گروه API |

### متغیرهای پیشنهادی برای Hardening آینده

کد `v2.0.0` هنوز این متغیرها را نمی‌خواند، اما انتقال تنظیمات Hardcoded به Environment در Roadmap قرار دارد:

```dotenv
JWT_SECRET=replace-with-a-long-random-secret
PUBLIC_BASE_URL=https://linkresan.ir
CORS_ALLOWED_ORIGINS=https://linkresan.ir
REDIS_TLS_ENABLED=true
APP_ENV=production
LOG_LEVEL=info
```

> [!CAUTION]
> فایل‌های `.env`، رمزها و Connection Stringهای واقعی را Commit نکنید.

---

<a id="api-reference"></a>

## 📡 مستندات API

### Base URL محلی

```text
Root:      http://localhost:8080
API Group: http://localhost:8080/api
```

### Authentication

Routeهای خصوصی به Header زیر نیاز دارند:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Endpointها

| متد | مسیر | توضیح | احراز هویت |
|---|---|---|:---:|
| `GET` | `/api/health` | Health Check | ❌ |
| `POST` | `/api/register` | ثبت‌نام | ❌ |
| `POST` | `/api/login` | ورود و دریافت JWT | ❌ |
| `POST` | `/api/links` | ساخت لینک پیشرفته | ✅ |
| `GET` | `/api/links` | دریافت لینک‌های کاربر | ✅ |
| `GET` | `/api/links/analytics` | آمار هفت روز اخیر | ✅ |
| `DELETE` | `/api/links/:id` | حذف لینک متعلق به کاربر | ✅ |
| `GET` | `/:code` | Resolve و Redirect | ❌ |

---

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

---

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

---

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

---

### ساخت لینک ساده

```bash
curl -X POST http://localhost:8080/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "original_url": "https://example.com/a/very/long/url"
  }'
```

```json
{
  "original_url": "https://example.com/a/very/long/url",
  "short_code": "aB3xY9",
  "short_url": "https://linkresan.ir/aB3xY9"
}
```

---

### ساخت لینک با تمام تنظیمات

```bash
curl -X POST http://localhost:8080/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "original_url": "https://example.com/campaign/summer",
    "custom_code": "summer-sale",
    "expires_at": "2026-08-01T20:30:00+03:30",
    "click_limit": 500
  }'
```

```json
{
  "original_url": "https://example.com/campaign/summer",
  "short_code": "summer-sale",
  "short_url": "https://linkresan.ir/summer-sale"
}
```

#### Request Schema

| فیلد | نوع | اجباری | توضیح |
|---|---|:---:|---|
| `original_url` | `string` | ✅ | مقصد اصلی |
| `custom_code` | `string` | ❌ | Alias دلخواه |
| `expires_at` | `ISO 8601 datetime` | ❌ | زمان انقضا |
| `click_limit` | `integer` | ❌ | حداکثر کلیک |

Alias تکراری:

```json
{
  "error": "این نام دلخواه قبلاً انتخاب شده است"
}
```

---

### دریافت لینک‌های کاربر

```bash
curl http://localhost:8080/api/links \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

```json
{
  "links": [
    {
      "ID": 1,
      "UserID": 1,
      "OriginalURL": "https://example.com/campaign/summer",
      "ShortCode": "summer-sale",
      "IsCustom": true,
      "ExpiresAt": "2026-08-01T17:00:00Z",
      "ClickLimit": 500,
      "ClickCount": 42,
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
> مدل Link در `v2.0.0` برای تمام فیلدها `json` tag اختصاصی ندارد؛ بنابراین بخشی از کلیدهای Response با نام Go مانند `OriginalURL` و `ClickCount` برمی‌گردند.

---

### Analytics هفت روز اخیر

```bash
curl http://localhost:8080/api/links/analytics \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

```json
{
  "analytics": [
    {
      "date": "2026-07-10",
      "count": 4
    },
    {
      "date": "2026-07-11",
      "count": 0
    },
    {
      "date": "2026-07-12",
      "count": 9
    },
    {
      "date": "2026-07-13",
      "count": 13
    },
    {
      "date": "2026-07-14",
      "count": 8
    },
    {
      "date": "2026-07-15",
      "count": 21
    },
    {
      "date": "2026-07-16",
      "count": 17
    }
  ]
}
```

داده‌ها:

- فقط برای لینک‌های کاربر جاری محاسبه می‌شوند.
- همیشه هفت Data Point تولید می‌کنند.
- بر اساس Timezone تهران گروه‌بندی می‌شوند.

---

### حذف لینک

```bash
curl -X DELETE http://localhost:8080/api/links/1 \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

```json
{
  "message": "Link deleted successfully"
}
```

حذف فعلی با GORM و `DeletedAt` انجام می‌شود و ماهیت Soft Delete دارد.

---

### Resolve لینک

```bash
curl -I http://localhost:8080/summer-sale
```

پاسخ موفق:

```http
HTTP/1.1 302 Found
Location: https://example.com/campaign/summer
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0
```

لینک نامعتبر، منقضی یا محدودشده:

```json
{
  "error": "Link not found, expired, or reached click limit"
}
```

### Status Codeها

| Status | کاربرد |
|---:|---|
| `200 OK` | Login، فهرست، Analytics و Delete |
| `201 Created` | Register و Create Link |
| `302 Found` | Redirect |
| `400 Bad Request` | Body نامعتبر، URL خالی یا Alias تکراری |
| `401 Unauthorized` | Token ناموجود یا نامعتبر |
| `404 Not Found` | لینک ناموجود، منقضی یا محدودشده |
| `500 Internal Server Error` | خطای داخلی |

---

## 🧪 دستورات توسعه

### Backend

```bash
cd backend

go mod download
go run ./cmd/api
go build ./cmd/api
go vet ./...
gofmt -w .
go test ./...
```

### Frontend

```bash
cd frontend

npm ci
npm run dev
npm run lint
npm run build
npm run start
```

---

<a id="deployment"></a>

## ☁️ استقرار

### Frontend روی Vercel

| تنظیم | مقدار |
|---|---|
| Root Directory | `frontend` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Environment Variable | `NEXT_PUBLIC_API_URL` |

### Backend

```bash
cd backend
go build -o linkresan-api ./cmd/api
./linkresan-api
```

### معماری Production

```mermaid
flowchart TB
    DOMAIN["linkresan.ir"] --> WEB["Vercel<br/>Next.js"]
    WEB --> API["Render<br/>Go Fiber"]
    API --> PG[("Neon PostgreSQL")]
    API --> RD[("Upstash Redis TLS")]
```

### Checklist استقرار Production

- [ ] تعریف `DATABASE_URL`
- [ ] تعریف `REDIS_ADDR`
- [ ] تعریف `REDIS_PASSWORD`
- [ ] تعریف `NEXT_PUBLIC_API_URL`
- [ ] فعال‌بودن HTTPS
- [ ] محدودکردن CORS
- [ ] استفاده از JWT Secret امن
- [ ] Backup دیتابیس
- [ ] Health Check پلتفرم
- [ ] Rate Limiting
- [ ] Logging و Monitoring

---

<a id="security-and-limitations"></a>

## 🛡️ امنیت و محدودیت‌های فعلی

این بخش رفتار واقعی کد `v2.0.0` را مستند می‌کند و برای Contributors و استقرار Production اهمیت دارد.

### Authentication

- JWT Secret داخل کد Hardcode شده است.
- Secret در Service و Middleware تکرار می‌شود.
- Token در `localStorage` قرار می‌گیرد.
- Refresh Token و Revocation وجود ندارد.
- Password Policy و Email Validation کامل نیست.
- فیلد `user_id` با Type Assertion مستقیم از Context خوانده می‌شود.

### URL و Alias

- URL ورودی Parse و Normalize نمی‌شود.
- Schemeهای مجاز به `http` و `https` محدود نشده‌اند.
- Alias محدودیت Character و طول دقیق در Application Layer ندارد.
- Reserved Aliasهایی مانند `api` یا `login` مدیریت نشده‌اند.
- تولید کد تصادفی Collision Retry صریح ندارد.
- Public Base URL روی `https://linkresan.ir/` Hardcode شده است.

### Cache

- Redis همیشه با TLS ساخته می‌شود.
- خرابی Redis باعث توقف Startup می‌شود.
- Cache Fallback وجود ندارد.
- خطای `SET` نادیده گرفته می‌شود.
- حذف Link، Cache مربوط به Short Code را Invalidate نمی‌کند.
- Cached Value فقط ID و URL را نگه می‌دارد؛ بنابراین Expiration و Click Limit پس از Cache Hit دوباره بررسی نمی‌شوند تا TTL منقضی شود.

### API و Build

- CORS روی `*` تنظیم شده است.
- Rate Limiting وجود ندارد.
- Error Schema یکپارچه نیست.
- App Name در Fiber همچنان `LinkResan API v1.0` است.
- Frontend Build خطاهای TypeScript و ESLint را نادیده می‌گیرد.
- مدل‌ها Response DTO و `json` tag یکپارچه ندارند.

### Analytics

- Country، City، DeviceType، Browser و IsUnique در مدل وجود دارند اما هنوز پر نمی‌شوند.
- GeoIP و User-Agent Parsing پیاده‌سازی نشده‌اند.
- Analytics فقط بازه ثابت هفت‌روزه دارد.
- نمودار Per-link و فیلتر تاریخ وجود ندارد.
- هر کلیک یک Goroutine مستقل ایجاد می‌کند؛ برای مقیاس بالا Queue مناسب‌تر است.

### Link Lifecycle

- ویرایش لینک وجود ندارد.
- Pause و Resume وجود ندارد.
- Cleanup خودکار لینک‌های منقضی وجود ندارد.
- Expiration و Click Limit در Cache Hit نیازمند اصلاح هستند.
- Cache بعد از Delete پاک نمی‌شود.

### Engineering

- Test Suite کامل وجود ندارد.
- CI/CD Workflow در Repository وجود ندارد.
- Dockerfile و Docker Compose وجود ندارد.
- OpenAPI یا Swagger وجود ندارد.
- Structured Logging، Metrics و Tracing وجود ندارد.
- Migration Versioning مستقل وجود ندارد و AutoMigrate استفاده می‌شود.

> [!CAUTION]
> Secretها، رمزها، Connection Stringها و اطلاعات آسیب‌پذیری را در Issue عمومی منتشر نکنید.

---

<a id="roadmap"></a>

## 🗺️ Roadmap کامل لینک‌رسان

Roadmap زیر با ترکیب قابلیت‌های تحویل‌شده در تمام Releaseها و فاصله‌های فنی موجود در `v2.0.0` تدوین شده است.

### نمای کلی

| فاز | تمرکز | وضعیت |
|---|---|:---:|
| Phase 0 | Core Shortener | ✅ تکمیل‌شده |
| Phase 1 | Authentication & Full-Stack MVP | ✅ تکمیل‌شده |
| Phase 2 | Cloud Deployment & Public Launch | ✅ تکمیل‌شده |
| Phase 3 | Link Management & Customization | ✅ تکمیل‌شده |
| Phase 4 | QR، Expiration و Localization | ✅ تکمیل‌شده |
| Phase 5 | Analytics Dashboard | ✅ نسخه اولیه تکمیل‌شده |
| Phase 6 | Security & Reliability | 🔜 اولویت بالا |
| Phase 7 | Advanced Analytics | 🧭 برنامه آینده |
| Phase 8 | Public API & Automation | 🧭 برنامه آینده |
| Phase 9 | Teams & Business Platform | 🧭 چشم‌انداز بلندمدت |

---

### Phase 0 — هسته کوتاه‌کننده لینک ✅

- [x] ساخت لینک کوتاه
- [x] تولید Short Code
- [x] Redirect به Original URL
- [x] ذخیره لینک در PostgreSQL
- [x] ثبت Click Event
- [x] ذخیره IP و User-Agent
- [x] Redis Cache
- [x] Click Count
- [x] ثبت غیرهمزمان آمار

### Phase 1 — حساب کاربری و Full-Stack MVP ✅

- [x] مدل User
- [x] ثبت‌نام
- [x] هش رمز با bcrypt
- [x] Login
- [x] JWT
- [x] Middleware محافظت‌شده
- [x] مالکیت لینک
- [x] API لینک‌های کاربر
- [x] جداسازی داده کاربران
- [x] Next.js App Router
- [x] Tailwind CSS 4
- [x] رابط RTL
- [x] اتصال Frontend و Backend
- [x] ذخیره Token در مرورگر
- [x] MVP قابل‌استفاده

### Phase 2 — Cloud و انتشار عمومی ✅

- [x] Cloud-ready Config
- [x] PostgreSQL ابری Neon
- [x] Redis ابری Upstash
- [x] TLS برای Redis
- [x] Backend روی Render
- [x] Frontend روی Vercel
- [x] دامنه `linkresan.ir`
- [x] HTTPS
- [x] README اولیه و مستندات نصب
- [x] Health Check

### Phase 3 — مدیریت حرفه‌ای لینک ✅

- [x] Dashboard حرفه‌ای
- [x] جدول لینک‌ها
- [x] تاریخ ساخت فارسی
- [x] نمایش دامنه واقعی
- [x] Copy Link
- [x] Open Link
- [x] Delete Link
- [x] بررسی مالکیت هنگام Delete
- [x] Soft Delete
- [x] Custom Alias
- [x] بررسی یکتایی Alias
- [x] Favicon اختصاصی
- [x] Redirect 302
- [x] Anti-cache Headers
- [x] اصلاح Cursor و Footer

### Phase 4 — قابلیت‌های Pro لینک ✅

- [x] QR Code
- [x] QR Modal
- [x] دانلود PNG
- [x] Error Correction Level H
- [x] تاریخ انقضا
- [x] ساعت انقضا
- [x] تقویم شمسی
- [x] Click Limit
- [x] Enforcement در Resolve
- [x] تبدیل اعداد انگلیسی و فارسی
- [x] Localized Dashboard

### Phase 5 — Analytics نسخه اول ✅

- [x] Endpoint Analytics
- [x] تجمیع Clickهای هفت‌روزه
- [x] Timezone تهران
- [x] روزهای بدون کلیک
- [x] Recharts Area Chart
- [x] محور و Tooltip فارسی
- [x] نمایش Click Count هر لینک
- [x] Dashboard Analytics

---

### Phase 6 — امنیت و پایداری 🔜

#### Authentication

- [ ] انتقال JWT Secret به Environment
- [ ] حذف Secret تکراری از Service و Middleware
- [ ] Refresh Token
- [ ] Token Rotation
- [ ] Token Revocation
- [ ] Secure HttpOnly Cookie
- [ ] SameSite و Secure Cookie
- [ ] Password Policy
- [ ] Email Validation
- [ ] Email Verification
- [ ] Password Reset
- [ ] Session Management
- [ ] Login Rate Limit
- [ ] Brute-force Protection

#### API Security

- [ ] CORS Allowlist
- [ ] Rate Limiting عمومی
- [ ] Request Size Limit
- [ ] Security Headers
- [ ] Input Sanitization
- [ ] URL Validation
- [ ] جلوگیری از `javascript:` و Schemeهای ناامن
- [ ] Alias Validation
- [ ] Reserved Alias List
- [ ] Collision Retry
- [ ] Error Response استاندارد
- [ ] Request ID
- [ ] Audit Log

#### Cache Reliability

- [ ] `REDIS_TLS_ENABLED`
- [ ] Redis Local Mode
- [ ] Cache Fallback
- [ ] Circuit Breaker
- [ ] Timeout برای Redis
- [ ] Cache Invalidation هنگام Delete
- [ ] Cache Invalidation هنگام Update
- [ ] ذخیره Expiration و Click Limit در Cached Link
- [ ] بررسی محدودیت‌ها در Cache Hit
- [ ] جلوگیری از Click Limit Race Condition

---

### Phase 7 — Analytics پیشرفته 🧭

#### داده‌های بازدید

- [ ] Unique Visitor Detection
- [ ] Hash یا Anonymize کردن IP
- [ ] Browser Detection
- [ ] Operating System Detection
- [ ] Device Type Detection
- [ ] Bot Detection
- [ ] Country Detection
- [ ] City Detection
- [ ] GeoIP Integration
- [ ] Referrer Domain
- [ ] Direct / Referral Classification
- [ ] UTM Source
- [ ] UTM Medium
- [ ] UTM Campaign
- [ ] UTM Content
- [ ] UTM Term

#### داشبورد

- [ ] Analytics اختصاصی هر لینک
- [ ] Date Range Picker
- [ ] بازه ۲۴ ساعت
- [ ] بازه ۷ روز
- [ ] بازه ۳۰ روز
- [ ] بازه ۹۰ روز
- [ ] Custom Date Range
- [ ] نمودار Real-time
- [ ] مقایسه دو بازه
- [ ] Top Links
- [ ] Top Referrers
- [ ] Top Countries
- [ ] Top Devices
- [ ] Top Browsers
- [ ] Heatmap ساعت و روز
- [ ] Conversion Events
- [ ] Export CSV
- [ ] Export JSON
- [ ] گزارش PDF
- [ ] ارسال گزارش دوره‌ای

---

### Phase 8 — مدیریت کامل لینک 🧭

- [ ] Edit Original URL
- [ ] Edit Alias
- [ ] Edit Expiration
- [ ] Edit Click Limit
- [ ] Pause Link
- [ ] Resume Link
- [ ] Archive Link
- [ ] Hard Delete اختیاری
- [ ] Bulk Delete
- [ ] Bulk Import
- [ ] Bulk Export
- [ ] Tags
- [ ] Folders
- [ ] Search
- [ ] Filters
- [ ] Sort
- [ ] Pagination
- [ ] Duplicate Link
- [ ] Password-protected Links
- [ ] One-time Links
- [ ] Link Preview
- [ ] Social Preview Metadata
- [ ] Custom QR Colors
- [ ] QR Logo
- [ ] QR SVG Download
- [ ] Expired Link Landing Page
- [ ] Custom Redirect Page
- [ ] Scheduled Activation
- [ ] Cleanup Job برای لینک‌های منقضی

---

### Phase 9 — Public API و Automation 🧭

- [ ] API Key Management
- [ ] Personal Access Tokens
- [ ] Scopeهای API
- [ ] API Usage Dashboard
- [ ] API Rate Limits
- [ ] OpenAPI 3 Specification
- [ ] Swagger UI
- [ ] Webhook هنگام Click
- [ ] Webhook هنگام Expiration
- [ ] Webhook هنگام رسیدن به Click Limit
- [ ] Signed Webhooks
- [ ] Idempotency Key
- [ ] SDK برای JavaScript
- [ ] SDK برای Go
- [ ] CLI رسمی
- [ ] Zapier Integration
- [ ] n8n Integration
- [ ] Browser Extension
- [ ] Telegram Bot
- [ ] WordPress Plugin

---

### Phase 10 — تیم‌ها و کسب‌وکارها 🧭

- [ ] Workspace
- [ ] دعوت اعضا
- [ ] Role-based Access Control
- [ ] Owner / Admin / Editor / Viewer
- [ ] Shared Link Library
- [ ] Team Analytics
- [ ] Custom Domains
- [ ] Domain Verification
- [ ] Branded Short Links
- [ ] Multiple Domains
- [ ] Premium Plans
- [ ] Usage Quotas
- [ ] Subscription Management
- [ ] Invoice
- [ ] Organization Settings
- [ ] SSO
- [ ] Two-factor Authentication
- [ ] Activity Log
- [ ] Data Retention Policy
- [ ] SLA و Status Page

---

### Phase 11 — Engineering و DevOps 🧭

#### Quality

- [ ] Unit Tests Backend
- [ ] Repository Tests
- [ ] Service Tests
- [ ] Handler Tests
- [ ] Integration Tests
- [ ] Frontend Component Tests
- [ ] End-to-End Tests
- [ ] Load Tests
- [ ] Race Tests
- [ ] Test Coverage Badge

#### CI/CD

- [ ] GitHub Actions
- [ ] Go Format Check
- [ ] Go Vet
- [ ] Frontend Lint
- [ ] Type Check
- [ ] Production Build Check
- [ ] Automated Tests
- [ ] Dependency Review
- [ ] Secret Scanning
- [ ] CodeQL
- [ ] Automated Release
- [ ] Conventional Changelog
- [ ] Preview Deployments

#### Runtime

- [ ] Dockerfile Backend
- [ ] Dockerfile Frontend
- [ ] Docker Compose
- [ ] Versioned Database Migration
- [ ] Graceful Shutdown
- [ ] Database Connection Pool
- [ ] Redis Connection Pool
- [ ] Background Worker
- [ ] Queue برای Click Events
- [ ] Retry Policy
- [ ] Dead-letter Queue
- [ ] Scheduled Jobs
- [ ] Horizontal Scaling
- [ ] CDN Strategy

#### Observability

- [ ] Structured Logging
- [ ] Log Correlation
- [ ] Metrics
- [ ] Prometheus Endpoint
- [ ] Grafana Dashboard
- [ ] Distributed Tracing
- [ ] Error Tracking
- [ ] Uptime Monitoring
- [ ] Alerting
- [ ] Slow Query Monitoring
- [ ] Performance Budget
- [ ] Backup و Restore Drill

---

### Phase 12 — UX، دسترسی‌پذیری و جامعه 🧭

#### UX

- [ ] Dark Mode
- [ ] Theme Preference
- [ ] PWA
- [ ] Installable App
- [ ] Mobile-first Dashboard
- [ ] Skeleton Loading
- [ ] Toast System
- [ ] Form Validation Messages
- [ ] Undo Delete
- [ ] Keyboard Shortcuts
- [ ] Accessibility Audit
- [ ] WCAG Improvements
- [ ] Reduced Motion
- [ ] English Locale
- [ ] Arabic Locale

#### Documentation

- [ ] فایل `.env.example`
- [ ] فایل `LICENSE`
- [ ] فایل `CONTRIBUTING.md`
- [ ] فایل `SECURITY.md`
- [ ] فایل `CODE_OF_CONDUCT.md`
- [ ] Issue Templates
- [ ] Pull Request Template
- [ ] Architecture Decision Records
- [ ] Deployment Guide
- [ ] Self-hosting Guide
- [ ] API Documentation Site
- [ ] Contributor Guide
- [ ] Release Checklist

---

<a id="contributing"></a>

## 🤝 مشارکت

Contribution، Bug Report و پیشنهاد Feature خوش‌آمد است.

### Workflow

1. Repository را Fork کنید.
2. Branch بسازید:

```bash
git checkout -b feat/your-feature
```

3. تغییرات را Commit کنید:

```bash
git commit -m "feat: add your feature"
```

4. Push کنید:

```bash
git push origin feat/your-feature
```

5. Pull Request بسازید.

### Conventional Commits

```text
feat: add per-link analytics
fix: enforce expiration on redis cache hit
docs: update release history
refactor: move JWT secret to config
test: add link service tests
chore: add GitHub Actions
```

### بررسی قبل از Pull Request

```bash
cd backend
gofmt -w .
go vet ./...
go test ./...

cd ../frontend
npm run lint
npm run build
```

### PR حرفه‌ای شامل

- شرح مسئله
- شرح راه‌حل
- Scope تغییر
- Screenshot برای UI
- روش تست
- Breaking Changes
- Issue مرتبط

---

## 🐛 گزارش Bug

[ایجاد Issue جدید](https://github.com/AmirMotefaker/LinkResan/issues/new)

اطلاعات پیشنهادی:

- نسخه LinkResan
- سیستم‌عامل
- نسخه Go
- نسخه Node.js
- مراحل بازتولید
- رفتار موردانتظار
- رفتار فعلی
- Log غیرحساس
- Screenshot

برای مشکلات امنیتی، جزئیات حساس را در Issue عمومی ثبت نکنید.

---

<a id="license"></a>

## 📄 لایسنس

پروژه در مستندات خود به **MIT License** اشاره می‌کند.

برای شناسایی رسمی لایسنس توسط GitHub، Package Managerها و ابزارهای خودکار، فایل مستقل `LICENSE` باید در Root Repository اضافه شود.

---

<details>
<summary><strong>English overview</strong></summary>

<br/>

**LinkResan** is an open-source, Persian-first URL shortening, link-management and analytics platform.

### Latest release

The latest release is **v2.0.0 — Advanced Analytics & Pro Features**, released on July 16, 2026.

### Current capabilities

- Email and password authentication
- bcrypt password hashing
- JWT-protected routes
- Random six-character short codes
- Custom aliases with uniqueness checking
- PostgreSQL persistence through GORM
- Redis-backed resolution
- 302 redirects with anti-cache headers
- Asynchronous click recording
- User-owned link dashboard
- Link deletion
- Jalali date and digital time picker
- Expiration date enforcement
- Click-limit enforcement
- Client-side QR code generation
- High-quality PNG QR downloads
- Seven-day click analytics
- Tehran timezone aggregation
- Persian numerals and RTL user interface
- Production deployment with Vercel, Render, Neon and Upstash

### Stack

- Go 1.25
- Fiber 2
- PostgreSQL
- Redis
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts
- qrcode.react

LinkResan is a functional public product. Security hardening, advanced visitor analytics, public APIs, automation, team workspaces, testing and observability are included in the project roadmap.

</details>

---

<div align="center">

### ساخته‌شده با ❤️ برای توسعه‌دهندگان و کسب‌وکارهای ایرانی

توسط [**امیر متفکر**](https://amirmotefaker.ir)  
پروژه [**LinkResan**](https://github.com/AmirMotefaker/LinkResan)

<br/>

[⬆ بازگشت به بالا](#table-of-contents)

</div>

<img
  src="https://capsule-render.vercel.app/api?type=waving&color=0:7C3AED,35:4F46E5,70:1D4ED8,100:0F172A&height=125&section=footer"
  width="100%"
  alt=""
/>
