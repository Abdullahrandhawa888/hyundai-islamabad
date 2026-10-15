"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { afterSalesPages, type AfterSalesSlug } from "./pages";

export function AfterSalesNav({ active }: { active: AfterSalesSlug }) {
  const listRef = useRef<HTMLUListElement>(null);

  // On narrow screens the tabs scroll sideways; bring the current one into
  // view. Only the list scrolls - never the page.
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!list || !current) return;
    list.scrollLeft = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
  }, [active]);

  return (
    <nav aria-label="After Sales" className="border-b border-line bg-white">
      <ul
        ref={listRef}
        className="relative mx-auto flex max-w-6xl gap-7 overflow-x-auto px-5 [scrollbar-width:none] md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {afterSalesPages.map((page) => {
          const isActive = page.slug === active;
          return (
            <li key={page.slug} className="shrink-0">
              <Link
                href={page.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative block py-4 text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ease-out after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-300 after:ease-out ${
                  isActive
                    ? "text-foreground after:scale-x-100"
                    : "text-nav after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
                }`}
              >
                {page.navLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
