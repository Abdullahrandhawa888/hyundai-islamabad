import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Phone, Store, Wrench, type LucideIcon } from "lucide-react";
import {
  AfterSalesPage,
  Eyebrow,
  afterSalesMetadata,
} from "@/components/after-sales/AfterSalesPage";
import { Button } from "@/components/shared/Button";
import { MapCard } from "@/components/shared/MapCard";
import { dealershipFacility, locations, serviceLocation, site } from "@/lib/data";
import type { Location } from "@/lib/types";

export const metadata: Metadata = afterSalesMetadata("dealership-facility");

const salesLocation =
  (locations as Location[]).find((location) => location.type === "Sales") ??
  (locations as Location[])[0];

type Area = {
  title: string;
  text: string;
  hours: string;
  location: Location;
  icon: LucideIcon;
  cta: { label: string; href: string };
};

export default function DealershipFacilityPage() {
  const areas: Area[] = [
    {
      title: "Sales showroom",
      text: dealershipFacility.showroom,
      hours: site.hours.sales,
      location: salesLocation,
      icon: Store,
      cta: { label: "Make an enquiry", href: "/enquiry" },
    },
    {
      title: "Service workshop",
      text: dealershipFacility.workshop,
      hours: site.hours.service,
      location: serviceLocation,
      icon: Wrench,
      cta: { label: "Book a service", href: "/after-sales/book-a-service" },
    },
  ];
  const [feature, ...gallery] = dealershipFacility.gallery;

  return (
    <AfterSalesPage slug="dealership-facility">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="max-w-3xl">
          <Eyebrow>Off 9th Avenue, I-9/3</Eyebrow>
          <h2 className="mt-2 text-2xl font-light md:text-3xl">Sales and service under one roof</h2>
          <p className="mt-4 text-[15px] leading-8 text-[#444]">{dealershipFacility.intro}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {areas.map(({ title, text, hours, location, icon: Icon, cta }) => (
            <article
              key={title}
              className="flex flex-col border border-line p-7 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
            >
              <Icon size={28} strokeWidth={1.5} className="text-accent" aria-hidden />
              <h3 className="mt-5 text-xl font-light">{title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-7 text-muted">{text}</p>
              <dl className="mt-5 space-y-2 border-t border-line pt-5 text-[13px] leading-6">
                <div className="flex gap-2.5">
                  <dt>
                    <Clock size={15} className="mt-1 text-accent" aria-label="Hours" />
                  </dt>
                  <dd className="text-[#444]">{hours}</dd>
                </div>
                <div className="flex gap-2.5">
                  <dt>
                    <Phone size={15} className="mt-1 text-accent" aria-label="Phone" />
                  </dt>
                  <dd>
                    <a
                      href={location.phoneHref}
                      className="text-[#444] transition-colors duration-300 ease-out hover:text-accent"
                    >
                      {location.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-6">
                <Button href={cta.href} variant="outline">
                  {cta.label}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {feature ? (
        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
          <h2 className="text-2xl font-light">Inside the dealership</h2>
          <div className="mt-6 grid gap-[10px] md:grid-cols-3 md:grid-rows-2">
            <div className="relative aspect-[4/3] overflow-hidden md:col-span-2 md:row-span-2 md:aspect-auto">
              <Image
                src={feature}
                alt="The Hyundai Islamabad dealership in I-9/3"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
            {gallery.slice(0, 2).map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={src}
                  alt="Inside the Hyundai Islamabad service workshop"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <h2 className="text-2xl font-light">Find us</h2>
        <MapCard className="mt-6" />
      </section>
    </AfterSalesPage>
  );
}
