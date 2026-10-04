"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { emiPlans, formatPrice, getEmiExFactoryPrice } from "@/lib/data";
import type { EmiTenure } from "@/lib/types";

const rows: { key: keyof EmiTenure; label: string }[] = [
  { key: "advanceAmount", label: "Advance amount" },
  { key: "transitFreightInsurance", label: "Transit freight & insurance" },
  { key: "advanceIncomeTaxFiler", label: "Advance income tax (filer)" },
  { key: "insuranceAmountSGI", label: "Insurance amount" },
  { key: "trackerChargesSGI", label: "Tracker charges" },
  { key: "processingChargesSGI", label: "Processing charges" },
];

function advancePercent(tenure: EmiTenure, exFactoryPrice: number) {
  return Math.round((tenure.advanceAmount / exFactoryPrice) * 1000) / 10;
}

export function EmiPlans() {
  const [planId, setPlanId] = useState(emiPlans[0].id);
  const plan = emiPlans.find((item) => item.id === planId) ?? emiPlans[0];
  const exFactoryPrice = getEmiExFactoryPrice(plan);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {emiPlans.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPlanId(item.id)}
            className={`border px-4 py-2 text-[13px] font-semibold transition-colors duration-300 ease-out ${
              item.id === plan.id
                ? "border-accent bg-accent text-white"
                : "border-line text-nav hover:border-foreground hover:text-foreground"
            }`}
          >
            {item.modelLabel}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-light md:text-2xl">{plan.modelLabel}</h2>
          <p className="text-[13px] text-muted">
            Ex-Factory <span className="font-semibold text-foreground">{formatPrice(exFactoryPrice)}</span>
          </p>
        </div>

        {plan.tenures.length > 1 ? (
          <p className="mt-4 text-[12px] text-muted sm:hidden">
            Swipe the table sideways to see all tenures →
          </p>
        ) : null}
        <div className="mt-2 overflow-x-auto sm:mt-6">
          <table className="w-full min-w-[480px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-foreground text-[11px] tracking-wide uppercase">
                <th className="py-2 pr-4 font-medium text-muted">Tenure</th>
                {plan.tenures.map((tenure) => (
                  <th key={tenure.months} className="py-2 pr-4 font-semibold">
                    {tenure.months} months
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="py-2.5 pr-4 text-muted">Advance</td>
                {plan.tenures.map((tenure) => (
                  <td key={tenure.months} className="py-2.5 pr-4">
                    {advancePercent(tenure, exFactoryPrice)}%
                  </td>
                ))}
              </tr>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-line">
                  <td className="py-2.5 pr-4 text-muted">{row.label}</td>
                  {plan.tenures.map((tenure) => (
                    <td key={tenure.months} className="py-2.5 pr-4">
                      {formatPrice(tenure[row.key] as number)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-line bg-[#faf7f2] font-semibold">
                <td className="py-2.5 pr-4">Total advance payment (filer)</td>
                {plan.tenures.map((tenure) => (
                  <td key={tenure.months} className="py-2.5 pr-4">
                    {formatPrice(tenure.totalAdvancePayment)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line">
                <td className="py-2.5 pr-4 text-muted">Post dated cheques</td>
                {plan.tenures.map((tenure) => (
                  <td key={tenure.months} className="py-2.5 pr-4">
                    {formatPrice(tenure.monthlyInstallment)}{" "}
                    <span className="text-muted">x{tenure.months}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-muted">Admin charges</td>
                {plan.tenures.map((tenure) => (
                  <td key={tenure.months} className="py-2.5 pr-4">
                    {formatPrice(tenure.adminCharges)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-[13px] font-semibold">Interest-free installments</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/enquiry" variant="primary">
            Request a financing quotation
          </Button>
          <Button href={`/models/${plan.vehicleSlug}`} variant="outline">
            View {plan.modelLabel.replace(/ (FWD|AWD)$/, "")} model
          </Button>
        </div>
      </div>

      <p className="mt-6 text-[12px] leading-6 text-muted">
        The ex-factory price above matches our{" "}
        <Link href="/prices" className="text-accent hover:text-[#1557b0]">
          price list
        </Link>
        . Freight, tax, insurance, tracker and processing charges are set by our financing and
        insurance partners for this interest-free installment program and may change without
        notice. Contact the showroom to confirm current terms before booking.
      </p>
    </div>
  );
}
