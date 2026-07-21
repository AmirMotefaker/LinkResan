"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Link2, Check, X, Zap, BarChart2, Crown, Building2, ArrowLeft, Wand2, QrCode, KeyRound, Users, Webhook, Layers } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const toFa = (num: any) => num.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => { const token = localStorage.getItem("token"); if (token) setIsLoggedIn(true); }, []);

  const plans = [
    { slug: "free", name: "رایگان", icon: Zap, price: { monthly: 0, yearly: 0 }, desc: "برای شروع کار", features: [ { text: "۵۰ لینک در ماه", included: true }, { text: "تولید نام با هوش مصنوعی", included: true }, { text: "QR Code", included: true }, { text: "آمار ۷ روز اخیر", included: true }, { text: "اسلاگ دلخواه", included: true }, { text: "تاریخ انقضا", included: false } ], cta: "شروع رایگان", highlight: false, color: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200" },
    { slug: "basic", name: "پایه", icon: BarChart2, price: { monthly: 49000, yearly: 490000 }, desc: "برای بلاگرها", features: [ { text: "لینک نامحدود", included: true }, { text: "هوش مصنوعی", included: true }, { text: "آمار ۳۰ روز اخیر", included: true }, { text: "اسلاگ نامحدود", included: true }, { text: "تاریخ انقضا و کلیک", included: true }, { text: "رمز عبور", included: true } ], cta: "انتخاب پایه", highlight: false, color: "bg-indigo-600 text-white hover:bg-indigo-700" },
    { slug: "pro", name: "حرفه‌ای", icon: Crown, price: { monthly: 149000, yearly: 1490000 }, desc: "برای کسب‌وکارها", features: [ { text: "تمام امکانات پایه", included: true }, { text: "هوش مصنوعی", included: true }, { text: "آمار نامحدود", included: true }, { text: "۱ دامنه رایگان", included: true }, { text: "وب‌هوک", included: true }, { text: "API", included: true } ], cta: "انتخاب حرفه‌ای", highlight: true, color: "bg-indigo-600 text-white hover:bg-indigo-700" },
    { slug: "enterprise", name: "سازمانی", icon: Building2, price: { monthly: 499000, yearly: 4990000 }, desc: "برای تیم‌ها", features: [ { text: "تمام امکانات حرفه‌ای", included: true }, { text: "۵ دامنه اختصاصی", included: true }, { text: "مدیریت تیم", included: true }, { text: "API", included: true }, { text: "پشتیبانی ۲۴/۷", included: true }, { text: "حذف برند", included: true } ], cta: "انتخاب سازمانی", highlight: false, color: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      <header className="w-full pt-8 pb-4 flex justify-center">
        <Link href="/" className="inline-flex items-center gap-2 cursor-pointer"><Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" /><span className="text-xl font-bold tracking-tight">لینک رسان</span></Link>
      </header>
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">پلن‌های متناسب با نیاز شما</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">از ابزارهای رایگان شروع کنید و ارتقا دهید.</p>
      </div>
      <div className="flex items-center gap-4 mb-12 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <button onClick={() => setBillingCycle("monthly")} className={`px-6 py-2 rounded-lg text-sm font-medium cursor-pointer ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400'}`}>ماهانه</button>
        <button onClick={() => setBillingCycle("yearly")} className={`px-6 py-2 rounded-lg text-sm font-medium cursor-pointer ${billingCycle === 'yearly' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400'}`}>سالانه (۲ ماه رایگان)</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {plans.map((plan, i) => (
          <div key={i} className={`relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center ${plan.highlight ? 'border-indigo-600 border-2 lg:scale-105 z-10' : 'border-gray-100 dark:border-gray-700'}`}>
            {plan.highlight && (<div className="absolute -top-3 right-1/2 translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">محبوب‌ترین</div>)}
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl w-fit mb-6 border border-gray-100 dark:border-gray-600"><plan.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /></div>
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
            <div className="mb-6">
              {plan.price[billingCycle as keyof typeof plan.price] === 0 ? (<span className="text-4xl font-extrabold">رایگان</span>) : (<><span className="text-4xl font-extrabold">{toFa(plan.price[billingCycle as keyof typeof plan.price].toLocaleString())}</span><span className="text-gray-500 mr-1">تومان</span></>)}
            </div>
            <button onClick={() => router.push(isLoggedIn ? `/pricing/${plan.slug}` : "/login")} className={`w-full h-12 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mb-8 ${plan.color}`}>{plan.cta}<ArrowLeft className="w-4 h-4" /></button>
            <ul className="space-y-3 w-full text-right">
              {plan.features.map((feature, j) => (<li key={j} className="flex items-start gap-2 text-sm">{feature.included ? <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> : <X className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />}<span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600 line-through'}>{feature.text}</span></li>))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 max-w-2xl">پرداخت‌ها از طریق درگاه امن بانکی زرین‌پال انجام می‌شود.</p>
    </main>
  );
}