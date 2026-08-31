import type { Metadata } from "next";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { PageHero } from "@/components/shared/PageHero";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Corporate Sales",
};

export default function CorporatePage() {
  const fleet = team.find((member) => member.role.includes("Fleet"));

  return (
    <>
      <PageHero
        title="Corporate Sales"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Corporate Sales" },
        ]}
        image="/images/vehicles/porter.webp"
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="text-2xl font-light">Fleet and corporate programmes</h2>
          <p className="mt-4 text-[14px] leading-7 text-[#444]">
            Hyundai Islamabad supports companies, government departments and high-volume buyers
            with dedicated fleet pricing, Porter commercial vehicles and hybrid / electric options
            for executive pools.
          </p>
          {fleet ? (
            <p className="mt-6 text-[14px]">
              Speak with <strong>{fleet.name}</strong>, {fleet.role}.
            </p>
          ) : null}
        </div>
        <EnquiryForm intent="enquiry" />
      </section>
    </>
  );
}
