import type { Metadata } from "next";
import { Info } from "lucide-react";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { Button } from "@/components/shared/Button";
import { maintenanceCharts } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("maintenance-charts");

// In content/service.json a "-" means the item doesn't apply to that model.
const NOT_APPLICABLE = "-";

export default function MaintenanceChartsPage() {
  const { intro, note, columns, items } = maintenanceCharts;

  return (
    <AfterSalesPage slug="maintenance-charts">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="max-w-3xl text-[15px] leading-8 text-[#444]">{intro}</p>
        <p className="mt-4 flex max-w-3xl gap-2.5 text-[13px] leading-6 text-muted">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          {note}
        </p>

        <p className="mt-10 text-[12px] text-muted lg:hidden">
          Swipe the table sideways to see every model →
        </p>
        <div className="mt-3 overflow-x-auto border border-line lg:mt-10">
          <table className="w-full min-w-[960px] border-collapse text-left text-[13px]">
            <caption className="sr-only">Replacement interval for each item, by model</caption>
            <thead>
              <tr className="bg-[#f7f9fc] text-[11px] tracking-[0.08em] uppercase">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-[#f7f9fc] px-4 py-3.5 font-semibold shadow-[inset_-1px_0_0_var(--line)]"
                >
                  Item
                </th>
                {columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-3.5 font-semibold whitespace-nowrap">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.item} className="group border-t border-line">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-4 py-3 font-medium whitespace-nowrap shadow-[inset_-1px_0_0_var(--line)] transition-colors duration-200 group-hover:bg-[#f7f9fc]"
                  >
                    {row.item}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.item}-${columns[index]}`}
                      className={`px-4 py-3 whitespace-nowrap transition-colors duration-200 group-hover:bg-[#f7f9fc] ${
                        value === NOT_APPLICABLE ? "text-muted" : ""
                      }`}
                    >
                      {value === NOT_APPLICABLE ? "—" : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] text-muted">— Not applicable to this model.</p>

        <div className="mt-14 flex flex-col items-start gap-5 border border-line bg-[#f7f9fc] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-light">Due for maintenance?</h2>
            <p className="mt-1 text-[14px] leading-7 text-muted">
              Book periodic maintenance at our I-9/3 workshop, at a time that suits you.
            </p>
          </div>
          <Button href="/after-sales/book-a-service?type=periodic" className="shrink-0">
            Book maintenance
          </Button>
        </div>
      </section>
    </AfterSalesPage>
  );
}
