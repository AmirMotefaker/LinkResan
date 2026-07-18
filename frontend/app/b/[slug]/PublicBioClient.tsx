"use client";

import { Link2 } from "lucide-react";

export default function PublicBioClient({ bio }: { bio: any }) {
  const handleLinkClick = async (linkId: number, url: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${apiUrl}/bio/links/track/${linkId}`, { method: "POST" });
    } catch {}
    window.location.href = url;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4 py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        
        <div className="bg-indigo-100 p-4 rounded-full mb-6">
          <Link2 className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{bio.Title}</h1>
        <p className="text-gray-500 text-center mb-8">{bio.BioText}</p>

        <div className="w-full space-y-3">
          {bio.Links && bio.Links.length > 0 ? (
            bio.Links.map((link: any) => (
              <button
                key={link.ID}
                onClick={() => handleLinkClick(link.ID, link.URL)}
                className="w-full bg-white hover:bg-indigo-50 border border-gray-200 text-gray-800 font-medium py-4 px-6 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-indigo-300 cursor-pointer"
              >
                {link.Title}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-400">هیچ لینکی در این صفحه وجود ندارد.</p>
          )}
        </div>

        <div className="mt-12">
          <a href="https://linkresan.ir" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">
            ساخته شده با لینک رسان
          </a>
        </div>
      </div>
    </main>
  );
}