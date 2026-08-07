/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Enable static export for Hostinger deployment */
  output: 'export',

  /* Disable image optimization for static export (no Node.js server) */
  images: {
    unoptimized: true,
  },

  /* Ensure trailing slashes for static hosting compatibility */
  trailingSlash: true,

  /* Strict mode for better React debugging */
  reactStrictMode: true,
};

module.exports = nextConfig;
