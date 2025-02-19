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

    ]
  },
  output: "standalone",

};

export default nextConfig;
