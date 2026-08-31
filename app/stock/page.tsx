import type { Metadata } from "next";
import { StockCard } from "@/components/models/ModelCard";
import { PageHero } from "@/components/shared/PageHero";
import { getVehicle, stock } from "@/lib/data";

export const metadata: Metadata = {
  title: "View Stock",
};

export default function StockPage() {
  return (
    <>
      <PageHero
        title="View Stock Online"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "View Stock" },
        ]}
        image="/images/vehicles/tucson-hybrid.webp"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-2xl text-[14px] leading-7 text-muted">
          A snapshot of vehicles currently at Hyundai Islamabad. Availability changes daily.
          Enquire to confirm allocation, colour and final on-road price.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stock.map((item) => {
            const vehicle = getVehicle(item.vehicleSlug);
            if (!vehicle) return null;
            return <StockCard key={item.id} item={item} />;
          })}
        </div>
      </section>
    </>
  );
}
