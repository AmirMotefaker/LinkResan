"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, KeyRound, Trash2, Plus, Copy, Check, AlertTriangle, BookOpen } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ApiKeysDashboard() {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetch(`${API_URL}/api-keys`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => { if (data.api_keys) setApiKeys(data.api_keys); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  const handleAddKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true); setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api-keys`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: newKeyName || "Default Key" }) });
      const data = await res.json();
      if (res.ok && data.api_key) { setApiKeys([...apiKeys, data.api_key]); setNewKeyName(""); } else { setError(data.error || "خطا در ساخت کلید API"); }
    } catch { setError("ارتباط با سرور برقرار نشد"); } finally { setAdding(false); }
  };

  const handleDeleteKey = async (id: number) => {
    if (!confirm("آیا از حذف این کلید API مطمئن هستید؟")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api-keys/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setApiKeys(apiKeys.filter(k => k.ID !== id)); }
    } catch {}
  };

  const handleCopy = (key: string, id: number) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="text-2xl font-bold mb-8">مدیریت کلیدهای API</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2"><KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> ساخت کلید جدید</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">با استفاده از کلید API، می‌توانید لینک‌ها را مستقیماً از کدهای خود بسازید.</p>
          <form onSubmit={handleAddKey} className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4">
              <KeyRound className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="نام کلید (مثلا: سرور پروداکشن)" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} className="w-full h-12 bg-transparent outline-none text-sm text-white" />
            </div>
            <button type="submit" disabled={adding} className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              {adding ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />} ساخت کلید
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> کلیدهای فعال ({apiKeys.length})</h2>
          <div className="space-y-3">
            {apiKeys.length > 0 ? (
              apiKeys.map((key) => (
                <div key={key.ID} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">{key.Name || "Unnamed Key"}</span>
                    <button onClick={() => handleDeleteKey(key.ID)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <code className="text-xs text-indigo-600 dark:text-indigo-400 truncate ml-2">{key.Key}</code>
                    <button onClick={() => handleCopy(key.Key, key.ID)} className="p-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors flex-shrink-0 cursor-pointer">
                      {copiedId === key.ID ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>
              ))
            ) : ( <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">هنوز کلید API نساخته‌اید.</p> )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 p-4 rounded-xl text-sm flex flex-col gap-3 max-w-5xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong>هشدار امنیتی:</strong> کلیدهای API مانند رمزهای عبور عمل می‌کنند. هرگز آن‌ها را در مخازن عمومی گیت‌هاب قرار ندهید. در صورت لو رفتن، فوراً کلید را حذف و کلید جدید بسازید.
          </div>
        </div>
        <a href="https://linkresan-api.onrender.com/docs" target="_blank" rel="noopener noreferrer" className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-xs font-bold w-fit flex items-center gap-1 cursor-pointer">
          <BookOpen className="w-4 h-4" /> مشاهده مستندات فنی API (Swagger)
        </a>
      </div>
    </div>
  );
}