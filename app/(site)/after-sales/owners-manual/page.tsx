import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { ownerManuals } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("owners-manual");

export default function OwnersManualPage() {
  return (
    <AfterSalesPage slug="owners-manual">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {ownerManuals.manuals.map((manual) => (
            <li key={manual.name}>
              <div className="relative aspect-[512/280]">
                <Image
                  src={manual.image}
                  alt={`Hyundai ${manual.name}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-contain"
                />
              </div>
              <h2 className="mt-4 text-[15px] font-semibold uppercase">
                {manual.href ? (
                  <Link href={manual.href} className="transition-colors hover:text-accent">
                    {manual.name}
                  </Link>
                ) : (
                  manual.name
                )}
              </h2>
              {manual.pdf ? (
                <a
                  href={manual.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2.5 text-[14px] font-semibold transition-colors hover:text-accent"
                >
                  <Download size={17} strokeWidth={1.8} aria-hidden />
                  Download
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </AfterSalesPage>
  );
}
