import Image from "next/image";
import Link from "next/link";
import { featureTiles } from "@/lib/data";

export function FeatureTiles() {
  return (
    <section className="grid gap-[10px] bg-white p-[10px] md:grid-cols-2">
      {featureTiles.map((tile) => (
        <Link
          key={tile.id}
          href={tile.href}
          className="group relative block h-[280px] overflow-hidden md:h-[360px]"
        >
          <Image
            src={tile.image}
            alt={tile.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-500 ease-out group-hover:bg-black/30" />
          <div className="absolute top-8 left-8 text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
            <h2 className="text-3xl font-light md:text-4xl">{tile.title}</h2>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium">
              <span aria-hidden>›</span>
              Discover Now
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
