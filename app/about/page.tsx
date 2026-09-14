import type { Metadata } from "next";
import { Button } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import { aboutParagraphs } from "@/lib/data";

export const metadata: Metadata = { title: "About Us" };

const stats = [
  { label: "Hyundai dealerships", value: "3" },
  { label: "Steel plants", value: "2" },
  { label: "Annual steel capacity", value: "500,000 tons" },
  { label: "Steel trading roots since", value: "1970" },
];

const leadership = [
  { name: "Khalid Javed", role: "Chairman" },
  { name: "Mohsin Khalid", role: "Executive Director" },
  { name: "Shaban Khalid", role: "Director Sales" },
  { name: "Usman Khalid", role: "Director Operations" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "About Us" },
        ]}
        image="/images/vehicles/dealership-showroom.jpg"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="max-w-3xl text-[14px] leading-7 text-muted">
            {paragraph}
          </p>
        ))}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-line p-6 text-center">
              <p className="text-3xl font-light text-accent">{stat.value}</p>
              <p className="mt-2 text-[12px] tracking-wide text-muted uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-light">Ittehad Automotive</h2>
          <p className="mt-4 text-[14px] leading-7 text-muted">
            Hyundai Islamabad is owned and operated by Ittehad Automotive, the exclusive 3S
            (Sales, Service, Spare Parts) dealer for Hyundai passenger vehicles in the region.
            Ittehad Automotive operates a network of three Hyundai dealerships, each staffed by
            Hyundai-trained sales and service teams committed to the same standard of customer
            care.
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-light">Our parent company: Ittehad Steel</h2>
          <p className="mt-4 text-[14px] leading-7 text-muted">
            Ittehad Automotive is part of Ittehad Steel, a business whose roots go back to 1970
            as a steel trading house in Rawalpindi. Ittehad Steel began manufacturing in 1978 and
            has grown into one of Pakistan&rsquo;s leading private-sector steel producers, with
            two manufacturing plants - in Islamabad&rsquo;s I-9 Industrial Area and in Faisalabad
            - producing reinforcement bars and light-section steel to international standards at
            a combined capacity of roughly 500,000 metric tons a year. That same manufacturing
            discipline and long-term thinking carries over into how Ittehad Automotive runs its
            Hyundai dealerships.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-light">Group leadership</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div key={person.name} className="border border-line p-6 text-center">
                <p className="text-[15px] font-semibold">{person.name}</p>
                <p className="mt-1 text-[13px] text-muted">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Button href="/contact" variant="primary">
            Visit Our Showroom
          </Button>
          <Button href="/team" variant="outline">
            Meet The Team
          </Button>
        </div>
      </section>
    </>
  );
}
