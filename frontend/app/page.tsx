"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Zap, Shield, BarChart2, Loader2, Copy, Check } from "lucide-react";

const API_URL = "http://localhost:8080/api";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // چک کردن اینکه آیا کاربر لاگین کرده است یا خیر
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // اگر لاگین نبود
    if (!isLoggedIn) {
      if (showLoginMsg) {
        router.push("/login"); // اگر برای بار دوم کلیک کرد، بفرست به لاگین
      } else {
        setShowLoginMsg(true); // بار اول کلیک کرد، فقط متن را عوض کن
      }
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ original_url: url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطا در ساخت لینک");
      }

      setShortUrl(data.short_url);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShortUrl("");
  };

  const features = [
    { icon: Zap, title: "سرعت بی‌نظیر", desc: "استفاده از Redis برای ریدایرکت در کمتر از ۱ میلی‌ثانیه." },
    { icon: Shield, title: "امنیت بالا", desc: "احراز هویت پیشرفته و محافظت از لینک‌های شما." },
    { icon: BarChart2, title: "آمار دقیق", desc: "تحلیل کامل کلیک‌ها، دستگاه‌ها و موقعیت مکانی." },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center bg-white text-gray-900 px-4">
      
      {/* هدر مینیمال */}
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <div className="bg-black p-2 rounded-lg">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">لینک رسان</span>
        </div>
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-5 py-2 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors">
              خروج
            </button>
          ) : (
            <>
              <button onClick={() => router.push("/login")} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
                ورود
              </button>
              <button onClick={() => router.push("/login")} className="px-5 py-2 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors">
                داشبورد
              </button>
            </>
          )}
        </div>
      </header>

      {/* بخش اصلی (کاملاً وسط چین و خلوت) */}
      <section className="w-full max-w-2xl flex flex-col items-center text-center mt-20 md:mt-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          کوتاه‌کننده لینک حرفه‌ای
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl">
          لینک‌های طولانی خود را به لینک‌های کوتاه، امن و قابل اندازه‌گیری تبدیل کنید.
        </p>

        {/* فرم کوتاه‌کننده */}
        <form onSubmit={handleShorten} className="w-full flex flex-col items-center">
          <input
            type="url"
            placeholder="لینک خود را اینجا وارد کنید..."
            value={url}
            onChange={(e) => { setUrl(e.target.value); setShowLoginMsg(false); }}
            className="w-full h-16 px-6 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-gray-400 shadow-sm"
            required
          />
          
          <button 
            type="submit" 
            disabled={loading} 
            className="mt-4 h-14 px-12 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (showLoginMsg && !isLoggedIn ? "برای کوتاه کردن وارد شوید" : "کوتاه کن")}
          </button>
        </form>

        {/* نمایش نتیجه */}
        {shortUrl && (
          <div className="mt-8 w-full p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
            <span className="text-lg font-medium text-green-700">{shortUrl}</span>
            <button onClick={handleCopy} className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-800 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "کپی شد" : "کپی لینک"}
            </button>
          </div>
        )}
      </section>

      {/* بخش امکانات */}
      <section className="w-full max-w-5xl mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center p-4">
            <div className="bg-indigo-50 p-4 rounded-2xl mb-4 border border-indigo-100">
              <feature.icon className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">{feature.title}</h3>
            <p className="text-gray-500 leading-relaxed max-w-xs">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* فوتر با لینک گیت‌هاب شما */}
      <footer className="mt-32 mb-8 text-gray-400 text-sm text-center">
        ساخته شده با ❤️ برای توسعه‌دهندگان ایرانی توسط{" "}
        <a href="https://github.com/AmirMotefaker" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-600 hover:text-indigo-600 transition-colors">
          امیر متفکر
        </a>
        {" "}- © ۲۰۲۶ لینک رسان
      </footer>
    </main>
  );
}