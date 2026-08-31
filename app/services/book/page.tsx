import type { Metadata } from "next";
import { BookServiceForm } from "@/components/shared/BookServiceForm";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Book a Service",
};

export default function BookServicePage() {
  return (
    <>
      <PageHero
        title="Book a Service"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "After Sales", href: "/services" },
          { label: "Book a Service" },
        ]}
        image="/images/dealer.jpg"
        compact
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
        <p className="text-[14px] leading-7 text-muted">
          Hyundai Islamabad offers a booking service for your convenience and valuable time.
        </p>
        <BookServiceForm />
      </section>
    </>
  );
}
