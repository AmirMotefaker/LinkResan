"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Link2, ArrowLeft, Check } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function KnowledgeArticlePage() {
  const router = useRouter(); const params = useParams(); const slug = params.slug as string;
  const articlesData: any = {
    "how-to-shorten": { title: "چگونه یک لینک کوتاه بسازیم؟", content: ["وارد صفحه اصلی شوید.", "لینک را پیست کنید.", "اسلاگ دلخواه تعیین کنید.", "روی 'کوتاه کردن' کلیک کنید."] },
    "api-docs": { title: "مستندات API", content: ["کلید API بسازید.", "در هدر بفرستید.", "POST به /api/links.", "Swagger را ببینید."] },
    "seo-guide": { title: "سئو و لینک کوتاه", content: ["اسلاگ مرتبط بسازید.", "از UTM استفاده کنید."] },
    "faq": { title: "سوالات متداول", content: ["رایگان است؟ بله.", "منقضی می‌شود؟ خیر."] }
  };
  const article = articlesData[slug];
  if (!article) return <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><p>مقاله پیدا نشد.</p></main>;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      <header className="w-full pt-8 pb-4 flex justify-center">
        <Link href="/" className="inline-flex items-center gap-2 cursor-pointer"><Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" /><span className="text-xl font-bold tracking-tight">لینک رسان</span></Link>
      </header>
      <div className="w-full max-w-3xl mx-auto">
        <button onClick={() => router.push("/knowledge")} className="flex items-center gap-2 text-sm text-gray-500 mb-8 cursor-pointer"><ArrowLeft className="w-4 h-4 rotate-180" /> بازگشت</button>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8">{article.title}</h1>
        <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="space-y-6">
            {article.content.map((point: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mt-1 flex-shrink-0"><Check className="w-4 h-4 text-green-600 dark:text-green-400" /></div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}