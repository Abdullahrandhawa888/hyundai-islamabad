import type { Metadata } from "next";
import { ModelCard } from "@/components/models/ModelCard";
import { PageHero } from "@/components/shared/PageHero";
import { vehicles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Models",
};

export default function ModelsPage() {
  return (
    <>
      <PageHero
        title="The all new Hyundai models"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Models" },
        ]}
        image="/images/vehicles/santa-fe.png"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-2xl text-[14px] leading-7 text-muted">
          Choose from our latest range of new Hyundai vehicles currently available at
          Hyundai Islamabad: sedans, SUVs, hybrids, electric and commercial.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <ModelCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </>
  );
}
