import Link from "next/link";
import { site, vehicles } from "@/lib/data";

const columns = [
  {
    title: "Contact",
    links: [
      { label: "Find Us", href: "/contact" },
      { label: "Make an Enquiry", href: "/enquiry" },
      { label: "Book a Service", href: "/services/book" },
    ],
  },
  {
    title: "Buyers Choice",
    links: [
      { label: "Models", href: "/models" },
      { label: "View Stock", href: "/stock" },
      { label: "Price List", href: "/prices" },
      { label: "Offers", href: "/offers" },
    ],
  },
  {
    title: "Explore Hyundai",
    links: [
      { label: "After Sales", href: "/services" },
      { label: "Warranty T&C", href: "/warranty" },
      { label: "Owner's Manual", href: "/owners-manual" },
      { label: "Book a Service", href: "/services/book" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="text-2xl font-light">get in touch</h2>
          <p className="mt-3 max-w-md text-[14px] leading-7 text-white/70">
            We’re here to help and answer any question you might have. We look
            forward to hearing from you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="border border-white px-5 py-2 text-[13px] font-semibold transition-colors duration-300 ease-out hover:bg-white hover:text-footer"
            >
              Contact Us
            </Link>
            <Link
              href="/contact"
              className="border border-white/40 px-5 py-2 text-[13px] font-semibold transition-colors duration-300 ease-out hover:border-white"
            >
              Our Locations
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-light">Join us on social media</h2>
          <p className="mt-3 text-[14px] leading-7 text-white/70">
            Immerse yourself even deeper. Visit and join our social channels today.
          </p>
          <div className="mt-6 flex flex-wrap gap-14 text-[13px] font-semibold tracking-wide uppercase">
            <a href={site.social.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.social.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-4 md:px-8">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-[12px] font-semibold tracking-[0.16em] uppercase">
                {column.title}
              </h3>
              <ul className="space-y-2 text-[13px] text-white/70">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-300 ease-out hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-[12px] font-semibold tracking-[0.16em] uppercase">
              Explore
            </h3>
            <ul className="space-y-2 text-[13px] text-white/70">
              {vehicles.slice(0, 6).map((vehicle) => (
                <li key={vehicle.slug}>
                  <Link
                    href={`/models/${vehicle.slug}`}
                    className="transition-colors duration-300 ease-out hover:text-white"
                  >
                    {vehicle.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-[12px] text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            {site.address} · {site.group}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="transition-colors duration-300 ease-out hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/cookies" className="transition-colors duration-300 ease-out hover:text-white">
              Cookie Policy
            </Link>
            <Link href="/careers" className="transition-colors duration-300 ease-out hover:text-white">
              Careers
            </Link>
            <a
              href={site.social.nishat}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 ease-out hover:text-white"
            >
              Hyundai Nishat
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
