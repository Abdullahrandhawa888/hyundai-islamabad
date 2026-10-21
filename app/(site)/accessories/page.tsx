import type { Metadata } from "next";
import { AccessoriesShop } from "@/components/accessories/AccessoriesShop";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { PageHero } from "@/components/shared/PageHero";
import { accessories, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accessories",
  description: "Reserve genuine Hyundai accessories online and collect them from the Hyundai Islamabad dealership.",
};

export default function AccessoriesPage() {
  return (
    <>
      <PageHero
        title="Accessories"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Accessories" },
        ]}
        image="/images/vehicles/accessories-rack.png"
        imagePosition="object-[75%_center]"
        imageRight
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-2xl text-[14px] leading-7 text-muted">{accessories.intro}</p>

        <AccessoriesShop
          products={accessories.products}
          categories={accessories.categories}
          orderNote={accessories.orderNote}
          pickupAddress={`${site.name}, ${site.address}`}
          whatsapp={site.whatsapp}
          siteName={site.name}
        />

        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-light">Can&rsquo;t find what you need?</h2>
          <p className="mt-3 text-[14px] leading-7 text-muted">
            Tell us which accessory you&rsquo;re looking for and your vehicle model, and our team will confirm
            availability and pricing.
          </p>
          <div className="mt-6">
            <EnquiryForm intent="contact" defaultTopic="accessories" />
          </div>
        </div>
      </section>
    </>
  );
}
