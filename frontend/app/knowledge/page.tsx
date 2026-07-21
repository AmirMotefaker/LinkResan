"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Link2, BookOpen, Terminal, HelpCircle, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function KnowledgePage() {
  const router = useRouter();
  const articles = [
    { slug: "how-to-shorten", icon: Zap, title: "چگونه یک لینک کوتاه بسازیم؟", desc: "آموزش گام به گام." },
    { slug: "api-docs", icon: Terminal, title: "مستندات API", desc: "اتصال به اپلیکیشن." },
    { slug: "seo-guide", icon: BookOpen, title: "سئو و لینک کوتاه", desc: "تگ‌گذاری UTM." },
    { slug: "faq", icon: HelpCircle, title: "سوالات متداول", desc: "پاسخ سوالات." },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      <header className="w-full pt-8 pb-4 flex justify-center">
        <Link href="/" className="inline-flex items-center gap-2 cursor-pointer"><Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" /><span className="text-xl font-bold tracking-tight">لینک رسان</span></Link>
      </header>
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">پایگاه دانش</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">مقالات و راهنماها.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <Link key={i} href={`/knowledge/${article.slug}`} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl cursor-pointer group">
              <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-xl w-fit mb-4"><article.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110" /></div>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{article.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}