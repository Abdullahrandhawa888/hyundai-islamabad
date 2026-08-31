import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button, DiscoverLink } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { formatPrice, getVehicle, vehicles } from "@/lib/data";

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/models/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  return {
    title: vehicle?.shortName ?? "Model",
    description: vehicle?.description,
  };
}

export default async function ModelDetailPage({
  params,
}: PageProps<"/models/[slug]">) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  return (
    <>
      <PageHero
        title={vehicle.name}
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Models", href: "/models" },
          { label: vehicle.shortName },
        ]}
        image={vehicle.heroImage}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">
            {vehicle.fuel} · {vehicle.category}
          </p>
          <h2 className="mt-3 text-3xl font-light">{vehicle.tagline}</h2>
          <p className="mt-5 text-[15px] leading-8 text-[#444]">{vehicle.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/testdrive" variant="primary">
              Request A Test Drive
            </Button>
            <Button href={vehicle.brochure} variant="outline">
              Download Brochure
            </Button>
          </div>
        </div>
        <div className="relative min-h-[240px] bg-[#f5f5f5]">
          <Image
            src={vehicle.cardImage}
            alt={vehicle.shortName}
            fill
            className="object-contain p-6"
          />
        </div>
      </section>

      <section className="bg-[#f7f7f7]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h3 className="text-2xl font-light">Highlights</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {vehicle.highlights.map((item) => (
              <li key={item} className="border-l-2 border-accent bg-white px-4 py-3 text-[14px]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-light">Specifications</h3>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {vehicle.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-3 text-[14px]">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-2xl font-light">Variants & pricing</h3>
            <p className="mt-2 text-[12px] text-muted">
              Ex-factory figures. Freight, insurance and government charges may apply. Prices are
              provisional and subject to change.
            </p>
            <ul className="mt-6 space-y-4">
              {vehicle.variants.map((variant) => (
                <li key={variant.name} className="border border-line p-4">
                  <p className="font-medium">{variant.name}</p>
                  <p className="mt-1 text-[15px]">
                    {variant.discountedPrice ? (
                      <>
                        <span className="mr-2 text-muted line-through">
                          {formatPrice(variant.price)}
                        </span>
                        {formatPrice(variant.discountedPrice)}
                      </>
                    ) : (
                      formatPrice(variant.price)
                    )}
                  </p>
                  {variant.note ? (
                    <p className="mt-1 text-[12px] text-muted">{variant.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-light">Select colours</h3>
          <div className="mt-5 flex flex-wrap gap-4">
            {vehicle.colors.map((color) => (
              <div key={color.name} className="flex items-center gap-2 text-[13px]">
                <span
                  className="h-7 w-7 rounded-full border border-line"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-3 px-5 py-10 md:grid-cols-3 md:px-8">
          {vehicle.gallery.map((src) => (
            <div key={src} className="relative h-52 overflow-hidden bg-[#f5f5f5]">
              <Image src={src} alt={vehicle.shortName} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
          <EnquiryForm intent="enquiry" defaultModel={vehicle.slug} />
          <div className="mt-6">
            <DiscoverLink href="/stock">View Stock Online</DiscoverLink>
          </div>
        </div>
      </section>
    </>
  );
}
