"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Link2, Check, X, ArrowLeft, ShieldCheck } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const iranFeatures = [
  { name: "بدون تبلیغات مزاحم هنگام ریدایرکت", linkresan: true, zaya: true, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "زیرساخت مدرن و سریع (Go + Redis)", linkresan: true, zaya: false, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "رابط کاربری مدرن و دارک مد", linkresan: true, zaya: false, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "اپلیکیشن موبایل (iOS/Android)", linkresan: true, zaya: false, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "تولید نام با هوش مصنوعی (AI Slug)", linkresan: true, zaya: false, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false }, // اضافه شد
  { name: "تقویم شمسی برای انقضا لینک", linkresan: true, zaya: false, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "آمار پیشرفته (مرورگر/سیستم‌عامل)", linkresan: true, zaya: true, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "صفحه بیو (Link-in-bio)", linkresan: true, zaya: true, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "وب‌هوک (Webhooks)", linkresan: true, zaya: false, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "کلید API توسعه‌دهنده", linkresan: true, zaya: "محدود", b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "مدیریت تیمی (Team)", linkresan: true, zaya: false, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "ساخت انبوه لینک (Bulk CSV)", linkresan: true, zaya: false, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "رمز عبور برای لینک‌ها", linkresan: true, zaya: "پولی", b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
  { name: "دامنه اختصاصی (Custom Domain)", linkresan: true, zaya: true, b2n: false, "1ea": false, ttr: false, alnk: false, rizy: false, liink: false },
];

const iranColumns = [
  { key: "linkresan", label: "لینک رسان", highlight: true },
  { key: "zaya", label: "زایا (Zaya)" },
  { key: "b2n", label: "b2n.ir" },
  { key: "1ea", label: "1ea.ir" },
  { key: "ttr", label: "ttr.ir" },
  { key: "alnk", label: "alnk.ir" },
  { key: "rizy", label: "rizy.ir" },
  { key: "liink", label: "liink.ir" },
];

export default function CompareIranPage() {
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
        <div className="text-center mb-8">
          <div onClick={() => router.push("/")} className="inline-flex items-center gap-2 cursor-pointer mb-6">
            <Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold tracking-tight">لینک رسان</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 flex items-center justify-center gap-2">
            مقایسه لینک رسان با رقبای ایرانی
            <ShieldCheck className="w-8 h-8 text-green-500" />
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto mt-4">
            جدول کامل مقایسه امکانات، تکنولوژی و تجربه کاربری لینک رسان در برابر بهترین و قدیمی‌ترین کوتاه‌کننده‌های ایرانی.
          </p>
        </div>

        {/* منوی سوئیچر */}
        <div className="flex justify-center gap-2 mb-12 bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
          <Link href="/compare" className="flex-1 py-2.5 rounded-lg text-sm font-bold text-center transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            رقبای جهانی
          </Link>
          <span className="flex-1 py-2.5 rounded-lg text-sm font-bold text-center transition-colors bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 cursor-default">
            رقبای ایرانی
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 font-bold whitespace-nowrap">امکانات (Features)</th>
                  {iranColumns.map((col) => (
                    <th key={col.key} className={`p-4 text-center font-bold whitespace-nowrap ${col.highlight ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : ''}`}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {iranFeatures.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 font-medium whitespace-nowrap">{row.name}</td>
                    {iranColumns.map((col) => (
                      <td key={col.key} className={`p-4 ${col.highlight ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''}`}>
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
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900/50 dark:to-purple-900/50 p-8 rounded-2xl text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4">از لینک‌های پر از تبلیغ خسته شده‌اید؟</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            لینک رسان بدون هیچگونه تبلیغات مزاحم، با زیرساخت ابری، هوش مصنوعی و اپلیکیشن موبایل، بهترین جایگزین برای کسب‌وکارهای حرفه‌ای است.
          </p>
          <button onClick={() => router.push("/pricing")} className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors inline-flex items-center gap-2 cursor-pointer">
            مشاهده پلن‌ها و قیمت‌ها <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}