import Link from "next/link";
import { CONTENT_REGISTRY } from "@/lib/admin/content-registry";

const sections: { key: keyof typeof CONTENT_REGISTRY; description: string }[] = [
  {
    key: "vehicles",
    description:
      "Models, specs, colors and images, plus every price list figure per variant: price, transportation, WHT tax, NEV levy, CVT. Totals add up automatically.",
  },
  {
    key: "price-list",
    description:
      "Price List page: edition, which models appear and in what order, badges, payment terms, and the extra pages in the downloadable PDF.",
  },
  {
    key: "emi-plans",
    description:
      "Interest-free installment figures per model and tenure. The ex-factory price comes from the price list and the total advance adds up automatically.",
  },
  {
    key: "emi-page",
    description: "EMI Plans page wording: title, edition, intro, notes and the PDF file name.",
  },
  { key: "offers", description: "Promotional cards shown on the Offers page." },
  { key: "news", description: "News articles and press releases." },
  { key: "team", description: "Staff photos, roles, bios, WhatsApp and phone numbers." },
  { key: "site", description: "Phone, email, address, hours, social links, logo." },
  {
    key: "nav",
    description:
      "Header navigation menu. A dropdown link's Group puts it under that heading; Feature is the image card in the After Sales menu.",
  },
  { key: "home", description: "Homepage hero slides and feature tiles." },
  { key: "about", description: "About Us page intro paragraphs." },
  {
    key: "service",
    description:
      "After Sales pages: overview intro, warranty terms, customer promise, free service schedule, maintenance chart and owner's manual downloads.",
  },
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-light">What do you want to edit?</h1>
      <p className="mt-2 max-w-2xl text-[14px] text-muted">
        Changes go live on the website in about 1–3 minutes after you publish, while the site
        rebuilds.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map(({ key, description }) => (
          <Link
            key={key}
            href={`/admin/content/${key}`}
            className="block rounded-2xl border border-line bg-white p-5 transition-shadow duration-300 ease-out hover:shadow-md"
          >
            <h2 className="text-[15px] font-semibold">{CONTENT_REGISTRY[key].label}</h2>
            <p className="mt-1.5 text-[13px] leading-6 text-muted">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
