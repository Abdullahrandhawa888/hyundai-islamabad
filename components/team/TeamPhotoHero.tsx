"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function TeamPhotoHero() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[1536/1024] w-full overflow-hidden rounded-lg shadow-xl"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.045, 1] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        >
          <Image
            src="/images/team/group-photo-full.png"
            alt="The Hyundai Islamabad sales and service team"
            fill
            sizes="(min-width: 1400px) 1400px, 100vw"
            priority
            className="object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
      </motion.div>
      <p className="mt-4 text-center text-[13px] text-muted">
        The Hyundai Islamabad sales &amp; service team
      </p>
    </div>
  );
}
