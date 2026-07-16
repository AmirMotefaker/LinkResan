"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // تغییر حالت بین ورود و ثبت‌نام
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

      if (!res.ok) {
        throw new Error(data.error || "خطایی رخ داد");
      }

      if (isLogin) {
        // ذخیره توکن در مرورگر
        localStorage.setItem("token", data.token);
        router.push("/"); // بازگشت به صفحه اصلی
      } else {
        // اگر ثبت‌نام بود، بعد از موفقیت به حالت ورود تغییر کنه
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-black p-3 rounded-xl mb-4">
            <Link2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? "ورود به حساب" : "ساخت حساب جدید"}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "ورود" : "ثبت‌نام")}
          </button>
        </form>

        <button
          onClick={() => { setIsLogin(!isLogin); setError(""); }}
          className="w-full mt-6 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          {isLogin ? "حساب ندارید؟ ثبت‌نام کنید" : "حساب دارید؟ وارد شوید"}
        </button>
      </div>
    </main>
  );
}