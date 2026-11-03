import type { Metadata } from "next";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { maintenanceCharts } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("maintenance-charts");

export default function MaintenanceChartsPage() {
  const { note, charts } = maintenanceCharts;

  return (
    <AfterSalesPage slug="maintenance-charts">
      <section className="mx-auto max-w-6xl px-5 pt-6 pb-16 md:px-8">
        {charts.map((chart) => (
          <div key={chart.title} className="mt-12">
            <h2 className="text-center text-3xl font-semibold md:text-[40px]">{chart.title}</h2>
            <p className="mt-6 text-[14px]">{note}</p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-center text-[12px]">
                <caption className="sr-only">{chart.title}: replacement interval for each part, by model</caption>
                <thead>
                  <tr className="bg-navy text-[12px] text-white uppercase">
                    <th scope="col" className="px-3 py-3 font-semibold normal-case">
                      Models
                    </th>
                    {chart.columns.map((column) => (
                      <th key={column} scope="col" className="px-3 py-3 font-semibold">
                        {column}
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
          </div>
        ))}
      </section>
    </AfterSalesPage>
  );
}
