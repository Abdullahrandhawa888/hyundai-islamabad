import Link from "next/link";
import { CalendarCheck, FileDown, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { serviceLocation, site } from "@/lib/data";
import type { AfterSalesSlug } from "./pages";

type HelpAction = { title: string; text: string; href: string; icon: LucideIcon };

const cardClass =
  "group flex items-start gap-4 border border-line bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-md";

export function AfterSalesHelp({ current }: { current: AfterSalesSlug }) {
  const actions: HelpAction[] = [
    {
      title: "Contact us",
      text: "Questions about your Hyundai? Send us a message.",
      href: "/contact",
      icon: MessageCircle,
    },
    // On the booking page itself, offer the phone line instead of a link back to it.
    current === "book-a-service"
      ? {
          title: "Call the service line",
          text: `Speak to a service advisor on ${serviceLocation.phone}.`,
          href: serviceLocation.phoneHref,
          icon: Phone,
        }
      : {
          title: "Service appointment",
          text: "Book a workshop slot at a time that suits you.",
          href: "/after-sales/book-a-service",
          icon: CalendarCheck,
        },
    {
      title: "Download brochure",
      text: "Request the brochure for any Hyundai model.",
      href: "/enquiry?type=brochure",
      icon: FileDown,
    },
  ];

  return (
    <section className="border-t border-line bg-[#f7f9fc]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
              Need a hand?
            </p>
            <h2 className="mt-2 text-2xl font-light">We&rsquo;re here to help</h2>
          </div>
          <p className="text-[13px] leading-6 text-muted">
            Service line{" "}
            <a
              href={serviceLocation.phoneHref}
              className="font-semibold text-foreground transition-colors duration-300 ease-out hover:text-accent"
            >
              {serviceLocation.phone}
            </a>
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            {site.hours.service}
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {actions.map(({ title, text, href, icon: Icon }) => {
            const body = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 ease-out group-hover:bg-accent group-hover:text-white">
                  <Icon size={19} />
                </span>
                <span>
                  <span className="block text-[15px] font-medium">{title}</span>
                  <span className="mt-1 block text-[13px] leading-6 text-muted">{text}</span>
                </span>
              </>
            );
            return href.startsWith("tel:") ? (
              <a key={title} href={href} className={cardClass}>
                {body}
              </a>
            ) : (
              <Link key={title} href={href} className={cardClass}>
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
