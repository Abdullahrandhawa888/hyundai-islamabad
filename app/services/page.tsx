import type { Metadata } from "next";
import { Button } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import { customerPromise, freeServices, maintenanceCharts, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "After Sales",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="After Sales"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "After Sales" },
        ]}
        image="/images/dealer.jpg"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-2xl text-[15px] leading-8 text-[#444]">
          At Hyundai Islamabad, we dedicate ourselves to delivering the finest after-sales
          service to our customers. The workshop at I-9/3 is open {site.hours.service}. Service
          line: 0304 111 1603.
        </p>
        <Button href="/services/book" variant="primary" className="mt-6">
          Book a Service
        </Button>

        <h2 id="free-services" className="mt-14 scroll-mt-28 text-2xl font-light">
          Free services
        </h2>
        <p className="mt-3 max-w-3xl text-[14px] leading-7 text-muted">
          Labour on the first three scheduled services is complimentary. Parts, lubricants or
          accessories, if required, are charged separately.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {freeServices.map((item) => (
            <article key={item.title} className="border border-line p-6">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-7 text-muted">{item.detail}</p>
            </article>
          ))}
        </div>

        <div id="customer-promise" className="scroll-mt-28">
          <h2 className="mt-16 text-2xl font-light">Customer promise</h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-7 text-muted">
            {customerPromise.intro}
          </p>
          <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-[14px] leading-7 text-[#333]">
            {customerPromise.pledges.map((pledge) => (
              <li key={pledge}>{pledge}</li>
            ))}
          </ul>
        </div>

        <div id="maintenance" className="scroll-mt-28">
          <h2 className="mt-16 text-2xl font-light">Periodic maintenance charts</h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-7 text-muted">
            {maintenanceCharts.intro}
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-foreground text-[12px] tracking-wide uppercase">
                  <th className="py-3 pr-4">Item</th>
                  {maintenanceCharts.columns.map((column) => (
                    <th key={column} className="py-3 pr-4 last:pr-0">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {maintenanceCharts.items.map((row) => (
                  <tr key={row.item} className="border-b border-line">
                    <td className="py-3 pr-4 font-medium">{row.item}</td>
                    {row.values.map((value, index) => (
                      <td key={`${row.item}-${maintenanceCharts.columns[index]}`} className="py-3 pr-4 last:pr-0">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
