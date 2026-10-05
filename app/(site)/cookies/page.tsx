import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <>
      <PageHero
        title="Cookie Policy"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "Cookie Policy" },
        ]}
        compact
      />
      <section className="mx-auto max-w-3xl px-5 py-14 text-[14px] leading-7 text-[#333] md:px-8">
        <p>
          This site may use essential cookies to remember enquiry preferences and measure basic
          traffic. You can disable non-essential cookies in your browser settings.
        </p>
      </section>
    </>
  );
}
