"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

export default function ShortLinkRedirect() {
  const params = useParams();
  const code = params.code;

  useEffect(() => {
    if (code && API_BASE_URL) {
      // اضافه کردن تایم‌استمپ (Timestamp) برای جلوگیری از کش شدن ریدایرکت توسط مرورگر
      // این کار باعث می‌شود مرورگر هر بار مجبور شود درخواست جدید به سرور بفرستد
      const timestamp = new Date().getTime();
      window.location.href = `${API_BASE_URL}/${code}?t=${timestamp}`;
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