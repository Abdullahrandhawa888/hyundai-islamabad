import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Info } from "lucide-react";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { ownerManuals } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("owners-manual");

export default function OwnersManualPage() {
  const { intro, note, manuals } = ownerManuals;

  return (
    <AfterSalesPage slug="owners-manual">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-3xl text-[15px] leading-8 text-[#444]">{intro}</p>
        <p className="mt-4 flex max-w-3xl gap-2.5 text-[13px] leading-6 text-muted">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          {note}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {manuals.map((manual) => (
            <article
              key={manual.name}
              className="group flex flex-col border border-line transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[5/3] overflow-hidden bg-[#f6f6f6]">
                <Image
                  src={manual.image}
                  alt={`Hyundai ${manual.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Owner&rsquo;s Manual
                </p>
                <h2 className="mt-1 text-xl font-light">{manual.name}</h2>
                <div className="mt-6 flex flex-1 flex-wrap items-end justify-between gap-3">
                  {manual.pdf ? (
                    <a
                      href={manual.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-all duration-300 ease-out hover:border-[#1557b0] hover:bg-[#1557b0]"
                    >
                      <Download size={15} aria-hidden />
                      Download PDF
                    </a>
                  ) : (
                    <Link
                      href="/contact"
                      className="inline-flex items-center border border-foreground px-4 py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-300 ease-out hover:bg-foreground hover:text-white"
                    >
                      Request a copy
                    </Link>
                  )}
                  {manual.pdf && manual.size ? (
                    <span className="text-[12px] text-muted">PDF · {manual.size}</span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AfterSalesPage>
  );
}
