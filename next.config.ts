import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
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
