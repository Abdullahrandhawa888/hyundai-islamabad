import Image from "next/image";
import { Download } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { site } from "@/lib/data";

/** The price list's blue, taken from the printed flyers. */
export const FLYER_BLUE = "#0a2a8a";

/** Page header styled like the printed price list: dealer logo and title on
 * the left, the issuing company on the right. Used by /prices and /emi-plans. */
export function FlyerHeader({
  title,
  edition,
  issuer,
  issuerTagline,
  crumbs,
  intro,
  download,
  jumpLinks,
}: {
  title: string;
  edition: string;
  issuer: string;
  issuerTagline: string;
  crumbs: { label: string; href?: string }[];
  intro: string;
  download?: { href: string; label: string; fileName: string };
  jumpLinks: { href: string; label: string }[];
}) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-10 md:px-8">
        <Breadcrumb items={crumbs} />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-5">
            <Image
              src={site.logo}
              alt={site.name}
              width={523}
              height={147}
              className="h-12 w-auto md:h-16"
              priority
            />
            <span className="h-12 w-px bg-line md:h-16" aria-hidden />
            <div>
              <h1 className="text-[26px] leading-tight font-light tracking-[0.08em] text-[#0a2a8a] uppercase md:text-[34px]">
                {title}
              </h1>
              <p className="text-[12px] font-semibold tracking-[0.16em] text-muted uppercase">{edition}</p>
            </div>
          </div>
          <div className="lg:text-right">
            <p className="text-[20px] font-extrabold tracking-wide text-[#0a2a8a] uppercase italic md:text-[24px]">
              {issuer}
            </p>
            <p className="text-[11px] font-medium tracking-[0.2em] text-[#0a2a8a]/80 uppercase">
              {issuerTagline}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-[14px] leading-7 text-muted">{intro}</p>
          {download ? (
            <div className="shrink-0">
              <DownloadPdfButton {...download} />
            </div>
          ) : null}
        </div>

        {jumpLinks.length > 1 ? (
          <nav aria-label="Models on this page" className="mt-6 flex flex-wrap gap-2">
            {jumpLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border border-line px-3 py-1.5 text-[12px] font-semibold text-nav transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#0a2a8a] hover:text-[#0a2a8a]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}

/** Downloads a PDF that the site generates from the current prices. */
export function DownloadPdfButton({
  href,
  label,
  fileName,
}: {
  href: string;
  label: string;
  fileName: string;
}) {
  return (
    <a
      href={href}
      download={fileName || true}
      className="group inline-flex items-center gap-3 border border-[#0a2a8a] bg-[#0a2a8a] px-5 py-3 text-[13px] font-semibold tracking-wide text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#081f68] hover:shadow-lg"
    >
      <Download
        size={16}
        className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
        aria-hidden
      />
      {label}
    </a>
  );
}
