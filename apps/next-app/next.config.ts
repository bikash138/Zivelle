import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-zivelle.fly.storage.tigris.dev",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev-zivelle.fly.storage.tigris.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
