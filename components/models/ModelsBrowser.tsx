"use client";

import { useMemo, useState } from "react";
import { rangeTabs, seriesFilters, vehicles } from "@/lib/data";
import type { VehicleRange, VehicleSeries } from "@/lib/types";
import { ModelCard } from "./ModelCard";

export function ModelsBrowser() {
  const [range, setRange] = useState<VehicleRange | "all">("all");
  const [series, setSeries] = useState<VehicleSeries | "all">("all");

  const filtered = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesRange = range === "all" || vehicle.ranges.includes(range);
      const matchesSeries = series === "all" || vehicle.series === series;
      return matchesRange && matchesSeries;
    });
  }, [range, series]);

  function changeRange(next: VehicleRange | "all") {
    setRange(next);
    setSeries("all");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => changeRange("all")}
          className={`px-4 py-2 text-[13px] font-semibold tracking-wide uppercase transition-colors duration-300 ease-out ${
            range === "all"
              ? "bg-accent text-white"
              : "border border-line text-foreground hover:bg-[#f6f8fb]"
          }`}
        >
          All Models
        </button>
        {rangeTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => changeRange(tab.id)}
            className={`px-4 py-2 text-[13px] font-semibold tracking-wide uppercase transition-colors duration-300 ease-out ${
              range === tab.id
                ? "bg-accent text-white"
                : "border border-line text-foreground hover:bg-[#f6f8fb]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-6 border-b border-line pb-4 text-[15px] font-light">
        <button
          type="button"
          onClick={() => setSeries("all")}
          className={`border-b-2 pb-1 transition-colors duration-300 ease-out ${
            series === "all" ? "border-accent text-foreground" : "border-transparent text-muted"
          }`}
        >
          All
        </button>
        {seriesFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setSeries(filter.id)}
            className={`border-b-2 pb-1 transition-colors duration-300 ease-out ${
              series === filter.id
                ? "border-accent text-foreground"
                : "border-transparent text-muted"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-[13px] text-muted">
        {filtered.length} {filtered.length === 1 ? "model" : "models"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-[14px] text-muted">No models match this filter.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle) => (
            <ModelCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
