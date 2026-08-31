import type { Metadata } from "next";
import { DiscoverLink } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import { ownerManuals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Owner’s Manual",
};

export default function OwnersManualPage() {
  return (
    <>
      <PageHero
        title="Owner’s Manual"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "After Sales", href: "/services" },
          { label: "Owner’s Manual" },
        ]}
        image="/images/dealer.jpg"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-2xl text-[15px] leading-8 text-[#444]">
          Maximize your vehicle’s capabilities with our detailed owner’s manual. Enquire for the
          manual that matches your model.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ownerManuals.map((manual) => (
            <article key={manual.name} className="border border-line p-6">
              <h2 className="text-xl font-light">{manual.name}</h2>
              <div className="mt-5">
                <DiscoverLink href={manual.href}>Enquire</DiscoverLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
