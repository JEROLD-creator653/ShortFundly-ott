import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd()
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image-resizer-cloud-api.akamaized.net"
      },
      {
        protocol: "https",
        hostname: "cdn.jwplayer.com"
      },
      {
        protocol: "https",
        hostname: "img.jwplayer.com"
      },
      {
        protocol: "https",
        hostname: "assets-jpcust.jwpsrv.com"
      },
      {
        protocol: "https",
        hostname: "content.jwplatform.com"
      },
      {
        protocol: "https",
        hostname: "cdn-1.upremium.asia"
      }
    ]
  }
};

export default nextConfig;
