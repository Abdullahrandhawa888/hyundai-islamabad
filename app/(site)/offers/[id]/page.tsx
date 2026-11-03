import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import { getOffer, offers } from "@/lib/data";

export function generateStaticParams() {
  return offers.filter((offer) => offer.sections?.length).map((offer) => ({ id: offer.id }));
}

export async function generateMetadata({ params }: PageProps<"/offers/[id]">): Promise<Metadata> {
  const offer = getOffer((await params).id);
  return offer ? { title: offer.title, description: offer.summary } : { title: "Offers" };
}

export default async function OfferPage({ params }: PageProps<"/offers/[id]">) {
  const offer = getOffer((await params).id);
  if (!offer) notFound();

  return (
    <>
      <PageHero
        title={offer.title}
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Offers", href: "/offers" },
          { label: offer.title },
        ]}
        image="/images/vehicles/lineup-banner-centered.jpg"
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <div>
          <p className="text-[12px] tracking-wide text-muted uppercase">Valid: {offer.validity}</p>
          <p className="mt-4 text-[15px] leading-8 text-[#444]">{offer.intro || offer.summary}</p>
          {offer.savings ? (
            <p className="mt-4 text-[15px] font-semibold text-accent">{offer.savings}</p>
          ) : null}
          {offer.links?.length ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {offer.links.map((link, index) => (
                <Button key={link.href} href={link.href} variant={index === 0 ? "primary" : "outline"}>
                  {link.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative aspect-[3/2] overflow-hidden border border-line">
          <Image
            src={offer.image}
            alt={offer.imageAlt || offer.title}
            unoptimized
            fill
            sizes="(min-width: 1152px) 500px, (min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {offer.sections?.map((section, index) => (
        <section key={section.heading} className={index % 2 === 0 ? "bg-[#f6f3f2]" : ""}>
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
            <h2 className="text-2xl font-light md:text-3xl">{section.heading}</h2>
            {section.text ? (
              <p className="mt-3 max-w-3xl text-[14px] leading-7 text-[#444]">{section.text}</p>
            ) : null}
            {section.table ? (
              <div className="mt-7 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse bg-white text-left text-[14px]">
                  <thead>
                    <tr className="bg-navy text-white">
                      {section.table.columns.map((column) => (
                        <th key={column} scope="col" className="px-4 py-3.5 text-[13px] font-semibold">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-line">
                        {row.cells.map((cell, cellIndex) =>
                          cellIndex === 0 ? (
                            <th key={cellIndex} scope="row" className="px-4 py-3 font-medium">
                              {cell}
                            </th>
                          ) : (
                            <td
                              key={cellIndex}
                              className={`px-4 py-3 tabular-nums ${
                                cellIndex === row.cells.length - 1 ? "font-semibold text-accent" : "text-[#444]"
                              }`}
                            >
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {section.note ? <p className="mt-4 text-[13px] leading-6 text-muted">{section.note}</p> : null}
          </div>
        </section>
      ))}

      {offer.terms?.length ? (
        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="text-xl font-light">Terms &amp; Conditions</h2>
          <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 text-[13.5px] leading-6 text-[#444]">
            {offer.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
