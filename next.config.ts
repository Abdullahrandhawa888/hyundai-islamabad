import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old Service pages, replaced by the After Sales section.
      { source: "/services", destination: "/after-sales", permanent: false },
      { source: "/services/book", destination: "/after-sales/book-a-service", permanent: false },
      { source: "/warranty", destination: "/after-sales/warranty", permanent: false },
      { source: "/owners-manual", destination: "/after-sales/owners-manual", permanent: false },
      { source: "/charging", destination: "/after-sales", permanent: false },
      { source: "/owners", destination: "/after-sales", permanent: false },

      // After Sales URLs from the previous WordPress site (hyundai-islamabad.com),
      // so old links and search results keep working once the domain points here.
      // Permanent, so search engines move their ranking to the new pages.
      {
        source: "/warranty-terms-and-conditions",
        destination: "/after-sales/warranty",
        permanent: true,
      },
      { source: "/customer-promise", destination: "/after-sales/customer-promise", permanent: true },
      { source: "/free-services", destination: "/after-sales/free-services", permanent: true },
      {
        source: "/maintenance-charts",
        destination: "/after-sales/maintenance-charts",
        permanent: true,
      },
      { source: "/book-a-service", destination: "/after-sales/book-a-service", permanent: true },
    ];
  },
};

export default nextConfig;
