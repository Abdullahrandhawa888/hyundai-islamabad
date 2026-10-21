import type { Metadata } from "next";
import { AfterSalesTeamCard } from "@/components/team/AfterSalesTeamCard";
import { TeamHeroBanner } from "@/components/team/TeamHeroBanner";
import { afterSalesTeam } from "@/lib/data";

export const metadata: Metadata = {
  title: "After Sales Team",
};

export default function AfterSalesTeamPage() {
  return (
    <>
      <TeamHeroBanner crumb="After Sales Team" title="Meet Our After Sales Team" logoBanner />

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 md:px-8">
        <p className="max-w-2xl text-[14px] leading-7 text-muted">
          Our after sales team looks after your Hyundai once it is yours: servicing, repairs, warranty and
          genuine parts.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8">
        <div className="flex flex-wrap justify-center gap-8">
          {afterSalesTeam.map((member, index) => (
            <AfterSalesTeamCard key={`${member.name}-${index}`} member={member} />
          ))}
        </div>
      </section>
    </>
  );
}
