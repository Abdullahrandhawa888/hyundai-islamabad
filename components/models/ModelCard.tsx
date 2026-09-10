import Image from "next/image";
import { formatPrice, getVehicle } from "@/lib/data";
import type { StockItem, Vehicle } from "@/lib/types";
import { Button, DiscoverLink } from "../shared/Button";

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

export function StockCard({ item }: { item: StockItem }) {
  const vehicle = getVehicle(item.vehicleSlug);

  return (
    <article className="group border border-line bg-white transition-shadow duration-500 ease-out hover:shadow-md">
      <div className="relative h-44 bg-[#f5f5f5]">
        <Image
          src={item.image}
          alt={vehicle?.shortName ?? item.id}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-white px-2 py-1 text-[11px] font-semibold tracking-wide uppercase">
          {item.status}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[12px] text-muted">{item.id}</p>
        <h3 className="mt-1 text-[16px] font-semibold">
          {item.year} {vehicle?.shortName}
        </h3>
        <p className="mt-1 text-[13px] text-muted">
          {item.color} · {item.transmission} · {item.mileage}
        </p>
        <p className="mt-3 text-[15px] font-medium">{formatPrice(item.price)}</p>
        <div className="mt-4 flex gap-2">
          <Button href={`/enquiry?stock=${item.id}`} variant="primary" className="flex-1">
            Enquire
          </Button>
          <Button href={`/models/${item.vehicleSlug}`} variant="outline" className="flex-1">
            Details
          </Button>
        </div>
      </div>
    </article>
  );
}
