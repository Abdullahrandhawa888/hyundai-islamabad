import Link from "next/link";
import { CONTENT_REGISTRY } from "@/lib/admin/content-registry";

const sections: { key: keyof typeof CONTENT_REGISTRY; description: string }[] = [
  { key: "vehicles", description: "Models, variants, specs, colors, images and ex-factory prices." },
  { key: "emi-plans", description: "Interest-free installment plan figures per model and tenure." },
  { key: "offers", description: "Promotional cards shown on the Offers page." },
  { key: "news", description: "News articles and press releases." },
  { key: "team", description: "Staff photos, roles, bios, WhatsApp and phone numbers." },
  { key: "site", description: "Phone, email, address, hours, social links, logo." },
  { key: "nav", description: "Header navigation menu structure." },
  { key: "home", description: "Homepage hero slides and feature tiles." },
  { key: "about", description: "About Us page intro paragraphs." },
  { key: "service", description: "Warranty terms, maintenance chart, free service schedule." },
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
