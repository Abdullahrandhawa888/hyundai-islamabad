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

        <div className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-light">Our parent company: Ittehad Steel</h2>
          <p className="mt-4 text-[14px] leading-7 text-muted">
            Ittehad Automotive is part of Ittehad Steel, a business whose roots go back to 1970
            as a steel trading house in Rawalpindi. Ittehad Steel began manufacturing in 1978 and
            has grown into one of Pakistan&rsquo;s leading private-sector steel producers, with
            two manufacturing plants - in Islamabad&rsquo;s I-9 Industrial Area and in Faisalabad
            - producing reinforcement bars and light-section steel to international standards at
            a combined capacity of roughly 500,000 metric tons a year. That same manufacturing
            discipline and long-term thinking carries over into how Ittehad Automotive runs its
            dealerships.
          </p>
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
