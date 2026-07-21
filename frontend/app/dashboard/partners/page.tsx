"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Gift, Copy, Check, Wallet, Users, UserCheck } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const toFa = (num: any) => {
  if (num === null || num === undefined) return "۰";
  return num.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
};

export default function PartnersDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }

    fetch(`${API_URL}/partners/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleCopy = () => {
    if (stats?.referral_link) {
      navigator.clipboard.writeText(stats.referral_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="text-2xl font-bold mb-2">برنامه همکاری در فروش (Partner Program)</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">لینک اختصاصی خود را پخش کنید و از هر خریدی که از طریق شما انجام شود، ۲۰٪ پورسانت دریافت کنید!</p>
      
      {/* لینک دعوت */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 max-w-3xl">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Gift className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> لینک دعوت شما</h2>
        <div className="flex flex-col sm:flex-row gap-2 items-center bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-2">
          <input 
            type="text" 
            value={stats?.referral_link || ""} 
            readOnly 
            className="w-full h-10 bg-transparent outline-none text-sm text-indigo-600 dark:text-indigo-400 font-medium px-2"
          />
          <button onClick={handleCopy} className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0">
            {copied ? <><Check className="w-4 h-4" /> کپی شد</> : <><Copy className="w-4 h-4" /> کپی لینک</>}
          </button>
        </div>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">موجودی کیف پول (تومان)</h3>
          <p className="text-3xl font-extrabold">{toFa(stats?.wallet_balance || 0)}</p>
          <button className="mt-4 w-full h-10 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-lg disabled:opacity-50 cursor-pointer" disabled={!stats?.wallet_balance}>
            درخواست برداشت
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">کل کاربران دعوت شده</h3>
          <p className="text-3xl font-extrabold">{toFa(stats?.total_referrals || 0)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <UserCheck className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">خریدهای موفق (Converted)</h3>
          <p className="text-3xl font-extrabold">{toFa(stats?.converted_referrals || 0)}</p>
        </div>
      </div>
    </div>
  );
}