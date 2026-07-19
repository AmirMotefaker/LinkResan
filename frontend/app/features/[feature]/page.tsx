"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Check, Zap, Shield, BarChart2, Server, Lock, TrendingUp, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function FeatureDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.feature as string;

  const featuresData: any = {
    speed: {
      icon: Zap,
      title: "ریدایرکت فوق سریع",
      subtitle: "سرعت میلی‌ثانیه‌ای با معماری Redis و Go",
      desc: "هیچ‌کس دوست ندارد منتظر بماند. لینک رسان با استفاده از پیشرفته‌ترین تکنولوژی‌های روز دنیا، لینک‌های شما را در کسری از ثانیه ریدایرکت می‌کند تا کاربران شما بدون هیچ تاخیری به مقصد برسند.",
      points: [
        "کشینگ هوشمند با Redis: لینک‌ها در حافظه RAM سرور نگهداری می‌شوند تا نیاز به خواندن از هارد دیسک (دیتابیس) از بین برود.",
        "پردازش ناهمگام (Asynchronous): ثبت آمار کلیک‌ها در پس‌زمینه انجام می‌شود تا سرعت ریدایرکت شما کاملاً حفظ شود.",
        "بک‌اند قدرتمند با Go: زبان Go (Golang) به دلیل همزمانی (Concurrency) بالا، توانایی پردازش هزاران درخواست در ثانیه را دارد.",
        "کد وضعیت 302: استفاده از ریدایرکت‌های غیرکش‌شونده برای ثبت ۱۰۰٪ دقیق آمار کلیک‌ها."
      ],
      cta: "شروع رایگان",
      ctaLink: "/login",
      color: "bg-indigo-600 hover:bg-indigo-700"
    },
    security: {
      icon: Shield,
      title: "امنیت و حریم خصوصی",
      subtitle: "محافظت از لینک‌ها و داده‌ها با استانداردهای سازمانی",
      desc: "امنیت لینک‌ها و داده‌های کاربران برای ما در اولویت قرار دارد. لینک رسان با استفاده از پروتکل‌های امنیتی مدرن، اطمینان حاصل می‌کند که لینک‌های شما فقط در دسترس افرادی هستند که اجازه دسترسی دارند.",
      points: [
        "احراز هویت پیشرفته (JWT): توکن‌های امنیتی با اعتبار محدود برای جلوگیری از دسترسی غیرمجاز.",
        "هش کردن رمز عبور (Bcrypt): رمزهای عبور هرگز به صورت متن ساده ذخیره نمی‌شوند.",
        "لینک‌های محافظت شده با رمز (Pro): امکان رمزگذاری روی لینک‌های کوتاه برای اشتراک‌گذاری امن فایل‌ها و فاکتورها.",
        "ورود امن با گوگل (OAuth 2.0): امکان ورود یک‌کلیکی و امن با اکانت گوگل.",
        "مالکیت داده‌ها: هر لینک فقط به اکانت کاربر متصل است و هیچکس دیگر به آن دسترسی ندارد."
      ],
      cta: "ارتقا به پلن Pro برای لینک‌های رمزدار",
      ctaLink: "/pricing/pro",
      color: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
    },
    analytics: {
      icon: BarChart2,
      title: "آمار و تحلیل دقیق کلیک‌ها",
      subtitle: "می‌دانید چه کسانی روی لینک‌های شما کلیک می‌کنند",
      desc: "دیگر حدس زدن کافی نیست. با داشبورد تحلیلی لینک رسان، اطلاعات دقیقی از کلیک‌های خود به دست آورید تا بتوانید کمپین‌های مارکتینگ خود را بهینه‌سازی کنید.",
      points: [
        "تعداد کلیک‌های واقعی: شمارش دقیق هر کلیک با جلوگیری از تقلب و ربات‌ها.",
        "تشخیص دستگاه و سیستم‌عامل: بدانید کاربران شما از موبایل (اندروید/iOS) استفاده می‌کنند یا دسکتاپ (ویندوز/macOS).",
        "تشخیص مرورگر: آمار دقیق مرورگرهای Chrome, Safari, Firefox و غیره.",
        "نمودار هفتگی: نمایش روند کلیک‌های ۷ روز اخیر با نمودارهای جذاب و راست‌چین.",
        "سازنده UTM (Pro): امکان تگ‌گذاری کمپین‌ها برای اتصال مستقیم به گوگل آنالیتیکس.",
        "منطقه زمانی تهران: تمام آمارها بر اساس ساعت ایران محاسبه می‌شوند تا خطای زمانی نداشته باشید."
      ],
      cta: "ارتقا به پلن Pro برای آمار نامحدود",
      ctaLink: "/pricing/pro",
      color: "bg-indigo-600 hover:bg-indigo-700"
    }
  };

  const feature = featuresData[slug];

  if (!feature) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="text-center">
          <p className="mb-4">صفحه مورد نظر پیدا نشد.</p>
          <button onClick={() => router.push("/")} className="text-indigo-600 cursor-pointer">بازگشت به خانه</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>

      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-4 pt-24 pb-12 text-center">
        <div className={`inline-block p-4 rounded-2xl mb-6 ${slug === 'security' ? 'bg-red-50 dark:bg-gray-800' : 'bg-indigo-50 dark:bg-gray-800'} border border-gray-100 dark:border-gray-700`}>
          <feature.icon className={`w-10 h-10 ${slug === 'security' ? 'text-red-500' : 'text-indigo-600 dark:text-indigo-400'}`} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">{feature.title}</h1>
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">{feature.subtitle}</p>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-3xl mx-auto px-4 pb-16 flex-grow">
        <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-center">{feature.desc}</p>
          
          <div className="space-y-6">
            {feature.points.map((point: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Specs (Visual Flair) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-center shadow-sm">
            <Server className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-bold text-sm mb-1">بک‌اند Go</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">عملکرد بهینه و پایدار</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-center shadow-sm">
            <Lock className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-bold text-sm mb-1">امنیت بالا</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">رمزنگاری استاندارد</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-center shadow-sm">
            <TrendingUp className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-bold text-sm mb-1">آمار دقیق</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">داده‌های در لحظه</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button 
            onClick={() => router.push(feature.ctaLink)}
            className={`inline-flex items-center gap-2 h-14 px-10 font-bold rounded-xl transition-colors cursor-pointer ${feature.color}`}
          >
            {feature.cta}
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}