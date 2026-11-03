import type { Metadata } from "next";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { warranty } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("warranty");

export default function WarrantyPage() {
  return (
    <AfterSalesPage slug="warranty">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <Image
          src={warranty.badge}
          alt="4 year 100,000 km warranty coverage"
          width={704}
          height={154}
          className="mx-auto h-auto w-full max-w-[350px]"
        />

        <div className="mt-8 space-y-px">
          {warranty.sections.map((section) => (
            <details key={section.title} className="group bg-navy text-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[19px] font-medium md:px-9 md:text-[22px] [&::-webkit-details-marker]:hidden">
                {section.title}
                <ChevronDown
                  size={22}
                  strokeWidth={1.4}
                  className="shrink-0 transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="space-y-6 bg-white px-6 py-8 text-foreground md:px-9">
                {section.blocks.map((block, index) => (
                  <div key={`${block.heading}-${index}`}>
                    {block.heading ? <h3 className="text-[15px] font-semibold">{block.heading}</h3> : null}
                    {block.text ? (
                      <p className="mt-2 text-[14px] leading-7 whitespace-pre-line text-[#333]">{block.text}</p>
                    ) : null}
                    {block.items.length ? (
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-7 text-[#333]">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
    </AfterSalesPage>
  );
}
