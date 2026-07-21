"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Link2, Home, Globe, Users, Webhook, KeyRound, User, ShieldAlert, LogOut, Menu, X, ChevronRight, ChevronLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Tooltip from "@/components/Tooltip";

const navItems = [
  { name: "داشبورد", href: "/dashboard", icon: Home },
  { name: "دامنه‌ها", href: "/dashboard#domains", icon: Globe },
  { name: "صفحه بیو", href: "/dashboard/bio", icon: Link2 },
  { name: "تیم", href: "/dashboard/team", icon: Users },
  { name: "وب‌هوک", href: "/dashboard/webhooks", icon: Webhook },
  { name: "کلیدهای API", href: "/dashboard/api-keys", icon: KeyRound },
  { name: "پروفایل", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("plan");
    localStorage.removeItem("is_admin");
    router.push("/");
  };

  const isAdmin = typeof window !== "undefined" && localStorage.getItem("is_admin") === "true";

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      
      {/* دکمه منو برای موبایل */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* سایدبار */}
      <aside className={`
        ${isCollapsed ? "md:w-20" : "md:w-64"} 
        w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 
        flex flex-col fixed md:sticky top-0 h-screen z-40 transition-all duration-300 
        ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
      `}>
        {/* لوگو و دکمه جمع کردن */}
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            {!isCollapsed && <span>لینک رسان</span>}
          </Link>
          {!isCollapsed && (
            <button onClick={() => setIsCollapsed(true)} className="hidden md:block text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* منوها */}
        <nav className="flex-1 p-2 space-y-1 overflow-visible">
          {navItems.map((item) => {
            const isActive = pathname === item.href.split("#")[0] && !item.href.includes("#");
            
            const linkContent = (
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isCollapsed ? "justify-center" : ""} ${
                isActive 
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </div>
            );

            return (
              <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                {isCollapsed ? (
                  <Tooltip text={item.name}>{linkContent}</Tooltip>
                ) : (
                  linkContent
                )}
              </Link>
            );
          })}
          
          {/* منوی ادمین */}
          {isAdmin && (
            <Link href="/dashboard/admin" onClick={() => setSidebarOpen(false)}>
              {isCollapsed ? (
                <Tooltip text="پنل مدیریت (CRM)">
                  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors justify-center ${
                    pathname === "/dashboard/admin" 
                      ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" 
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}>
                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                  </div>
                </Tooltip>
              ) : (
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/dashboard/admin" 
                    ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}>
                  <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                  <span>پنل مدیریت (CRM)</span>
                </div>
              )}
            </Link>
          )}
        </nav>

        {/* بخش پایین */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
          {/* دکمه باز کردن سایدبار (وقتی جمع است) */}
          {isCollapsed && (
            <Tooltip text="باز کردن منو">
              <button 
                onClick={() => setIsCollapsed(false)} 
                className="w-full hidden md:flex items-center justify-center py-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </Tooltip>
          )}

          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-2 py-1`}>
            <ThemeToggle />
            {isCollapsed ? (
              <Tooltip text="خروج">
                <button onClick={handleLogout} className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-2">
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                </button>
              </Tooltip>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span>خروج</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}