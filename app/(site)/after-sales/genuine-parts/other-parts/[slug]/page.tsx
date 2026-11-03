import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Plus, UserRound } from "lucide-react";
import { AfterSalesPage } from "@/components/after-sales/AfterSalesPage";
import { PartsNav } from "@/components/after-sales/PartsNav";
import { genuineParts, getOtherPart, serviceLocation } from "@/lib/data";

export function generateStaticParams() {
  return genuineParts.otherParts.map((part) => ({ slug: part.slug }));
}

const fill = (text: string, part: string) => text.replaceAll("{part}", part);

export async function generateMetadata({
  params,
}: PageProps<"/after-sales/genuine-parts/other-parts/[slug]">): Promise<Metadata> {
  const part = getOtherPart((await params).slug);
  return {
    title: part ? part.name : "Other Parts",
    description: part ? fill(genuineParts.otherPartsLead, part.title) : undefined,
  };
}

export default async function OtherPartPage({
  params,
}: PageProps<"/after-sales/genuine-parts/other-parts/[slug]">) {
  const part = getOtherPart((await params).slug);
  if (!part) notFound();

  return (
    <AfterSalesPage slug="genuine-part" title={part.name} crumb={part.name}>
      <PartsNav active="" />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="text-3xl font-semibold md:text-[48px] md:leading-tight">{part.name}</h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-6 font-semibold">{fill(genuineParts.otherPartsLead, part.title)}</p>

        <div className="mt-6 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div>
            <Image src={genuineParts.logo} alt="Hyundai Genuine Parts" width={160} height={42} className="h-auto w-[140px]" />
            <p className="mt-3 text-[14px] leading-6">{fill(genuineParts.otherPartsBody, part.title)}</p>
          </div>
          <div>
            <div className="relative aspect-[910/570]">
              <Image src={part.image} alt={part.title} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-contain" priority />
            </div>
            <p className="mt-2 text-right">
              <a
                href={part.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12px] shadow-sm transition-colors hover:border-accent"
              >
                <Plus size={13} strokeWidth={2.5} aria-hidden />
                Enlarge
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-b-2 border-foreground pb-5">
          <a
            href={serviceLocation.phoneHref}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors hover:text-accent"
          >
            <UserRound size={17} aria-hidden />
            {genuineParts.assistance}: {serviceLocation.phone}
          </a>
        </div>
        <p className="mt-4 text-[14px] leading-6">{genuineParts.disclaimer}</p>
      </section>
    </AfterSalesPage>
  );
}
