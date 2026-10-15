import type { Metadata } from "next";
import Image from "next/image";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { Button } from "@/components/shared/Button";
import { freeServices } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("free-services");

export default function FreeServicesPage() {
  const { intro, services } = freeServices;

  return (
    <AfterSalesPage slug="free-services">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-3xl text-[15px] leading-8 text-[#444]">{intro}</p>

        <ol className="mt-12 space-y-16 md:space-y-20">
          {services.map((service, index) => (
            <li key={service.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <div
                className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                  Free service {index + 1} of {services.length}
                </p>
                <h2 className="mt-2 text-2xl font-light md:text-3xl">{service.title}</h2>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="border border-foreground px-3.5 py-2 text-[15px] font-semibold">
                    {service.distance}
                  </span>
                  <span className="text-[13px] text-muted">or</span>
                  <span className="border border-line px-3.5 py-2 text-[14px] font-medium">
                    {service.time}
                  </span>
                </div>
                <p className="mt-2 text-[12px] text-muted">Whichever comes first.</p>
                <p className="mt-5 text-[14px] leading-7 text-muted">{service.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-start gap-5 border border-line bg-[#f7f9fc] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-light">Is a free service due?</h2>
            <p className="mt-1 text-[14px] leading-7 text-muted">
              Book it online and choose a time that suits you.
            </p>
          </div>
          <Button href="/after-sales/book-a-service?type=free" className="shrink-0">
            Book a free service
          </Button>
        </div>
      </section>
    </AfterSalesPage>
  );
}
