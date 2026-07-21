
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Globe, Plus, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DomainsPage() {
  const [domains, setDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState("");
  const [domainLoading, setDomainLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetch(`${API_URL}/domains`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => { if (data.domains) setDomains(data.domains); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;
    setDomainLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/domains`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ domain: newDomain }),
      });
      const data = await res.json();
      if (res.ok && data.domain) {
        setDomains([...domains, data.domain]);
        setNewDomain("");
      } else {
        alert(data.error || "خطا در افزودن دامنه");
      }
    } catch { alert("ارتباط با سرور برقرار نشد"); } finally { setDomainLoading(false); }
  };

  const handleDeleteDomain = async (id: number) => {
    if (!confirm("آیا از حذف این دامنه مطمئن هستید؟")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/domains/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setDomains(domains.filter(d => d.ID !== id)); }
    } catch {}
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="text-2xl font-bold mb-8">دامنه‌های اختصاصی</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> افزودن دامنه جدید</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">برای استفاده از دامنه خودتان (مثلا go.myshop.ir)، آن را اینجا وارد کنید.</p>
        <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="دامنه خود را وارد کنید"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="w-full h-12 px-4 text-sm bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-white"
            required
          />
          <button type="submit" disabled={domainLoading} className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
            {domainLoading ? <Loader2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />} افزودن
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mt-8">
        <h2 className="text-lg font-bold mb-6">دامنه‌های فعال ({domains.length})</h2>
        {domains.length > 0 ? (
          <div className="space-y-2">
            {domains.map((domain) => (
              <div key={domain.ID} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-sm">{domain.Domain}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-md ${domain.IsVerified ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'}`}>
                    {domain.IsVerified ? "تایید شده" : "در انتظار تایید"}
                  </span>
                  <button onClick={() => handleDeleteDomain(domain.ID)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">هنوز دامنه اختصاصی اضافه نکرده‌اید.</p>
        )}
      </div>
    </div>
  );
}