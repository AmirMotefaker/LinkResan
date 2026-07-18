"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Check, Loader2, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpgrade = async () => {
    setLoading(true);
    setError("");
    
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/payment/request`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (res.ok && data.payment_url) {
        // ارسال کاربر به درگاه زرین‌پال
        window.location.href = data.payment_url;
      } else {
        setError(data.error || "خطا در ایجاد تراکنش");
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "کوتاه‌سازی نامحدود لینک",
    "اسلاگ دلخواه (نام شخصی‌سازی شده)",
    "آمار پیشرفته (مرورگر، سیستم‌عامل و نمودارها)",
    "تاریخ انقضا و محدودیت کلیک",
    "تولید کد QR حرفه‌ای",
    "حمایت از توسعه‌دهنده ایرانی 🇮🇷"
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div onClick={() => router.push("/dashboard")} className="inline-flex items-center gap-2 cursor-pointer mb-4">
            <Link2 className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-bold tracking-tight">لینک رسان</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">ارتقا به پلن Pro</h1>
          <p className="text-gray-500 mt-2">با ارتقا به پلن حرفه‌ای، تمام محدودیت‌ها را بردارید</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <span className="text-5xl font-extrabold text-indigo-600">۱۰۰,۰۰۰</span>
            <span className="text-xl text-gray-500 mr-2">تومان / ماهانه</span>
          </div>

          <div className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-green-100 p-1 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <button 
            onClick={handleUpgrade} 
            disabled={loading}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mb-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                پرداخت و ارتقا به پلن Pro
                <ArrowLeft className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            شما به درگاه امن زرین‌پال منتقل می‌شوید. پرداخت شما به صورت رمزنگاری شده است.
          </p>
        </div>

        <button onClick={() => router.push("/dashboard")} className="w-full mt-6 text-sm text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer">
          بازگشت به داشبورد
        </button>
      </div>
    </main>
  );
}