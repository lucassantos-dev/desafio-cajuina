import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"

      },
      {
        hostname: "localhost"
      }

    ],
    unoptimized: true,
  },
  output: "standalone",

};

export default nextConfig;
