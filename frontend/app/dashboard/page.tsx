"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Copy, Check, ExternalLink, MousePointerClick, LogOut } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // گرفتن لینک‌ها از بک‌اند
    fetch(`${API_URL}/links`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.links) {
          setLinks(data.links);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 px-4">
      
      {/* هدر داشبورد */}
      <header className="w-full max-w-5xl flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <div className="bg-black p-2 rounded-lg">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">داشبورد لینک رسان</span>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={() => router.push("/")} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
            ساخت لینک جدید
          </button>
          <button onClick={handleLogout} className="px-5 py-2 text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      </header>

      {/* محتوای داشبورد */}
      <section className="w-full max-w-5xl mt-12">
        <h2 className="text-2xl font-bold mb-6">لینک‌های شما ({links.length})</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : links.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-sm">
            <p className="text-gray-500 mb-4">شما هنوز هیچ لینکی نساخته‌اید.</p>
            <button onClick={() => router.push("/")} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors">
              ساخت اولین لینک
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* هدر جدول */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="col-span-5">لینک کوتاه</div>
              <div className="col-span-5">لینک اصلی</div>
              <div className="col-span-1 text-center">کلیک‌ها</div>
              <div className="col-span-1 text-center">عملیات</div>
            </div>

            {/* ردیف‌های جدول */}
            {links.map((link) => {
              const shortUrl = `http://localhost:8080/${link.ShortCode}`;
              return (
                <div key={link.ID} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center">
                  
                  {/* لینک کوتاه */}
                  <div className="md:col-span-5 flex items-center gap-2">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline flex items-center gap-1 truncate">
                      {shortUrl}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>

                  {/* لینک اصلی */}
                  <div className="md:col-span-5 text-gray-500 truncate text-sm">
                    {link.OriginalURL}
                  </div>

                  {/* تعداد کلیک */}
                  <div className="md:col-span-1 flex md:justify-center items-center">
                    <span className="md:hidden text-sm text-gray-500 ml-2">کلیک‌ها:</span>
                    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-sm font-medium">
                      <MousePointerClick className="w-3 h-3" />
                      {link.ClickCount}
                    </span>
                  </div>

                  {/* دکمه کپی */}
                  <div className="md:col-span-1 flex md:justify-center">
                    <button onClick={() => handleCopy(shortUrl, link.ID)} className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                      {copiedId === link.ID ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}