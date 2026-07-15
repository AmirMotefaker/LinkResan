import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "لینک رسان | کوتاه‌کننده حرفه‌ای لینک",
  description: "سرویس کوتاه‌کننده لینک حرفه‌ای، رایگان و متن‌باز برای کاربران ایرانی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}