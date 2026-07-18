"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Zap, Shield, BarChart2, Loader2, Copy, Check } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const toFa = (num: any) => {
  if (num === null || num === undefined) return "";
  return num.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
};

const toEn = (num: any) => {
  if (num === null || num === undefined) return "";
  return num.toString().replace(/[۰-۹]/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // اضافه شد
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  
  const [customCode, setCustomCode] = useState("");
  const [showCustomField, setShowCustomField] = useState(false);
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [expirationDate, setExpirationDate] = useState<any>(null);
  const [clickLimit, setClickLimit] = useState("");
  const [password, setPassword] = useState("");

  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");

  const [domains, setDomains] = useState<any[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("linkresan.ir");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setIsPremium(localStorage.getItem("is_premium") === "true"); // اضافه شد
      fetch(`${API_URL}/domains`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (data.domains) setDomains(data.domains);
        })
        .catch(() => {});
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
      let finalUrl = url;
      if (utmSource || utmMedium || utmCampaign) {
        try {
          const u = new URL(url);
          if (utmSource) u.searchParams.set("utm_source", utmSource);
          if (utmMedium) u.searchParams.set("utm_medium", utmMedium);
          if (utmCampaign) u.searchParams.set("utm_campaign", utmCampaign);
          finalUrl = u.toString();
        } catch {}
      }

      const bodyData: any = { 
        original_url: finalUrl,
        custom_code: customCode,
        password: password
      };

      const selectedDomainObj = domains.find(d => d.Domain === selectedDomain);
      if (selectedDomainObj) {
        bodyData.domain_id = selectedDomainObj.ID;
      }

      if (expirationDate) {
        bodyData.expires_at = new Date(expirationDate.toDate()).toISOString();
      }
      if (clickLimit) {
        bodyData.click_limit = parseInt(toEn(clickLimit));
      }

      const res = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطا در ساخت لینک");
      }

      const finalShortUrl = `https://${selectedDomain}/${data.short_code}`;
      setShortUrl(finalShortUrl);
      
      setCustomCode("");
      setShowCustomField(false);
      setExpirationDate(null);
      setClickLimit("");
      setPassword("");
      setUtmSource("");
      setUtmMedium("");
      setUtmCampaign("");
      setShowAdvanced(false);
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
    localStorage.removeItem("is_premium"); // اضافه شد
    setIsLoggedIn(false);
    setIsPremium(false); // اضافه شد
    setShortUrl("");
    setDomains([]);
    setSelectedDomain("linkresan.ir");
  };

  const features = [
    { icon: Zap, title: "ریدایرکت فوق سریع", desc: "استفاده از Redis برای ریدایرکت در کسری از ثانیه" },
    { icon: Shield, title: "امنیت و حریم خصوصی", desc: "احراز هویت پیشرفته با JWT" },
    { icon: BarChart2, title: "آمار دقیق کلیک‌ها", desc: "تحلیل دقیق کلیک‌ها و دستگاه‌ها" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center bg-white text-gray-900 px-4">
      
      <header className="w-full max-w-6xl flex justify-between items-center py-3 sm:py-4 flex-shrink-0">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Link2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          <span className="text-lg sm:text-xl font-bold tracking-tight">لینک رسان</span>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          {isLoggedIn ? (
            <>
              <button onClick={() => router.push("/dashboard")} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">داشبورد</button>
              <button onClick={handleLogout} className="px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors cursor-pointer">خروج</button>
            </>
          ) : (
            <>
              <button onClick={() => router.push("/pricing")} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">
                پلن‌ها
              </button>
              <button onClick={() => router.push("/login")} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">ورود</button>
              <button onClick={() => router.push("/login")} className="px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors cursor-pointer">ثبت‌نام</button>
            </>
          )}
        </div>
      </header>

      <section className="flex-grow w-full max-w-2xl flex flex-col items-center justify-center text-center mt-10 sm:mt-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">کوتاه‌کننده لینک حرفه‌ای</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 max-w-xl">لینک‌های طولانی خود را به لینک‌های کوتاه، امن و قابل اندازه‌گیری تبدیل کنید.</p>

        <form onSubmit={handleShorten} className="w-full flex flex-col items-center">
          
          {isLoggedIn && domains.length > 0 && (
            <div className="w-full mb-2 flex justify-center">
              <select 
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 outline-none cursor-pointer"
              >
                <option value="linkresan.ir">linkresan.ir (پیش‌فرض)</option>
                {domains.map((domain) => (
                  <option key={domain.ID} value={domain.Domain}>{domain.Domain}</option>
                ))}
              </select>
            </div>
          )}

          <input
            type="url"
            placeholder="لینک خود را اینجا وارد کنید..."
            value={url}
            onChange={(e) => { setUrl(e.target.value); setShowLoginMsg(false); }}
            className="w-full h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-gray-400 shadow-sm cursor-pointer"
            required
          />

          <div className="flex gap-4 mt-3 mb-2">
            <button type="button" onClick={() => setShowCustomField(!showCustomField)} className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 cursor-pointer">
              {showCustomField ? "حذف نام دلخواه" : "نام دلخواه"}
            </button>
            <button 
              type="button" 
              onClick={() => {
                if (!isPremium) {
                  alert("استفاده از تنظیمات پیشرفته فقط برای پلن Pro است. لطفاً اکانت خود را ارتقا دهید.");
                  router.push("/pricing/pro");
                  return;
                }
                setShowAdvanced(!showAdvanced);
              }}
              className={`text-xs sm:text-sm cursor-pointer ${isPremium ? 'text-gray-500 hover:text-indigo-600' : 'text-gray-400 hover:text-gray-500'}`}
            >
              {showAdvanced ? "حذف تنظیمات پیشرفته" : "تنظیمات پیشرفته (Pro)"}
            </button>
          </div>

          {showCustomField && (
            <div className="w-full flex items-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 mb-3">
              <span className="text-gray-400 text-xs whitespace-nowrap">{selectedDomain}/</span>
              <input
                type="text"
                placeholder="نام دلخواه (مثلا: amir-shop)"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="w-full h-11 sm:h-12 bg-transparent outline-none text-sm placeholder:text-gray-400"
              />
            </div>
          )}

          {showAdvanced && isPremium && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="flex flex-col items-start gap-1 bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-2">
                <label className="text-xs text-gray-500 mb-1">تاریخ و ساعت انقضا (شمسی)</label>
                <DatePicker
                  value={expirationDate}
                  onChange={setExpirationDate}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD HH:mm"
                  plugins={[<TimePicker position="bottom" hideSeconds />]}
                  className="w-full bg-transparent outline-none text-sm text-gray-700"
                  inputClass="w-full bg-transparent outline-none text-sm text-gray-700"
                />
              </div>
              <div className="flex flex-col items-start gap-1 bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-2">
                <label className="text-xs text-gray-500">محدودیت کلیک (اختیاری)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="مثلا: ۱۰۰"
                  value={clickLimit}
                  onChange={(e) => setClickLimit(toFa(e.target.value))}
                  className="w-full h-8 bg-transparent outline-none text-sm placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col items-start gap-1 bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-2 sm:col-span-2">
                <label className="text-xs text-gray-500">رمز عبور لینک (اختیاری)</label>
                <input
                  type="text"
                  placeholder="برای حفاظت از لینک رمز بگذارید"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-8 bg-transparent outline-none text-sm placeholder:text-gray-400"
                />
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-2 sm:col-span-2 mt-2">
                <label className="text-xs text-gray-500 mb-2 block">سازنده تگ UTM (برای ردیابی کمپین‌ها)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input type="text" placeholder="منبع (source)" value={utmSource} onChange={(e) => setUtmSource(e.target.value)} className="w-full h-9 px-2 bg-white border border-gray-200 rounded-lg outline-none text-xs focus:border-indigo-500" />
                  <input type="text" placeholder="رسانه (medium)" value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} className="w-full h-9 px-2 bg-white border border-gray-200 rounded-lg outline-none text-xs focus:border-indigo-500" />
                  <input type="text" placeholder="نام کمپین (campaign)" value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} className="w-full h-9 px-2 bg-white border border-gray-200 rounded-lg outline-none text-xs focus:border-indigo-500" />
                </div>
              </div>
            </div>
          )}
          
          <button type="submit" disabled={loading} className="mt-2 h-12 px-8 sm:px-10 text-sm sm:text-base font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (showLoginMsg && !isLoggedIn ? "برای کوتاه کردن وارد شوید" : "کوتاه کن")}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 w-full p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
            <span className="text-sm sm:text-base font-medium text-green-700 truncate ml-2">{shortUrl}</span>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs sm:text-sm font-medium text-green-600 hover:text-green-800 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors flex-shrink-0 cursor-pointer">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "کپی شد" : "کپی لینک"}
            </button>
          </div>
        )}
      </section>

      <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center mt-16 sm:mt-24 mb-10 sm:mb-12 flex-shrink-0">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <div className="bg-indigo-50 p-3 sm:p-4 rounded-2xl mb-3 border border-indigo-100">
              <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-1 tracking-tight">{feature.title}</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">{feature.desc}</p>
          </div>
        ))}
      </section>

      <footer className="pb-6 text-[10px] sm:text-xs text-gray-500 text-center flex-shrink-0 whitespace-nowrap">
        ساخته شده با ❤️ برای توسعه‌دهندگان ایرانی توسط{" "}
        <a href="https://amirmotefaker.ir/" target="_blank" rel="noopener noreferrer" className="font-bold text-red-500 hover:text-red-600 transition-colors">امیر متفکر</a>
        {" "}-{" "}
        <a href="https://github.com/AmirMotefaker/LinkResan" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">لینک رسان</a>
      </footer>
    </main>
  );
}