"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { rangeTabs, seriesFilters, vehiclesByRange } from "@/lib/data";
import type { VehicleRange, VehicleSeries } from "@/lib/types";
import { Button, DiscoverLink } from "../shared/Button";

export function ModelRange() {
  const [range, setRange] = useState<VehicleRange>("hyundai");
  const [series, setSeries] = useState<VehicleSeries | "all">("all");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const list = vehiclesByRange(range);
    return series === "all" ? list : list.filter((vehicle) => vehicle.series === series);
  }, [range, series]);

  function updateScrollState() {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
  }

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    updateScrollState();
  }, [filtered]);

  function changeRange(next: VehicleRange) {
    setRange(next);
    setSeries("all");
  }

  function scrollByCards(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
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

      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
                onClick={() => scrollByCards(-1)}
                disabled={!canPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-all duration-300 ease-out hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-line disabled:hover:text-foreground"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next models"
                onClick={() => scrollByCards(1)}
                disabled={!canNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-all duration-300 ease-out hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-line disabled:hover:text-foreground"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-[14px] text-muted">No models in this series.</p>
        ) : (
          <motion.div
            key={`${range}-${series}`}
            ref={trackRef}
            onScroll={updateScrollState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filtered.map((vehicle, index) => (
              <motion.article
                data-card
                key={vehicle.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                className="group w-[82%] flex-none snap-start text-center sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <div className="relative mx-auto h-48 w-full overflow-hidden lg:h-52">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={vehicle.cardImage}
                      alt={vehicle.shortName}
                      fill
                      sizes="(min-width: 1280px) 320px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
                      className="object-contain"
                    />
                  </motion.div>
                </div>
                <h3 className="mt-5 text-[15px] font-semibold tracking-wide uppercase">
                  {vehicle.name}
                </h3>
                <div className="mt-2 flex justify-center">
                  <DiscoverLink href={`/models/${vehicle.slug}`} />
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
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
