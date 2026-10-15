import type { Metadata } from "next";
import { DownloadPdfButton, FlyerHeader } from "@/components/prices/FlyerHeader";
import { PriceListModel } from "@/components/prices/PriceListModel";
import { Button } from "@/components/shared/Button";
import { getPriceListSections, priceList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Price List",
  description: `Hyundai Islamabad price list for ${priceList.edition}: prices, transportation charges and taxes for every model.`,
};

// Built from the same data as this page every time the site rebuilds, so it
// always matches (see app/price-list.pdf/route.ts).
const download = {
  href: "/price-list.pdf",
  label: "Download Price List (PDF)",
  fileName: priceList.pdfDownloadName,
};

export default function PricesPage() {
  const sections = getPriceListSections();

  return (
    <>
      <FlyerHeader
        title="Price List"
        edition={priceList.edition}
        issuer={priceList.issuer}
        issuerTagline={priceList.issuerTagline}
        crumbs={[{ label: "Homepage", href: "/" }, { label: "Price List" }]}
        intro={priceList.intro}
        download={download}
        jumpLinks={sections.map(({ model, vehicle }) => ({ href: `#${vehicle.slug}`, label: model.label }))}
      />

      <section className="mx-auto max-w-6xl px-5 md:px-8">
        {sections.map(({ model, vehicle, rows }) => (
          <PriceListModel
            key={vehicle.slug}
            model={model}
            vehicle={vehicle}
            rows={rows}
            columns={priceList.columns}
          />
        ))}
      </section>

      <section className="border-t border-line bg-[#f7f9fc]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="text-[22px] font-bold text-[#0a2a8a]">{priceList.paymentTerms.title}</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-0">
            {[priceList.paymentTerms.left, priceList.paymentTerms.right].map((terms, index) => (
              <ul
                key={index}
                className={`space-y-3 text-[14px] leading-6 text-[#333] ${
                  index === 1 ? "md:border-l md:border-line md:pl-10" : "md:pr-10"
                }`}
              >
                {terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <DownloadPdfButton {...download} />
            <Button href="/emi-plans" variant="outline">
              View EMI plans
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
