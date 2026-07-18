"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "خطایی رخ داد");
      }
    } catch {
      setMessage("ارتباط با سرور برقرار نشد");
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
          <h1 className="text-2xl font-bold">فراموشی رمز عبور</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">ایمیل خود را وارد کنید تا لینک بازنشانی برای شما ارسال شود.</p>
        </div>

        {message && <div className="bg-indigo-50 text-indigo-600 p-4 rounded-xl mb-4 text-sm text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="ایمیل ثبت شده"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : "ارسال لینک بازنشانی"}
          </button>
        </form>

        <button onClick={() => router.push("/login")} className="w-full mt-6 text-sm text-gray-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1 cursor-pointer">
          <ArrowLeft className="w-4 h-4 rotate-180" />
          بازگشت به ورود
        </button>
      </div>
    </main>
  );
}