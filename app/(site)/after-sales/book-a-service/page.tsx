import type { Metadata } from "next";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { BookServiceForm } from "@/components/shared/BookServiceForm";
import { getServiceYearOptions, serviceTypes } from "@/lib/data";

export const metadata: Metadata = afterSalesMetadata("book-a-service");

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BookAServicePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  // Links like "Book a free service" pass ?type=free to pre-select the service type.
  const requestedType = first(query.type);
  const defaultType = serviceTypes.some((option) => option.value === requestedType)
    ? requestedType
    : undefined;

  return (
    <AfterSalesPage slug="book-a-service">
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <BookServiceForm yearOptions={getServiceYearOptions()} defaultType={defaultType} />
      </section>
    </AfterSalesPage>
  );
}
