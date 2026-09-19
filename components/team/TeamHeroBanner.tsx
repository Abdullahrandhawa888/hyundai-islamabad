"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "../shared/Breadcrumb";

export function TeamHeroBanner() {
  return (
    <section className="relative h-[380px] overflow-hidden md:h-[480px]">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/images/team/group-photo-banner.png"
          alt="The Hyundai Islamabad sales and service team"
          fill
          sizes="100vw"
          priority
          className="object-cover object-top"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-10 md:px-8 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-5 text-[12px] font-semibold tracking-[0.2em] text-white/80 uppercase"
        >
          Our People
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-2 text-3xl font-light tracking-wide text-white md:text-5xl"
        >
          Meet Our Team
        </motion.h1>
      </div>
    </section>
  );
}
