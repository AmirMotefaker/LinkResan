# استفاده از نسخه سبک گولنگ (آپدیت شد به 1.25)
FROM golang:1.25-alpine AS builder

# تنظیم پوشه کاری
WORKDIR /app

# کپی فایل‌های وابستگی و دانلود آن‌ها
COPY go.mod go.sum ./
RUN go mod download

# کپی بقیه کدها
COPY . .

# کامپایل کردن برنامه
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/api

# استفاده از یک ایمیج بسیار سبک برای اجرا
FROM alpine:latest
WORKDIR /app

# کپی فایل اجرایی ساخته شده
COPY --from=builder /app/main .

# پورتی که برنامه روی آن اجرا می‌شود
EXPOSE 8080

# اجرای برنامه
CMD ["./main"]