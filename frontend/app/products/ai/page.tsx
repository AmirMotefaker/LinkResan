"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Link2, Wand2, Check, ArrowLeft, Brain, Zap, Code } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function AIBlankPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>

      {/* لوگو در بالاترین نقطه */}
      <header className="w-full pt-8 pb-4 flex justify-center">
        <Link href="/" className="inline-flex items-center gap-2 cursor-pointer">
          <Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold tracking-tight">لینک رسان</span>
        </Link>
      </header>

      <section className="w-full max-w-4xl mx-auto px-4 pt-8 pb-12 text-center">
        <div className="inline-block p-4 rounded-2xl mb-6 bg-purple-50 dark:bg-gray-800 border border-purple-100 dark:border-gray-700">
          <Wand2 className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-l from-purple-600 to-indigo-600 bg-clip-text text-transparent">هوش مصنوعی (AI)</h1>
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">تولید خودکار نام لینک با Llama 3.3 در کمتر از ۱ ثانیه</p>
      </section>

      <section className="w-full max-w-3xl mx-auto px-4 pb-16 flex-grow">
        <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-center">
            دیگر نیازی به فکر کردن برای انتخاب نام لینک نیست. لینک رسان با استفاده از پیشرفته‌ترین مدل‌های هوش مصنوعی، لینک شما را تحلیل کرده و بهترین نام کوتاه، سئوپسند و جذاب را پیشنهاد می‌دهد.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
              <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <h3 className="font-bold text-sm mb-1">تحلیل محتوا</h3>
              <p className="text-xs text-gray-500">تشخیص موضوع لینک</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
              <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-bold text-sm mb-1">سرعت بالا</h3>
              <p className="text-xs text-gray-500">پاسخ در کسری از ثانیه</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
              <Code className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <h3 className="font-bold text-sm mb-1">سئوپسند</h3>
              <p className="text-xs text-gray-500">فرمت استاندارد (kebab-case)</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700 dark:text-gray-200">تحلیل هوشمند لینک‌های متنی (مقالات، فروشگاه‌ها) و تولید نام مرتبط.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700 dark:text-gray-200">پشتیبانی از لینک‌های بدون متن (یوتیوب، اینستاگرام) با تولید نام عمومی جذاب.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700 dark:text-gray-200">استفاده از Groq API و مدل Llama 3.3 برای دقت و سرعت بی‌نظیر.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => router.push("/login")} className="inline-flex items-center gap-2 h-14 px-10 font-bold rounded-xl transition-colors cursor-pointer text-white bg-purple-600 hover:bg-purple-700">
            امتحان رایگان هوش مصنوعی <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}