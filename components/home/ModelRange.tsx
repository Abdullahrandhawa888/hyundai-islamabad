"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { rangeTabs, seriesFilters, vehiclesByRange } from "@/lib/data";
import type { Vehicle, VehicleRange, VehicleSeries } from "@/lib/types";
import { Button, DiscoverLink } from "../shared/Button";

const AUTOPLAY_MS = 5000;

function useItemsPerView() {
  const [items, setItems] = useState(4);

  useEffect(() => {
    const breakpoints: [MediaQueryList, number][] = [
      [window.matchMedia("(min-width: 1280px)"), 4],
      [window.matchMedia("(min-width: 1024px)"), 3],
      [window.matchMedia("(min-width: 640px)"), 2],
    ];

    function update() {
      const match = breakpoints.find(([query]) => query.matches);
      setItems(match ? match[1] : 1);
    }

    update();
    breakpoints.forEach(([query]) => query.addEventListener("change", update));
    return () => breakpoints.forEach(([query]) => query.removeEventListener("change", update));
  }, []);

  return items;
}

function chunk(list: Vehicle[], size: number) {
  const pages: Vehicle[][] = [];
  for (let i = 0; i < list.length; i += size) pages.push(list.slice(i, i + size));
  return pages.length ? pages : [[]];
}

function ModelTile({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="group text-center">
      <div className="relative mx-auto h-52 w-full overflow-hidden lg:h-60">
        <Image
          src={vehicle.cardImage}
          alt={vehicle.shortName}
          fill
          draggable={false}
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 90vw"
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-5 text-[15px] font-semibold tracking-wide uppercase">{vehicle.name}</h3>
      <div className="relative mt-2 inline-flex flex-col items-center">
        <DiscoverLink href={`/models/${vehicle.slug}`} />
        <span className="mt-1 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
      </div>
    </article>
  );
}

export function ModelRange() {
  const [range, setRange] = useState<VehicleRange>("hyundai");
  const [series, setSeries] = useState<VehicleSeries | "all">("all");
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsPerView = useItemsPerView();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setTrackWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => {
    const list = vehiclesByRange(range);
    return series === "all" ? list : list.filter((vehicle) => vehicle.series === series);
  }, [range, series]);

  const pages = useMemo(() => chunk(filtered, itemsPerView), [filtered, itemsPerView]);

  const filterKey = `${range}-${series}-${itemsPerView}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(0);
  }

  const safePage = Math.min(page, pages.length - 1);

  useEffect(() => {
    if (paused || pages.length <= 1) return;
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pages.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, pages.length, safePage]);

  function changeRange(next: VehicleRange) {
    setRange(next);
    setSeries("all");
  }

  function goTo(next: number) {
    setPage((next + pages.length) % pages.length);
  }

  function handleDragEnd(_: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    setPaused(false);
    const threshold = trackWidth * 0.18;
    if (info.offset.x < -threshold || info.velocity.x < -500) {
      goTo(safePage + 1);
    } else if (info.offset.x > threshold || info.velocity.x > 500) {
      goTo(safePage - 1);
    }
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
          onClick={() => setSeries("all")}
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
            onClick={() => setSeries(filter.id)}
            className={`border-b-2 pb-1 transition-colors duration-300 ease-out ${
              series === filter.id ? "border-accent" : "border-transparent"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div
        className="w-full px-4 py-14 sm:px-6 lg:px-10 2xl:px-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-light tracking-wide uppercase md:text-4xl">
              The all new Hyundai models
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-7 text-muted">
              Choose from our latest range of new Hyundai vehicles currently available at
              Hyundai Islamabad.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button href="/stock" variant="outline">
              View Stock Online
            </Button>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous models"
                onClick={() => goTo(safePage - 1)}
                disabled={pages.length <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-all duration-300 ease-out hover:border-accent hover:text-accent disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next models"
                onClick={() => goTo(safePage + 1)}
                disabled={pages.length <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-all duration-300 ease-out hover:border-accent hover:text-accent disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-[14px] text-muted">No models in this series.</p>
        ) : (
          <div className="mt-10 overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex cursor-grab touch-pan-y active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -(pages.length - 1) * trackWidth, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragStart={() => setPaused(true)}
              onDragEnd={handleDragEnd}
              animate={{ x: -safePage * trackWidth }}
              transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
            >
              {pages.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="grid w-full shrink-0 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {group.map((vehicle) => (
                    <ModelTile key={vehicle.slug} vehicle={vehicle} />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {pages.length > 1 ? (
          <div className="mt-12 flex items-center justify-center gap-2">
            {pages.map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                aria-label={`Models page ${pageIndex + 1}`}
                onClick={() => goTo(pageIndex)}
                className="h-[3px] w-10 overflow-hidden bg-[#e2e5ea]"
              >
                <span
                  className={`block h-full bg-accent transition-all ${
                    safePage === pageIndex
                      ? "w-full duration-[5000ms] ease-linear"
                      : "w-0 duration-200 ease-out"
                  }`}
                />
              </button>
            ))}
          </div>
        ) : null}
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
