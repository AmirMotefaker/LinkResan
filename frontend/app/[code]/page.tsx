"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lock, Loader2, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ShortLinkRedirect() {
  const params = useParams();
  const code = params.code;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const handleRedirect = (data: any) => {
    if (data.deep_link_url) {
      // تلاش برای باز کردن اپلیکیشن
      window.location.href = data.deep_link_url;
      
      // اگر اپلیکیشن نصب نبود، بعد از ۱.۵ ثانیه لینک وب را باز کن
      setTimeout(() => {
        if (data.original_url) {
          window.location.href = data.original_url;
        }
      }, 1500);
    } else if (data.original_url) {
      window.location.href = data.original_url;
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!code || !API_URL) return;
    
    fetch(`${API_URL}/links/info/${code}`)
      .then(res => res.json())
      .then(data => {
        if (data.requires_password) {
          setRequiresPassword(true);
          setLoading(false);
        } else {
          handleRedirect(data);
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, [code, API_URL, router]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/links/verify/${code}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput })
      });
      
      const data = await res.json();
      
      if (res.ok && data.original_url) {
        handleRedirect(data);
      } else {
        setError(data.error || "رمز عبور اشتباه است");
        setLoading(false);
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد");
      setLoading(false);
    }
  };

  if (loading && !requiresPassword) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-6"></div>
          <h1 className="text-2xl font-bold mb-2">در حال انتقال...</h1>
          <p className="text-gray-500">لطفاً چند لحظه صبر کنید.</p>
        </div>
      </main>
    );
  }

  if (requiresPassword) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-50 p-3 rounded-xl mb-4 border border-indigo-100">
              <Lock className="w-7 h-7 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold">این لینک محافظت شده است</h1>
            <p className="text-gray-500 mt-2 text-center">برای مشاهده محتوا، لطفاً رمز عبور را وارد کنید.</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="رمز عبور"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full h-14 px-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-center"
              required
            />
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  ورود به لینک
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return null;
}