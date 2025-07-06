/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors
  },
};
module.exports = nextConfig;
