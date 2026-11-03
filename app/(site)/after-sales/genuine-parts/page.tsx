import type { Metadata } from "next";
import Image from "next/image";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { PartsExplorer } from "@/components/after-sales/PartsExplorer";
import { PartsNav } from "@/components/after-sales/PartsNav";
import { genuineParts } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("genuine-parts");

function ComparisonRow({ items }: { items: { name: string; image: string }[] }) {
  return (
    <ul className="grid grid-cols-3 gap-3 md:gap-6">
      {items.map((item) => (
        <li key={item.name} className="relative aspect-square bg-white">
          <Image
            src={item.image}
            alt={`${item.name}: old part next to a new Hyundai Genuine Part`}
            fill
            sizes="(min-width: 768px) 33vw, 33vw"
            className="object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

export default function GenuinePartsPage() {
  const g = genuineParts;

  return (
    <AfterSalesPage slug="genuine-parts">
      <PartsNav active="overview" />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <PartsExplorer parts={g.parts} diagram={g.diagram} />
      </section>

      <section className="bg-[#f6f3f2]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="text-center text-3xl font-semibold md:text-[40px]">{g.heading}</h2>
          {g.intro.map((paragraph) => (
            <p key={paragraph} className="mt-6 text-[14px] leading-6">
              {paragraph}
            </p>
          ))}

          <h2 className="mt-14 text-center text-3xl font-semibold md:text-[40px]">{g.heading}</h2>
          <div className="mt-8">
            <ComparisonRow items={g.comparison.slice(0, 3)} />
          </div>
          <div className="my-12 text-center">
            <p className="text-xl md:text-2xl">{g.comparisonQuestion}</p>
            <p className="mt-3 text-3xl font-semibold md:text-[40px]">{g.comparisonAnswer}</p>
          </div>
          <ComparisonRow items={g.comparison.slice(3)} />
        </div>
      </section>
    </AfterSalesPage>
  );
}
