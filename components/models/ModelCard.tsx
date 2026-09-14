import Image from "next/image";
import { formatPrice } from "@/lib/data";
import type { Vehicle } from "@/lib/types";
import { DiscoverLink } from "../shared/Button";

export function ModelCard({ vehicle }: { vehicle: Vehicle }) {
  const from = vehicle.variants[0];

  return (
    <article className="group border border-line bg-white p-6 text-center transition-shadow duration-500 ease-out hover:shadow-md">
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
      {from ? (
        <p className="mt-3 text-[14px]">
          {(from.discountedPrice ?? from.price) > 0
            ? `From ${formatPrice(from.discountedPrice ?? from.price)}`
            : formatPrice(from.price)}
        </p>
      ) : null}
      <div className="mt-4 flex justify-center">
        <DiscoverLink href={`/models/${vehicle.slug}`} />
      </div>
    </article>
  );
}
