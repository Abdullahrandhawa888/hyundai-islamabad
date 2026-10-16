import type { Metadata } from "next";
import { CircleCheck, Scale, X } from "lucide-react";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { warranty } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("warranty");

const sections = [
  { id: "coverage", label: "Warranty coverage" },
  { id: "warranty-service", label: "Getting warranty service" },
  { id: "covered", label: "What is covered" },
  { id: "not-covered", label: "What is not covered" },
  { id: "owner", label: "Your responsibilities" },
];

const sectionClass = "scroll-mt-36 border-t border-line pt-12 mt-12 first:mt-0 first:border-t-0 first:pt-0";

export default function WarrantyPage() {
  return (
    <AfterSalesPage slug="warranty">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 lg:grid lg:grid-cols-[190px_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <nav
            aria-label="On this page"
            className="sticky top-[calc(var(--site-header-offset)+1.75rem)] transition-[top] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          >
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              On this page
            </p>
            <ul className="mt-4 space-y-1 border-l border-line text-[13px]">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-nav transition-colors duration-300 ease-out hover:border-accent hover:text-foreground"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">
          <p className="mb-12 max-w-3xl text-[15px] leading-8 text-[#444]">{warranty.intro}</p>

          <section id="coverage" className={sectionClass}>
            <h2 className="text-2xl font-light">Warranty coverage</h2>
            <p className="mt-2 text-[14px] text-muted">Whichever limit is reached first.</p>
            {/* Subgrid lines up each card's title, figure and text across the
                row, even when one title wraps onto two lines. */}
            <div className="mt-6 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto_1fr] md:gap-y-0">
              {warranty.coverage.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col border border-line p-6 md:row-span-4 md:grid md:grid-rows-subgrid"
                >
                  <h3 className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-3xl font-light">{item.term}</p>
                  <p className="mt-1 text-[14px] font-semibold text-accent">
                    {item.distance ? `or ${item.distance}` : null}
                  </p>
                  <p className="mt-4 text-[14px] leading-7 text-muted">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="warranty-service" className={sectionClass}>
            <h2 className="text-2xl font-light">Getting warranty service</h2>
            <p className="mt-4 max-w-3xl text-[14px] leading-7 text-[#333]">{warranty.service}</p>
            <div className="mt-6 flex max-w-3xl gap-3 border-l-2 border-accent bg-[#f7f9fc] px-5 py-4">
              <Scale size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div>
                <h3 className="text-[14px] font-semibold">Resolution of warranty claims</h3>
                <p className="mt-1 text-[14px] leading-7 text-[#333]">{warranty.claims}</p>
              </div>
            </div>
          </section>

          <section id="covered" className={sectionClass}>
            <h2 className="text-2xl font-light">What is covered</h2>
            <p className="mt-4 flex max-w-3xl gap-3 text-[14px] leading-7 text-[#333]">
              <CircleCheck size={18} className="mt-1 shrink-0 text-accent" aria-hidden />
              {warranty.covered}
            </p>
          </section>

          <section id="not-covered" className={sectionClass}>
            <h2 className="text-2xl font-light">What is not covered</h2>
            <div className="mt-6 gap-4 md:columns-2">
              {warranty.notCovered.map((group) => (
                <article
                  key={group.title}
                  className="mb-4 break-inside-avoid border border-line p-6"
                >
                  <h3 className="text-[15px] font-semibold">{group.title}</h3>
                  {group.detail ? (
                    <p className="mt-2 text-[14px] leading-7 text-muted">{group.detail}</p>
                  ) : null}
                  {group.items.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[14px] leading-6 text-[#333]">
                          <X size={15} className="mt-[5px] shrink-0 text-muted" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section id="owner" className={sectionClass}>
            <h2 className="text-2xl font-light">Your responsibilities</h2>
            <p className="mt-2 text-[14px] text-muted">
              To keep your warranty valid, as the owner you should:
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {warranty.owner.map((item, index) => (
                <li key={item.title} className="flex gap-4 border border-line p-6">
                  <span className="text-2xl leading-none font-light text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-7 text-muted">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </AfterSalesPage>
  );
}
