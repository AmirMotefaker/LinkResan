"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Upload, Download, FileSpreadsheet } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BulkLinksPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setDownloadUrl("");

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/links/bulk`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "خطا در پردازش فایل");
      }

      // دریافت فایل CSV از سرور و ساخت لینک دانلود
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 px-4 py-12">
      <div className="w-full max-w-2xl">
        <div onClick={() => router.push("/dashboard")} className="flex items-center gap-2 cursor-pointer mb-8">
          <Link2 className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-bold">بازگشت به داشبورد</span>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-2xl font-bold mb-2">ساخت انبوه لینک</h1>
          <p className="text-gray-500 text-sm mb-8">
            یک فایل CSV (اکسل) آپلود کنید که در ستون اول آن لینک‌های طولانی شما قرار دارد. (حداکثر ۱۰۰ لینک در هر فایل)
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-500 transition-colors">
            <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <span className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
                انتخاب فایل CSV
              </span>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
            <p className="text-xs text-gray-400 mt-4">فقط فایل با پسوند .csv</p>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          {downloadUrl && (
            <div className="mt-6 bg-green-50 p-6 rounded-xl text-center">
              <h3 className="font-bold text-green-800 mb-2">لینک‌ها با موفقیت ساخته شدند!</h3>
              <p className="text-sm text-green-600 mb-4">فایل آماده شده را دانلود کنید:</p>
              <a
                href={downloadUrl}
                download="shortened_links.csv"
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                دانلود فایل لینک‌های کوتاه
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}