import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  images:{
    remotePatterns: [
      {hostname: "img.clerk.com"},
    ]
  }
};

export default nextConfig;
