import type { Metadata } from "next";
import { EmiPlanBlock } from "@/components/emi/EmiPlanBlock";
import { DownloadPdfButton, FlyerHeader } from "@/components/prices/FlyerHeader";
import { Button } from "@/components/shared/Button";
import { emiPage, emiPlans, priceList } from "@/lib/data";

export const metadata: Metadata = {
  title: "EMI Plans",
  description:
    "Interest-free installment plans for Hyundai models at Hyundai Islamabad: advance payment, monthly cheques and one-time charges for every tenure.",
};

// Generated from the same data whenever the site rebuilds (app/emi-plans.pdf/route.ts).
const download = {
  href: "/emi-plans.pdf",
  label: "Download EMI Plans (PDF)",
  fileName: emiPage.pdfDownloadName,
};

export default function EmiPlansPage() {
  return (
    <>
      <FlyerHeader
        title={emiPage.title}
        edition={`${emiPage.subtitle} · ${emiPage.edition}`}
        issuer={priceList.issuer}
        issuerTagline={priceList.issuerTagline}
        crumbs={[{ label: "Homepage", href: "/" }, { label: "EMI Plans" }]}
        intro={emiPage.intro}
        download={download}
        jumpLinks={emiPlans.map((plan) => ({ href: `#${plan.id}`, label: plan.modelLabel }))}
      />

      <section className="mx-auto max-w-6xl px-5 md:px-8">
        {emiPlans.map((plan) => (
          <EmiPlanBlock key={plan.id} plan={plan} />
        ))}
      </section>

      <section className="border-t border-line bg-[#f7f9fc]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="text-[22px] font-bold text-[#0a2a8a]">Good to know</h2>
          <ul className="mt-6 max-w-3xl list-disc space-y-3 pl-5 text-[14px] leading-6 text-[#333] marker:text-[#0a2a8a]">
            {emiPage.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <DownloadPdfButton {...download} />
            <Button href="/prices" variant="outline">
              View price list
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
