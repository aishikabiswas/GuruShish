import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // appDir is enabled by default in app router (you can omit it)
  eslint: {
    ignoreDuringBuilds: true, // ✅ Allow build to continue even if ESLint errors exist
  },
};

export default nextConfig;
