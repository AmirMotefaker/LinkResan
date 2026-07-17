"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, LogOut, Plus, Trash2, Save, ExternalLink } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BioDashboard() {
  const [bioPage, setBioPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [bioText, setBioText] = useState("");
  
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${API_URL}/bio`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.bio_page) {
          setBioPage(data.bio_page);
          setSlug(data.bio_page.Slug);
          setTitle(data.bio_page.Title);
          setBioText(data.bio_page.BioText);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/bio`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ slug, title, bio_text: bioText }),
      });
      const data = await res.json();
      if (res.ok && data.bio_page) {
        setBioPage(data.bio_page);
        alert("تنظیمات صفحه با موفقیت ذخیره شد!");
      } else {
        alert(data.error || "خطا در ذخیره‌سازی");
      }
    } catch {
      alert("ارتباط با سرور برقرار نشد");
    } finally {
      setSaving(false);
    }
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle || !newLinkUrl) return;
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/bio/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: newLinkTitle, url: newLinkUrl }),
      });
      const data = await res.json();
      if (res.ok && data.link) {
        setBioPage({ ...bioPage, Links: [...(bioPage?.Links || []), data.link] });
        setNewLinkTitle("");
        setNewLinkUrl("");
      } else {
        alert(data.error || "خطا در افزودن لینک");
      }
    } catch {
      alert("ارتباط با سرور برقرار نشد");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLink = async (id: number) => {
    if (!confirm("آیا از حذف این لینک مطمئن هستید؟")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/bio/links/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBioPage({ ...bioPage, Links: bioPage.Links.filter((l: any) => l.ID !== id) });
      }
    } catch {}
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 px-4">
      
      <header className="w-full max-w-3xl flex justify-between items-center py-6">
        <div onClick={() => router.push("/dashboard")} className="flex items-center gap-2 cursor-pointer">
          <Link2 className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-bold">مدیریت صفحه بیو</span>
        </div>
        <button onClick={() => router.push("/dashboard")} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">
          بازگشت به داشبورد
        </button>
      </header>

      <section className="w-full max-w-3xl mt-8 mb-12 space-y-8">
        
        {/* تنظیمات صفحه */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">تنظیمات صفحه</h3>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">آدرس صفحه (Slug)</label>
              <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-xl px-4">
                <span className="text-gray-400 text-sm whitespace-nowrap">linkresan.ir/b/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full h-12 bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان (نام شما یا برند)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات کوتاه (Bio)</label>
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 text-sm"
                rows={3}
              />
            </div>
            <button type="submit" disabled={saving} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
              {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
              ذخیره تنظیمات
            </button>
          </form>
        </div>

        {/* مدیریت لینک‌ها */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">لینک‌های صفحه</h3>
          
          <form onSubmit={handleAddLink} className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              placeholder="عنوان دکمه (مثلا: اینستاگرام)"
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 text-sm"
              required
            />
            <input
              type="url"
              placeholder="آدرس لینک (https://...)"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 text-sm"
              required
            />
            <button type="submit" disabled={saving} className="h-12 px-6 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
              افزودن
            </button>
          </form>

          <div className="space-y-2">
            {bioPage?.Links && bioPage.Links.length > 0 ? (
              bioPage.Links.map((link: any) => (
                <div key={link.ID} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{link.Title}</span>
                    <span className="text-xs text-gray-400 truncate">{link.URL}</span>
                  </div>
                  <button onClick={() => handleDeleteLink(link.ID)} className="p-2 hover:bg-red-50 rounded transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">هنوز لینکی اضافه نکرده‌اید.</p>
            )}
          </div>
        </div>

        {/* پیش‌نمایش لینک */}
        {slug && (
          <div className="text-center">
            <a href={`https://linkresan.ir/b/${slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline">
              مشاهده صفحه عمومی <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </section>
    </main>
  );
}