import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AfterSalesPage } from "@/components/after-sales/AfterSalesPage";
import { PartsNav } from "@/components/after-sales/PartsNav";
import { genuineParts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Genuine Parts Other Parts",
  description: "Your Partner in Parts and Service.",
};

const PER_PAGE = 8;

export default async function OtherPartsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const list = genuineParts.otherParts;
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const requested = Number((await searchParams).page);
  const page = Number.isInteger(requested) && requested >= 1 && requested <= pages ? requested : 1;
  const shown = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <AfterSalesPage slug="genuine-part" title="Other Parts" crumb="Other Parts">
      <PartsNav active="other-parts" />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {shown.map((part) => (
            <li key={part.slug}>
              <Link href={`/after-sales/genuine-parts/other-parts/${part.slug}`} className="group block">
                <div className="relative aspect-[910/570] overflow-hidden">
                  <Image
                    src={part.image}
                    alt={part.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-contain"
                  />
                </div>
                <h2 className="mt-5 text-[16px] font-semibold transition-colors group-hover:text-accent">{part.name}</h2>
              </Link>
            </li>
          ))}
        </ul>

        {pages > 1 ? (
          <nav aria-label="Other Parts pages" className="mt-14 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
              <Link
                key={number}
                href={number === 1 ? "/after-sales/genuine-parts/other-parts" : `/after-sales/genuine-parts/other-parts?page=${number}`}
                aria-current={number === page ? "page" : undefined}
                className={`flex h-8 w-8 items-center justify-center text-[12px] text-white transition-colors ${
                  number === page ? "bg-navy" : "bg-[#cfcfcf] hover:bg-[#b5b5b5]"
                }`}
              >
                {number}
              </Link>
            ))}
          </nav>
        ) : null}
      </section>
    </AfterSalesPage>
  );
}
