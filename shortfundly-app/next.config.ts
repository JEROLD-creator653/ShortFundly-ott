import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    proxyClientMaxBodySize: 1024 * 1024 * 150
  },
  turbopack: {
    root: process.cwd()
  },
  images: {
    unoptimized: true,
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
