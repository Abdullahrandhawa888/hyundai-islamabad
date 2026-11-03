import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BadgeCheck, ReceiptText, ShieldCheck } from "lucide-react";
import {
  AfterSalesPage,
  Eyebrow,
  afterSalesMetadata,
} from "@/components/after-sales/AfterSalesPage";
import { ServiceIcon } from "@/components/after-sales/service-icons";
import { Button } from "@/components/shared/Button";
import { serviceLocation, workshopServices } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("services");

type Service = (typeof workshopServices.items)[number];
type Section = { name: string; blurb: string; image: string; id: string; items: Service[] };

const promises = [
  { icon: BadgeCheck, text: "Hyundai-trained technicians" },
  { icon: ShieldCheck, text: "Genuine Hyundai parts" },
  { icon: ReceiptText, text: "Clear estimate before any work" },
];

const toId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Services grouped under the sections set in /admin. A service whose section
 * isn't in the list still shows, in a section of its own. */
function sections(): Section[] {
  const list: Section[] = workshopServices.categories.map((c) => ({ ...c, id: toId(c.name), items: [] }));
  for (const service of workshopServices.items) {
    let section = list.find((s) => s.name === service.category);
    if (!section) {
      section = { name: service.category, blurb: "", image: "", id: toId(service.category), items: [] };
      list.push(section);
    }
    section.items.push(service);
  }
  return list.filter((s) => s.items.length > 0);
}

export default function ServicesPage() {
  const list = sections();

  return (
    <AfterSalesPage slug="services">
      <section className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-24">
        <Eyebrow>Hyundai Islamabad Workshop</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl leading-[1.1] font-light text-balance md:text-6xl">
          Everything your Hyundai needs.
          <span className="block text-accent">Under one roof.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-muted">{workshopServices.intro}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {list.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group inline-flex items-center gap-2 border border-foreground px-6 py-3 text-[13px] font-semibold tracking-wide transition-all duration-300 ease-out hover:bg-foreground hover:text-white"
            >
              {section.name}
              <ArrowDown
                size={15}
                className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
          ))}
        </div>
      </section>

      {list.map((section, index) => (
        <ServiceSection key={section.id} section={section} flip={index % 2 === 1} />
      ))}

      <section className="relative overflow-hidden bg-navy text-white">
        <Image
          src="/images/after-sales/customer-promise-hero.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-10 md:px-8 md:pt-24">
          <h2 className="max-w-2xl text-4xl leading-[1.1] font-light md:text-5xl">
            Not sure what your car needs?
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/75">
            Tell us what you&rsquo;ve noticed. Our advisors will check it and talk you through it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/after-sales/book-a-service" className="px-7 py-3">
              Book a Service
            </Button>
            <Button href={serviceLocation.phoneHref} variant="light" className="px-7 py-3">
              Call {serviceLocation.phone}
            </Button>
          </div>
          <ul className="mt-16 grid gap-5 border-t border-white/15 pt-8 sm:grid-cols-3">
            {promises.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[14px] font-medium">
                <Icon size={20} strokeWidth={1.6} className="shrink-0 text-white/70" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AfterSalesPage>
  );
}

/** Full-width split: a photo with the section name on one side, the services
 * as a list on the other. Every other section swaps sides. */
function ServiceSection({ section, flip }: { section: Section; flip: boolean }) {
  return (
    <section id={section.id} className="grid scroll-mt-6 lg:grid-cols-2">
      <div
        className={`group/photo relative min-h-[360px] overflow-hidden bg-navy md:min-h-[440px] ${
          flip ? "lg:order-2" : ""
        }`}
      >
        {section.image ? (
          <Image
            src={section.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[8000ms] ease-out group-hover/photo:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-12">
          <h2 className="text-4xl leading-tight font-light md:text-5xl">{section.name}</h2>
          {section.blurb ? (
            <p className="mt-3 max-w-md text-[15px] leading-7 text-white/80">{section.blurb}</p>
          ) : null}
        </div>
      </div>

      <div
        className={`flex items-center px-5 py-12 md:px-12 lg:px-16 lg:py-16 ${
          flip ? "bg-[#f7f9fc] lg:justify-end" : "bg-white"
        }`}
      >
        <div className="w-full max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            Choose a service to book
          </p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {section.items.map((service) => (
              <li key={service.name}>
                <ServiceRow service={service} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service }: { service: Service }) {
  return (
    <Link
      href={`/after-sales/book-a-service?type=${service.bookingType}`}
      className="group flex items-center gap-5 py-5"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 ease-out group-hover:bg-accent group-hover:text-white">
        <ServiceIcon name={service.icon} size={21} strokeWidth={1.6} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[17px] font-semibold transition-colors duration-300 ease-out group-hover:text-accent">
          {service.name}
        </span>
        <span className="mt-0.5 block text-[14px] leading-6 text-muted">{service.description}</span>
      </span>
      <ArrowRight
        size={18}
        className="shrink-0 text-[#b6bdc9] transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-accent"
        aria-hidden
      />
      <span className="sr-only">Book this service</span>
    </Link>
  );
}
