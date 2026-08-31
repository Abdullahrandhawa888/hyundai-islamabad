import Link from "next/link";

const actions = [
  { label: "View Stock", href: "/stock" },
  { label: "Book A Service", href: "/services/book" },
  { label: "Make an Enquiry", href: "/enquiry" },
  { label: "View Our Offers", href: "/offers" },
];

export function QuickActions() {
  return (
    <section className="grid border-y border-line md:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="border-b border-line px-6 py-8 text-center text-[14px] font-semibold transition-colors duration-300 ease-out hover:bg-[#f7f9fc] md:border-r md:border-b-0 last:md:border-r-0"
        >
          {action.label}
        </Link>
      ))}
    </section>
  );
}
