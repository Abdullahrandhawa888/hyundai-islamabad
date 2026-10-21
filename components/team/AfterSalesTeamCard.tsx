import Image from "next/image";
import { UserRound } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import type { AfterSalesTeamMember } from "@/lib/types";

/** A card on the After Sales Team page. Same look as the sales cards, but
 * without a profile page, and the photo and contact line are optional. */
export function AfterSalesTeamCard({ member }: { member: AfterSalesTeamMember }) {
  return (
    <article className="group w-full max-w-[260px] shrink-0">
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
          <UserRound size={72} strokeWidth={1} className="text-accent/35" aria-hidden />
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
