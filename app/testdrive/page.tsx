import type { Metadata } from "next";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Request a Test Drive",
};

export default function TestDrivePage() {
  return (
    <>
      <PageHero
        title="Request a Test Drive"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Request a Test Drive" },
        ]}
        image="/images/vehicles/ioniq-5.webp"
        compact
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
        <p className="mb-8 text-[14px] leading-7 text-muted">
          Experience the Hyundai range at our I-9/3 showroom. An advisor will confirm your
          preferred model and time.
        </p>
        <EnquiryForm intent="testdrive" />
      </section>
    </>
  );
}
