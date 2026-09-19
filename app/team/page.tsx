import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { TeamCard } from "@/components/team/TeamCard";
import { TeamPhotoHero } from "@/components/team/TeamPhotoHero";
import { team, teamRowSizes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team",
};

function chunkByRowSizes<T>(list: T[], rowSizes: readonly number[]) {
  const rows: T[][] = [];
  let index = 0;
  for (const size of rowSizes) {
    rows.push(list.slice(index, index + size));
    index += size;
  }
  return rows;
}

export default function TeamPage() {
  const rows = chunkByRowSizes(team, teamRowSizes);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-8 md:px-8 md:pt-14">
          <Breadcrumb
            items={[
              { label: "Homepage", href: "/" },
              { label: "Our Team" },
            ]}
          />
          <p className="mt-5 text-[12px] font-semibold tracking-[0.2em] text-accent uppercase">
            Our People
          </p>
          <h1 className="mt-2 text-3xl font-light tracking-wide md:text-5xl">Meet Our Team</h1>
          <p className="mt-4 max-w-2xl text-[14px] leading-7 text-muted">
            The people behind every sale, service and support visit at Hyundai Islamabad -
            reach out to anyone below directly.
          </p>
        </div>
      </section>

      <section className="bg-white pb-14">
        <TeamPhotoHero />
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-5 pb-14 md:px-8">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center gap-8">
            {row.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
