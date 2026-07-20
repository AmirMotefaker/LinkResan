"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, User, Save, Lock, Eye, EyeOff, Camera, Crown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [passMsg, setPassMsg] = useState("");
  const [passError, setPassError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }

    fetch(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setName(data.name || "");
        setAvatarUrl(data.avatar_url || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, avatar_url: avatarUrl }),
      });
      if (res.ok) {
        setProfileMsg("پروفایل با موفقیت ذخیره شد.");
        setUser({ ...user, name, avatar_url: avatarUrl });
      }
    } catch {}
    setSavingProfile(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPass(true);
    setPassMsg("");
    setPassError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPassMsg(data.message);
        setOldPassword("");
        setNewPassword("");
      } else {
        setPassError(data.error || "خطا در تغییر رمز عبور");
      }
    } catch {}
    setSavingPass(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <div onClick={() => router.push("/dashboard")} className="flex items-center gap-2 cursor-pointer">
            <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-bold">بازگشت به داشبورد</span>
          </div>
          <ThemeToggle />
        </div>

        {/* بنر وضعیت اشتراک */}
        <div className={`p-4 rounded-2xl mb-8 flex items-center justify-between ${user.is_premium ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800' : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
          <div className="flex items-center gap-3">
            <Crown className={`w-6 h-6 ${user.is_premium ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
            <div>
              <h3 className="font-bold">وضعیت اشتراک</h3>
              <p className={`text-sm ${user.is_premium ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>
                {user.is_premium ? "پلن حرفه‌ای (Pro) - فعال" : "پلن رایگان - محدودیت‌ها اعمال شده است"}
              </p>
            </div>
          </div>
          {!user.is_premium && (
            <button onClick={() => router.push("/pricing/pro")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-lg cursor-pointer">
              ارتقا به Pro
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* بخش ویرایش پروفایل */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> ویرایش پروفایل</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img 
                  src={avatarUrl || `https://ui-avatars.com/api/?name=${name || user.email}&background=2563eb&color=fff`} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
                />
                <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نام و نام خانوادگی</label>
                <input
                  type="text"
                  placeholder="نام خود را وارد کنید"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">آدرس عکس پروفایل (URL)</label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ایمیل (غیرقابل تغییر)</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full h-12 px-4 bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              {profileMsg && <p className="text-green-500 text-sm text-center">{profileMsg}</p>}

              <button type="submit" disabled={savingProfile} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                {savingProfile ? <Loader2 className="animate-spin w-5 h-5" /> : <><Save className="w-5 h-5" /> ذخیره تغییرات</>}
              </button>
            </form>
          </div>

          {/* بخش تغییر رمز عبور */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> تغییر رمز عبور</h2>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showOldPass ? "text" : "password"}
                  placeholder="رمز عبور فعلی"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full h-12 pr-12 pl-12 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white"
                  required
                />
                <button type="button" onClick={() => setShowOldPass(!showOldPass)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
                  {showOldPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNewPass ? "text" : "password"}
                  placeholder="رمز عبور جدید"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-12 pr-12 pl-12 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500 text-sm text-white"
                  required
                />
                <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
                  {showNewPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {passError && <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{passError}</p>}
              {passMsg && <p className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">{passMsg}</p>}

              <button type="submit" disabled={savingPass} className="w-full h-12 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                {savingPass ? <Loader2 className="animate-spin w-5 h-5" /> : "تغییر رمز عبور"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}