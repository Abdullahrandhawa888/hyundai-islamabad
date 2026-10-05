import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Terms & Conditions" },
        ]}
        compact
      />
      <section className="mx-auto max-w-3xl space-y-4 px-5 py-14 text-[14px] leading-7 text-[#333] md:px-8">
        <p>
          Vehicle prices, specifications and availability published on this website are for
          guidance only and may change without notice. Images are illustrative and may include
          optional equipment.
        </p>
        <p>
          A binding purchase is made only through a written order accepted by Hyundai Islamabad /
          Ittehad Automotive. Warranty terms are those of Hyundai Nishat Motor (Private) Limited.
        </p>
      </section>
    </>
  );
}
