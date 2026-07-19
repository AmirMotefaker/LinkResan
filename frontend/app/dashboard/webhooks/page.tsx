"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Webhook, Trash2, Plus, Link as LinkIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function WebhooksDashboard() {
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetch(`${API_URL}/webhooks`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => { if (data.webhooks) setWebhooks(data.webhooks); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  const handleAddWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    setAdding(true); setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/webhooks`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ url: newUrl }) });
      const data = await res.json();
      if (res.ok && data.webhook) { setWebhooks([...webhooks, data.webhook]); setNewUrl(""); } else { setError(data.error || "خطا در افزودن وب‌هوک"); }
    } catch { setError("ارتباط با سرور برقرار نشد"); } finally { setAdding(false); }
  };

  const handleDeleteWebhook = async (id: number) => {
    if (!confirm("آیا از حذف این وب‌هوک مطمئن هستید؟")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/webhooks/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setWebhooks(webhooks.filter(w => w.ID !== id)); }
    } catch {}
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <div onClick={() => router.push("/dashboard")} className="flex items-center gap-2 cursor-pointer">
            <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-bold">بازگشت به داشبورد</span>
          </div>
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Webhook className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> افزودن وب‌هوک جدید</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">با ثبت یک آدرس URL، هر بار که کسی روی لینک‌های شما کلیک کند، اطلاعات کلیک به صورت خودکار (POST) به این آدرس ارسال می‌شود.</p>
          <form onSubmit={handleAddWebhook} className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4">
              <LinkIcon className="w-5 h-5 text-gray-400" />
              <input type="url" placeholder="https://your-server.com/webhook" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="w-full h-12 bg-transparent outline-none text-sm text-white" required />
            </div>
            <button type="submit" disabled={adding} className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              {adding ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />} ثبت وب‌هوک
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Webhook className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> وب‌هوک‌های فعال ({webhooks.length})</h2>
          {loading ? (
            <div className="flex justify-center items-center h-32"><Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" /></div>
          ) : webhooks.length > 0 ? (
            <div className="space-y-2">
              {webhooks.map((wh) => (
                <div key={wh.ID} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex items-center gap-3 truncate">
                    <div className="bg-indigo-100 dark:bg-gray-700 p-2 rounded-full"><LinkIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /></div>
                    <span className="font-medium text-sm truncate">{wh.URL}</span>
                  </div>
                  <button onClick={() => handleDeleteWebhook(wh.ID)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors cursor-pointer flex-shrink-0">
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          ) : ( <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">هنوز وب‌هوکی ثبت نکرده‌اید.</p> )}
        </div>
      </div>
    </main>
  );
}