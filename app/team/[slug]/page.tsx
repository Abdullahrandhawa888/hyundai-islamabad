import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamProfile } from "@/components/team/TeamProfile";
import { getTeamMember, team } from "@/lib/data";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/team/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  return {
    title: member?.name ?? "Our Team",
    description: member?.bio,
  };
}

export default async function TeamMemberPage({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  return <TeamProfile member={member} />;
}
