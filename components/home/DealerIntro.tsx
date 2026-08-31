import Image from "next/image";
import { aboutParagraphs, site } from "@/lib/data";

export function DealerIntro() {
  return (
    <section className="border-t border-line">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[280px] md:min-h-[420px]">
          <Image
            src={site.dealerImage}
            alt={`${site.name} dealership`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-12 md:px-12">
          <h2 className="text-2xl font-light md:text-3xl">
            Hyundai New Car Dealer in Islamabad, {site.group}
          </h2>
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-5 text-[14px] leading-7 text-[#444]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
