import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AfterSalesPage } from "@/components/after-sales/AfterSalesPage";
import { PartsNav } from "@/components/after-sales/PartsNav";
import { genuineParts, getGenuinePart } from "@/lib/data";

export function generateStaticParams() {
  return genuineParts.parts.map((part) => ({ part: part.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/after-sales/genuine-parts/[part]">): Promise<Metadata> {
  const part = getGenuinePart((await params).part);
  return { title: part ? `Genuine Parts ${part.name}` : "Genuine Parts", description: part?.summary };
}

export default async function GenuinePartPage({ params }: PageProps<"/after-sales/genuine-parts/[part]">) {
  const part = getGenuinePart((await params).part);
  if (!part) notFound();

  return (
    <AfterSalesPage slug="genuine-part" title={part.name} crumb={part.name}>
      <PartsNav active={part.slug} />

      <section className="mx-auto max-w-6xl px-5 pt-12 md:px-8">
        <div className="overflow-hidden rounded-md border border-line">
          <Image
            src={part.diagram}
            alt={`Where the ${part.name.toLowerCase()} sits in a Hyundai`}
            width={873}
            height={450}
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <h2 className="text-[16px] font-semibold">Function and Mechanism</h2>
          <p className="mt-3 text-[14px] leading-6">{part.function}</p>
        </div>
        <Image src={part.detail} alt={`Hyundai Genuine ${part.name}`} width={586} height={150} className="h-auto w-full" />
      </section>

      <section className="bg-[#f6f3f2]">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <video className="aspect-video w-full bg-black" controls preload="metadata" playsInline src={part.video}>
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </AfterSalesPage>
  );
}
