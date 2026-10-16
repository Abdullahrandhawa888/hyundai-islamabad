import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Users, Wrench, type LucideIcon } from "lucide-react";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { MapCard } from "@/components/shared/MapCard";
import { PageHero } from "@/components/shared/PageHero";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { contactTopics, extraPhones, formatWhatsAppNumber, locations, serviceLocation, site } from "@/lib/data";
import type { Location } from "@/lib/types";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call, WhatsApp, email or visit ${site.name} at I-9/3, Islamabad. Sales and service numbers, opening hours and an enquiry form.`,
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const digitsOf = (href: string) => href.replace(/\D/g, "");

type PhoneLine = { display: string; href: string };

/** Every phone line for one department, without repeating a number that's
 * listed in two places in site settings. */
function linesFor(type: "Sales" | "Service", main: PhoneLine[]): PhoneLine[] {
  const all = [...main, ...extraPhones.filter((phone) => phone.label === type)];
  const seen = new Set<string>();
  return all.filter((line) => {
    const key = digitsOf(line.href).replace(/^0/, "92");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const cardClass =
  "group flex items-start gap-4 border border-line bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-md";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  // e.g. /contact?topic=service opens the form on "Service & maintenance".
  const requestedTopic = first(query.topic);
  const defaultTopic = contactTopics.some((topic) => topic.value === requestedTopic)
    ? requestedTopic
    : undefined;

  const whatsappNumber = formatWhatsAppNumber(site.whatsapp);
  const salesLocation =
    (locations as Location[]).find((location) => location.type === "Sales") ?? (locations as Location[])[0];

  const quickActions: { title: string; value: string; text: string; href: string; icon: LucideIcon | "whatsapp"; external?: boolean }[] = [
    {
      title: "Call sales",
      value: site.phoneDisplay,
      text: "New cars, prices and test drives",
      href: site.phoneHref,
      icon: Phone,
    },
    {
      title: "WhatsApp us",
      value: whatsappNumber,
      text: "Chat with our team",
      href: site.whatsapp,
      icon: "whatsapp",
      external: true,
    },
    {
      title: "Service line",
      value: serviceLocation.phone,
      text: "Workshop bookings and repairs",
      href: serviceLocation.phoneHref,
      icon: Wrench,
    },
    {
      title: "Email us",
      value: site.email,
      text: "Questions, quotes and documents",
      href: `mailto:${site.email}`,
      icon: Mail,
    },
  ];

  const departments = [
    {
      title: "Sales",
      hours: site.hours.sales,
      lines: linesFor("Sales", [
        { display: site.phoneDisplay, href: site.phoneHref },
        { display: salesLocation.phone, href: salesLocation.phoneHref },
      ]),
    },
    {
      title: "Service",
      hours: site.hours.service,
      lines: linesFor("Service", [{ display: serviceLocation.phone, href: serviceLocation.phoneHref }]),
    },
  ];

  const socials = [
    { label: "Facebook", href: site.social.facebook },
    { label: "Instagram", href: site.social.instagram },
    { label: "YouTube", href: site.social.youtube },
  ];

  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="Call, WhatsApp, email or visit us at I-9/3. We're here to help."
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Contact Us" },
        ]}
        image="/images/dealer.jpg"
      />

      <section className="mx-auto max-w-6xl px-5 pt-12 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map(({ title, value, text, href, icon: Icon, external }) => (
            <a
              key={title}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={cardClass}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out ${
                  Icon === "whatsapp"
                    ? "bg-[#25D366]/12 text-[#1da851] group-hover:bg-[#25D366] group-hover:text-white"
                    : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                }`}
              >
                {Icon === "whatsapp" ? <WhatsAppIcon className="h-5 w-5 fill-current" /> : <Icon size={19} />}
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">{title}</span>
                <span className="mt-1 block text-[15px] font-medium [overflow-wrap:anywhere]">{value}</span>
                <span className="mt-0.5 block text-[12px] leading-5 text-muted">{text}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-light">Visit the dealership</h2>
            <p className="mt-3 flex gap-2.5 text-[14px] leading-7 text-[#444]">
              <MapPin size={17} className="mt-1.5 shrink-0 text-accent" aria-hidden />
              <span>
                {site.name} showroom and service workshop
                <br />
                {site.address}
              </span>
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold">
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 ease-out hover:text-accent"
              >
                Get directions ›
              </a>
              <Link href="#map" className="transition-colors duration-300 ease-out hover:text-accent">
                See the map ›
              </Link>
            </div>
          </div>

          {departments.map((department) => (
            <div key={department.title} className="border-t border-line pt-8">
              <h3 className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">{department.title}</h3>
              <ul className="mt-4 space-y-2 text-[15px]">
                {department.lines.map((line) => (
                  <li key={line.href}>
                    <a
                      href={line.href}
                      className="inline-flex items-center gap-2.5 transition-colors duration-300 ease-out hover:text-accent"
                    >
                      <Phone size={15} className="text-muted" aria-hidden />
                      {line.display}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex gap-2.5 text-[13px] leading-6 text-muted">
                <Clock size={15} className="mt-1 shrink-0" aria-hidden />
                {department.hours}
              </p>
            </div>
          ))}

          <div className="border-t border-line pt-8">
            <h3 className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">Online</h3>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors duration-300 ease-out hover:text-accent"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#1da851]" />
                  WhatsApp {whatsappNumber}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors duration-300 ease-out hover:text-accent"
                >
                  <Mail size={15} className="text-muted" aria-hidden />
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-line px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-nav transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <Link
            href="/team"
            className="group flex items-center gap-4 border border-line bg-[#f7f9fc] p-5 transition-all duration-300 ease-out hover:border-accent"
          >
            <Users size={22} className="shrink-0 text-accent" aria-hidden />
            <span>
              <span className="block text-[14px] font-medium">Prefer to talk to someone directly?</span>
              <span className="block text-[13px] text-muted">
                Meet our sales team and message them on WhatsApp ›
              </span>
            </span>
          </Link>
        </div>

        <div id="enquiry" className="scroll-mt-36 border border-line p-6 md:p-8">
          <EnquiryForm intent="contact" title="Make an enquiry" defaultTopic={defaultTopic} />
        </div>
      </section>

      <section id="map" className="mx-auto max-w-6xl scroll-mt-36 px-5 pb-16 md:px-8">
        <h2 className="text-2xl font-light">Find us on the map</h2>
        <p className="mt-2 text-[14px] text-muted">Tap the map for directions in Google Maps.</p>
        <MapCard className="mt-6" />
      </section>
    </>
  );
}
