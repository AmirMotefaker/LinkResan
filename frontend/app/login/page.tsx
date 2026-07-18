"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2 } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE"; // کلاینت آیدی گوگل شما اینجا

function LoginContent() {
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("is_premium", data.is_premium ? "true" : "false");
        router.push("/onboarding");
      } else {
        setError(data.error || "ورود با گوگل ناموفق بود");
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div onClick={() => router.push("/")} className="bg-indigo-50 p-3 rounded-xl mb-4 border border-indigo-100 cursor-pointer">
            <Link2 className="w-7 h-7 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? "ورود به حساب" : "ساخت حساب جدید"}</h1>
          <p className="text-gray-500 text-sm mt-1">به لینک رسان خوش آمدید</p>
        </div>

        {/* دکمه رسمی ورود با گوگل */}
        <div className="w-full flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("عملیات گوگل لغو شد یا ناموفق بود")}
            text="continue_with"
            shape="rectangular"
            size="large"
            width="320"
          />
        </div>

        {/* جداکننده */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-gray-200 flex-grow"></div>
          <span className="text-xs text-gray-400">یا</span>
          <div className="h-px bg-gray-200 flex-grow"></div>
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
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "ورود" : "ثبت‌نام")}
          </button>
        </form>

        <button
          onClick={() => { setIsLogin(!isLogin); setError(""); }}
          className="w-full mt-6 text-sm text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          {isLogin ? "حساب ندارید؟ ثبت‌نام کنید" : "حساب دارید؟ وارد شوید"}
        </button>
      </div>
    </main>
  );
}

export default function Login() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LoginContent />
    </GoogleOAuthProvider>
  );
}