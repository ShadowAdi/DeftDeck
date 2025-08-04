import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dribbble.com",
      },
    ],
  },
};

export default nextConfig;
