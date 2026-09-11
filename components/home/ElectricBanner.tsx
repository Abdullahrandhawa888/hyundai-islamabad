import Image from "next/image";
import Link from "next/link";
import { electricCopy, electricModels } from "@/lib/data";
import { Button } from "../shared/Button";

export function ElectricBanner() {
  return (
    <section className="bg-white">
      <div className="relative h-[280px] bg-[#0d0c12] md:h-[360px]">
        <Image
          src="/images/vehicles/lineup-banner.jpg"
          alt="Hyundai vehicle lineup"
          fill
          sizes="100vw"
          className="object-contain"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5 text-white md:px-8">
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase">
            {electricCopy.heading}
          </p>
          <h2 className="mt-2 max-w-3xl text-2xl font-light md:text-4xl">
            {electricCopy.title}
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <p className="max-w-4xl text-[14px] leading-7 text-muted">{electricCopy.body}</p>
        <p className="mt-8 text-[13px] font-semibold tracking-[0.16em] uppercase">
          Electric models:
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px]">
          {electricModels.map((vehicle, index) => (
            <span key={vehicle.slug} className="flex items-center gap-3">
              <Link href={`/models/${vehicle.slug}`} className="hover:text-accent">
                {vehicle.shortName.startsWith("IONIQ") || vehicle.shortName.includes("Hybrid")
                  ? `Hyundai ${vehicle.shortName}`
                  : vehicle.shortName}
              </Link>
              {index < electricModels.length - 1 ? (
                <span className="text-muted">|</span>
              ) : null}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/enquiry" variant="outline">
            Make an Inquiry
          </Button>
          <Button href="/stock" variant="outline">
            View Stock
          </Button>
        </div>
      </div>
    </section>
  );
}
