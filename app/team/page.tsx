import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Meet our team"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Our Team" },
        ]}
        image="/images/dealer.jpg"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="border border-line p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f3f7] text-xl font-light text-navy">
                {member.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h2 className="text-lg font-medium">{member.name}</h2>
              <p className="mt-1 text-[13px] text-muted">{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
