"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Link2, Phone, Mail, MapPin, Globe } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const SocialIcons = {
  Whatsapp: (props: any) => (<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>),
  Telegram: (props: any) => (<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.372-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>),
  Linkedin: (props: any) => (<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>),
  Instagram: (props: any) => (<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>),
  Twitter: (props: any) => (<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>),
  Github: (props: any) => (<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>),
  Facebook: (props: any) => (<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>)
};

export default function ContactPage() {
  const router = useRouter();
  const contactInfo = [
    { icon: Phone, label: "تلفن تماس", value: "09127893644" },
    { icon: Mail, label: "ایمیل", value: "info@linkresan.ir" },
    { icon: MapPin, label: "آدرس", value: "قزوین، بلوار حکیم، نبش حکیم ۱۶، پلاک ۱۸، واحد ۱" },
    { icon: Globe, label: "کد پستی", value: "3414749222" },
  ];
  const socials = [
    { name: "واتساپ", icon: SocialIcons.Whatsapp, href: "https://api.whatsapp.com/send?phone=989127893644" },
    { name: "تلگرام", icon: SocialIcons.Telegram, href: "https://t.me/amirmotefaker" },
    { name: "لینکدین", icon: SocialIcons.Linkedin, href: "https://www.linkedin.com/in/amirmotefaker" },
    { name: "اینستاگرام", icon: SocialIcons.Instagram, href: "https://www.instagram.com/amirmotefaker.ir" },
    { name: "توییتر", icon: SocialIcons.Twitter, href: "https://twitter.com/AmirMotefaker" },
    { name: "گیت‌هاب", icon: SocialIcons.Github, href: "https://github.com/AmirMotefaker" },
    { name: "فیسبوک", icon: SocialIcons.Facebook, href: "https://facebook.com/amirmotefaker" },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      <header className="w-full pt-8 pb-4 flex justify-center">
        <Link href="/" className="inline-flex items-center gap-2 cursor-pointer"><Link2 className="w-7 h-7 text-blue-600 dark:text-blue-400" /><span className="text-xl font-bold tracking-tight">لینک رسان</span></Link>
      </header>
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">تماس با ما</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">سوال یا پیشنهادی دارید؟ خوشحال می‌شویم بشنویم.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6">راه‌های ارتباطی</h2>
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-xl border border-indigo-100 dark:border-gray-600"><item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                  <div><h3 className="text-sm text-gray-500 dark:text-gray-400">{item.label}</h3><p className="font-medium">{item.value}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-4">ما را در شبکه‌های اجتماعی دنبال کنید:</h3>
              <div className="grid grid-cols-4 gap-4">
                {socials.map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors cursor-pointer flex items-center justify-center" title={social.name}>
                    <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-96">
            <iframe src="https://maps.google.com/maps?q=قزوین، بلوار حکیم، نبش حکیم ۱۶، پلاک ۱۸، واحد ۱&output=embed" width="100%" height="100%" style={{ border: 0, borderRadius: "1rem" }} allowFullScreen={false} loading="lazy" title="Map"></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}