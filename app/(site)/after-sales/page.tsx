import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AfterSalesPage,
  Eyebrow,
  afterSalesMetadata,
} from "@/components/after-sales/AfterSalesPage";
import { WorkshopCard } from "@/components/after-sales/WorkshopCard";
import { afterSalesPages } from "@/components/after-sales/pages";
import { Button } from "@/components/shared/Button";
import { afterSalesOverview, freeServices, serviceLocation } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("overview");

const workshopPhotos = [
  {
    src: "/images/after-sales/workshop-technician.webp",
    alt: "A Hyundai technician working under the bonnet of a car",
  },
  {
    src: "/images/after-sales/workshop-lift.jpg",
    alt: "Technicians inspecting the underside of a car on a workshop lift",
  },
  {
    src: "/images/after-sales/workshop-oil-change.jpg",
    alt: "Fresh engine oil being poured into a Hyundai engine",
  },
];

export default function AfterSalesOverviewPage() {
  const sections = afterSalesPages.filter((page) => page.slug !== "overview");

  return (
    <AfterSalesPage slug="overview">
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1fr_340px] lg:gap-16">
        <div>
          <Eyebrow>Hyundai Islamabad Service</Eyebrow>
          <h2 className="mt-2 text-2xl font-light md:text-3xl">Looking after your Hyundai</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-8 text-[#444]">
            {afterSalesOverview.intro}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/after-sales/book-a-service">Book a Service</Button>
            <Button href={serviceLocation.phoneHref} variant="outline">
              Call {serviceLocation.phone}
            </Button>
          </div>
        </div>
        <WorkshopCard />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <h2 className="text-2xl font-light">Explore After Sales</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ slug, href, title, summary, icon: Icon }) => (
            <Link
              key={slug}
              href={href}
              className="group flex flex-col border border-line p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
            >
              <Icon size={26} strokeWidth={1.5} className="text-accent" aria-hidden />
              <h3 className="mt-5 text-lg font-medium">{title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-7 text-muted">{summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-300 ease-out group-hover:text-accent">
                <span aria-hidden>›</span>
                Discover Now
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-white/60 uppercase">
                Included with every new Hyundai
              </p>
              <h2 className="mt-2 text-2xl font-light md:text-3xl">
                {freeServices.services.length} free services
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-7 text-white/75">
                {freeServices.intro}
              </p>
            </div>
            <Link
              href="/after-sales/free-services"
              className="shrink-0 self-start border border-white px-5 py-2.5 text-[13px] font-semibold transition-colors duration-300 ease-out hover:bg-white hover:text-navy md:self-auto"
            >
              Free service details
            </Link>
          </div>
          <ol className="mt-10 grid gap-px bg-white/15 md:grid-cols-3">
            {freeServices.services.map((service, index) => (
              <li key={service.title} className="bg-navy py-6 md:px-8 md:py-8 md:first:pl-0">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-white/60 uppercase">
                  Service {index + 1}
                </p>
                <p className="mt-3 text-4xl font-light">{service.distance}</p>
                <p className="mt-2 text-[14px] leading-6 text-white/75">
                  or {service.time}, whichever comes first
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-light">Inside our workshop</h2>
          <p className="mt-3 text-[14px] leading-7 text-muted">
            From periodic maintenance and mechanical repairs to body and paint work, Hyundai-trained
            technicians look after your car at our I-9/3 workshop.
          </p>
        </div>
        <div className="mt-8 grid gap-[10px] sm:grid-cols-3">
          {workshopPhotos.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </AfterSalesPage>
  );
}
