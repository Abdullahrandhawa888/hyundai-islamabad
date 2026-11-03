"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Part = {
  slug: string;
  name: string;
  summary: string;
  card: string;
  hotspotX: number;
  hotspotY: number;
};

/** The car drawing with a dot on each part, as on hyundai-nishat.com.
 * Pointing at (or tapping) a dot shows that part's card on the left. */
export function PartsExplorer({ parts, diagram }: { parts: Part[]; diagram: string }) {
  const [activeSlug, setActiveSlug] = useState(
    parts.find((part) => part.slug === "oil-filter")?.slug ?? parts[0]?.slug,
  );
  const active = parts.find((part) => part.slug === activeSlug) ?? parts[0];
  if (!active) return null;

  return (
    <div className="grid items-center gap-10 md:grid-cols-[300px_1fr] lg:gap-20">
      <Link
        href={`/after-sales/genuine-parts/${active.slug}`}
        className="relative mx-auto block aspect-[310/385] w-full max-w-[300px] overflow-hidden"
      >
        <Image key={active.slug} src={active.card} alt={active.name} fill sizes="300px" className="animate-[fade-in_0.4s_ease-out] object-cover" />
        <p className="absolute inset-x-[9%] bottom-[11%] text-[12px] leading-6 font-medium text-white">{active.summary}</p>
      </Link>

      <div className="relative mx-auto w-full max-w-[560px]">
        <Image src={diagram} alt="" width={510} height={339} className="h-auto w-full" />
        {parts.map((part) => {
          const isActive = part.slug === active.slug;
          return (
            <button
              key={part.slug}
              type="button"
              onMouseEnter={() => setActiveSlug(part.slug)}
              onFocus={() => setActiveSlug(part.slug)}
              onClick={() => setActiveSlug(part.slug)}
              aria-label={part.name}
              aria-pressed={isActive}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2"
              style={{ left: `${part.hotspotX}%`, top: `${part.hotspotY}%` }}
            >
              <span className="block h-[15px] w-[15px] rounded-full border-[3px] border-white bg-accent shadow-[0_0_0_2px_rgba(28,105,212,0.35)]" aria-hidden />
              {isActive ? (
                <span className="absolute top-1/2 left-full ml-1 -translate-y-1/2 rounded-sm bg-[#5a5a5a]/90 px-2.5 py-1 text-[11px] whitespace-nowrap text-white">
                  {part.name}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
