"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { formatPrice, vehicles } from "@/lib/data";

const pricedVehicles = vehicles
  .map((vehicle) => ({
    ...vehicle,
    variants: vehicle.variants.filter((variant) => variant.price > 0),
  }))
  .filter((vehicle) => vehicle.variants.length > 0);

const tenures = [1, 2, 3, 4, 5, 6, 7];

function monthlyInstallment(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const r = annualRate / 12 / 100;
  if (principal <= 0) return 0;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

const money = (value: number) => formatPrice(Math.round(value));

const rangeClass = "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent";
const selectClass =
  "w-full border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-accent";

export function EmiCalculator() {
  const [vehicleSlug, setVehicleSlug] = useState(pricedVehicles[0].slug);
  const [variantIndex, setVariantIndex] = useState(0);
  const [downPct, setDownPct] = useState(30);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(18);

  const vehicle = pricedVehicles.find((item) => item.slug === vehicleSlug) ?? pricedVehicles[0];
  const variant = vehicle.variants[variantIndex] ?? vehicle.variants[0];
  const price = variant.discountedPrice ?? variant.price;

  const down = (price * downPct) / 100;
  const financed = price - down;
  const emi = monthlyInstallment(financed, rate, years);
  const total = emi * years * 12;
  const result = { down, financed, emi, total, profit: total - financed };

  const plans = tenures.map((tenure) => {
    const planEmi = monthlyInstallment(financed, rate, tenure);
    return { tenure, emi: planEmi, total: planEmi * tenure * 12 };
  });

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
        <h2 className="text-2xl font-light">Plan your instalments</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold tracking-wide">Model</span>
            <select
              className={selectClass}
              value={vehicle.slug}
              onChange={(event) => {
                setVehicleSlug(event.target.value);
                setVariantIndex(0);
              }}
            >
              {pricedVehicles.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.shortName}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold tracking-wide">Variant</span>
            <select
              className={selectClass}
              value={variantIndex}
              onChange={(event) => setVariantIndex(Number(event.target.value))}
            >
              {vehicle.variants.map((item, index) => (
                <option key={item.name} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex items-baseline justify-between rounded-xl bg-[#faf7f2] px-4 py-3">
          <span className="text-[12px] font-semibold tracking-wide text-muted uppercase">
            Vehicle price
          </span>
          <span className="text-lg font-medium">{money(price)}</span>
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-semibold tracking-wide">Down payment</span>
            <span className="text-[14px] font-medium">
              {downPct}% <span className="text-muted">· {money(result.down)}</span>
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={70}
            step={5}
            value={downPct}
            onChange={(event) => setDownPct(Number(event.target.value))}
            className={`mt-3 ${rangeClass}`}
            aria-label="Down payment percentage"
          />
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-semibold tracking-wide">Tenure</span>
            <span className="text-[14px] font-medium">
              {years} {years === 1 ? "year" : "years"}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={7}
            step={1}
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
            className={`mt-3 ${rangeClass}`}
            aria-label="Tenure in years"
          />
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-semibold tracking-wide">
              Annual profit rate (illustrative)
            </span>
            <span className="text-[14px] font-medium">{rate}%</span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={0.5}
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            className={`mt-3 ${rangeClass}`}
            aria-label="Annual profit rate"
          />
          <p className="mt-2 text-[12px] leading-5 text-muted">
            Set this to the rate your bank quotes you. It is only a placeholder for the estimate.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl bg-gradient-to-br from-accent to-navy p-6 text-white shadow-lg md:p-8">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-white/75 uppercase">
            Estimated monthly instalment
          </p>
          <p className="mt-2 text-4xl font-light md:text-5xl">{money(result.emi)}</p>
          <p className="mt-1 text-[13px] text-white/75">
            for {years * 12} months on {vehicle.shortName} · {variant.name}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/20 pt-5 text-[13px]">
            <div>
              <dt className="text-white/70">Down payment</dt>
              <dd className="mt-0.5 font-medium">{money(result.down)}</dd>
            </div>
            <div>
              <dt className="text-white/70">Amount financed</dt>
              <dd className="mt-0.5 font-medium">{money(result.financed)}</dd>
            </div>
            <div>
              <dt className="text-white/70">Total profit</dt>
              <dd className="mt-0.5 font-medium">{money(result.profit)}</dd>
            </div>
            <div>
              <dt className="text-white/70">Total repayable</dt>
              <dd className="mt-0.5 font-medium">{money(result.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h3 className="text-[15px] font-semibold">Plans at a glance</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[12px] sm:text-[13px]">
              <thead>
                <tr className="border-b border-foreground text-[11px] tracking-wide uppercase">
                  <th className="py-2 pr-3">Tenure</th>
                  <th className="py-2 pr-3">Monthly</th>
                  <th className="py-2">Total repayable</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr
                    key={plan.tenure}
                    className={`border-b border-line ${plan.tenure === years ? "bg-[#faf7f2] font-medium" : ""}`}
                  >
                    <td className="py-2 pr-3">
                      {plan.tenure} {plan.tenure === 1 ? "year" : "years"}
                    </td>
                    <td className="py-2 pr-3">{money(plan.emi)}</td>
                    <td className="py-2">{money(plan.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href="/enquiry" variant="primary">
            Get a financing quotation
          </Button>
          <Button href="/prices" variant="outline">
            View price list
          </Button>
        </div>
      </div>
    </div>
  );
}
