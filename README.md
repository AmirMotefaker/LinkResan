# 🔗 لینک رسان (LinkResan)

<p align="center">
  <a href="https://linkresan.ir" target="_blank">
    <img src="https://img.shields.io/badge/Website-linkresan.ir-indigo?style=for-the-badge&logo=googlechrome" />
  </a>
  <img src="https://img.shields.io/badge/Go-1.22+-00ADD8?style=for-the-badge&logo=go" />
  <img src="https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

<p align="center">
  سرویس کوتاه‌کننده لینک حرفه‌ای، رایگان و متن‌باز برای کاربران ایرانی. 
  <br>
  جایگزین مناسب و امن برای سرویس‌های محدودکننده خارجی (مانند Bitly)، ساخته‌شده با جدیدترین تکنولوژی‌های روز دنیا.
</p>

---

## 🌟 معرفی پروژه
«لینک رسان» یک پلتفرم Full-Stack برای کوتاه‌سازی لینک‌هاست که با تمرکز بر **سرعت بالا**، **امنیت** و **داشبورد تحلیلی** طراحی شده است. این پروژه با معماری تمیز (Clean Architecture) توسعه یافته است تا مقیاس‌پذیری بالایی داشته باشد.

🌐 **وب‌سایت رسمی:** [https://linkresan.ir](https://linkresan.ir)

---

## ✨ امکانات کلیدی
- 🔐 **احراز هویت امن:** ثبت‌نام و ورود با JWT و رمزنگاری Bcrypt.
- ⚡ **ریدایرکت فوق‌سریع:** استفاده از **Redis** برای کش کردن لینک‌ها (Cache Hit در کسری از میلی‌ثانیه).
- 📊 **داشبورد تحلیلی:** نمایش تعداد کلیک‌ها، مرورگر و سیستم‌عامل کاربران.
- 🛡️ **معماری مقیاس‌پذیر:** ثبت آمار کلیک‌ها به صورت ناهمگام (Asynchronous) برای جلوگیری از افت سرعت.
- 🎨 **رابط کاربری مدرن:** طراحی مینیمال و واکنش‌گرا (Responsive) با Tailwind CSS و فونت Vazirmatn.

---

## 🛠 استک تکنولوژی (Tech Stack)
### بک‌اند (Backend)
- **زبان:** Go (Golang)
- **فریم‌ورک:** Fiber
- **ORM:** GORM
- **دیتابیس:** PostgreSQL
- **کش:** Redis

### فرانت‌اند (Frontend)
- **فریم‌ورک:** Next.js (App Router)
- **استایل:** Tailwind CSS v4
- **انیمیشن:** Framer Motion
- **آیکون‌ها:** Lucide React

---

## 🚀 راه‌اندازی محلی (Local Development)
برای اجرای پروژه روی سیستم خود، مراحل زیر را دنبال کنید:

### پیش‌نیازها
- نصب Go (نسخه 1.21 به بالا)
- نصب Node.js (نسخه 18 به بالا)
- نصب PostgreSQL و Redis (یا استفاده از Docker)

### ۱. بک‌اند
```bash
cd backend
cp .env.example .env  # تنظیمات دیتابیس را در فایل .env وارد کنید
go mod download
go run cmd/api/main.go
```
سرور بک‌اند روی پورت `8080` اجرا می‌شود.

### ۲. فرانت‌اند
```bash
cd frontend
npm install
npm run dev
```
سرور فرانت‌اند روی پورت `3000` اجرا می‌شود.

---

## 📡 مستندات API
| متد | مسیر | توضیح | نیاز به توکن |
|------|----------------------|--------------------------------|--------------|
| POST | `/api/register` | ثبت‌نام کاربر جدید | ❌ |
| POST | `/api/login` | ورود کاربر و دریافت توکن JWT | ❌ |
| POST | `/api/links` | ساخت لینک کوتاه جدید | ✅ |
| GET | `/api/links` | دریافت لیست لینک‌های کاربر | ✅ |
| GET | `/:code` | ریدایرکت به لینک اصلی | ❌ |

---

## 🗺 نقشه راه (Roadmap)
- [x] سیستم احراز هویت (JWT)
- [x] اتصال Redis برای کشینگ
- [x] داشبورد نمایش آمار کلیک
- [ ] امکان تعیین اسلاگ دلخواه (Custom Alias)
- [ ] تولید QR Code خودکار برای لینک‌ها
- [ ] تعیین تاریخ انقضا برای لینک‌ها
- [x] **دیپلوی روی دامنه اختصاصی (linkresan.ir)**

---

## 👤 توسعه‌دهنده
ساخته شده با ❤️ توسط **امیر متفکر**
- گیت‌هاب: [@AmirMotefaker](https://github.com/AmirMotefaker)

## 📄 لایسنس
این پروژه تحت لایسنس MIT منتشر شده است و استفاده از آن برای همه آزاد است.