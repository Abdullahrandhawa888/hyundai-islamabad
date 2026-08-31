import type { Metadata } from "next";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Careers" },
        ]}
        image="/images/dealer.jpg"
        compact
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
        <p className="mb-8 text-[14px] leading-7 text-muted">
          Interested in joining Hyundai Islamabad? Send your details and our team will be in
          touch when a suitable role opens.
        </p>
        <EnquiryForm intent="contact" />
      </section>
    </>
  );
}
