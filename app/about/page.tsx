import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, Calendar, Factory, Heart, TrendingUp } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import { aboutParagraphs } from "@/lib/data";

export const metadata: Metadata = { title: "About Us" };

const stats = [
  { label: "Dealerships", value: "3", icon: Building2 },
  { label: "Steel plants", value: "2", icon: Factory },
  { label: "Annual steel capacity", value: "500,000 tons", icon: TrendingUp },
  { label: "Steel trading roots since", value: "1970", icon: Calendar },
];

const dealerships = [
  {
    name: "Hyundai Ittehad",
    detail: "Hyundai Islamabad - passenger vehicles, this showroom",
  },
  {
    name: "Jetour Ittehad",
    detail: "Jetour SUVs, I-9/3 Islamabad",
  },
  {
    name: "CSM Ittehad",
    detail: "Part of the Ittehad Automotive dealership network",
  },
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

      <section className="mx-auto max-w-6xl px-5 pt-14 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-light">Our Parent Company: Ittehad Steel</h2>
          <p className="mt-4 text-[14px] leading-7 text-muted">
            We are one of the largest private steel manufacturers in Pakistan with 500,000 M.T.
            of annual capacity. Our manufacturing plants in Islamabad and Faisalabad produce the
            highest quality rebars that meet international standards.
          </p>
          <p className="mt-4 text-[14px] leading-7 text-muted">
            Our association with steel dates back to 1970 when our forefathers set up a timber
            and steel trading establishment in Rawalpindi, Pakistan. The newly-established
            capital city of Islamabad was beginning to take shape and the area was witnessing a
            construction boom. However, it was not until 1978 that we first ventured into steel
            manufacturing. Ittehad Steel was established in 1986 at our current location with a
            new manufacturing plant with a capacity of 36,000&ndash;40,000 TPA.
          </p>
          <p className="mt-4 text-[14px] leading-7 text-muted">
            We have since been growing and expanding our footprint across the country, with
            manufacturing facilities in Islamabad and Faisalabad and a dealer presence across the
            country. We now have a combined capacity of 500,000 MTA at our manufacturing plants
            in Islamabad and Faisalabad. Over the years we have built a bond of trust with our
            clients by following international industry standards, and the passing years have
            mirrored our promise of reliability and longevity of products.
          </p>
          <p className="mt-4 text-[14px] leading-7 text-muted">
            Our future plans include an increase in our current capacity to 1,000,000 MTA by
            adding to our finishing bar mill capacity, and setting up a 30-MW power plant to be
            fully self-sufficient in our power needs. In addition, we endeavor to diversify our
            supply chain by securing global sources of raw material procurement and strengthening
            our global supply chain.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-14 md:px-8">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="max-w-3xl text-[15px] leading-8 text-[#444]">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10 bg-[#faf7f2]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition-shadow duration-300 ease-out hover:shadow-md"
              >
                <stat.icon className="mx-auto h-6 w-6 text-accent" strokeWidth={1.75} />
                <p className="mt-3 text-3xl font-light text-foreground">{stat.value}</p>
                <p className="mt-1 text-[12px] tracking-wide text-muted uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#e9ddc6] bg-[#f3ead9] p-8 shadow-sm md:p-10">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70">
                <Heart className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </span>
              <div>
                <h2 className="text-2xl font-light">Our Mission</h2>
                <p className="mt-3 max-w-2xl font-[family-name:var(--font-cursive)] text-[27px] leading-9 font-bold text-muted">
                  Ittehad Automotive&rsquo;s mission is to provide quality vehicles at fair
                  prices. We take pride in serving any and all of our clients after purchasing
                  their vehicles from us, and as long as they own the vehicle, we stand right
                  behind them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-light">Ittehad Automotive</h2>
          <p className="mt-4 text-[14px] leading-7 text-muted">
            Hyundai Islamabad is owned and operated by Ittehad Automotive (Ittehad Motors), an
            Ittehad Steel company. Ittehad Automotive operates three dealerships across
            Islamabad, each representing a different automotive brand under the same commitment
            to trained sales and service teams:
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {dealerships.map((dealership) => (
            <article
              key={dealership.name}
              className="rounded-2xl bg-[#faf7f2] p-6 transition-shadow duration-300 ease-out hover:shadow-sm"
            >
              <h3 className="text-[15px] font-semibold">{dealership.name}</h3>
              <p className="mt-2 text-[13px] leading-6 text-muted">{dealership.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="text-2xl font-light">Group leadership</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition-shadow duration-300 ease-out hover:shadow-md"
              >
                <p className="text-[15px] font-semibold">{person.name}</p>
                <p className="mt-1 text-[13px] text-muted">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid items-center gap-8 rounded-2xl bg-[#faf7f2] p-6 md:grid-cols-[1fr_1.3fr] md:p-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/team/group-photo-full.png"
              alt="The Hyundai Islamabad team"
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-2xl font-light">The people behind the showroom</h2>
            <p className="mt-3 max-w-xl text-[14px] leading-7 text-muted">
              Every enquiry, test drive and service visit is handled by a real person who knows
              our range inside out. Come say hello, or reach any one of them directly.
            </p>
            <Link
              href="/team"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors duration-300 ease-out hover:text-[#1557b0]"
            >
              Meet the team
              <span aria-hidden>›</span>
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
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
