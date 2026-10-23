import Image from "next/image";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { site } from "@/lib/data";
import type { AfterSalesTeamMember } from "@/lib/types";

/** A card on the After Sales Team page. Same design as the sales team card
 * (components/team/TeamCard.tsx), but without a profile page. Someone with no
 * photo yet gets the Hyundai logo. */
export function AfterSalesTeamCard({ member }: { member: AfterSalesTeamMember }) {
  return (
    <article className="group w-full max-w-[260px] shrink-0 lg:min-w-0 lg:shrink">
      <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-[#f0f3f7]">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 260px, 80vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src={site.logo}
            alt="Hyundai Islamabad"
            width={523}
            height={147}
            sizes="260px"
            className="h-auto w-3/5 object-contain"
          />
        )}
      </div>
      <h3 className="mt-4 text-[16px] font-semibold text-foreground">{member.name}</h3>
      <p className="mt-0.5 text-[13px] font-medium text-accent">{member.role}</p>
      {member.whatsappHref ? (
        <a
          href={member.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-300 ease-out hover:text-accent"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
            <WhatsAppIcon className="h-3 w-3 fill-white" />
          </span>
          {member.phoneDisplay || "WhatsApp"}
        </a>
      ) : null}
    </article>
  );
}
