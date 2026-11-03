import type { Metadata } from "next";
import Image from "next/image";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { OilFitTable } from "@/components/after-sales/OilFitTable";
import { nSprint } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("n-sprint");

export default function NSprintPage() {
  const n = nSprint;

  return (
    <AfterSalesPage slug="n-sprint">
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Image
          src={n.banner}
          alt="Introducing N-Sprint, Nishat Genuine Engine Oil"
          width={1920}
          height={630}
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="h-auto w-full"
          priority
        />
        <h2 className="mt-8 text-3xl font-semibold md:text-[40px]">{n.highlightTitle}</h2>
        <p className="mt-5 text-[13px] leading-6">{n.highlight}</p>
        <div className="mt-4 space-y-3 text-[13px]">
          {n.specs.map((spec) => (
            <p key={spec.label}>
              <strong className="font-semibold">{spec.label}:</strong> {spec.value}
            </p>
          ))}
          <p className="font-semibold">{n.tableTitle}</p>
        </div>
      </section>

      <section className="bg-[#f6f3f2]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <OilFitTable caption={n.tableTitle} models={n.models} rows={n.rows} />
        </div>
      </section>
    </AfterSalesPage>
  );
}
