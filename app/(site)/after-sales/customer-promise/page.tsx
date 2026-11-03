import type { Metadata } from "next";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { customerPromise } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("customer-promise");

export default function CustomerPromisePage() {
  return (
    <AfterSalesPage slug="customer-promise">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <h2 className="text-3xl font-semibold md:text-[40px] md:leading-tight">{customerPromise.heading}</h2>
        <p className="mt-5 text-[14px] font-semibold">{customerPromise.lead}</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-[14px] leading-6">
          {customerPromise.pledges.map((pledge) => (
            <li key={pledge}>{pledge}</li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] leading-6">{customerPromise.closing}</p>
      </section>
    </AfterSalesPage>
  );
}
