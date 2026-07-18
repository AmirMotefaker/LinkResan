"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Link2, Check, ArrowLeft, Crown, BarChart2, Building2, Zap, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const toFa = (num: any) => num.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function PlanDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const planSlug = params.plan;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const plansData: any = {
    basic: { name: "پایه", icon: BarChart2, price: 49000, desc: "ابزارهای کامل برای بلاگرها و تولیدکنندگان محتوا", features: ["لینک کوتاه نامحدود", "آمار پیشرفته (۳۰ روز اخیر)", "اسلاگ دلخواه نامحدود", "تاریخ انقضا و محدودیت کلیک", "رمز عبور برای لینک‌ها"] },
    pro: { name: "حرفه‌ای", icon: Crown, price: 149000, desc: "راهکار حرفه‌ای برای کسب‌وکارها و فروشگاه‌ها", features: ["تمام امکانات پلن پایه", "آمار پیشرفته (نامحدود)", "۱ دامنه اختصاصی رایگان", "دیپ‌لینکینگ شبکه‌های اجتماعی", "سازنده UTM و تگ‌گذاری", "صفحه بیو بدون تبلیغات"] },
    enterprise: { name: "سازمانی", icon: Building2, price: 499000, desc: "قدرت کامل لینک رسان برای آژانس‌ها و تیم‌ها", features: ["تمام امکانات پلن حرفه‌ای", "۵ دامنه اختصاصی", "مدیریت تیم (Multi-user)", "API دسترسی پیشرفته", "پشتیبانی اختصاصی ۲۴/۷", "حذف کامل برند لینک رسان"] },
    free: { name: "رایگان", icon: Zap, price: 0, desc: "برای شروع کار و تست سرویس", features: ["۵۰ لینک کوتاه در ماه", "آمار کلیک (۷ روز اخیر)", "اسلاگ دلخواه (۵ مورد در ماه)", "تولید QR Code"] },
  };

  const plan = plansData[planSlug as string];

  const handlePayment = async () => {
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

  if (!plan) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>پلن پیدا نشد. <button onClick={() => router.push("/pricing")} className="text-indigo-600">بازگشت</button></p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 px-4 py-12">
      <div className="w-full max-w-3xl">
        <button onClick={() => router.push("/pricing")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4 rotate-180" />
          بازگشت به پلن‌ها
        </button>

        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="inline-block bg-indigo-50 p-4 rounded-2xl mb-6 border border-indigo-100">
            <plan.icon className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold mb-2">پلن {plan.name}</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">{plan.desc}</p>

          <div className="mb-10">
            <span className="text-5xl font-extrabold text-indigo-600">{toFa(plan.price.toLocaleString())}</span>
            <span className="text-xl text-gray-500 mr-2">تومان / ماه</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right mb-10 max-w-xl mx-auto">
            {plan.features.map((f: string, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <div className="bg-green-100 p-1 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {plan.price === 0 ? (
            <button onClick={() => router.push("/dashboard")} className="w-full max-w-xs h-14 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-colors cursor-pointer">
              شروع رایگان
            </button>
          ) : (
            <button 
              onClick={handlePayment} 
              disabled={loading}
              className="w-full max-w-xs h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  پرداخت و فعال‌سازی پلن {plan.name}
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </button>
          )}
          <p className="mt-6 text-xs text-gray-400">پرداخت شما از طریق درگاه امن زرین‌پال انجام می‌شود. شماره تراکنش برای شما پیامک می‌شود.</p>
        </div>
      </div>
    </main>
  );
}