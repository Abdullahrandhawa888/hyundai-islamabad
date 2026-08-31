import type { Metadata } from "next";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { PageHero } from "@/components/shared/PageHero";
import { extraPhones, locations, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Contact" },
        ]}
        image="/images/dealer.jpg"
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="text-2xl font-light">Get in touch with us</h2>
          <p className="mt-4 text-[14px] leading-7 text-muted">{site.address}</p>
          <p className="mt-4 text-[14px]">
            <a href={site.phoneHref} className="hover:text-accent">
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-1 text-[14px]">
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
          </p>
          <ul className="mt-4 space-y-1 text-[14px]">
            {extraPhones.map((phone) => (
              <li key={phone.display}>
                {phone.label}:{" "}
                <a href={phone.href} className="hover:text-accent">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-3 text-[14px]">
            <p>
              <strong>Sales</strong> · {site.hours.sales}
            </p>
            <p>
              <strong>After Sales</strong> · {site.hours.service}
            </p>
          </div>
          {locations.map((location) => (
            <div key={location.id} className="mt-8 border-t border-line pt-6">
              <p className="text-[12px] tracking-wide text-accent uppercase">{location.type}</p>
              <p className="mt-1 font-medium">{location.name}</p>
              <p className="mt-1 text-[14px] text-muted">{location.address}</p>
            </div>
          ))}
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-[13px] font-semibold hover:text-accent"
          >
            Locate us on Google Maps ›
          </a>
        </div>
        <EnquiryForm intent="contact" />
      </section>
    </>
  );
}
