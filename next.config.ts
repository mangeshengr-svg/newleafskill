import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // <--- YE ADD KIYA HAIN (cPanel Node.js ke liye zaroori)
  /* config options here */
  experimental: {
    agentFeedback: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/ourwork',
        destination: '/our-work',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/our-work',
        permanent: true,
      },
      {
        source: '/contactss',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/servicess',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/embroidery-digitizing',
        destination: '/services/embroidery-digitizing',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;