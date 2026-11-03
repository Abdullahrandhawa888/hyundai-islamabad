import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamProfile } from "@/components/team/TeamProfile";
import { afterSalesTeam, getAfterSalesTeamMember } from "@/lib/data";

export function generateStaticParams() {
  return afterSalesTeam.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/after-sales-team/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = getAfterSalesTeamMember(slug);
  return {
    title: member?.name ?? "After Sales Team",
    description: member?.bio,
  };
}

export default async function AfterSalesTeamMemberPage({
  params,
}: PageProps<"/after-sales-team/[slug]">) {
  const { slug } = await params;
  const member = getAfterSalesTeamMember(slug);
  if (!member) notFound();

  return (
    <TeamProfile member={member} teamPage={{ label: "After Sales Team", href: "/after-sales-team" }} />
  );
}
