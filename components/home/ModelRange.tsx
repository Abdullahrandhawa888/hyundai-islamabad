"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { rangeTabs, seriesFilters, vehiclesByRange } from "@/lib/data";
import type { Vehicle, VehicleRange, VehicleSeries } from "@/lib/types";
import { Button, DiscoverLink } from "../shared/Button";

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

/** How long each set of models stays on screen before sliding to the next. */
const AUTO_ADVANCE_MS = 6000;

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
  // Auto-advance waits while a mouse is over the carousel or a keyboard user
  // is focused inside it, so nobody loses their place mid-read.
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const paused = hoverPaused || focusPaused;
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

  function changeRange(next: VehicleRange) {
    setRange(next);
    setSeries("all");
  }

  function goTo(next: number) {
    setPage((next + pages.length) % pages.length);
  }

  const seriesOptions: { id: VehicleSeries | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...seriesFilters,
  ];

  return (
    // Respect the visitor's "reduce motion" setting for every animation below.
    <MotionConfig reducedMotion="user">
    <section className="bg-white">
      <div className="px-4 pt-10 sm:px-6 lg:px-10 2xl:px-16">
        <div className="grid grid-cols-3 gap-1 border border-line bg-[#f4f6f9] p-1">
          {rangeTabs.map((tab) => {
            const active = range === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => changeRange(tab.id)}
                aria-pressed={active}
                whileTap={{ scale: 0.98 }}
                className={`group relative py-4 text-center text-[14px] font-semibold tracking-wide transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:py-5 md:text-lg ${
                  active ? "text-white" : "text-foreground hover:text-accent"
                }`}
              >
                {active ? (
                  // One shared block that glides to whichever tab is active.
                  <motion.span
                    layoutId="model-range-tab"
                    className="absolute inset-0 bg-accent shadow-[0_10px_24px_-10px_rgba(28,105,212,0.75)]"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : (
                  <span className="absolute inset-0 bg-white opacity-0 shadow-sm transition-all duration-300 ease-out group-hover:opacity-100" />
                )}
                <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:-translate-y-px">
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-1 border-b border-line pt-5 text-[18px] font-light">
          {seriesOptions.map((filter) => {
            const active = series === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSeries(filter.id)}
                aria-pressed={active}
                className={`relative px-3 pt-1 pb-3 transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-accent ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {filter.label}
                {active ? (
                  <motion.span
                    layoutId="model-series-underline"
                    className="absolute inset-x-2 -bottom-px h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 480, damping: 38 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="w-full px-4 py-14 sm:px-6 lg:px-10 2xl:px-16"
        onPointerEnter={(event) => event.pointerType === "mouse" && setHoverPaused(true)}
        onPointerLeave={(event) => event.pointerType === "mouse" && setHoverPaused(false)}
        onFocus={(event) => event.target.matches(":focus-visible") && setFocusPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusPaused(false);
        }}
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

        {/* Models fade up when the range or series changes. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${range}-${series}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length === 0 ? (
              <p className="mt-10 text-[14px] text-muted">No models in this series.</p>
            ) : (
              <div className="mt-10 overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `-${safePage * 100}%` }}
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
          </motion.div>
        </AnimatePresence>

        {pages.length > 1 ? (
          <div className="mt-9 flex items-center justify-center gap-1">
            {pages.map((_, pageIndex) => {
              const active = safePage === pageIndex;
              return (
                <button
                  key={pageIndex}
                  type="button"
                  aria-label={`Models page ${pageIndex + 1}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => goTo(pageIndex)}
                  className="group/dot px-1 py-3"
                >
                  <span
                    className={`relative block h-[3px] overflow-hidden bg-[#e2e5ea] transition-all duration-300 ease-out ${
                      active ? "w-10" : "w-6 group-hover/dot:bg-[#c7ccd3]"
                    }`}
                  >
                    {active ? (
                      // Fills up while this set of models is showing; when it's
                      // full the carousel moves on. Keyed so it restarts on every
                      // page change, and paused (not reset) on hover or focus.
                      <span
                        key={`${filterKey}-${safePage}`}
                        className="animate-carousel-progress absolute inset-0 origin-left bg-accent"
                        style={{
                          animationDuration: `${AUTO_ADVANCE_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        onAnimationEnd={() => goTo(safePage + 1)}
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
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
    </MotionConfig>
  );
}
