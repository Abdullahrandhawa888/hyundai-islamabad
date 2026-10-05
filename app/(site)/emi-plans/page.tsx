import type { Metadata } from "next";
import { EmiPlans } from "@/components/emi/EmiPlans";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "EMI Plans",
  description:
    "Interest-free installment plans for select Hyundai models at Hyundai Islamabad, with tenure, advance and monthly cheque amounts.",
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
          Choose a model below to see its current interest-free installment plan: advance
          payment, monthly cheque amount and one-time charges for each available tenure.
        </p>
        <div className="mt-8">
          <EmiPlans />
        </div>
      </section>
    </>
  );
}
