import type { Metadata } from "next";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { maintenanceCharts } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("maintenance-charts");

/** "AC filter (As per condition)" -> heading "AC filter" with "(As per condition)" in small text below. */
function ColumnHeading({ column }: { column: string }) {
  const match = column.match(/^(.*?)\s*(\(.+\))$/);
  if (!match) return column;
  return (
    <>
      {match[1]}
      <span className="mt-0.5 block text-[10px] font-normal whitespace-nowrap tracking-normal normal-case opacity-80">{match[2]}</span>
    </>
  );
}

export default function MaintenanceChartsPage() {
  const { charts } = maintenanceCharts;

  return (
    <AfterSalesPage slug="maintenance-charts">
      {/* One table per fuel type, labelled in its own top-left cell (Petrol, Diesel, ...). */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-14 md:px-8">
        {charts.map((chart) => (
          <div key={chart.title} className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-center text-[12px]">
              <caption className="sr-only">{chart.title}: replacement interval for each part, by model</caption>
              <thead>
                <tr className="bg-navy text-[12px] text-white uppercase">
                  <th scope="col" className="w-[150px] px-3 py-3 text-[13px] font-semibold tracking-wide">
                    {chart.title}
                  </th>
                  {chart.columns.map((column) => (
                    <th key={column} scope="col" className="px-3 py-3 font-semibold">
                      <ColumnHeading column={column} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row) => (
                  <tr key={row.model} className="border-b border-line odd:bg-[#f6f3f2]">
                    <th scope="row" className="px-3 py-3.5 text-[13px] font-semibold whitespace-nowrap">
                      {row.model}
                    </th>
                    {row.values.map((value, index) => (
                      <td key={`${row.model}-${chart.columns[index]}`} className="px-3 py-3.5 whitespace-nowrap">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </AfterSalesPage>
  );
}
