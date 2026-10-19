import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Car,
  FileText,
  House,
  Info,
  Megaphone,
  Menu,
  Newspaper,
  PencilLine,
  Phone,
  ReceiptText,
  Send,
  Tag,
  Users,
  Globe,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { CONTENT_GROUPS, CONTENT_REGISTRY, type ContentKey } from "@/lib/admin/content-registry";

const ICONS: Record<ContentKey, LucideIcon> = {
  vehicles: Car,
  "emi-plans": Calculator,
  "price-list": FileText,
  "emi-page": ReceiptText,
  home: House,
  offers: Tag,
  news: Newspaper,
  team: Users,
  service: Wrench,
  about: Info,
  site: Phone,
  nav: Menu,
  "booking-notice": Megaphone,
};

const STEPS = [
  { icon: PencilLine, title: "Make your changes", text: "Open a section and edit the boxes." },
  { icon: Send, title: "Press Publish", text: "Nothing changes on the website until you do." },
  { icon: Globe, title: "Live in 1-3 minutes", text: "The website rebuilds itself with your change." },
];

export default function AdminHomePage() {
  const keys = Object.keys(CONTENT_REGISTRY) as ContentKey[];

  return (
    <div>
      <h1 className="text-[28px] font-light tracking-tight">What would you like to update?</h1>
      <p className="mt-1.5 text-[14px] text-[#6b7383]">Choose a section below. Prices are at the top.</p>

      <ol className="mt-7 grid gap-3 sm:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-[#e6e9ef]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-[13px] font-semibold text-white">
              {index + 1}
            </span>
            <span>
              <span className="flex items-center gap-1.5 text-[14px] font-semibold">
                <Icon size={14} className="text-accent" aria-hidden />
                {title}
              </span>
              <span className="mt-0.5 block text-[12.5px] leading-5 text-[#6b7383]">{text}</span>
            </span>
          </li>
        ))}
      </ol>

      {CONTENT_GROUPS.map((group) => (
        <section key={group} className="mt-10">
          <h2 className="text-[12px] font-semibold tracking-[0.14em] text-[#8a93a3] uppercase">{group}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {keys
              .filter((key) => CONTENT_REGISTRY[key].group === group)
              .map((key) => {
                const Icon = ICONS[key];
                const entry = CONTENT_REGISTRY[key];
                return (
                  <Link
                    key={key}
                    href={`/admin/content/${key}`}
                    className="group flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-[#e6e9ef] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-14px_rgba(0,44,95,0.3)] hover:ring-accent/40"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <Icon size={20} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2 text-[15px] font-semibold">
                        {entry.label}
                        <ArrowRight
                          size={16}
                          className="shrink-0 text-[#b6bdc9] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                          aria-hidden
                        />
                      </span>
                      <span className="mt-1 block text-[13px] leading-5 text-[#6b7383]">{entry.description}</span>
                    </span>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
