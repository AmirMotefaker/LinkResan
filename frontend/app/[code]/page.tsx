"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

// آدرس بک‌اند آنلاین شما (بدون /api در آخر)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

export default function ShortLinkRedirect() {
  const params = useParams();
  const code = params.code; // گرفتن کد از آدرس (مثلا xyz از linkresan.ir/xyz)

  useEffect(() => {
    if (code && API_BASE_URL) {
      // ارسال کاربر به بک‌اند برای ریدایرکت 301
      // بک‌اند Go او را به صورت خودکار به لینک اصلی می‌برد
      window.location.href = `${API_BASE_URL}/${code}`;
    }
  }, [code, API_BASE_URL]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-6"></div>
        <h1 className="text-2xl font-bold mb-2">در حال انتقال...</h1>
        <p className="text-gray-500">لطفاً چند لحظه صبر کنید تا به مقصد برسید.</p>
      </div>
    </main>
  );
}