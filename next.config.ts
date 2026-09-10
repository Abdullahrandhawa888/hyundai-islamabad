import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/charging", destination: "/services", permanent: false },
      { source: "/owners", destination: "/services", permanent: false },
    ];
  },
};

export default nextConfig;
