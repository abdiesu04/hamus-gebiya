/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  optimizeFonts: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig 