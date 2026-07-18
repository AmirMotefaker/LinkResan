"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link2, Loader2, Copy, Check, ExternalLink, MousePointerClick, LogOut, Trash2, QrCode, X, Download, TrendingUp, Globe, Plus, Monitor, Crown } from "lucide-react";
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
  const [stats, setStats] = useState<any>(null);
  const [domains, setDomains] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [qrModalUrl, setQrModalUrl] = useState<string | null>(null);
  
  const [newDomain, setNewDomain] = useState("");
  const [domainLoading, setDomainLoading] = useState(false);

  // متغیرهای پیام پرداخت
  const [paymentMsg, setPaymentMsg] = useState("");
  
  const [newLink, setNewLink] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // بررسی وضعیت بازگشت از بانک
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      setPaymentMsg("پرداخت با موفقیت انجام شد! اکانت شما به پلن Pro ارتقا یافت.");
      // پاک کردن پارامتر URL
      router.replace('/dashboard');
    } else if (paymentStatus === 'failed') {
      setPaymentMsg("پرداخت ناموفق بود یا لغو شد. لطفاً دوباره تلاش کنید.");
      router.replace('/dashboard');
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    Promise.all([
      fetch(`${API_URL}/links`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_URL}/links/analytics`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_URL}/links/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_URL}/domains`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json())
    ])
      .then(([linksData, analyticsData, statsData, domainsData]) => {
        if (linksData.links) setLinks(linksData.links);
        if (analyticsData.analytics) setAnalytics(analyticsData.analytics);
        if (statsData.stats) setStats(statsData.stats);
        if (domainsData.domains) setDomains(domainsData.domains);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router, searchParams]);

  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
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
    } catch (error) {
      alert("ارتباط با سرور برقرار نشد");
    } finally {
      setDomainLoading(false);
    }
  };

  const handleDeleteDomain = async (id: number) => {
    if (!confirm("آیا از حذف این دامنه مطمئن هستید؟")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/domains/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setDomains(domains.filter(d => d.ID !== id));
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

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 px-4">
      
      <header className="w-full max-w-6xl flex justify-between items-center py-3 sm:py-6">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Link2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          <span className="text-lg sm:text-xl font-bold tracking-tight">داشبورد</span>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <button onClick={() => router.push("/dashboard/bio")} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">صفحه بیو</button>
          <button onClick={() => router.push("/")} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer">ساخت لینک</button>
          
          {/* دکمه ارتقا به پلن پرو */}
          <button onClick={() => router.push("/dashboard/upgrade")} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
            <Crown className="w-4 h-4" />
            ارتقا به Pro
          </button>

          <button onClick={handleLogout} className="px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium bg-black hover:bg-gray-800 text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
            <LogOut className="w-4 h-4" /> خروج
          </button>
        </div>
      </header>

      <section className="w-full max-w-6xl mt-8 mb-12">
        
        {/* پیام وضعیت پرداخت */}
        {paymentMsg && (
          <div className={`mb-8 p-4 rounded-xl text-sm ${paymentMsg.includes('موفق') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {paymentMsg}
          </div>
        )}

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base sm:text-lg font-bold">دامنه‌های اختصاصی شما</h3>
          </div>
          
          <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              placeholder="دامنه خود را وارد کنید (مثلا: go.myshop.ir)"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              className="w-full h-12 px-4 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 transition-all cursor-pointer"
              required
            />
            <button type="submit" disabled={domainLoading} className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              {domainLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
              افزودن دامنه
            </button>
          </form>

          <div className="text-xs text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg">
            <strong>راهنمای تنظیم DNS:</strong> برای فعال‌سازی دامنه، وارد پنل سایتی که دامنه را خریدیده‌اید شوید و یک رکورد CNAME برای `www` با مقدار `cname.vercel-dns.com` ایجاد کنید.
          </div>

          {domains.length > 0 ? (
            <div className="space-y-2">
              {domains.map((domain) => (
                <div key={domain.ID} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-sm">{domain.Domain}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-md ${domain.IsVerified ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {domain.IsVerified ? "تایید شده" : "در انتظار تایید"}
                    </span>
                    <button onClick={() => handleDeleteDomain(domain.ID)} className="p-1 hover:bg-red-50 rounded transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">هنوز دامنه اختصاصی اضافه نکرده‌اید.</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base sm:text-lg font-bold">آمار کلیک‌های ۷ روز اخیر</h3>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            ) : (
              <div className="w-full h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={formatChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorClick" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} tickMargin={8} />
                    <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(value) => toFa(value)} tickMargin={15} width={50} />
                    <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '14px' }} formatter={(value: any) => [toFa(value) + ' کلیک', 'تعداد']} />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorClick)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold mb-6">دستگاه‌ها و مرورگرها</h3>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            ) : stats ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">سیستم‌عامل‌ها</h4>
                  <div className="space-y-2">
                    {stats.devices && stats.devices.length > 0 ? (
                      stats.devices.slice(0, 3).map((device: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-gray-400" />
                            <span>{device.name}</span>
                          </div>
                          <span className="font-bold text-gray-700">{toFa(device.count)}</span>
                        </div>
                      ))
                    ) : <p className="text-xs text-gray-400">داده‌ای موجود نیست</p>}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">مرورگرها</h4>
                  <div className="space-y-2">
                    {stats.browsers && stats.browsers.length > 0 ? (
                      stats.browsers.slice(0, 3).map((browser: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span>{browser.name}</span>
                          </div>
                          <span className="font-bold text-gray-700">{toFa(browser.count)}</span>
                        </div>
                      ))
                    ) : <p className="text-xs text-gray-400">داده‌ای موجود نیست</p>}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-6">لینک‌های شما ({toFa(links.length)})</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : links.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-sm">
            <p className="text-gray-500 mb-4">شما هنوز هیچ لینکی نساخته‌اید.</p>
            <button onClick={() => router.push("/")} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors cursor-pointer">ساخت اولین لینک</button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-medium text-gray-500 min-w-[900px]">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">لینک کوتاه</div>
              <div className="col-span-3">لینک اصلی</div>
              <div className="col-span-2">تاریخ ساخت</div>
              <div className="col-span-1 text-center">کلیک‌ها</div>
              <div className="col-span-1 text-center">عملیات</div>
            </div>

            {links.map((link, index) => {
              const domain = domains.find(d => d.ID === link.DomainID);
              const shortUrl = `https://${domain ? domain.Domain : 'linkresan.ir'}/${link.ShortCode}`;
              
              return (
                <div key={link.ID} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center min-w-[900px]">
                  <div className="md:col-span-1 md:text-center font-medium text-gray-400">{toFa(index + 1)}</div>
                  <div className="md:col-span-4 flex items-center gap-2">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline flex items-center gap-1 truncate">
                      {shortUrl.replace('https://', '')}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                    <button onClick={() => handleCopy(shortUrl, link.ID)} className="p-1 hover:bg-indigo-50 rounded transition-colors flex-shrink-0 cursor-pointer">
                      {copiedId === link.ID ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                  <div className="md:col-span-3 text-gray-500 truncate text-sm">{link.OriginalURL}</div>
                  <div className="md:col-span-2 text-gray-500 text-xs">{formatDate(link.CreatedAt)}</div>
                  <div className="md:col-span-1 flex md:justify-center items-center">
                    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                      <MousePointerClick className="w-3 h-3" />{toFa(link.ClickCount)}
                    </span>
                  </div>
                  <div className="md:col-span-1 flex md:justify-center items-center gap-2">
                    <button onClick={() => setQrModalUrl(shortUrl)} className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group cursor-pointer" title="دانلود QR Code">
                      <QrCode className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </button>
                    <button onClick={() => handleDeleteLink(link.ID)} className="p-2 hover:bg-red-50 rounded-lg transition-colors group cursor-pointer" title="حذف لینک">
                      <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {qrModalUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setQrModalUrl(null)}>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="w-full flex justify-between items-center mb-6">
              <h3 className="text-lg sm:text-xl font-bold">QR Code</h3>
              <button onClick={() => setQrModalUrl(null)} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 border-2 border-gray-100 rounded-xl mb-6">
              <QRCodeCanvas id="qr-canvas" value={qrModalUrl} size={200} bgColor="#ffffff" fgColor="#000000" level="H" includeMargin={true} />
            </div>
            <p className="text-sm text-gray-500 mb-6 text-center break-all">{qrModalUrl}</p>
            <button onClick={downloadQR} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Download className="w-5 h-5" /> دانلود تصویر QR
            </button>
          </div>
        </div>
      )}
    </main>
  );
}