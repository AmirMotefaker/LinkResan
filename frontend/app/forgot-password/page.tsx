"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Link2, Loader2, ArrowLeft, Mail } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMessage("");
    try {
      const res = await fetch(`${API_URL}/forgot-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (res.ok) { setMessage(data.message); } else { setMessage(data.error || "خطا"); }
    } catch { setMessage("ارتباط با سرور برقرار نشد"); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 transition-colors duration-300 relative">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      <header className="w-full pt-8 pb-4 flex justify-center">
        <Link href="/" className="inline-flex items-center gap-2 cursor-pointer"><Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" /><span className="text-xl font-bold tracking-tight">لینک رسان</span></Link>
      </header>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">فراموشی رمز عبور</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">ایمیل خود را وارد کنید.</p>
        </div>
        {message && <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 p-4 rounded-xl mb-4 text-sm text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="email" placeholder="ایمیل ثبت شده" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-14 pr-12 pl-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 transition-all text-gray-900 dark:text-white" required />
          </div>
          <button type="submit" disabled={loading} className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
            {loading ? <Loader2 className="animate-spin" /> : "ارسال لینک بازنشانی"}
          </button>
        </form>
        <button onClick={() => router.push("/login")} className="w-full mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-center gap-1 cursor-pointer pt-4 border-t border-gray-100 dark:border-gray-700">
          <ArrowLeft className="w-4 h-4 rotate-180" /> بازگشت به ورود
        </button>
      </div>
    </main>
  );
}