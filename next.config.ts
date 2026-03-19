import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/shop/:slug",
        destination: "/collection/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
