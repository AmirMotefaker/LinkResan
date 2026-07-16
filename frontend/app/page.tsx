"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Zap, Shield, BarChart2, Loader2, Copy, Check } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  
  const [customCode, setCustomCode] = useState("");
  const [showCustomField, setShowCustomField] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    if (!isLoggedIn) {
      if (showLoginMsg) {
        router.push("/login");
      } else {
        setShowLoginMsg(true);
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
        body: JSON.stringify({ 
          original_url: url,
          custom_code: customCode 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطا در ساخت لینک");
      }

      setShortUrl(data.short_url);
      setCustomCode("");
      setShowCustomField(false);
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
    { icon: Zap, title: "ریدایرکت فوق سریع", desc: "استفاده از Redis برای ریدایرکت در کسری از ثانیه" },
    { icon: Shield, title: "امنیت و حریم خصوصی", desc: "احراز هویت پیشرفته با JWT" },
    { icon: BarChart2, title: "آمار دقیق کلیک‌ها", desc: "تحلیل دقیق کلیک‌ها و دستگاه‌ها" },
  ];

  return (
    <main className="h-screen flex flex-col items-center bg-white text-gray-900 px-4 overflow-hidden">
      
      {/* هدر مینیمال (لوگو آبی بدون کادر) */}
      <header className="w-full max-w-6xl flex justify-between items-center py-4 flex-shrink-0">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Link2 className="w-7 h-7 text-blue-600" />
          <span className="text-xl font-bold tracking-tight">لینک رسان</span>
        </div>
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <button onClick={() => router.push("/dashboard")} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">
                داشبورد
              </button>
              <button onClick={handleLogout} className="px-5 py-2 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors cursor-pointer">
                خروج
              </button>
            </>
          ) : (
            <>
              <button onClick={() => router.push("/login")} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">
                ورود
              </button>
              <button onClick={() => router.push("/login")} className="px-5 py-2 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors cursor-pointer">
                ثبت‌نام
              </button>
            </>
          )}
        </div>
      </header>

      {/* بخش اصلی و فرم */}
      <section className="flex-grow w-full max-w-2xl flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          کوتاه‌کننده لینک حرفه‌ای
        </h1>
        <p className="text-base md:text-lg text-gray-500 mb-6 max-w-xl">
          لینک‌های طولانی خود را به لینک‌های کوتاه، امن و قابل اندازه‌گیری تبدیل کنید.
        </p>

        <form onSubmit={handleShorten} className="w-full flex flex-col items-center">
          <input
            type="url"
            placeholder="لینک خود را اینجا وارد کنید..."
            value={url}
            onChange={(e) => { setUrl(e.target.value); setShowLoginMsg(false); }}
            className="w-full h-14 px-6 text-base bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-gray-400 shadow-sm cursor-pointer"
            required
          />

          <button 
            type="button" 
            onClick={() => setShowCustomField(!showCustomField)}
            className="text-xs text-gray-500 hover:text-indigo-600 mt-3 mb-2 cursor-pointer"
          >
            {showCustomField ? "حذف نام دلخواه" : "می‌خواهم نام لینک را خودم انتخاب کنم"}
          </button>

          {showCustomField && (
            <div className="w-full flex items-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 mb-3">
              <span className="text-gray-400 text-xs whitespace-nowrap">linkresan.ir/</span>
              <input
                type="text"
                placeholder="نام دلخواه (مثلا: amir-shop)"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="w-full h-12 bg-transparent outline-none text-sm placeholder:text-gray-400"
              />
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading} 
            className="mt-2 h-12 px-10 text-base font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (showLoginMsg && !isLoggedIn ? "برای کوتاه کردن وارد شوید" : "کوتاه کن")}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 w-full p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
            <span className="text-base font-medium text-green-700 truncate ml-2">{shortUrl}</span>
            <button onClick={handleCopy} className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-800 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors flex-shrink-0 cursor-pointer">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "کپی شد" : "کپی لینک"}
            </button>
          </div>
        )}
      </section>

      {/* بخش امکانات */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-6 flex-shrink-0">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <div className="bg-indigo-50 p-4 rounded-2xl mb-3 border border-indigo-100">
              <feature.icon className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold mb-1 tracking-tight">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* فوتر با رنگ‌های سفارشی */}
      <footer className="pb-6 text-gray-500 text-sm text-center flex-shrink-0">
        ساخته شده با ❤️ برای توسعه‌دهندگان ایرانی توسط{" "}
        <a href="https://amirmotefaker.ir/" target="_blank" rel="noopener noreferrer" className="font-bold text-red-500 hover:text-red-600 transition-colors">
          امیر متفکر
        </a>
        {" "}-{" "}
        <a href="https://github.com/AmirMotefaker/LinkResan" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
          لینک رسان
        </a>
      </footer>
    </main>
  );
}