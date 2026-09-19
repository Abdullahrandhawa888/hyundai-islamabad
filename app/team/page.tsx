import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { TeamCard } from "@/components/team/TeamCard";
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
      <PageHero
        title="Meet our team"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Our Team" },
        ]}
        image="/images/team/group-photo.png"
        imagePosition="object-top"
      />
      <section className="mx-auto max-w-6xl space-y-8 px-5 py-14 md:px-8">
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
