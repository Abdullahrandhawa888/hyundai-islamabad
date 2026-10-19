import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, FileDown, MapPin, MessageSquare, ReceiptText, type LucideIcon } from "lucide-react";
import { ModelHighlights } from "@/components/models/ModelHighlights";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { effectivePrice, formatPrice, fromPrice, getVehicle, variantTotal, vehicles } from "@/lib/data";

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: PageProps<"/models/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  return {
    title: vehicle ? `Hyundai ${vehicle.shortName}` : "Model",
    description: vehicle?.description,
  };
}

function Gallery({ title, images, alt }: { title: string; images: string[]; alt: string }) {
  if (images.length === 0) return null;
  return (
    <section className="py-14 md:py-16">
      <h2 className="text-center text-[30px] font-semibold md:text-[38px]">{title}</h2>
      <div className={`mt-10 grid gap-[2px] ${images.length > 1 ? "md:grid-cols-2" : ""}`}>
        {images.map((src, index) => (
          <div
            key={src + index}
            className={`group relative overflow-hidden bg-[#eef0f3] ${images.length > 1 ? "aspect-[16/10]" : "aspect-[21/9]"}`}
          >
            <Image
              src={src}
              alt={`${alt} ${title.toLowerCase()} ${index + 1}`}
              fill
              sizes={images.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ModelDetailPage({ params }: PageProps<"/models/[slug]">) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const title = `Hyundai ${vehicle.shortName}`;
  const from = fromPrice(vehicle);
  const brochureName = `${title} Brochure.pdf`;

  const actions: { label: string; href: string; icon: LucideIcon; download?: string }[] = [
    { label: "Find a Dealer", href: "/contact#map", icon: MapPin },
    { label: "Make an Enquiry", href: "#enquiry", icon: MessageSquare },
    { label: "Price List", href: "/prices", icon: ReceiptText },
  ];
  if (vehicle.brochure) {
    actions.push({ label: "Download e-Brochure", href: vehicle.brochure, icon: FileDown, download: brochureName });
  }

  return (
    <>
      {/* Hero: name on a navy panel, photo beside it. The photo sits in a box
          close to its own shape, so the whole car shows instead of a thin
          slice of a wide banner. */}
      <section className="relative overflow-hidden bg-navy lg:grid lg:min-h-[480px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative aspect-[16/10] overflow-hidden lg:order-2 lg:aspect-auto">
          <Image
            src={vehicle.heroImage}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover transition-transform duration-[8000ms] ease-out hover:scale-105"
          />
          <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-navy to-transparent lg:block" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-5 py-10 md:px-8 lg:order-1 lg:py-16 lg:pr-10 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          <Breadcrumb
            light
            items={[
              { label: "Homepage", href: "/" },
              { label: "Models", href: "/models" },
              { label: vehicle.shortName },
            ]}
          />
          <h1 className="mt-4 text-[34px] leading-[1.1] font-semibold text-white md:text-[46px]">{title}</h1>
          <p className="mt-3 max-w-md text-[17px] text-white/90 md:text-[19px]">{vehicle.tagline}</p>
          {from > 0 ? (
            <p className="mt-6 text-[13px] font-medium tracking-wide text-white/80 uppercase">
              From <span className="text-[18px] font-semibold text-white normal-case">{formatPrice(from)}</span>
            </p>
          ) : null}
        </div>
      </section>

      {/* Action bar */}
      <nav aria-label={`${title} actions`} className="bg-navy text-white">
        <div className={`mx-auto grid max-w-6xl grid-cols-2 ${actions.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {actions.map(({ label, href, icon: Icon, download }) => {
            const className =
              "group flex items-center justify-center gap-2.5 px-3 py-5 text-[13.5px] font-medium transition-colors duration-300 ease-out hover:bg-white/10 md:text-[16px]";
            const inner = (
              <>
                <Icon size={20} strokeWidth={1.7} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
                {label}
              </>
            );
            return download || href.startsWith("#") ? (
              <a key={label} href={href} download={download} className={className}>
                {inner}
              </a>
            ) : (
              <Link key={label} href={href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Overview */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">
            {vehicle.fuel === vehicle.category ? vehicle.fuel : `${vehicle.fuel} · ${vehicle.category}`}
          </p>
          <h2 className="mt-3 text-[28px] leading-tight font-light md:text-[34px]">{vehicle.tagline}</h2>
          <p className="mt-5 text-[15px] leading-8 text-[#444]">{vehicle.description}</p>
          {vehicle.highlights.length > 0 ? (
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {vehicle.highlights.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] leading-6">
                  <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <aside className="self-start border border-line bg-[#f7f9fc] p-7">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-muted uppercase">Starting from</p>
          <p className="mt-2 text-[30px] font-semibold">{from > 0 ? formatPrice(from) : "Contact us"}</p>
          <p className="mt-1 text-[13px] text-muted">
            {vehicle.variants.length} {vehicle.variants.length === 1 ? "variant" : "variants"} · ex-factory price
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            {vehicle.brochure ? (
              <a
                href={vehicle.brochure}
                download={brochureName}
                className="inline-flex items-center justify-center gap-2 bg-accent px-5 py-3 text-[13px] font-semibold tracking-wide text-white transition-colors duration-300 ease-out hover:bg-[#1557b0]"
              >
                <FileDown size={16} aria-hidden /> Download e-Brochure (PDF)
              </a>
            ) : null}
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center border border-foreground px-5 py-3 text-[13px] font-semibold tracking-wide transition-colors duration-300 ease-out hover:bg-foreground hover:text-white"
            >
              Make an Enquiry
            </a>
            <Link href="/prices" className="mt-1 text-center text-[13px] font-medium text-accent hover:text-[#1557b0]">
              See the full price list ›
            </Link>
          </div>
        </aside>
      </section>

      {/* Features & colours */}
      {vehicle.features.length > 0 || vehicle.colors.length > 0 ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
            {vehicle.features.length > 0 ? (
              <>
                <h2 className="text-center text-[30px] font-semibold md:text-[38px]">Features</h2>
                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
                  {vehicle.features.map((feature) => (
                    <figure key={feature.title + feature.image} className="group">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef0f3]">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <figcaption className="mt-2.5 text-[13px] leading-5 font-semibold">{feature.title}</figcaption>
                    </figure>
                  ))}
                </div>
              </>
            ) : null}

            {vehicle.colors.length > 0 ? (
              <div className={vehicle.features.length > 0 ? "mt-14" : ""}>
                <h3 className="text-[20px] font-semibold">Exterior colours</h3>
                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-5">
                  {vehicle.colors.map((color) => (
                    <li key={color.name} className="w-[104px]">
                      <span
                        className="block h-12 w-full border border-black/10 shadow-[inset_0_-10px_18px_-12px_rgba(0,0,0,0.35)]"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="mt-2 block text-[12px] leading-4 font-medium">{color.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Highlights */}
      {vehicle.stories.length > 0 ? (
        <section className="bg-[#e9e4dc] py-14 md:py-16">
          <h2 className="text-center text-[30px] font-semibold md:text-[38px]">Highlights</h2>
          <div className="mx-auto mt-10 max-w-6xl px-0 md:px-8">
            <ModelHighlights stories={vehicle.stories} modelName={title} />
          </div>
        </section>
      ) : null}

      <Gallery title="Interior" images={vehicle.interiorGallery} alt={title} />
      <Gallery title="Exterior" images={vehicle.exteriorGallery} alt={title} />

      {/* Prices & specifications */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-2">
          <div>
            <h2 className="text-[26px] font-light">Variants &amp; prices</h2>
            <p className="mt-2 text-[12.5px] leading-6 text-muted">
              Ex-factory prices. Total charges include transportation and applicable taxes. Prices are provisional; the
              price at the time of delivery applies.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left text-[14px] tabular-nums">
                <thead>
                  <tr className="border-b border-foreground text-[11.5px] tracking-wide uppercase">
                    <th className="py-3 pr-4 font-semibold">Variant</th>
                    <th className="py-3 pr-4 font-semibold">Price</th>
                    <th className="py-3 font-semibold">Total charges</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicle.variants.map((variant) => (
                    <tr key={variant.name} className="border-b border-line">
                      <td className="py-3 pr-4 font-medium">{variant.name}</td>
                      <td className="py-3 pr-4">{formatPrice(effectivePrice(variant))}</td>
                      <td className="py-3">{effectivePrice(variant) > 0 ? formatPrice(variantTotal(variant)) : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-[26px] font-light">Specifications</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {vehicle.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-6 py-3 text-[14px]">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-right font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Brochure band */}
      {vehicle.brochure ? (
        <section className="bg-navy text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="text-[24px] font-light">Everything about the {vehicle.shortName}</h2>
              <p className="mt-1 text-[14px] text-white/75">
                Download the e-brochure for full features, colours and specifications.
              </p>
            </div>
            <a
              href={vehicle.brochure}
              download={brochureName}
              className="inline-flex shrink-0 items-center gap-2 border border-white px-5 py-3 text-[13px] font-semibold tracking-wide transition-colors duration-300 ease-out hover:bg-white hover:text-navy"
            >
              <FileDown size={16} aria-hidden /> Download e-Brochure (PDF)
            </a>
          </div>
        </section>
      ) : null}

      <section id="enquiry" className="scroll-mt-36 border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
          <EnquiryForm intent="enquiry" defaultModel={vehicle.slug} />
        </div>
      </section>
    </>
  );
}
