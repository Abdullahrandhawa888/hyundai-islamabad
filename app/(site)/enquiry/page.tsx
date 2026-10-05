import type { Metadata } from "next";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Make an Enquiry",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const type = first(query.type);
  const model = first(query.model);
  const stock = first(query.stock);
  const intent =
    type === "brochure" || type === "testdrive" ? type : "enquiry";

  return (
    <>
      <PageHero
        title="Make an Enquiry"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Enquire" },
        ]}
        image="/images/vehicles/santa-fe.png"
        compact
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
        {stock ? (
          <p className="mb-6 text-[13px] text-muted">Stock reference: {stock}</p>
        ) : null}
        <EnquiryForm intent={intent} defaultModel={model} />
      </section>
    </>
  );
}
