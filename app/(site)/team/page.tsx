import type { Metadata } from "next";
import { TeamCard } from "@/components/team/TeamCard";
import { TeamHeroBanner } from "@/components/team/TeamHeroBanner";
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
      <TeamHeroBanner />

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 md:px-8">
        <p className="max-w-2xl text-[14px] leading-7 text-muted">
          The people behind every sale, service and support visit at Hyundai Islamabad -
          reach out to anyone below directly.
        </p>
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
