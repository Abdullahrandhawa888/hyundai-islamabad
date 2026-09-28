"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "../shared/Breadcrumb";

export function TeamHeroBanner() {
  return (
    <section className="relative aspect-[1536/520] w-full overflow-hidden">
      <Image
        src="/images/team/group-photo-banner.png"
        alt="The Hyundai Islamabad sales and service team"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 bg-black/35 backdrop-blur-[2px]">
        <div className="mx-auto max-w-6xl px-5 py-2.5 md:px-8 md:py-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden sm:block"
          >
            <Breadcrumb
              items={[
                { label: "Homepage", href: "/" },
                { label: "Our Team" },
              ]}
              light
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="hidden text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase sm:mt-2 sm:block"
          >
            Our People
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg font-light tracking-wide text-white sm:mt-1 sm:text-3xl md:text-5xl"
          >
            Meet Our Team
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
