"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Link2, ArrowLeft, Check, Zap, Shield, BarChart2, Server, Lock, TrendingUp, Wand2, QrCode, Gift, Globe, Users, KeyRound, Scissors, LayoutGrid } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const productsData: any = {
    shortener: {
      icon: Scissors, title: "کوتاه‌کننده لینک حرفه‌ای", subtitle: "تبدیل لینک‌های طولانی به لینک‌های کوتاه، امن و قابل اندازه‌گیری",
      desc: "لینک رسان به شما اجازه می‌دهد لینک‌های طولانی و زشت را به لینک‌های کوتاه و برند تبدیل کنید.",
      points: ["اسلاگ دلخواه (Custom Alias)", "تاریخ انقضا", "محدودیت کلیک", "رمز عبور", "ساخت انبوه (Bulk CSV)"],
      cta: "شروع رایگان", ctaLink: "/login", color: "bg-indigo-600 hover:bg-indigo-700"
    },
    bio: {
      icon: LayoutGrid, title: "صفحه بیو (Link-in-bio)", subtitle: "رقیب مستقیم Linktree، مخصوص اینستاگرامرها",
      desc: "یک صفحه پروفایل یک‌صفحه‌ای و زیبا بسازید و تمام لینک‌های خود را در یک جا جمع کنید.",
      points: ["آدرس اختصاصی", "مدیریت لینک‌ها", "ردیابی کلیک‌ها", "رندر سمت سرور (SSR)"],
      cta: "ساخت صفحه بیو", ctaLink: "/login", color: "bg-purple-600 hover:bg-purple-700"
    },
    qr: {
      icon: QrCode, title: "تولید کد QR", subtitle: "کد QR با کیفیت بالا برای هر لینک",
      desc: "برای هر لینک کوتاه، یک کد QR به صورت خودکار تولید می‌شود.",
      points: ["تولید خودکار", "کیفیت چاپ (Level H)", "دانلود PNG", "رنگ‌بندی (به زودی)"],
      cta: "تست رایگان", ctaLink: "/login", color: "bg-green-600 hover:bg-green-700"
    },
    ai: {
      icon: Wand2, title: "هوش مصنوعی (AI)", subtitle: "تولید خودکار نام لینک با Llama 3.3",
      desc: "هوش مصنوعی لینک شما را تحلیل کرده و بهترین نام کوتاه و سئوپسند را پیشنهاد می‌دهد.",
      points: ["تحلیل هوشمند محتوا", "پشتیبانی از لینک‌های بدون متن", "سرعت فوق‌العاده بالا", "سئوپسند (kebab-case)"],
      cta: "امتحان رایگان", ctaLink: "/login", color: "bg-indigo-600 hover:bg-indigo-700"
    },
    analytics: {
      icon: TrendingUp, title: "تحلیل و آمار (Analytics)", subtitle: "می‌دانید چه کسانی روی لینک‌های شما کلیک می‌کنند",
      desc: "با داشبورد تحلیلی لینک رسان، اطلاعات دقیقی از کلیک‌های خود به دست آورید.",
      points: ["تعداد کلیک‌های واقعی", "تشخیص دستگاه و سیستم‌عامل", "نمودار هفتگی", "سازنده UTM"],
      cta: "مشاهده پلن‌ها", ctaLink: "/pricing", color: "bg-blue-600 hover:bg-blue-700"
    },
    partners: {
      icon: Gift, title: "همکاری در فروش (Partner Program)", subtitle: "با دعوت دیگران، پورسانت کسب کنید",
      desc: "کاربران می‌توانند با دعوت دیگران، از هر خریدی ۲۰٪ پورسانت دریافت کنند.",
      points: ["لینک دعوت اختصاصی", "کیف پول (Wallet)", "پورسانت خودکار ۲۰٪", "داشبورد همکاران"],
      cta: "دریافت لینک دعوت", ctaLink: "/login", color: "bg-yellow-600 hover:bg-yellow-700"
    },
    domains: {
      icon: Globe, title: "دامنه اختصاصی (Custom Domains)", subtitle: "برندینگ لینک‌های خود را حرفه‌ای کنید",
      desc: "دامنه شخصی خود را متصل کنید تا لینک‌های شما با برند خودتان نمایش داده شوند.",
      points: ["اتصال دامنه شخصی", "مدیریت DNS", "برندینگ کامل", "پشتیبانی از چند دامنه"],
      cta: "مشاهده پلن‌ها", ctaLink: "/pricing", color: "bg-indigo-600 hover:bg-indigo-700"
    },
    teams: {
      icon: Users, title: "مدیریت تیمی (Team Management)", subtitle: "همکاری روی یک مجموعه لینک",
      desc: "اعضای تیم خود را دعوت کنید تا همه روی یک مجموعه لینک کار کنند.",
      points: ["دعوت اعضا", "اشتراک‌گذاری لینک‌ها", "نقش‌های کاربری (به زودی)", "مخصوص پلن سازمانی"],
      cta: "مشاهده پلن سازمانی", ctaLink: "/pricing/enterprise", color: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
    },
    api: {
      icon: KeyRound, title: "API و وب‌هوک (Developer Tools)", subtitle: "ابزارهای حرفه‌ای برای برنامه‌نویسان",
      desc: "با کلید API و مستندات Swagger، لینک‌ها را از داخل کدهای خود بسازید.",
      points: ["کلید API امن", "مستندات Swagger", "وب‌هوک (Webhooks)", "ساخت انبوه via API"],
      cta: "مشاهده مستندات", ctaLink: "/login", color: "bg-gray-800 hover:bg-black dark:bg-gray-200 dark:hover:bg-white text-white dark:text-black"
    }
  };

  const product = productsData[slug];

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="text-center">
          <p className="mb-4">محصول مورد نظر پیدا نشد.</p>
          <button onClick={() => router.push("/")} className="text-indigo-600 cursor-pointer">بازگشت به خانه</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>

      {/* لوگوی لینک رسان در بالاترین نقطه */}
      <header className="w-full pt-8 pb-4 flex justify-center">
        <Link href="/" className="inline-flex items-center gap-2 cursor-pointer">
          <Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold tracking-tight">لینک رسان</span>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-4 pt-8 pb-12 text-center">
        <div className="inline-block p-4 rounded-2xl mb-6 bg-indigo-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <product.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">{product.title}</h1>
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">{product.subtitle}</p>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-3xl mx-auto px-4 pb-16 flex-grow">
        <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-center">{product.desc}</p>
          
          <div className="space-y-6">
            {product.points.map((point: string, i: number) => (
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

        <div className="text-center">
          <button onClick={() => router.push(product.ctaLink)} className={`inline-flex items-center gap-2 h-14 px-10 font-bold rounded-xl transition-colors cursor-pointer text-white ${product.color}`}>
            {product.cta}
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}