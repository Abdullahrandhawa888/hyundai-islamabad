"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { rangeTabs, seriesFilters, vehiclesByRange } from "@/lib/data";
import type { Vehicle, VehicleRange, VehicleSeries } from "@/lib/types";
import { Button, DiscoverLink } from "../shared/Button";

function chunk(list: Vehicle[], size: number) {
  const pages: Vehicle[][] = [];
  for (let i = 0; i < list.length; i += size) pages.push(list.slice(i, i + size));
  return pages.length ? pages : [[]];
}

export function ModelRange() {
  const [range, setRange] = useState<VehicleRange>("hyundai");
  const [series, setSeries] = useState<VehicleSeries | "all">("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const list = vehiclesByRange(range);
    return series === "all" ? list : list.filter((vehicle) => vehicle.series === series);
  }, [range, series]);

  const pages = chunk(filtered, 2);
  const safePage = Math.min(page, pages.length - 1);

  function changeRange(next: VehicleRange) {
    setRange(next);
    setSeries("all");
    setPage(0);
  }

  return (
    <section className="bg-white">
      <div className="grid grid-cols-3 border-y border-line">
        {rangeTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => changeRange(tab.id)}
            className={`py-5 text-center text-[15px] font-semibold transition-colors duration-300 ease-out md:text-xl ${
              range === tab.id
                ? "bg-accent text-white"
                : "bg-white text-foreground hover:bg-[#f6f8fb]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 border-b border-line px-4 py-4 text-[18px] font-light">
        <button
          type="button"
          onClick={() => {
            setSeries("all");
            setPage(0);
          }}
          className={`border-b-2 pb-1 transition-colors duration-300 ease-out ${
            series === "all" ? "border-accent" : "border-transparent"
          }`}
        >
          All
        </button>
        {seriesFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => {
              setSeries(filter.id);
              setPage(0);
            }}
            className={`border-b-2 pb-1 transition-colors duration-300 ease-out ${
              series === filter.id ? "border-accent" : "border-transparent"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <div>
          <h2 className="text-3xl font-light tracking-wide uppercase md:text-4xl">
            The all new Hyundai models
          </h2>
          <p className="mt-4 max-w-md text-[14px] leading-7 text-muted">
            Choose from our latest range of new Hyundai vehicles currently available at
            Hyundai Islamabad.
          </p>
          <Button href="/stock" variant="outline" className="mt-6">
            View Stock Online
          </Button>
        </div>

        <div>
          {filtered.length === 0 ? (
            <p className="text-[14px] text-muted">No models in this series.</p>
          ) : (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${safePage * 100}%)` }}
              >
                {pages.map((group) => (
                  <div
                    key={group.map((vehicle) => vehicle.slug).join("-") || "empty"}
                    className="grid min-w-full shrink-0 gap-8 sm:grid-cols-2"
                  >
                    {group.map((vehicle) => (
                      <article key={vehicle.slug} className="group text-center">
                        <div className="relative mx-auto h-36 w-full">
                          <Image
                            src={vehicle.cardImage}
                            alt={vehicle.shortName}
                            fill
                            sizes="280px"
                            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </div>
                        <h3 className="mt-4 text-[15px] font-semibold tracking-wide uppercase">
                          {vehicle.name}
                        </h3>
                        <div className="mt-2 flex justify-center">
                          <DiscoverLink href={`/models/${vehicle.slug}`} />
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {pages.map((_, itemIndex) => (
                <button
                  key={itemIndex}
                  type="button"
                  aria-label={`Models page ${itemIndex + 1}`}
                  onClick={() => setPage(itemIndex)}
                  className={`h-[3px] w-8 transition-colors duration-300 ease-out ${
                    safePage === itemIndex ? "bg-accent" : "bg-[#d8d8d8]"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3 text-foreground">
              <button
                type="button"
                aria-label="Previous models"
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                disabled={safePage === 0}
                className="transition-opacity duration-300 disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next models"
                onClick={() =>
                  setPage((current) => Math.min(pages.length - 1, current + 1))
                }
                disabled={safePage >= pages.length - 1}
                className="transition-opacity duration-300 disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pb-12">
        <Button href="/enquiry" variant="outline">
          Make An Enquiry
        </Button>
        <Button href="/testdrive" variant="outline">
          Request A Test Drive
        </Button>
      </div>
    </section>
  );
}
