"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLogin ? "/login" : "/register";
    
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطایی رخ داد");

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("is_premium", data.is_premium ? "true" : "false");
        router.push("/onboarding");
      } else {
        setIsLogin(true);
        setError("ثبت‌نام موفق بود! حالا وارد شوید.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 transition-colors duration-300 relative">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        {/* لوگو و عنوان */}
        <div className="flex flex-col items-center mb-8">
          <div onClick={() => router.push("/")} className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl mb-4 border border-indigo-100 dark:border-gray-600 cursor-pointer">
            <Link2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{isLogin ? "ورود به حساب" : "ساخت حساب جدید"}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">به پلتفرم حرفه‌ای لینک رسان خوش آمدید</p>
        </div>

        {/* فرم لاگین */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pr-12 pl-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 transition-all text-white"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 pr-12 pl-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 transition-all text-white"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isLogin ? "ورود به داشبورد" : "ثبت‌نام"}
                <ArrowLeft className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* لینک فراموشی رمز و تغییر حالت */}
        <div className="mt-8 text-center flex flex-col gap-3">
          {isLogin && (
            <button onClick={() => router.push("/forgot-password")} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
              رمز عبور خود را فراموش کرده‌اید؟
            </button>
          )}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer pt-4 border-t border-gray-100 dark:border-gray-700"
          >
            {isLogin ? "حساب کاربری ندارید؟ ثبت‌نام کنید" : "از قبل حساب دارید؟ وارد شوید"}
          </button>
        </div>
      </div>
    </main>
  );
}