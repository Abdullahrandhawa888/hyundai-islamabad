import Image from "next/image";
import { Gauge } from "lucide-react";
import {
  effectivePrice,
  formatAmount,
  fromPrice,
  variantTotal,
  type PriceListRow,
} from "@/lib/data";
import type { PriceList, PriceListModel as PriceListModelData, Vehicle, VehicleVariant } from "@/lib/types";

// The price list's blue, taken from the printed price list.
const cell = "border border-[#c5cad3] px-3 py-3 align-middle";
const head = `${cell} bg-white font-bold text-[#0a2a8a]`;

type CellLine = { label: string; value: string; was?: string };

/** One value per option ("With AC" / "Without AC"), collapsed to a single
 * line when every option has the same figure. */
function linesFor(row: PriceListRow, pick: (variant: VehicleVariant) => number): CellLine[] {
  const lines = row.options.map((variant) => ({ label: variant.option, value: formatAmount(pick(variant)) }));
  return lines.every((line) => line.value === lines[0].value) ? [{ label: "", value: lines[0].value }] : lines;
}

function priceLines(row: PriceListRow): CellLine[] {
  return row.options.map((variant) => ({
    label: row.options.length > 1 ? variant.option : "",
    value: formatAmount(effectivePrice(variant)),
    was: variant.discountedPrice !== undefined ? formatAmount(variant.price) : undefined,
  }));
}

function Lines({ lines }: { lines: CellLine[] }) {
  return (
    <div className="space-y-1.5">
      {lines.map((line) => (
        <div key={line.label + line.value}>
          {line.label ? (
            <span className="block text-[10.5px] font-medium tracking-wide text-[#0a2a8a]">{line.label}</span>
          ) : null}
          {line.was ? <s className="block text-[11px] font-normal text-muted">{line.was}</s> : null}
          <span className="block">{line.value}</span>
        </div>
      ))}
    </div>
  );
}

function WarrantyBadge({ years, title, text }: { years: string; title: string; text: string }) {
  return (
    <div className="inline-flex items-stretch border-2 border-[#0a2a8a] bg-white">
      {years ? (
        <div className="flex items-center gap-1 bg-[#0a2a8a] px-2.5 text-white">
          <span className="text-[34px] leading-none font-extrabold">{years}</span>
          <span className="rotate-180 text-[8.5px] font-bold tracking-[0.25em] [writing-mode:vertical-rl]">
            YEAR
          </span>
        </div>
      ) : null}
      <div className="flex flex-col justify-center px-3 py-1.5">
        <span className="text-[16px] leading-tight font-extrabold text-[#0a2a8a]">{title}</span>
        <span className="text-[11px] font-semibold text-[#0a2a8a]/80">{text}</span>
      </div>
    </div>
  );
}

export function PriceListModel({
  model,
  vehicle,
  rows,
  columns,
}: {
  model: PriceListModelData;
  vehicle: Vehicle;
  rows: PriceListRow[];
  columns: PriceList["columns"];
}) {
  const variants = vehicle.variants;
  const showNev = variants.some((variant) => variant.nevLevy > 0);
  const showWht = variants.some((variant) => variant.whtTax > 0);
  const showCvt = variants.some((variant) => variant.cvt > 0);
  const badges = model.badges.filter((badge) => badge && typeof badge === "object" && badge.title);
  // Models with a spec, badges or an ex-factory box get the flyer's own
  // "feature page" layout: large picture and highlights on top, the table at
  // full width below (it also has room for extra columns like NEV levy and CVT).
  const featured = Boolean(model.spec.title) || badges.length > 0 || model.showExFactoryPrice;

  return (
    <article
      id={vehicle.slug}
      className={`grid scroll-mt-36 gap-6 border-b border-line py-10 last:border-b-0 ${
        featured
          ? "lg:gap-8"
          : "lg:grid-cols-[300px_1fr] lg:items-start lg:gap-10"
      }`}
    >
      <div className={featured ? "grid items-center gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10" : ""}>
        <div
          className={`group relative mx-auto aspect-[17/10] w-full overflow-hidden ${
            featured ? "max-w-[620px]" : "max-w-[380px]"
          }`}
        >
          <Image
            src={model.image}
            alt={`Hyundai ${vehicle.shortName}`}
            fill
            sizes={featured ? "(min-width: 768px) 560px, 90vw" : "(min-width: 1024px) 300px, 90vw"}
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div>
          {featured ? (
            <h2 className="mb-2 text-3xl font-extrabold tracking-wide text-[#0a2a8a] uppercase md:text-4xl">
              {model.label}
            </h2>
          ) : null}

          {model.spec.title ? (
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-[#0a2a8a]">
                <Gauge size={22} strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <p className="text-[15px] font-bold">{model.spec.title}</p>
                {model.spec.text ? <p className="text-[13px] text-muted">{model.spec.text}</p> : null}
              </div>
            </div>
          ) : null}

          {badges.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <WarrantyBadge key={badge.title + badge.text} {...badge} />
              ))}
            </div>
          ) : null}

          {model.showExFactoryPrice && fromPrice(vehicle) > 0 ? (
            <div className="mt-4 inline-block bg-[#0a2a8a] px-5 py-3 text-white">
              <p className="text-[13px] font-medium">Ex-Factory Price (PKR)</p>
              <p className="text-[22px] leading-tight font-extrabold">PKR {formatAmount(fromPrice(vehicle))}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="min-w-0">
        <p className="mb-2 text-[12px] text-muted sm:hidden">Swipe the table sideways to see all columns →</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-center text-[13px] tabular-nums">
            <caption className="sr-only">{model.label} prices</caption>
            <thead>
              <tr>
                <th scope="col" className={`${head} text-[14px]`}>Model</th>
                <th scope="col" className={`${head} text-[14px]`}>Grade</th>
                <th scope="col" className={`${head} text-[14px]`}>Variant</th>
                <th scope="col" className={`${head} text-[14px]`}>
                  {columns.price} <span className="text-[10px]">(PKR)</span>
                </th>
                <th scope="col" className={`${head} text-[11px] leading-tight`}>{columns.transportation}</th>
                {showNev ? <th scope="col" className={`${head} text-[13px]`}>{columns.nevLevy}</th> : null}
                {showWht ? <th scope="col" className={`${head} text-[13px]`}>{columns.whtTax}</th> : null}
                {showCvt ? <th scope="col" className={`${head} text-[13px]`}>{columns.cvt}</th> : null}
                <th scope="col" className={`${head} text-[11px] leading-tight`}>{columns.total}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.options.map((variant) => variant.name).join("|")}
                  className="transition-colors duration-200 hover:bg-[#f7f9fc]"
                >
                  {index === 0 ? (
                    <th scope="rowgroup" rowSpan={rows.length} className={`${cell} bg-white text-[14px] font-bold`}>
                      {model.label}
                    </th>
                  ) : null}
                  <td className={`${cell} font-semibold`}>{row.grade}</td>
                  <td className={`${cell} font-semibold`}>{row.variantLabel}</td>
                  <td className={`${cell} text-[14px] font-bold`}>
                    <Lines lines={priceLines(row)} />
                  </td>
                  <td className={cell}>
                    <Lines lines={linesFor(row, (variant) => variant.transportation)} />
                  </td>
                  {showNev ? (
                    <td className={cell}>
                      <Lines lines={linesFor(row, (variant) => variant.nevLevy)} />
                    </td>
                  ) : null}
                  {showWht ? (
                    <td className={`${cell} font-semibold`}>
                      <Lines lines={linesFor(row, (variant) => variant.whtTax)} />
                    </td>
                  ) : null}
                  {showCvt ? (
                    <td className={cell}>
                      <Lines lines={linesFor(row, (variant) => variant.cvt)} />
                    </td>
                  ) : null}
                  <td className={`${cell} text-[14px] font-bold`}>
                    <Lines lines={linesFor(row, variantTotal)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {vehicle.colors.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-3" aria-label={`${model.label} colours`}>
            {vehicle.colors.map((color) => (
              <li key={color.name} className="w-[68px] text-center">
                <span
                  className="mx-auto block h-[18px] w-[52px] rounded-[3px] border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="mt-1.5 block text-[10px] leading-tight text-[#555]">{color.name}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
