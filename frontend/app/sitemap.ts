import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://linkresan.ir";
  
  const staticRoutes = [
    "",
    "/pricing",
    "/login",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // در آینده می‌توانیم صفحات بیو کاربران را هم اینجا fetch کنیم
  // فعلا همین صفحات استاتیک کافی است

  return [...staticRoutes];
}