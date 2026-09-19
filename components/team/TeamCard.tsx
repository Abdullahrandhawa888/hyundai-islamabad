import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import type { TeamMember } from "@/lib/types";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group w-full max-w-[260px] shrink-0">
      <Link href={`/team/${member.slug}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f0f3f7]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 260px, 80vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-[16px] font-semibold text-foreground transition-colors duration-300 ease-out group-hover:text-accent">
          {member.name}
        </h3>
        <p className="mt-0.5 text-[13px] font-medium text-accent">{member.role}</p>
      </Link>
      <a
        href={member.whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-300 ease-out hover:text-accent"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
          <WhatsAppIcon className="h-3 w-3 fill-white" />
        </span>
        {member.phoneDisplay}
      </a>
    </article>
  );
}
