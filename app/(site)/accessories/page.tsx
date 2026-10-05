import type { Metadata } from "next";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "Accessories" };

const categories = [
  {
    title: "Exterior Styling",
    items: ["Alloy wheels", "Roof rails", "Door visors", "Rear spoiler", "Mud guards"],
  },
  {
    title: "Interior Comfort",
    items: ["All-weather floor mats", "Seat covers", "Cargo organiser tray", "Window sunshades"],
  },
  {
    title: "Technology",
    items: ["Dash camera", "Wireless charging pad", "Rear parking sensors", "360° camera upgrade"],
  },
  {
    title: "Protection",
    items: ["Paint protection film", "Underbody coating", "Door edge guards", "Scuff plates"],
  },
];

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
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-2xl text-[14px] leading-7 text-muted">
          Personalise your Hyundai with genuine accessories fitted by Hyundai-trained
          technicians. Availability varies by model - enquire at the I-9/3 showroom for
          pricing and fitment.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <article key={category.title} className="border border-line p-6">
              <h2 className="text-lg font-medium">{category.title}</h2>
              <ul className="mt-4 space-y-2 text-[14px] leading-7 text-muted">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-light">Enquire about accessories</h2>
          <p className="mt-3 text-[14px] leading-7 text-muted">
            Tell us which accessories you&rsquo;re interested in and your vehicle model, and
            our team will confirm availability and pricing.
          </p>
          <div className="mt-6">
            <EnquiryForm intent="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
