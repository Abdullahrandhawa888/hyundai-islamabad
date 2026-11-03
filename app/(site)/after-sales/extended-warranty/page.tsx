import type { Metadata } from "next";
import Image from "next/image";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { Rich } from "@/components/after-sales/Rich";
import { extendedWarranty } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("extended-warranty");

export default function ExtendedWarrantyPage() {
  const w = extendedWarranty;

  return (
    <AfterSalesPage slug="extended-warranty">
      <section className="mx-auto max-w-6xl px-5 py-14 text-[15px] leading-7 md:px-8">
        <Image
          src={w.badge}
          alt="Up to 5 years Extended Warranty"
          width={1828}
          height={728}
          className="mx-auto h-auto w-full max-w-[210px]"
        />
        <p className="mt-10 font-semibold">{w.lead}</p>
        <p className="mt-5 font-semibold">{w.benefitsTitle}</p>
        <ul className="mt-3 list-disc space-y-2 pl-8">
          {w.benefits.map((benefit) => (
            <li key={benefit}>
              <Rich text={benefit} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[12px] font-semibold">{w.terms}</p>
        <h2 className="mt-6 text-xl font-semibold">{w.criteriaTitle}</h2>
        <p className="mt-1">{w.criteriaIntro}</p>
        <ul className="mt-3 list-disc space-y-2 pl-8">
          {w.criteria.map((item) => (
            <li key={item}>
              <Rich text={item} />
            </li>
          ))}
        </ul>
      </section>
    </AfterSalesPage>
  );
}
