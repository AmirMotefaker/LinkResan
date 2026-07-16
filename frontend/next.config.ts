/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // نادیده گرفتن ارورهای تایپ‌اسکریپت هنگام بیلد
    ignoreBuildErrors: true,
  },
  eslint: {
    // نادیده گرفتن ارورهای لینت هنگام بیلد
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;