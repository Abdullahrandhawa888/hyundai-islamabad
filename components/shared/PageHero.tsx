import Image from "next/image";
import { Breadcrumb } from "./Breadcrumb";

type PageHeroProps = {
  title: string;
  crumbs: { label: string; href?: string }[];
  image?: string;
  compact?: boolean;
};

export function PageHero({
  title,
  crumbs,
  image = "/images/vehicles/elantra-hybrid.webp",
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${compact ? "h-[220px]" : "h-[320px] md:h-[380px]"}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-[8000ms] ease-out hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-8 md:px-8">
        <Breadcrumb items={crumbs} light />
        <h1 className="mt-3 text-3xl font-light tracking-wide text-white md:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
