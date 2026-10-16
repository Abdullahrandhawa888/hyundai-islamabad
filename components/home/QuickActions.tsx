import Link from "next/link";
import { ArrowRight, CalendarCheck, MessageSquare, Tag, type LucideIcon } from "lucide-react";

const actions: { label: string; text: string; href: string; icon: LucideIcon }[] = [
  {
    label: "Book a Service",
    text: "Reserve a slot at our I-9/3 workshop",
    href: "/after-sales/book-a-service",
    icon: CalendarCheck,
  },
  {
    label: "Make an Enquiry",
    text: "Ask us about any new Hyundai",
    href: "/enquiry",
    icon: MessageSquare,
  },
  {
    label: "View Our Offers",
    text: "Current promotions and deals",
    href: "/offers",
    icon: Tag,
  },
];

export function QuickActions() {
  return (
    // Same side padding as the model range above, so the cards line up with it.
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-10 2xl:px-16">
      <div className="grid gap-4 md:grid-cols-3">
        {actions.map(({ label, text, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 border border-line bg-white px-6 py-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_14px_34px_-18px_rgba(28,105,212,0.55)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 ease-out group-hover:bg-accent group-hover:text-white">
              <Icon size={21} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[16px] font-semibold tracking-wide">{label}</span>
              <span className="mt-0.5 block text-[13px] text-muted">{text}</span>
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-[#b6bdc9] transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
