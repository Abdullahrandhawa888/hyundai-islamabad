import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import { offers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Offers",
};

export default function OffersPage() {
  return (
    <>
      <PageHero
        title="Current offers"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Offers" },
        ]}
        image="/images/offers/offers-hero.webp"
        unoptimized
      />
      <section className="mx-auto max-w-6xl space-y-8 px-5 py-14 md:px-8">
        {offers.map((offer) => (
          <article
            key={offer.id}
            className="grid overflow-hidden border border-line md:grid-cols-[1.1fr_1fr] md:items-center"
          >
            {/* Offer pictures carry text: shown whole (3:2) and served as the original
                2400px file (unoptimized), so the text stays sharp on every screen. */}
            <div className="relative aspect-[3/2]">
              <Image
                src={offer.image}
                alt={offer.imageAlt || offer.title}
                unoptimized
                fill
                sizes="(min-width: 1152px) 570px, (min-width: 768px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <p className="text-[12px] tracking-wide text-muted uppercase">
                Valid: {offer.validity}
              </p>
              <h2 className="mt-2 text-2xl font-light">{offer.title}</h2>
              <p className="mt-4 text-[14px] leading-7 text-[#444]">{offer.summary}</p>
              {offer.savings ? (
                <p className="mt-3 text-[14px] font-semibold text-accent">{offer.savings}</p>
              ) : null}
              <Button href={offer.href} variant="primary" className="mt-6">
                Find Out More
              </Button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
