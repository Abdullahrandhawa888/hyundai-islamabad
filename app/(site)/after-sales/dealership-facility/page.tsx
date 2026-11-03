import type { Metadata } from "next";
import Image from "next/image";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { dealershipFacility } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("dealership-facility");

export default function DealershipFacilityPage() {
  return (
    <AfterSalesPage slug="dealership-facility">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {dealershipFacility.features.map((feature) => (
            <li key={feature.title}>
              <div className="relative aspect-[3/2] overflow-hidden bg-[#f0f3f7]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-6 text-[22px] font-semibold">{feature.title}</h2>
            </li>
          ))}
        </ul>
      </section>
    </AfterSalesPage>
  );
}
