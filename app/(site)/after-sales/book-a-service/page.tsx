import type { Metadata } from "next";
import Link from "next/link";
import { AfterSalesPage, afterSalesMetadata } from "@/components/after-sales/AfterSalesPage";
import { WorkshopCard } from "@/components/after-sales/WorkshopCard";
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
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          <h2 className="text-2xl font-light">Your appointment</h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-7 text-muted">
            Hyundai Islamabad offers online booking to save you time. Tell us about your car and
            when you&rsquo;d like to bring it in.
          </p>
          <BookServiceForm yearOptions={getServiceYearOptions()} defaultType={defaultType} />
        </div>
        <div className="space-y-6">
          <WorkshopCard />
          <div className="border border-line p-6">
            <h3 className="text-[12px] font-semibold tracking-[0.16em] uppercase">Before you book</h3>
            <ul className="mt-4 space-y-3 text-[14px] leading-6">
              <li>
                <Link
                  href="/after-sales/free-services"
                  className="transition-colors duration-300 ease-out hover:text-accent"
                >
                  › Is a free service due?
                </Link>
              </li>
              <li>
                <Link
                  href="/after-sales/maintenance-charts"
                  className="transition-colors duration-300 ease-out hover:text-accent"
                >
                  › Check the maintenance chart
                </Link>
              </li>
              <li>
                <Link
                  href="/after-sales/warranty"
                  className="transition-colors duration-300 ease-out hover:text-accent"
                >
                  › Warranty terms &amp; conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </AfterSalesPage>
  );
}
