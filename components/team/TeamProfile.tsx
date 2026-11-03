import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { site } from "@/lib/data";
import type { AfterSalesTeamMember, TeamMember } from "@/lib/types";

/** A team member's profile page. Used by both the sales team (/team) and the
 * after sales team (/after-sales-team); `teamPage` sets the breadcrumb and the
 * "Back to the team" link. Someone with no photo yet gets the Hyundai logo. */
export function TeamProfile({
  member,
  teamPage = { label: "Our Team", href: "/team" },
}: {
  member: TeamMember | AfterSalesTeamMember;
  teamPage?: { label: string; href: string };
}) {
  const telHref = `tel:${member.phoneDisplay.replace(/\s+/g, "")}`;

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 pt-8 pb-6 md:px-8">
          <Breadcrumb
            items={[
              { label: "Homepage", href: "/" },
              { label: teamPage.label, href: teamPage.href },
              { label: member.name },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="grid gap-10 md:grid-cols-[340px_1fr]">
          <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-[#f0f3f7]">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 768px) 340px, 100vw"
                priority
                className="object-cover object-top"
              />
            ) : (
              <Image
                src={site.logo}
                alt="Hyundai Islamabad"
                width={523}
                height={147}
                sizes="340px"
                className="h-auto w-3/5 object-contain"
              />
            )}
          </div>

          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">
              {member.role}
            </p>
            <h1 className="mt-2 text-3xl font-light md:text-4xl">{member.name}</h1>
            {member.bio ? (
              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#444]">{member.bio}</p>
            ) : null}

            {member.whatsappHref || member.phoneDisplay ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {member.whatsappHref ? (
                  <a
                    href={member.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 ease-out hover:bg-[#1fb857]"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-white" />
                    Message on WhatsApp
                  </a>
                ) : null}
                {member.phoneDisplay ? (
                  <a
                    href={telHref}
                    className="inline-flex items-center justify-center border border-foreground px-5 py-2.5 text-[13px] font-semibold text-foreground transition-all duration-300 ease-out hover:bg-foreground hover:text-white"
                  >
                    {member.phoneDisplay}
                  </a>
                ) : null}
              </div>
            ) : null}

            <div className="mt-8">
              <Link
                href={teamPage.href}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground transition-colors duration-300 ease-out hover:text-accent"
              >
                <span aria-hidden>‹</span>
                Back to the team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
