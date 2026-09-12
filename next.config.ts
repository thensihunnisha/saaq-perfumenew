import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.122.1.233"],
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
