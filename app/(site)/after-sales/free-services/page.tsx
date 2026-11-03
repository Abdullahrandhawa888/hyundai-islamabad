import type { Metadata } from "next";
import Image from "next/image";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { freeServices } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("free-services");

export default function FreeServicesPage() {
  return (
    <AfterSalesPage slug="free-services">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {freeServices.services.map((service) => (
            <li key={service.title}>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-6 text-[22px] font-semibold">{service.title}</h2>
              <p className="mt-3 text-[14px] leading-6">{service.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </AfterSalesPage>
  );
}
