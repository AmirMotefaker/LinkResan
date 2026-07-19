import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "./sw-register";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linkresan.ir"),
  title: {
    default: "کوتاه‌کننده لینک حرفه‌ای رایگان | لینک رسان",
    template: "%s | لینک رسان",
  },
  description: "لینک رسان؛ بهترین کوتاه‌کننده لینک ایرانی. کوتاه کردن لینک بلند، ساخت لینک بایو، تولید QR Code و ریدایرکت لینک با آمار دقیق کلیک. جایگزین Bitly برای ایرانیان.",
  keywords: [
    "کوتاه کردن لینک",
    "کوتاه کننده لینک",
    "ساخت لینک کوتاه",
    "کوتاه کننده لینک ایرانی",
    "کوتاه کردن آدرس",
    "ابزار کوتاه کردن لینک",
    "لینک بایو",
    "کوتاه کننده لینک رایگان",
    "تبدیل لینک طولانی به کوتاه",
    "ریدایرکت لینک",
    "linkresan",
    "url shortener"
  ],
  authors: [{ name: "امیر متفکر" }],
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://linkresan.ir",
  },
  openGraph: {
    title: "کوتاه‌کننده لینک حرفه‌ای رایگان | لینک رسان",
    description: "کوتاه کردن لینک، ساخت لینک بایو، QR Code و آمار دقیق کلیک‌ها برای کاربران ایرانی.",
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
  colorScheme: "light dark",
};

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

// داده‌های ساختاریافته برای موتورهای جستجو و هوش مصنوعی (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "لینک رسان (LinkResan)",
  "url": "https://linkresan.ir",
  "description": "سرویس کوتاه‌کننده لینک حرفه‌ای، رایگان و متن‌باز برای کاربران ایرانی.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "inLanguage": "fa-IR",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "IRR"
  },
  "creator": {
    "@type": "Person",
    "name": "امیر متفکر",
    "url": "https://amirmotefaker.ir"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}