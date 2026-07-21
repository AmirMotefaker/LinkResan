"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Copy, Check, ExternalLink, MousePointerClick, Trash2, QrCode, X, Download, TrendingUp, Plus, Search } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const toFa = (num: any) => {
  if (num === null || num === undefined) return "";
  return num.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
};

export default function Dashboard() {
  const [links, setLinks] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [qrModalUrl, setQrModalUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    Promise.all([
      fetch(`${API_URL}/links`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_URL}/links/analytics`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_URL}/domains`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json())
    ])
      .then(([linksData, analyticsData, domainsData]) => {
        if (linksData.links) setLinks(linksData.links);
        if (analyticsData.analytics) setAnalytics(analyticsData.analytics);
        if (domainsData.domains) setDomains(domainsData.domains);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteLink = async (id: number) => {
    if (!confirm("آیا از حذف این لینک مطمئن هستید؟")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/links/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setLinks(links.filter(link => link.ID !== id));
    } catch (error) {
      alert("ارتباط با سرور برقرار نشد");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch { return dateString; }
  };

  const formatChartData = analytics.map(item => {
    const dateObj = new Date(item.date + "T00:00:00");
    return { ...item, date: dateObj.toLocaleDateString('fa-IR', { weekday: 'short', day: 'numeric' }), count: item.count };
  });

  const downloadQR = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "linkresan-qr.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const filteredLinks = links.filter(link => 
    link.ShortCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
    link.OriginalURL.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 w-full">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">لینک‌های من</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">مدیریت و تحلیل لینک‌های شما</p>
        </div>
        <button onClick={() => router.push("/")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
          <Plus className="w-4 h-4" />
          ساخت لینک جدید
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <MousePointerClick className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">کل کلیک‌ها</h3>
          <p className="text-3xl font-extrabold">{toFa(links.reduce((acc, l) => acc + l.ClickCount, 0))}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Link2 className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">کل لینک‌ها</h3>
          <p className="text-3xl font-extrabold">{toFa(links.length)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">کلیک‌های ۷ روز اخیر</h3>
          <p className="text-3xl font-extrabold">{toFa(analytics.reduce((acc, item) => acc + item.count, 0))}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base font-bold">روند کلیک‌های ۷ روز اخیر</h3>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formatChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClick" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} tickMargin={8} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(value) => toFa(value)} tickMargin={15} width={50} />
                <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px', border: '1px solid #374151', backgroundColor: '#1f2937', color: '#fff', fontSize: '14px' }} formatter={(value: any) => [toFa(value) + ' کلیک', 'تعداد']} />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorClick)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold">لینک‌های شما ({toFa(links.length)})</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در لینک‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pr-9 pl-4 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-indigo-500 text-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">{searchQuery ? "لینکی با این مشخصات پیدا نشد." : "شما هنوز هیچ لینکی نساخته‌اید."}</p>
            {!searchQuery && (
              <button onClick={() => router.push("/")} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors cursor-pointer">ساخت اولین لینک</button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 font-bold whitespace-nowrap">لینک کوتاه</th>
                  <th className="p-4 font-bold whitespace-nowrap">لینک اصلی</th>
                  <th className="p-4 font-bold whitespace-nowrap">تاریخ ساخت</th>
                  <th className="p-4 font-bold whitespace-nowrap text-center">کلیک‌ها</th>
                  <th className="p-4 font-bold whitespace-nowrap text-center">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredLinks.map((link) => {
                  const domain = domains.find(d => d.ID === link.DomainID);
                  const shortUrl = `https://${domain ? domain.Domain : 'linkresan.ir'}/${link.ShortCode}`;
                  return (
                    <tr key={link.ID} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1 truncate max-w-xs">
                            {shortUrl.replace('https://', '')}
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                          <button onClick={() => handleCopy(shortUrl, link.ID)} className="p-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors flex-shrink-0 cursor-pointer">
                            {copiedId === link.ID ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 dark:text-gray-400 truncate max-w-xs text-sm">{link.OriginalURL}</td>
                      <td className="p-4 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">{formatDate(link.CreatedAt)}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                          <MousePointerClick className="w-3 h-3" />{toFa(link.ClickCount)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setQrModalUrl(shortUrl)} className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors group cursor-pointer" title="دانلود QR Code">
                            <QrCode className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                          </button>
                          <button onClick={() => handleDeleteLink(link.ID)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors group cursor-pointer" title="حذف لینک">
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {qrModalUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setQrModalUrl(null)}>
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="w-full flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">QR Code</h3>
              <button onClick={() => setQrModalUrl(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 border-2 border-gray-100 dark:border-gray-700 rounded-xl mb-6">
              <QRCodeCanvas id="qr-canvas" value={qrModalUrl} size={200} bgColor="transparent" fgColor="currentColor" level="H" includeMargin={true} className="text-black dark:text-white" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center break-all">{qrModalUrl}</p>
            <button onClick={downloadQR} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Download className="w-5 h-5" /> دانلود تصویر QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}