"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Plus, Trash2, Save, ExternalLink } from "lucide-react";

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
    if (!token) { router.push("/login"); return; }
    fetch(`${API_URL}/bio`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.bio_page) { setBioPage(data.bio_page); setSlug(data.bio_page.Slug); setTitle(data.bio_page.Title); setBioText(data.bio_page.BioText); }
        setLoading(false);
      }).catch(() => setLoading(false));
  }, [router]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/bio`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ slug, title, bio_text: bioText }) });
      const data = await res.json();
      if (res.ok && data.bio_page) { setBioPage(data.bio_page); alert("تنظیمات صفحه با موفقیت ذخیره شد!"); } else { alert(data.error || "خطا در ذخیره‌سازی"); }
    } catch { alert("ارتباط با سرور برقرار نشد"); } finally { setSaving(false); }
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle || !newLinkUrl) return;
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/bio/links`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ title: newLinkTitle, url: newLinkUrl }) });
      const data = await res.json();
      if (res.ok && data.link) { setBioPage({ ...bioPage, Links: [...(bioPage?.Links || []), data.link] }); setNewLinkTitle(""); setNewLinkUrl(""); } else { alert(data.error || "خطا در افزودن لینک"); }
    } catch { alert("ارتباط با سرور برقرار نشد"); } finally { setSaving(false); }
  };

  const handleDeleteLink = async (id: number) => {
    if (!confirm("آیا از حذف این لینک مطمئن هستید؟")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/bio/links/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setBioPage({ ...bioPage, Links: bioPage.Links.filter((l: any) => l.ID !== id) }); }
    } catch {}
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="text-2xl font-bold mb-8">مدیریت صفحه بیو (Link-in-bio)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-6">تنظیمات صفحه</h2>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">آدرس صفحه (Slug)</label>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4">
                <span className="text-gray-400 text-sm whitespace-nowrap">linkresan.ir/b/</span>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full h-12 bg-transparent outline-none text-sm text-white" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">عنوان</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">توضیحات (Bio)</label>
              <textarea value={bioText} onChange={(e) => setBioText(e.target.value)} className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white" rows={3} />
            </div>
            <button type="submit" disabled={saving} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
              {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />} ذخیره تنظیمات
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-6">لینک‌های صفحه</h2>
          <form onSubmit={handleAddLink} className="flex flex-col sm:flex-row gap-2 mb-6">
            <input type="text" placeholder="عنوان دکمه" value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white" required />
            <input type="url" placeholder="آدرس لینک" value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white" required />
            <button type="submit" disabled={saving} className="h-12 px-6 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />} افزودن
            </button>
          </form>
          <div className="space-y-2">
            {bioPage?.Links && bioPage.Links.length > 0 ? (
              bioPage.Links.map((link: any) => (
                <div key={link.ID} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{link.Title}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{link.URL}</span>
                  </div>
                  <button onClick={() => handleDeleteLink(link.ID)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              ))
            ) : ( <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">هنوز لینکی اضافه نکرده‌اید.</p> )}
          </div>
          {slug && (
            <div className="mt-6 text-center">
              <a href={`https://linkresan.ir/b/${slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                مشاهده صفحه عمومی <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}