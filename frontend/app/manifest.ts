import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "لینک رسان | کوتاه‌کننده لینک حرفه‌ای",
    short_name: "لینک رسان",
    description: "سرویس کوتاه‌کننده لینک حرفه‌ای، رایگان و متن‌باز برای کاربران ایرانی.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      }
    ],
  };
}