"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Users, UserPlus, Mail, Crown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TeamDashboard() {
  const [loading, setLoading] = useState(true);
  const [hasTeam, setHasTeam] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetch(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.team_id && data.team_id > 0) { setHasTeam(true); return fetch(`${API_URL}/team/members`, { headers: { Authorization: `Bearer ${token}` } }); }
        return null;
      })
      .then(res => res ? res.json() : null)
      .then(data => { if (data && data.members) { setMembers(data.members); } setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  const handleCreateTeam = async () => {
    setLoading(true); setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/team/create`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) { setHasTeam(true); setSuccessMsg("تیم با موفقیت ساخته شد!"); const meRes = await fetch(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } }); const meData = await meRes.json(); setMembers([meData]); } else { setError(data.error || "خطا در ساخت تیم"); }
    } catch { setError("ارتباط با سرور برقرار نشد"); } finally { setLoading(false); }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault(); setInviteLoading(true); setError(""); setSuccessMsg("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/team/invite`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ email: inviteEmail }) });
      const data = await res.json();
      if (res.ok) { setSuccessMsg(`کاربر ${inviteEmail} با موفقیت به تیم اضافه شد.`); setInviteEmail(""); const membersRes = await fetch(`${API_URL}/team/members`, { headers: { Authorization: `Bearer ${token}` } }); const membersData = await membersRes.json(); if (membersData.members) setMembers(membersData.members); } else { setError(data.error || "خطا در دعوت کاربر"); }
    } catch { setError("ارتباط با سرور برقرار نشد"); } finally { setInviteLoading(false); }
  };

  if (loading && !hasTeam) { return (<main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></main>); }

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

        {!hasTeam ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 text-center">
            <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl w-fit mx-auto mb-6 border border-indigo-100 dark:border-gray-600"><Users className="w-10 h-10 text-indigo-600 dark:text-indigo-400" /></div>
            <h1 className="text-2xl font-bold mb-2">مدیریت تیمی</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">با ساخت یک تیم، می‌توانید اعضای خود را دعوت کنید تا همه روی یک مجموعه لینک کار کنند.</p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button onClick={handleCreateTeam} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer">ساخت تیم جدید</button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><UserPlus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> دعوت عضو جدید</h2>
              <form onSubmit={handleInviteUser} className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2 w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input type="email" placeholder="ایمیل کاربر" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="w-full h-12 bg-transparent outline-none text-sm text-white" required />
                </div>
                <button type="submit" disabled={inviteLoading} className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                  {inviteLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "دعوت"}
                </button>
              </form>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              {successMsg && <p className="text-green-500 text-sm mt-4">{successMsg}</p>}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> اعضای تیم ({members.length})</h2>
              <div className="space-y-2">
                {members.map((member) => (
                  <div key={member.ID} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 dark:bg-gray-700 p-2 rounded-full"><Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /></div>
                      <span className="font-medium text-sm">{member.Email || member.email}</span>
                    </div>
                    {(member.TeamID === member.ID || member.team_id === member.id) && (
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-md flex items-center gap-1"><Crown className="w-3 h-3" /> مدیر تیم</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}