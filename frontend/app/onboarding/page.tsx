"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Globe, ArrowLeft, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Onboarding() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (<main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></main>);
  }

  const cards = [
    { icon: Link2, title: "کوتاه‌سازی لینک حرفه‌ای", desc: "لینک‌های طولانی را کوتاه کنید، آمار لحظه‌ای ببینید، QR Code بسازید و لینک‌های خود را مدیریت کنید.", btnText: "شروع با کوتاه‌سازی لینک", color: "bg-indigo-600 hover:bg-indigo-700", onClick: () => router.push("/dashboard") },
    { icon: Globe, title: "برندینگ و دامنه اختصاصی", desc: "لینک‌های خود را با دامنه شخصی خودتان بسازید (مثلا go.amirsite.ir) و برندتان را حرفه‌ای کنید.", btnText: "شروع با برندینگ", color: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200", onClick: () => router.push("/dashboard") }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">به لینک رسان خوش آمدید!</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">برای شروع، انتخاب کنید که می‌خواهید چه کاری با لینک رسان انجام دهید.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {cards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl mb-6 border border-indigo-100 dark:border-gray-600"><card.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /></div>
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 flex-grow">{card.desc}</p>
            <button onClick={card.onClick} className={`w-full h-12 text-white dark:text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer ${card.color}`}>{card.btnText}<ArrowLeft className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </main>
  );
}