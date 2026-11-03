import type { Metadata } from "next";
import Image from "next/image";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { OilFitTable } from "@/components/after-sales/OilFitTable";
import { lubricants } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("lubricants");

export default function LubricantsPage() {
  const l = lubricants;

  return (
    <AfterSalesPage slug="lubricants">
      <section className="mx-auto max-w-6xl space-y-16 px-5 py-16 md:px-8">
        {l.products.map((product) => (
          <div key={product.name} className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl leading-tight font-semibold md:text-[40px]">{l.sectionTitle}</h2>
              <h3 className="mt-5 text-[18px] font-semibold">{product.name}</h3>
              <p className="mt-4 max-w-md text-[13px] leading-6">{product.description}</p>
              <ul className="mt-5 list-disc space-y-1.5 pl-6 text-[13px] font-semibold">
                {product.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[460px]">
              <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 460px, 90vw" className="object-contain" />
            </div>
          </div>
        ))}
      </section>

      <section className="bg-[#f6f3f2]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <OilFitTable caption="Which Hyundai-Shell oil fits each model" models={l.models} rows={l.rows} />
        </div>
      </section>
    </AfterSalesPage>
  );
}
