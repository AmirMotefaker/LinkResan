"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link2, Loader2 } from "lucide-react";

// برای جلوگیری از ارور Suspense
import { Suspense } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = searchParams.get("token");
    if (t) setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.error || "خطایی رخ داد");
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
          <div className="bg-indigo-50 p-3 rounded-xl mb-4 border border-indigo-100">
            <Link2 className="w-7 h-7 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold">رمز عبور جدید</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">رمز عبور جدید خود را وارد کنید.</p>
        </div>

        {message && <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-4 text-sm text-center">{message}</div>}
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="رمز عبور جدید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : "تغییر رمز عبور"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}