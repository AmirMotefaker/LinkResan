"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Check, X, Zap, Shield, BarChart2, Globe, Crown, Building2, ArrowLeft } from "lucide-react";

const toFa = (num: any) => num.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const plans = [
    {
      slug: "free",
      name: "رایگان",
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      desc: "برای شروع کار و تست سرویس",
      features: [
        { text: "۵۰ لینک کوتاه در ماه", included: true },
        { text: "آمار کلیک (۷ روز اخیر)", included: true },
        { text: "اسلاگ دلخواه (۵ مورد در ماه)", included: true },
        { text: "تولید QR Code", included: true },
        { text: "تاریخ انقضا و محدودیت کلیک", included: false },
        { text: "دامنه اختصاصی", included: false },
      ],
      cta: "شروع رایگان",
      highlight: false,
      color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    },
    {
      slug: "basic",
      name: "پایه",
      icon: BarChart2,
      price: { monthly: 49000, yearly: 490000 },
      desc: "برای بلاگرها و تولیدکنندگان محتوا",
      features: [
        { text: "لینک کوتاه نامحدود", included: true },
        { text: "آمار پیشرفته (۳۰ روز اخیر)", included: true },
        { text: "اسلاگ دلخواه نامحدود", included: true },
        { text: "تاریخ انقضا و محدودیت کلیک", included: true },
        { text: "رمز عبور برای لینک‌ها", included: true },
        { text: "دامنه اختصاصی", included: false },
      ],
      cta: "انتخاب پلن پایه",
      highlight: false,
      color: "bg-indigo-600 text-white hover:bg-indigo-700",
    },
    {
      slug: "pro",
      name: "حرفه‌ای",
      icon: Crown,
      price: { monthly: 149000, yearly: 1490000 },
      desc: "برای کسب‌وکارها و فروشگاه‌های آنلاین",
      features: [
        { text: "تمام امکانات پلن پایه", included: true },
        { text: "آمار پیشرفته (نامحدود)", included: true },
        { text: "۱ دامنه اختصاصی رایگان", included: true },
        { text: "دیپ‌لینکینگ شبکه‌های اجتماعی", included: true },
        { text: "سازنده UTM و تگ‌گذاری", included: true },
        { text: "صفحه بیو بدون تبلیغات لینک رسان", included: true },
      ],
      cta: "انتخاب پلن حرفه‌ای",
      highlight: true,
      color: "bg-indigo-600 text-white hover:bg-indigo-700",
    },
    {
      slug: "enterprise",
      name: "سازمانی",
      icon: Building2,
      price: { monthly: 499000, yearly: 4990000 },
      desc: "برای آژانس‌های مارکتینگ و تیم‌ها",
      features: [
        { text: "تمام امکانات پلن حرفه‌ای", included: true },
        { text: "۵ دامنه اختصاصی", included: true },
        { text: "مدیریت تیم (Multi-user)", included: true },
        { text: "API دسترسی پیشرفته", included: true },
        { text: "پشتیبانی اختصاصی ۲۴/۷", included: true },
        { text: "حذف کامل برند لینک رسان", included: true },
      ],
      cta: "انتخاب پلن سازمانی",
      highlight: false,
      color: "bg-black text-white hover:bg-gray-800",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 px-4 py-12">
      
      <div className="text-center mb-12 max-w-3xl">
        <div onClick={() => router.push("/")} className="inline-flex items-center gap-2 cursor-pointer mb-6">
          <Link2 className="w-7 h-7 text-blue-600" />
          <span className="text-xl font-bold tracking-tight">لینک رسان</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">پلن‌های متناسب با نیاز شما</h1>
        <p className="text-gray-500 text-lg">از ابزارهای رایگان شروع کنید و هر زمان که کسب‌وکارتان رشد کرد، ارتقا دهید.</p>
      </div>

      <div className="flex items-center gap-4 mb-12 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
        <button 
          onClick={() => setBillingCycle("monthly")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-black'}`}
        >
          ماهانه
        </button>
        <button 
          onClick={() => setBillingCycle("yearly")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${billingCycle === 'yearly' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-black'}`}
        >
          سالانه (۲ ماه رایگان)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {plans.map((plan, i) => (
          <div key={i} className={`relative bg-white p-8 rounded-2xl shadow-sm border flex flex-col ${plan.highlight ? 'border-indigo-600 border-2 lg:scale-105 z-10' : 'border-gray-100'}`}>
            {plan.highlight && (
              <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                محبوب‌ترین
              </div>
            )}
            
            <div className="bg-gray-50 p-3 rounded-xl w-fit mb-6 border border-gray-100">
              <plan.icon className="w-6 h-6 text-indigo-600" />
            </div>
            
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <p className="text-gray-500 text-sm mb-6 h-10">{plan.desc}</p>
            
            <div className="mb-6">
              {plan.price[billingCycle as keyof typeof plan.price] === 0 ? (
                <span className="text-4xl font-extrabold">رایگان</span>
              ) : (
                <>
                  <span className="text-4xl font-extrabold">
                    {toFa(plan.price[billingCycle as keyof typeof plan.price].toLocaleString())}
                  </span>
                  <span className="text-gray-500 mr-1">تومان / {billingCycle === 'monthly' ? 'ماه' : 'سال'}</span>
                </>
              )}
            </div>

            <button 
              onClick={() => router.push(isLoggedIn ? `/pricing/${plan.slug}` : "/login")}
              className={`w-full h-12 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mb-8 ${plan.color}`}
            >
              {plan.cta}
              <ArrowLeft className="w-4 h-4" />
            </button>

            <ul className="space-y-3">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-gray-500 max-w-2xl">
        تمام قیمت‌ها به تومان است. پرداخت‌ها از طریق درگاه امن بانکی زرین‌پال انجام می‌شود.
      </p>
    </main>
  );
}