import Image from "next/image";
import { Breadcrumb } from "./Breadcrumb";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  crumbs: { label: string; href?: string }[];
  image?: string;
  compact?: boolean;
  imagePosition?: string;
  /** On wide screens, show the photo on the right with the title on navy.
   * For photos whose subject would be cut off by a full-width crop. */
  imageRight?: boolean;
};

export function PageHero({
  title,
  subtitle,
  crumbs,
  image = "/images/vehicles/elantra-hybrid.webp",
  compact = false,
  imagePosition = "object-center",
  imageRight = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${compact ? "h-[220px]" : "h-[320px] md:h-[380px]"} ${
        imageRight ? "lg:bg-navy" : ""
      }`}
    >
      <div className={`absolute inset-0 overflow-hidden ${imageRight ? "lg:left-auto lg:w-[52%]" : ""}`}>
        <Image
          src={image}
          alt=""
          fill
          sizes={imageRight ? "(min-width: 1024px) 52vw, 100vw" : "100vw"}
          className={`object-cover ${imagePosition} transition-transform duration-[8000ms] ease-out hover:scale-105`}
          priority
        />
        {imageRight ? (
          // Blends the photo's left edge into the navy panel behind the title.
          <div className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-navy to-transparent lg:block" />
        ) : null}
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45 ${
          imageRight ? "lg:hidden" : ""
        }`}
      />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-8 md:px-8">
        <Breadcrumb items={crumbs} light />
        <h1 className="mt-3 text-3xl font-light tracking-wide text-white md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-white/85 md:text-[15px]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
