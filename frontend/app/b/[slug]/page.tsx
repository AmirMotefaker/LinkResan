"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Link2, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PublicBioPage() {
  const params = useParams();
  const slug = params.slug;
  
  const [bio, setBio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    fetch(`${API_URL}/bio/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        if (data.bio_page) setBio(data.bio_page);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleLinkClick = async (linkId: number, url: string) => {
    try {
      await fetch(`${API_URL}/bio/links/track/${linkId}`, { method: "POST" });
    } catch {}
    window.location.href = url;
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </main>
    );
  }

  if (!bio) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4">
        <div className="absolute top-4 left-4"><ThemeToggle /></div>
        <h1 className="text-2xl font-bold mb-2">صفحه پیدا نشد</h1>
        <p className="text-gray-500 dark:text-gray-400">صفحه بیو مورد نظر وجود ندارد یا حذف شده است.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-12 transition-colors duration-300">
      <div className="absolute top-4 left-4"><ThemeToggle /></div>
      <div className="w-full max-w-md flex flex-col items-center">
        
        <div className="bg-indigo-100 dark:bg-gray-700 p-4 rounded-full mb-6">
          <Link2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">{bio.Title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">{bio.BioText}</p>

        <div className="w-full space-y-3">
          {bio.Links && bio.Links.length > 0 ? (
            bio.Links.map((link: any) => (
              <button
                key={link.ID}
                onClick={() => handleLinkClick(link.ID, link.URL)}
                className="w-full bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-medium py-4 px-6 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer"
              >
                {link.Title}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-400 dark:text-gray-500">هیچ لینکی در این صفحه وجود ندارد.</p>
          )}
        </div>

        <div className="mt-12">
          <a href="https://linkresan.ir" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            ساخته شده با لینک رسان
          </a>
        </div>
      </div>
    </main>
  );
}