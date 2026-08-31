import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { warranty } from "@/lib/data";

export const metadata: Metadata = {
  title: "Warranty",
};

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        title="Warranty Terms & Conditions"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Warranty" },
        ]}
        image="/images/vehicles/ioniq-6.webp"
      />
      <section className="mx-auto max-w-3xl space-y-8 px-5 py-14 text-[14px] leading-7 text-[#333] md:px-8">
        <p>{warranty.intro}</p>
        <div>
          <h2 className="text-xl font-light">New vehicle limited warranty</h2>
          <p className="mt-3">{warranty.period}</p>
        </div>
        <div>
          <h2 className="text-xl font-light">Paint warranty</h2>
          <p className="mt-3">{warranty.paint}</p>
        </div>
        <div>
          <h2 className="text-xl font-light">OEM warranty</h2>
          <p className="mt-3">{warranty.oem}</p>
        </div>
        <div>
          <h2 className="text-xl font-light">Acquiring warranty service</h2>
          <p className="mt-3">{warranty.service}</p>
        </div>
        <div>
          <h2 className="text-xl font-light">What is covered</h2>
          <p className="mt-3">{warranty.covered}</p>
        </div>
        <div>
          <h2 className="text-xl font-light">What is not covered</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {warranty.notCovered.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-light">Owner’s responsibility</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {warranty.owner.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
