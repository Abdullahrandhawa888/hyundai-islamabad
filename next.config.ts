import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/charging", destination: "/services", permanent: false },
      { source: "/owners", destination: "/services", permanent: false },
    ];
  },
};

export default nextConfig;
