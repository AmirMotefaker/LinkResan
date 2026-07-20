"use client";

import { useRouter } from "next/navigation";
import { Link2, Check, X, ArrowLeft, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

// داده‌های جدول مقایسه
const features = [
  { name: "کوتاه‌کنندگی پایه", linkresan: true, bitly: true, dub: true, short: true, tiny: true, rebrandly: true, blink: true, shorby: true },
  { name: "اسلاگ دلخواه (Custom Alias)", linkresan: true, bitly: true, dub: true, short: true, tiny: true, rebrandly: true, blink: true, shorby: true },
  { name: "آمار کلیک (Analytics)", linkresan: true, bitly: true, dub: true, short: true, tiny: "محدود", rebrandly: true, blink: "پیشرفته", shorby: "محدود" },
  { name: "تشخیص سیستم‌عامل/مرورگر", linkresan: true, bitly: true, dub: true, short: true, tiny: false, rebrandly: true, blink: true, shorby: false },
  { name: "نمودار تحلیلی هفتگی", linkresan: true, bitly: true, dub: true, short: true, tiny: false, rebrandly: true, blink: true, shorby: false },
  { name: "QR Code خودکار", linkresan: true, bitly: true, dub: true, short: false, tiny: "پرداختی", rebrandly: true, blink: true, shorby: false },
  { name: "تاریخ انقضا و محدودیت کلیک", linkresan: true, bitly: "پرداختی", dub: true, short: true, tiny: false, rebrandly: true, blink: true, shorby: false },
  { name: "رمز عبور برای لینک", linkresan: true, bitly: "پرداختی", dub: true, short: false, tiny: false, rebrandly: false, blink: true, shorby: false },
  { name: "دامنه اختصاصی (Custom Domain)", linkresan: true, bitly: "پرداختی", dub: true, short: true, tiny: false, rebrandly: true, blink: true, shorby: true },
  { name: "لینک بایو (Link-in-bio)", linkresan: true, bitly: true, dub: false, short: false, tiny: false, rebrandly: false, blink: false, shorby: "تخصصی" },
  { name: "سازنده UTM", linkresan: true, bitly: true, dub: true, short: true, tiny: false, rebrandly: true, blink: true, shorby: false },
  { name: "وب‌هوک (Webhooks)", linkresan: true, bitly: "پرداختی", dub: true, short: true, tiny: false, rebrandly: false, blink: true, shorby: false },
  { name: "کلید API توسعه‌دهنده", linkresan: true, bitly: "پرداختی", dub: true, short: true, tiny: false, rebrandly: true, blink: true, shorby: false },
  { name: "مدیریت تیمی (Team)", linkresan: true, bitly: "پرداختی", dub: true, short: true, tiny: false, rebrandly: true, blink: true, shorby: false },
  { name: "ساخت انبوه (Bulk CSV)", linkresan: true, bitly: false, dub: false, short: false, tiny: false, rebrandly: true, blink: true, shorby: false },
  { name: "اپلیکیشن موبایل (Native)", linkresan: true, bitly: true, dub: false, short: false, tiny: false, rebrandly: true, blink: true, shorby: false },
  { name: "متن‌باز (Open Source)", linkresan: "هسته", bitly: false, dub: true, short: false, tiny: false, rebrandly: false, blink: false, shorby: false },
  { name: "پشتیبانی از زبان فارسی (RTL)", linkresan: "بومی", bitly: false, dub: false, short: false, tiny: false, rebrandly: false, blink: false, shorby: false },
  { name: "درگاه پرداخت ریالی/رمزارز", linkresan: true, bitly: false, dub: false, short: false, tiny: false, rebrandly: false, blink: false, shorby: false },
];

const columns = [
  { key: "linkresan", label: "لینک رسان", highlight: true },
  { key: "bitly", label: "Bitly" },
  { key: "dub", label: "Dub.co" },
  { key: "short", label: "Short.io" },
  { key: "tiny", label: "TinyURL" },
  { key: "rebrandly", label: "Rebrandly" },
  { key: "blink", label: "BL.INK" },
  { key: "shorby", label: "Shorby" },
];

export default function ComparePage() {
  const router = useRouter();

  const renderCell = (value: any) => {
    if (value === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (value === false) return <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />;
    return <span className="text-xs text-gray-500 dark:text-gray-400 text-center block">{value}</span>;
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      
      <div className="w-full max-w-7xl mx-auto">
        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <div onClick={() => router.push("/")} className="inline-flex items-center gap-2 cursor-pointer mb-6">
            <Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold tracking-tight">لینک رسان</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 flex items-center justify-center gap-2">
            مقایسه فنی لینک رسان با رقبای جهانی
            <Sparkles className="w-8 h-8 text-indigo-500" />
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            ما دنبال اختراع چرخ نبودیم؛ ما چرخ را به بهترین شکل ساختیم، اما آن را روی جاده‌ای آوردیم که رقبای جهانی به دلیل تحریم‌ها از آن محروم هستند.
          </p>
        </div>

        {/* جدول مقایسه */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 font-bold whitespace-nowrap">امکانات (Features)</th>
                  {columns.map((col) => (
                    <th 
                      key={col.key} 
                      className={`p-4 text-center font-bold whitespace-nowrap ${col.highlight ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : ''}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 font-medium whitespace-nowrap">{row.name}</td>
                    {columns.map((col) => (
                      <td 
                        key={col.key} 
                        className={`p-4 ${col.highlight ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''}`}
                      >
                        {renderCell(row[col.key as keyof typeof row])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* بخش نتیجه‌گیری و CTA */}
        <div className="mt-12 bg-indigo-600 dark:bg-indigo-900/40 p-8 rounded-2xl text-center text-white">
          <h2 className="text-2xl font-bold mb-4">آماده‌اید رقیب ایرانی خود را جایگزین ابزارهای تحریمی کنید؟</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">با لینک رسان، همزمان لینک بایو (رقیب Shorby) و مدیریت لینک سازمانی (رقیب Bitly) را با قیمت ایرانی و پشتیبانی فارسی در اختیار دارید.</p>
          <button 
            onClick={() => router.push("/pricing")} 
            className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            مشاهده پلن‌ها و قیمت‌ها
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}