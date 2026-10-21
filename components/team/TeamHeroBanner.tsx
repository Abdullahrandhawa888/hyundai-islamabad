"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "../shared/Breadcrumb";

type TeamHeroBannerProps = {
  /** Last item of the breadcrumb, e.g. "Sales Team". */
  crumb?: string;
  title?: string;
  /** Show the Hyundai logo instead of the sales team photo (for pages without a team photo yet). */
  logoBanner?: boolean;
};

export function TeamHeroBanner({
  crumb = "Sales Team",
  title = "Meet Our Sales Team",
  logoBanner = false,
}: TeamHeroBannerProps) {
  return (
    <section className="relative aspect-[1536/520] w-full overflow-hidden">
      {logoBanner ? (
        <div className="absolute inset-0 flex items-start justify-center bg-gradient-to-b from-white to-[#e4ebf5] pt-[7%]">
          <Image
            src="/images/logo.png"
            alt="Hyundai Islamabad"
            width={523}
            height={147}
            priority
            className="h-auto w-[44%] max-w-[560px] object-contain"
          />
        </div>
      ) : (
        <Image
          src="/images/team/group-photo-banner.png"
          alt="The Hyundai Islamabad sales and service team"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      )}

      <div
        className={`absolute inset-x-0 bottom-0 ${logoBanner ? "bg-navy" : "bg-black/35 backdrop-blur-[2px]"}`}
      >
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
                { label: "Our Team", href: "/team" },
                { label: crumb },
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
            {title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
