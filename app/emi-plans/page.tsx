import type { Metadata } from "next";
import { EmiCalculator } from "@/components/emi/EmiCalculator";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "EMI Plans",
  description:
    "Estimate your monthly Hyundai instalment by model, down payment and tenure, then get a financing quotation from Hyundai Islamabad.",
};

export default function EmiPlansPage() {
  return (
    <>
      <PageHero
        title="EMI plans"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Offers", href: "/offers" },
          { label: "EMI Plans" },
        ]}
        image="/images/vehicles/models-showroom.jpg"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-3xl text-[14px] leading-7 text-muted">
          Choose a model, set your down payment and tenure, and see an estimated monthly
          instalment. Figures use the ex-factory prices on our price list and a standard
          reducing-balance calculation.
        </p>
        <div className="mt-8">
          <EmiCalculator />
        </div>
        <p className="mt-8 max-w-3xl text-[12px] leading-6 text-muted">
          This calculator is an estimate only. The actual profit rate, minimum down payment,
          tenure, processing fee, insurance and takaful are set by the financing bank and may
          differ. Contact the showroom for a payable quotation and current bank offers.
        </p>
      </section>
    </>
  );
}
