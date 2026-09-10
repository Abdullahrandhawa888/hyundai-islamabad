"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 8 });
  }

  return (
    <article className="group text-center">
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        className="relative mx-auto h-56 w-full overflow-hidden bg-gradient-to-b from-[#f6f8fb] to-[#e9edf2] [perspective:900px] lg:h-64"
      >
        <motion.div
          animate={{ rotateX: tilt.rx, rotateY: tilt.ry, scale: tilt.rx || tilt.ry ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          <Image
            src={vehicle.cardImage}
            alt={vehicle.shortName}
            fill
            sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 90vw"
            className="object-contain p-6"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </div>
      <h3 className="mt-5 text-[15px] font-semibold tracking-wide uppercase">{vehicle.name}</h3>
      <div className="mt-2 flex justify-center">
        <DiscoverLink href={`/models/${vehicle.slug}`} />
      </div>
    </article>
  );
}

export function ModelRange() {
  const [range, setRange] = useState<VehicleRange>("hyundai");
  const [series, setSeries] = useState<VehicleSeries | "all">("all");
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const itemsPerView = useItemsPerView();

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
  }, [paused, pages.length]);

  function changeRange(next: VehicleRange) {
    setRange(next);
    setSeries("all");
  }

  function goTo(next: number) {
    setPage((next + pages.length) % pages.length);
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
          <div className="relative mt-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${range}-${series}-${safePage}`}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -48 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {pages[safePage].map((vehicle) => (
                  <ModelTile key={vehicle.slug} vehicle={vehicle} />
                ))}
              </motion.div>
            </AnimatePresence>
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
