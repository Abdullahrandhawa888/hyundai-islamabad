import Link from "next/link";
import { Clock, Wrench, type LucideIcon } from "lucide-react";
import { site, vehicles } from "@/lib/data";

/** "Mon–Fri: 10:00 AM – 06:00 PM · Sat: 11:00 AM – 07:00 PM" → one row per day group. */
function hoursRows(hours: string) {
  return hours.split(" · ").map((part) => {
    const split = part.indexOf(": ");
    return split === -1
      ? { days: "", time: part }
      : { days: part.slice(0, split), time: part.slice(split + 2) };
  });
}

const openingHours: { label: string; note: string; hours: string; icon: LucideIcon }[] = [
  { label: "Sales Hours", note: "Showroom", hours: site.hours.sales, icon: Clock },
  { label: "After Sales Service Hours", note: "Workshop & service", hours: site.hours.service, icon: Wrench },
];

const columns = [
  {
    title: "Contact",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Find Us", href: "/contact" },
      { label: "Make an Enquiry", href: "/enquiry" },
      { label: "Book a Service", href: "/after-sales/book-a-service" },
    ],
  },
  {
    title: "Buyers Choice",
    links: [
      { label: "Models", href: "/models" },
      { label: "Price List", href: "/prices" },
      { label: "EMI Plans", href: "/emi-plans" },
      { label: "e-Brochures", href: "/e-brochures" },
      { label: "Offers", href: "/offers" },
      { label: "Corporate Sales", href: "/corporate" },
    ],
  },
  {
    title: "After Sales",
    links: [
      { label: "Warranty T&C", href: "/after-sales/warranty" },
      { label: "Free Services", href: "/after-sales/free-services" },
      { label: "Maintenance Charts", href: "/after-sales/maintenance-charts" },
      { label: "Owner's Manual", href: "/after-sales/owners-manual" },
      { label: "Customer Promise", href: "/after-sales/customer-promise" },
    ],
  },
  {
    title: "Explore",
    links: vehicles.slice(0, 6).map((vehicle) => ({ label: vehicle.shortName, href: `/models/${vehicle.slug}` })),
  },
];

const socials = [
  { label: "Facebook", href: site.social.facebook },
  { label: "Instagram", href: site.social.instagram },
  { label: "YouTube", href: site.social.youtube },
];

const linkClass = "transition-colors duration-300 ease-out hover:text-white";

export function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3fr)] lg:gap-14">
        <div>
          <h2 className="text-xl font-light">Get in touch</h2>
          <p className="mt-2 max-w-sm text-[13.5px] leading-6 text-white/65">
            We&rsquo;re here to help with any question you might have.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href="/contact"
              className="border border-white px-4 py-2 text-[12.5px] font-semibold transition-colors duration-300 ease-out hover:bg-white hover:text-footer"
            >
              Contact Us
            </Link>
            <Link
              href="/contact#map"
              className="border border-white/35 px-4 py-2 text-[12.5px] font-semibold transition-colors duration-300 ease-out hover:border-white"
            >
              Our Locations
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-[12px] font-medium text-white/75 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/50 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-3.5 text-[11.5px] font-semibold tracking-[0.16em] uppercase">{column.title}</h3>
              <ul className="space-y-2 text-[13px] text-white/65">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        {/* Always open: visitors see the times straight away, no tapping. */}
        <div className="mx-auto grid max-w-6xl gap-3 px-5 py-7 md:grid-cols-2 md:px-8">
          {openingHours.map(({ label, note, hours, icon: Icon }) => (
            <section
              key={label}
              aria-label={label}
              className="flex items-start gap-4 rounded-xl border border-white/15 bg-white/[0.05] px-5 py-4 transition-colors duration-300 ease-out hover:border-white/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Icon size={18} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold">{label}</h3>
                <p className="text-[12px] text-white/55">{note}</p>
                <dl className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-[13.5px]">
                  {hoursRows(hours).map((row) => (
                    <div key={row.days + row.time} className="flex flex-wrap justify-between gap-x-4">
                      <dt className="text-white/65">{row.days}</dt>
                      <dd className="font-medium text-white tabular-nums">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-[12px] text-white/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.address} · {site.group}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/terms" className={linkClass}>
              Terms &amp; Conditions
            </Link>
            <Link href="/cookies" className={linkClass}>
              Cookie Policy
            </Link>
            <Link href="/careers" className={linkClass}>
              Careers
            </Link>
            <a href={site.social.nishat} target="_blank" rel="noreferrer" className={linkClass}>
              Hyundai Nishat
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
