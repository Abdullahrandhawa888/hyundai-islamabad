import type { Metadata } from "next";
import {
  AfterSalesPage,
  Eyebrow,
  afterSalesMetadata,
} from "@/components/after-sales/AfterSalesPage";
import { Button } from "@/components/shared/Button";
import { customerPromise } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("customer-promise");

export default function CustomerPromisePage() {
  return (
    <AfterSalesPage slug="customer-promise">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="max-w-3xl">
          <Eyebrow>Our commitment to you</Eyebrow>
          <h2 className="mt-2 text-2xl font-light md:text-3xl">
            What you can expect every time you visit
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-[#444]">{customerPromise.intro}</p>
          <p className="mt-6 text-[14px] font-semibold">We value every customer, and we pledge to:</p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customerPromise.pledges.map((pledge, index) => (
            <li
              key={pledge}
              className="border border-line p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
            >
              <span className="text-3xl leading-none font-light text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[15px] leading-7 text-[#333]">{pledge}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-start gap-5 border border-line bg-[#f7f9fc] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-light">Experience it for yourself</h2>
            <p className="mt-1 text-[14px] leading-7 text-muted">
              Book your next service and let our team look after your Hyundai.
            </p>
          </div>
          <Button href="/after-sales/book-a-service" className="shrink-0">
            Book a Service
          </Button>
        </div>
      </section>
    </AfterSalesPage>
  );
}
