"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "../shared/Breadcrumb";

export function TeamHeroBanner() {
  return (
    <section>
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 pt-8 pb-6 md:px-8">
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
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-5 text-[12px] font-semibold tracking-[0.2em] text-accent uppercase"
          >
            Our People
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-2 text-3xl font-light tracking-wide text-foreground md:text-5xl"
          >
            Meet Our Team
          </motion.h1>
        </div>
      </div>

      <div className="relative aspect-[1536/520] w-full overflow-hidden">
        <Image
          src="/images/team/group-photo-banner.png"
          alt="The Hyundai Islamabad sales and service team"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
