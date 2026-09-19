import Image from "next/image";
import type { TeamMember } from "@/lib/types";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM12.04 21.5h-.01a9.5 9.5 0 0 1-4.84-1.32l-.35-.21-3.59.94.96-3.5-.23-.36a9.47 9.47 0 1 1 8.06 4.45zm0-17.1a7.63 7.63 0 0 0-6.44 11.44l.19.3-.57 2.07 2.12-.56.29.17a7.63 7.63 0 1 0 4.41-13.42z" />
    </svg>
  );
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group w-full max-w-[260px] shrink-0">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f0f3f7]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 260px, 80vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-[16px] font-semibold text-foreground">{member.name}</h3>
      <p className="mt-0.5 text-[13px] font-medium text-accent">{member.role}</p>
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
