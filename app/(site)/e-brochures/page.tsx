import { statSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { vehicles } from "@/lib/data";

export const metadata: Metadata = {
  title: "e-Brochures",
  description: "Download the e-brochure for any Hyundai model at Hyundai Islamabad.",
};

/** File size of a brochure stored on this site, e.g. "4.5 MB". Empty for
 * links to files hosted elsewhere or missing files. Read at build time. */
function fileSize(href: string) {
  if (!href.startsWith("/")) return "";
  try {
    const bytes = statSync(path.join(process.cwd(), "public", decodeURIComponent(href))).size;
    return `${(bytes / 1_000_000).toFixed(1)} MB`;
  } catch {
    return "";
  }
}

export default function EBrochuresPage() {
  // Same order as the Models page; models without a brochure are left out.
  const items = vehicles.filter((vehicle) => vehicle.brochure);

  return (
    <>
      <PageHero
        title="e-Brochures"
        subtitle="Download the brochure for any Hyundai model: features, colours and full specifications."
        crumbs={[{ label: "Homepage", href: "/" }, { label: "e-Brochures" }]}
        image="/images/vehicles/models-showroom.jpg"
      />

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-2xl text-[14px] leading-7 text-muted">
          Every brochure is a PDF you can save or share. For prices and EMI plans, see our{" "}
          <Link href="/prices" className="font-medium text-accent hover:text-[#1557b0]">
            price list
          </Link>
          .
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((vehicle) => {
            const size = fileSize(vehicle.brochure);
            return (
              <article
                key={vehicle.slug}
                className="group flex flex-col border border-line bg-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_36px_-20px_rgba(0,44,95,0.45)]"
              >
                <Link href={`/models/${vehicle.slug}`} className="relative block aspect-[7/3] bg-[#f6f7f9]">
                  <Image
                    src={vehicle.cardImage}
                    alt={`Hyundai ${vehicle.shortName}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                    {vehicle.fuel === vehicle.category ? vehicle.fuel : `${vehicle.fuel} · ${vehicle.category}`}
                  </p>
                  <h2 className="mt-1 text-[19px] font-semibold">Hyundai {vehicle.shortName}</h2>
                  <p className="mt-1 text-[13px] text-muted">
                    e-Brochure (PDF){size ? ` · ${size}` : ""}
                  </p>
                  <div className="mt-5 flex flex-1 flex-wrap items-end gap-x-5 gap-y-3">
                    <a
                      href={vehicle.brochure}
                      download={`Hyundai ${vehicle.shortName} Brochure.pdf`}
                      className="inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-colors duration-300 ease-out hover:bg-[#1557b0]"
                    >
                      <FileDown size={16} aria-hidden />
                      Download
                    </a>
                    <Link
                      href={`/models/${vehicle.slug}`}
                      className="pb-2 text-[13px] font-medium transition-colors duration-300 ease-out hover:text-accent"
                    >
                      › View model
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
