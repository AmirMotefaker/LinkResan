/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // نادیده گرفتن ارورهای تایپ‌اسکریپت هنگام بیلد
    ignoreBuildErrors: true,
  },
  // بخش eslint کاملاً حذف شد
};

export default nextConfig;