"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, ArrowLeft, Crown, BarChart2, Building2, Zap, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const toFa = (num: any) => num.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function PlanDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const planSlug = params.plan;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plansData: any = {
    basic: { name: "پایه", icon: BarChart2, monthly: 49000, yearly: 490000, desc: "ابزارهای کامل برای بلاگرها و تولیدکنندگان محتوا", features: ["لینک کوتاه نامحدود", "آمار پیشرفته (۳۰ روز اخیر)", "اسلاگ دلخواه نامحدود", "تاریخ انقضا و محدودیت کلیک", "رمز عبور برای لینک‌ها"] },
    pro: { name: "حرفه‌ای", icon: Crown, monthly: 149000, yearly: 1490000, desc: "راهکار حرفه‌ای برای کسب‌وکارها و فروشگاه‌ها", features: ["تمام امکانات پلن پایه", "آمار پیشرفته (نامحدود)", "۱ دامنه اختصاصی رایگان", "دیپ‌لینکینگ شبکه‌های اجتماعی", "سازنده UTM و تگ‌گذاری", "صفحه بیو بدون تبلیغات"] },
    enterprise: { name: "سازمانی", icon: Building2, monthly: 499000, yearly: 4990000, desc: "قدرت کامل لینک رسان برای آژانس‌ها و تیم‌ها", features: ["تمام امکانات پلن حرفه‌ای", "۵ دامنه اختصاصی", "مدیریت تیم (Multi-user)", "API دسترسی پیشرفته", "پشتیبانی اختصاصی ۲۴/۷", "حذف کامل برند لینک رسان"] },
    free: { name: "رایگان", icon: Zap, monthly: 0, yearly: 0, desc: "برای شروع کار و تست سرویس", features: ["۵۰ لینک کوتاه در ماه", "آمار کلیک (۷ روز اخیر)", "اسلاگ دلخواه (۵ مورد در ماه)", "تولید QR Code"] },
  };

  const plan = plansData[planSlug as string];
  const currentPrice = billingCycle === 'monthly' ? plan?.monthly : plan?.yearly;

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    try {
      const res = await fetch(`${API_URL}/payment/request`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ amount: currentPrice, plan_name: plan.name }) });
      const data = await res.json();
      if (res.ok && data.payment_url) { window.location.href = data.payment_url; } else { setError(data.error || "خطا در ایجاد تراکنش"); }
    } catch { setError("ارتباط با سرور برقرار نشد"); } finally { setLoading(false); }
  };

  const handleBack = () => { router.push("/pricing"); };

  if (!plan) {
    return (<main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"><p>پلن پیدا نشد. <button onClick={handleBack} className="text-indigo-600 cursor-pointer">بازگشت</button></p></main>);
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      <div className="w-full max-w-3xl">
        <button onClick={handleBack} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4 rotate-180" /> بازگشت به پلن‌ها
        </button>
        <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
          <div className="inline-block bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl mb-6 border border-indigo-100 dark:border-gray-600"><plan.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" /></div>
          <h1 className="text-4xl font-extrabold mb-2">پلن {plan.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">{plan.desc}</p>

          {plan.monthly > 0 && (
            <div className="flex items-center gap-4 mb-8 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <button onClick={() => setBillingCycle("monthly")} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>ماهانه</button>
              <button onClick={() => setBillingCycle("yearly")} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${billingCycle === 'yearly' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>سالانه (۲ ماه رایگان)</button>
            </div>
          )}

          <div className="mb-10">
            {currentPrice === 0 ? (<span className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">رایگان</span>) : (<><span className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">{toFa(currentPrice.toLocaleString())}</span><span className="text-xl text-gray-500 dark:text-gray-400 mr-2">تومان / {billingCycle === 'monthly' ? 'ماه' : 'سال'}</span></>)}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right mb-10 max-w-xl mx-auto w-full">
            {plan.features.map((f: string, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full"><Check className="w-4 h-4 text-green-600 dark:text-green-400" /></div>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="w-full flex justify-center">
            {plan.monthly === 0 ? (
              <button onClick={() => router.push("/dashboard")} className="w-full max-w-xs h-14 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl transition-colors cursor-pointer">شروع رایگان</button>
            ) : (
              <button onClick={handlePayment} disabled={loading} className="w-full max-w-xs h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                {loading ? <Loader2 className="animate-spin" /> : (<>پرداخت و فعال‌سازی<ArrowLeft className="w-5 h-5" /></>)}
              </button>
            )}
          </div>
          <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 max-w-xs mx-auto">پرداخت شما از طریق درگاه امن زرین‌پال انجام می‌شود.</p>
        </div>
      </div>
    </main>
  );
}