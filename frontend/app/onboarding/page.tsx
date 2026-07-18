"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Users, BarChart2, ArrowLeft, Loader2 } from "lucide-react";

export default function Onboarding() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </main>
    );
  }

  const cards = [
    {
      icon: Link2,
      title: "لینک‌های لینک رسان",
      desc: "کوتاه‌سازی لینک، QR Code، آمار لحظه‌ای و ردیابی تبدیل کاربر.",
      btnText: "شروع با کوتاه‌سازی لینک",
      color: "bg-indigo-600 hover:bg-indigo-700",
      onClick: () => router.push("/dashboard"),
    },
    {
      icon: Users,
      title: "همکاران لینک رسان",
      desc: "سیستم همکاری در فروش مدرن با پرداخت‌های ریالی و ردیابی دقیق.",
      btnText: "شروع با سیستم همکاری",
      color: "bg-black hover:bg-gray-800",
      onClick: () => router.push("/dashboard/bio"), // فعلا به صفحه بیو می‌رود
    }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">چه کاری می‌خواهید با لینک رسان انجام دهید؟</h1>
        <p className="text-gray-500 max-w-xl mx-auto">انتخاب کنید چگونه می‌خواهید از لینک رسان برای رشد کسب‌وکار خود استفاده کنید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-indigo-50 p-4 rounded-2xl mb-6 border border-indigo-100">
              <card.icon className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-gray-500 mb-8 flex-grow">{card.desc}</p>
            <button 
              onClick={card.onClick}
              className={`w-full h-12 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer ${card.color}`}
            >
              {card.btnText}
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}