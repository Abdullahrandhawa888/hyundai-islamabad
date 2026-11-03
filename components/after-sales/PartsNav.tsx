import Link from "next/link";
import { genuineParts } from "@/lib/data";

/** Tabs under the Genuine Parts hero: the overview, each part, and Other
 * Parts. `active` is a part slug, "overview", "other-parts", or "" for none. */
export function PartsNav({ active }: { active: string }) {
  const links = [
    { key: "overview", label: "Genuine Parts", href: "/after-sales/genuine-parts" },
    ...genuineParts.parts.map((part) => ({
      key: part.slug,
      label: part.name,
      href: `/after-sales/genuine-parts/${part.slug}`,
    })),
    { key: "other-parts", label: "Other Parts", href: "/after-sales/genuine-parts/other-parts" },
  ];

  return (
    <nav aria-label="Genuine Parts" className="mx-auto max-w-6xl px-5 md:px-8">
      <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map((link) => {
          const isActive = link.key === active;
          return (
            <li key={link.key} className="shrink-0">
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative block px-3 py-4 text-[14px] whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-navy after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-navy"
                    : "text-foreground hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
