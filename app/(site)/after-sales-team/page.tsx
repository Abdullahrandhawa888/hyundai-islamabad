import type { Metadata } from "next";
import { AfterSalesTeamCard } from "@/components/team/AfterSalesTeamCard";
import { TeamHeroBanner } from "@/components/team/TeamHeroBanner";
import { afterSalesTeam, afterSalesTeamRowSizes } from "@/lib/data";

export const metadata: Metadata = {
  title: "After Sales Team",
};

/** Splits the list into rows of the given sizes; anyone left over goes on a last row. */
function chunkByRowSizes<T>(list: T[], rowSizes: readonly number[]) {
  const rows: T[][] = [];
  let index = 0;
  for (const size of rowSizes) {
    rows.push(list.slice(index, index + size));
    index += size;
  }
  if (index < list.length) rows.push(list.slice(index));
  return rows.filter((row) => row.length > 0);
}

export default function AfterSalesTeamPage() {
  const rows = chunkByRowSizes(afterSalesTeam, afterSalesTeamRowSizes);

  return (
    <>
      <TeamHeroBanner crumb="After Sales Team" title="Meet Our After Sales Team" logoBanner />

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 md:px-8">
        <p className="max-w-2xl text-[14px] leading-7 text-muted">
          Our after sales team looks after your Hyundai once it is yours: servicing, repairs, warranty and
          genuine parts.
        </p>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-5 pb-14 md:px-8">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center gap-8 lg:flex-nowrap">
            {row.map((member, index) => (
              <AfterSalesTeamCard key={`${member.name}-${index}`} member={member} />
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
