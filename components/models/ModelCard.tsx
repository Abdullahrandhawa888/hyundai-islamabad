import Image from "next/image";
import Link from "next/link";
import { formatPrice, fromPrice } from "@/lib/data";
import type { Vehicle } from "@/lib/types";

/** A model on the Models page. The whole card is one link to the model's page. */
export function ModelCard({ vehicle }: { vehicle: Vehicle }) {
  const from = fromPrice(vehicle);

  return (
    <Link
      href={`/models/${vehicle.slug}`}
      className="group block border border-line bg-white p-6 text-center transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_36px_-20px_rgba(0,44,95,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative mx-auto h-40 w-full">
        <Image
          src={vehicle.cardImage}
          alt={vehicle.shortName}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <p className="mt-4 text-[11px] tracking-[0.16em] text-muted uppercase">{vehicle.fuel}</p>
      <h3 className="mt-1 text-[16px] font-semibold tracking-wide uppercase">{vehicle.name}</h3>
      <p className="mt-2 text-[13px] text-muted">{vehicle.tagline}</p>
      {vehicle.variants.length > 0 ? (
        <p className="mt-3 text-[14px]">{from > 0 ? `From ${formatPrice(from)}` : formatPrice(0)}</p>
      ) : null}
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-300 ease-out group-hover:text-accent">
        <span aria-hidden>›</span>
        Discover Now
      </span>
    </Link>
  );
}
