import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAfterSalesPage, type AfterSalesSlug } from "./pages";

export function afterSalesMetadata(slug: AfterSalesSlug): Metadata {
  const page = getAfterSalesPage(slug);
  return { title: page.metaTitle, description: page.tagline };
}

type Crumb = { label: string; href?: string };

/** Shared frame for every /after-sales page, laid out like hyundai-nishat.com:
 * breadcrumb, then an inset hero (a photo, or a plain beige panel with a
 * centred heading), then the page's own content. Pages below a section page
 * (a single part, say) pass their own `title` and `crumb`. */
export function AfterSalesPage({
  slug,
  children,
  title,
  subtitle,
  crumb,
}: {
  slug: AfterSalesSlug;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  crumb?: string;
}) {
  const page = getAfterSalesPage(slug);
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...page.parents, { label: crumb ?? page.navLabel }];
  const heading = title ?? page.title;
  const lead = subtitle ?? page.tagline;
  const dark = page.heroTone === "dark";

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-7 pb-6 md:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
          {crumbs.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href ? (
                <Link href={item.href} className="text-foreground transition-colors hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={index === crumbs.length - 1 ? "font-semibold text-foreground" : "text-foreground"}
                  aria-current={index === crumbs.length - 1 ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {index < crumbs.length - 1 ? <ChevronRight size={14} className="text-foreground" aria-hidden /> : null}
            </li>
          ))}
        </ol>
      </nav>

      <section className="mx-auto max-w-[1320px] md:px-6">
        {page.hero && page.heroSplit ? (
          // Photo shown whole (never cropped) on the right; heading on navy beside it.
          // On phones the photo sits on top and the heading below.
          <div className="flex flex-col-reverse bg-navy text-white md:h-[370px] md:flex-row">
            <div className="flex flex-1 flex-col justify-center px-5 py-10 md:px-12">
              <h1 className="text-4xl leading-tight font-semibold md:text-[48px]">{heading}</h1>
              <p className="mt-3 max-w-md text-[16px] leading-7 text-white/85 md:text-[18px]">{lead}</p>
            </div>
            <Image
              src={page.hero}
              alt=""
              width={727}
              height={405}
              // Fades into the navy (down on phones, left on wide screens) instead of a hard edge.
              className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_65%,transparent)] md:h-full md:w-auto md:[mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,0.55)_18%,black_38%)]"
              priority
              unoptimized
            />
          </div>
        ) : page.hero ? (
          <div
            className={`relative flex min-h-[260px] overflow-hidden md:min-h-[370px] ${
              page.heroTop ? "items-start" : "items-center"
            }`}
          >
            <Image
              src={page.hero}
              alt=""
              fill
              sizes="(min-width: 1320px) 1272px, 100vw"
              className={`object-cover ${page.heroPosition ?? "object-center"}`}
              priority
              unoptimized
            />
            {dark ? null : <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />}
            {page.heroTop ? <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-transparent to-60%" /> : null}
            <div className={`relative mx-auto w-full max-w-6xl px-5 md:px-8 ${page.heroTop ? "pt-8 pb-10 md:pt-10" : "py-10"}`}>
              <h1
                className={`max-w-3xl text-4xl leading-tight font-semibold md:text-[52px] ${
                  dark ? "text-foreground" : "text-white"
                }`}
              >
                {heading}
              </h1>
              <p className={`mt-3 max-w-md text-[16px] leading-7 md:text-[18px] ${dark ? "text-foreground" : "text-white"}`}>
                {lead}
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`px-5 py-14 text-center md:py-20 ${page.heroBlue ? "bg-navy text-white" : "bg-[#f6f3f2]"}`}
          >
            <h1 className="text-4xl leading-tight font-semibold md:text-[56px]">{heading}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-[16px] leading-7 md:text-[18px]">{lead}</p>
          </div>
        )}
      </section>

      {children}
    </>
  );
}

/** Small uppercase label above a section heading. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{children}</p>
  );
}
