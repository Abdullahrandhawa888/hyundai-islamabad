"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { VehicleStory } from "@/lib/types";

/** The model page's "Highlights" block: navy tabs, a large photo and a
 * short text for whichever tab is selected. */
export function ModelHighlights({ stories, modelName }: { stories: VehicleStory[]; modelName: string }) {
  const [active, setActive] = useState(0);
  const story = stories[Math.min(active, stories.length - 1)];
  if (!story) return null;

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <div role="tablist" aria-label={`${modelName} highlights`} className="grid grid-cols-2 bg-navy md:grid-cols-4">
          {stories.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.title + index}
                type="button"
                role="tab"
                id={`highlight-tab-${index}`}
                aria-selected={selected}
                aria-controls="highlight-panel"
                onClick={() => setActive(index)}
                className={`relative px-4 py-4 text-[13px] font-medium transition-colors duration-300 ease-out md:py-5 md:text-[14.5px] ${
                  selected ? "text-navy" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId="model-highlight-tab"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div id="highlight-panel" role="tabpanel" aria-labelledby={`highlight-tab-${active}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e7e1d9]">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mx-auto max-w-3xl px-5 py-10 text-center md:py-12">
                <h3 className="text-[24px] font-semibold md:text-[28px]">{story.title}</h3>
                <p className="mt-4 text-[15px] leading-8 text-[#444]">{story.text}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
