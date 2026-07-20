"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Users, Crown, MousePointerClick, Link as LinkIcon, Globe, ShieldAlert } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const toFa = (num: any) => {
  if (num === null || num === undefined) return "۰";
  return num.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStatus = localStorage.getItem("is_admin") === "true";
    setIsAdmin(adminStatus);

    if (!token || !adminStatus) {
      router.push("/dashboard");
      return;
    }

    Promise.all([
      fetch(`${API_URL}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json())
    ])
      .then(([statsData, usersData]) => {
        if (statsData.stats) setStats(statsData.stats);
        if (usersData.users) setUsers(usersData.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </main>
    );
  }

  const statCards = [
    { title: "کل کاربران", value: stats?.users, icon: Users, color: "text-blue-500" },
    { title: "کاربران Pro", value: stats?.proUsers, icon: Crown, color: "text-yellow-500" },
    { title: "کل لینک‌ها", value: stats?.links, icon: LinkIcon, color: "text-indigo-500" },
    { title: "کل کلیک‌ها", value: stats?.clicks, icon: MousePointerClick, color: "text-green-500" },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div onClick={() => router.push("/dashboard")} className="flex items-center gap-2 cursor-pointer">
            <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-bold">بازگشت به داشبورد</span>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 mb-8">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-extrabold">پنل مدیریت (CRM)</h1>
        </div>

        {/* کارت‌های آماری */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <card.icon className={`w-8 h-8 ${card.color}`} />
              </div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.title}</h3>
              <p className="text-3xl font-extrabold">{toFa(card.value)}</p>
            </div>
          ))}
        </div>

        {/* جدول لیدها (کاربران) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <h2 className="text-xl font-bold p-6 border-b border-gray-100 dark:border-gray-700">لیست کاربران ({toFa(users.length)})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 font-bold whitespace-nowrap">ایمیل</th>
                  <th className="p-4 font-bold whitespace-nowrap">نام</th>
                  <th className="p-4 font-bold whitespace-nowrap">کشور</th>
                  <th className="p-4 font-bold whitespace-nowrap">شهر</th>
                  <th className="p-4 font-bold whitespace-nowrap">IP</th>
                  <th className="p-4 font-bold whitespace-nowrap">آخرین ورود</th>
                  <th className="p-4 font-bold whitespace-nowrap">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.ID} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 font-medium text-indigo-600 dark:text-indigo-400">{user.Email}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{user.Name || "-"}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300 flex items-center gap-1"><Globe className="w-3 h-3" /> {user.Country || "-"}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{user.City || "-"}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400 text-xs font-mono">{user.LastLoginIP || "-"}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                      {user.LastLoginAt ? new Date(user.LastLoginAt).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "هرگز"}
                    </td>
                    <td className="p-4">
                      {user.IsAdmin ? <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-md">ادمین</span> : 
                       user.IsPremium ? <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-md">Pro</span> : 
                       <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md">رایگان</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}