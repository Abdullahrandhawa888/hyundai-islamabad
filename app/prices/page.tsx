import type { Metadata } from "next";
import { Button } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import { formatPrice, vehicles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Price List",
};

export default function PricesPage() {
  return (
    <>
      <PageHero
        title="Updated price list"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Price List" },
        ]}
        image="/images/vehicles/tucson-hybrid.webp"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-3xl text-[14px] leading-7 text-muted">
          Ex-factory figures compiled from Hyundai Islamabad / Hyundai Nishat published lists and
          August 2026 hybrid revisions. Freight, insurance, NEV levy and withholding tax may apply.
          Prices at invoice are final. Contact the showroom for a payable quotation.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-foreground text-[12px] tracking-wide uppercase">
                <th className="py-3 pr-4">Model</th>
                <th className="py-3 pr-4">Variant</th>
                <th className="py-3 pr-4">Ex-factory</th>
                <th className="py-3">Promotional</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.flatMap((vehicle) =>
                vehicle.variants.map((variant) => (
                  <tr key={`${vehicle.slug}-${variant.name}`} className="border-b border-line">
                    <td className="py-3 pr-4 font-medium">{vehicle.shortName}</td>
                    <td className="py-3 pr-4">{variant.name}</td>
                    <td className="py-3 pr-4">{formatPrice(variant.price)}</td>
                    <td className="py-3">
                      {variant.discountedPrice
                        ? `${formatPrice(variant.discountedPrice)} · ${variant.note ?? ""}`
                        : "-"}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
        <Button href="/enquiry" variant="primary" className="mt-8">
          Request an online quotation
        </Button>
      </section>
    </>
  );
}
