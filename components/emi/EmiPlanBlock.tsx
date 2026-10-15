import Image from "next/image";
import Link from "next/link";
import {
  emiAdvancePercent,
  emiRows,
  emiTotalAdvance,
  formatAmount,
  getEmiExFactoryPrice,
  getPricingImage,
  getVehicle,
} from "@/lib/data";
import type { EmiPlan } from "@/lib/types";

// Same table styling as the price list (components/prices/PriceListModel).
const cell = "border border-[#c5cad3] px-3 py-2.5 align-middle";
const head = `${cell} bg-white font-bold text-[#0a2a8a]`;
const label = `${cell} bg-white text-left text-[13px] font-semibold`;

export function EmiPlanBlock({ plan }: { plan: EmiPlan }) {
  const exFactoryPrice = getEmiExFactoryPrice(plan);
  const vehicle = getVehicle(plan.vehicleSlug);
  const image = getPricingImage(plan.vehicleSlug);
  const { tenures } = plan;

  return (
    <article
      id={plan.id}
      className="grid scroll-mt-36 gap-6 border-b border-line py-10 last:border-b-0 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-10"
    >
      <div>
        {image ? (
          <div className="group relative mx-auto aspect-[17/10] w-full max-w-[380px] overflow-hidden">
            <Image
              src={image}
              alt={`Hyundai ${plan.modelLabel}`}
              fill
              sizes="(min-width: 1024px) 300px, 90vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ) : null}
        <h2 className="mt-4 text-[22px] font-extrabold tracking-wide text-[#0a2a8a] uppercase">
          {plan.modelLabel}
        </h2>
        <p className="mt-1 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">
          Interest-free · {tenures.map((tenure) => tenure.months).join(" / ")} months
        </p>
        <div className="mt-4 inline-block bg-[#0a2a8a] px-5 py-3 text-white">
          <p className="text-[12px] font-medium">Ex-Factory Price (PKR)</p>
          <p className="text-[20px] leading-tight font-extrabold">PKR {formatAmount(exFactoryPrice)}</p>
        </div>
        {vehicle ? (
          <p className="mt-4">
            <Link
              href={`/models/${vehicle.slug}`}
              className="text-[13px] font-semibold transition-colors duration-300 ease-out hover:text-accent"
            >
              › View the {vehicle.shortName}
            </Link>
          </p>
        ) : null}
      </div>

      <div className="min-w-0">
        {tenures.length > 1 ? (
          <p className="mb-2 text-[12px] text-muted sm:hidden">Swipe the table sideways to see every tenure →</p>
        ) : null}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px] border-collapse text-center text-[13px] tabular-nums">
            <caption className="sr-only">{plan.modelLabel} installment plan</caption>
            <thead>
              <tr>
                <th scope="col" className={`${head} text-left text-[14px]`}>
                  Tenure
                </th>
                {tenures.map((tenure) => (
                  <th key={tenure.months} scope="col" className={`${head} text-[14px]`}>
                    {tenure.months} Months
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {emiRows.map((row) => (
                <tr key={row.key} className="transition-colors duration-200 hover:bg-[#f7f9fc]">
                  <th scope="row" className={label}>
                    {row.label}
                  </th>
                  {tenures.map((tenure) => (
                    <td key={tenure.months} className={cell}>
                      {row.key === "advanceAmount" ? (
                        <>
                          <span className="block text-[10.5px] font-semibold text-[#0a2a8a]">
                            {emiAdvancePercent(tenure, exFactoryPrice)}% advance
                          </span>
                          <span className="block font-semibold">{formatAmount(tenure.advanceAmount)}</span>
                        </>
                      ) : (
                        formatAmount(tenure[row.key])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-[#eef3fb]">
                <th scope="row" className={`${label} bg-[#eef3fb] text-[#0a2a8a]`}>
                  Total Advance Payment (Filer)
                </th>
                {tenures.map((tenure) => (
                  <td key={tenure.months} className={`${cell} text-[14px] font-bold text-[#0a2a8a]`}>
                    {formatAmount(emiTotalAdvance(tenure))}
                  </td>
                ))}
              </tr>
              <tr className="transition-colors duration-200 hover:bg-[#f7f9fc]">
                <th scope="row" className={label}>
                  Post Dated Cheques
                </th>
                {tenures.map((tenure) => (
                  <td key={tenure.months} className={`${cell} text-[14px] font-bold`}>
                    {formatAmount(tenure.monthlyInstallment)}
                    <span className="ml-1 text-[12px] font-semibold text-muted">× {tenure.months}</span>
                  </td>
                ))}
              </tr>
              <tr className="transition-colors duration-200 hover:bg-[#f7f9fc]">
                <th scope="row" className={label}>
                  Admin Charges
                </th>
                {tenures.map((tenure) => (
                  <td key={tenure.months} className={cell}>
                    {formatAmount(tenure.adminCharges)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}
