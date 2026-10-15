import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { AfterSalesHelp } from "./AfterSalesHelp";
import { AfterSalesNav } from "./AfterSalesNav";
import { getAfterSalesPage, type AfterSalesSlug } from "./pages";

export function afterSalesMetadata(slug: AfterSalesSlug): Metadata {
  const page = getAfterSalesPage(slug);
  return { title: page.title, description: page.tagline };
}

/** Shared frame for every /after-sales page: hero, section tabs, the page's
 * own content, then the "Need a hand?" band. */
export function AfterSalesPage({
  slug,
  children,
}: {
  slug: AfterSalesSlug;
  children: React.ReactNode;
}) {
  const page = getAfterSalesPage(slug);
  const crumbs =
    slug === "overview"
      ? [{ label: "Homepage", href: "/" }, { label: "After Sales" }]
      : [
          { label: "Homepage", href: "/" },
          { label: "After Sales", href: "/after-sales" },
          { label: page.navLabel },
        ];

  return (
    <>
      <PageHero
        title={page.title}
        subtitle={page.tagline}
        crumbs={crumbs}
        image={page.hero}
        imagePosition={page.heroPosition}
      />
      <AfterSalesNav active={slug} />
      {children}
      <AfterSalesHelp current={slug} />
    </>
  );
}

/** Small uppercase label above a section heading. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{children}</p>
  );
}
