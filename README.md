
```markdown
# 🔗 لینک رسان (LinkResan)

سرویس کوتاه‌کننده لینک حرفه‌ای، رایگان و متن‌باز برای کاربران ایرانی.
این پروژه با هدف ارائه جایگزین مناسب برای سرویس‌های محدودکننده ایرانی مانند Bitly توسعه می‌یابد.

## ✨ امکانات فعلی (MVP)
- کوتاه کردن لینک‌های بلند با کد ۶ کاراکتری تصادفی و یکتا
- ریدایرکت سریع با کد وضعیت 301 (مناسب برای سئو)
- ثبت آمار کلیک‌ها (IP، مرورگر، Referrer)
- معماری تمیز (Clean Architecture) و مقیاس‌پذیر

## 🛠 تکنولوژی‌های استفاده شده
- **بک‌اند:** Go (Golang), Fiber, GORM
- **پایگاه داده:** PostgreSQL

## 🚀 نحوه اجرای پروژه (توسعه محلی)

۱. کلون کردن ریپازیتوری:
```bash
git clone https://github.com/AmirMotefaker/LinkResan.git
cd LinkResan/backend
```

۲. تنظیم متغیرهای محیطی:
فایل `.env.example` را به `.env` تغییر نام دهید و اطلاعات دیتابیس PostgreSQL خود را وارد کنید.

۳. اجرای سرور:
```bash
go run cmd/api/main.go
```

## 📡 مستندات API

### ساخت لینک کوتاه
```http
POST /api/links
```
**بدنه درخواست:**
```json
{
  "original_url": "https://github.com/AmirMotefaker/LinkResan"
}
```
**پاسخ:**
```json
{
  "original_url": "https://github.com/AmirMotefaker/LinkResan",
  "short_code": "fZ3n4g",
  "short_url": "http://localhost:8080/fZ3n4g"
}
```

### ریدایرکت
```http
GET /:code
```
کاربر به لینک اصلی ریدایرکت می‌شود.

---
توسعه‌دهنده: [AmirMotefaker](https://github.com/AmirMotefaker)