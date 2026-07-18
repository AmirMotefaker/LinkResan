import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "./sw-register";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linkresan.ir"),
  title: {
    default: "لینک رسان | کوتاه‌کننده لینک حرفه‌ای رایگان",
    template: "%s | لینک رسان",
  },
  description: "سرویس کوتاه‌کننده لینک حرفه‌ای، رایگان و متن‌باز برای کاربران ایرانی. ساخت لینک کوتاه، QR Code، صفحه بیو و آمار دقیق کلیک‌ها.",
  keywords: ["کوتاه کننده لینک", "لینک رسان", "short link", "url shortener", "کوتاه کردن لینک", "qr code", "linkresan"],
  authors: [{ name: "امیر متفکر" }],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: "لینک رسان",
    statusBarStyle: "default",
    capable: true,
  },
  openGraph: {
    title: "لینک رسان | کوتاه‌کننده لینک حرفه‌ای",
    description: "کوتاه‌سازی لینک، QR Code، صفحه بیو و آمار دقیق کلیک‌ها برای کاربران ایرانی.",
    url: "https://linkresan.ir",
    siteName: "لینک رسان",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "لینک رسان | کوتاه‌کننده لینک حرفه‌ای",
    description: "کوتاه‌سازی لینک، QR Code، صفحه بیو و آمار دقیق کلیک‌ها برای کاربران ایرانی.",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}