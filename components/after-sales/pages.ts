import {
  BookOpen,
  Building2,
  CalendarCheck,
  Gauge,
  Gift,
  HeartHandshake,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type AfterSalesPageInfo = {
  slug: string;
  href: string;
  /** Short label for the section tabs and breadcrumb. */
  navLabel: string;
  /** Page <h1> and browser-tab title. */
  title: string;
  /** Line under the title in the hero; also the meta description. */
  tagline: string;
  /** One-liner on the After Sales overview cards. */
  summary: string;
  hero: string;
  heroPosition: string;
  icon: LucideIcon;
};

// The pages that make up /after-sales, in tab order. Each route is a real
// folder under app/(site)/after-sales, so adding a page means adding the
// folder and an entry here. The header dropdown is configured separately in
// content/nav.json so staff can edit it from /admin.
export const afterSalesPages = [
  {
    slug: "overview",
    href: "/after-sales",
    navLabel: "Overview",
    title: "After Sales",
    tagline: "Service, warranty and care for your Hyundai at our I-9/3 workshop.",
    summary: "",
    hero: "/images/after-sales/workshop-technician.webp",
    heroPosition: "object-[center_30%]",
    icon: Wrench,
  },
  {
    slug: "warranty",
    href: "/after-sales/warranty",
    navLabel: "Warranty",
    title: "Warranty Terms & Conditions",
    tagline: "What your Hyundai warranty covers, for how long, and how to get warranty service.",
    summary: "New vehicle, paint and OEM warranty cover, and what each one includes.",
    hero: "/images/after-sales/warranty-hero.webp",
    heroPosition: "object-center",
    icon: ShieldCheck,
  },
  {
    slug: "customer-promise",
    href: "/after-sales/customer-promise",
    navLabel: "Customer Promise",
    title: "Customer Promise",
    tagline: "Our commitment to every customer who brings their Hyundai to us.",
    summary: "The commitments we make to you every time you visit our workshop.",
    hero: "/images/team/group-photo-banner.png",
    heroPosition: "object-[center_30%]",
    icon: HeartHandshake,
  },
  {
    slug: "dealership-facility",
    href: "/after-sales/dealership-facility",
    navLabel: "Dealership Facility",
    title: "Dealership Facility",
    tagline: "Sales and service under one roof at I-9/3, Islamabad.",
    summary: "Our I-9/3 showroom and service workshop, and how to find us.",
    hero: "/images/vehicles/dealership-showroom.jpg",
    heroPosition: "object-[center_35%]",
    icon: Building2,
  },
  {
    slug: "free-services",
    href: "/after-sales/free-services",
    navLabel: "Free Services",
    title: "Free Services",
    tagline: "Three complimentary scheduled services with every new Hyundai.",
    summary: "When your three complimentary services are due, and what they include.",
    hero: "/images/after-sales/workshop-lift.jpg",
    heroPosition: "object-[center_20%]",
    icon: Gift,
  },
  {
    slug: "maintenance-charts",
    href: "/after-sales/maintenance-charts",
    navLabel: "Maintenance Charts",
    title: "Periodic Maintenance Charts",
    tagline: "How often each item should be replaced, model by model.",
    summary: "Replacement intervals for oil, filters, spark plugs and fluids by model.",
    hero: "/images/after-sales/workshop-oil-change.jpg",
    heroPosition: "object-[center_55%]",
    icon: Gauge,
  },
  {
    slug: "owners-manual",
    href: "/after-sales/owners-manual",
    navLabel: "Owner’s Manual",
    title: "Owner’s Manual",
    tagline: "Download the official Owner’s Manual for your Hyundai.",
    summary: "Download the official manual for your model as a PDF.",
    hero: "/images/vehicles/lineup-banner-centered.jpg",
    heroPosition: "object-center",
    icon: BookOpen,
  },
  {
    slug: "book-a-service",
    href: "/after-sales/book-a-service",
    navLabel: "Book a Service",
    title: "Book a Service",
    tagline: "Request a workshop appointment at a time that suits you.",
    summary: "Request an appointment at our I-9/3 workshop online.",
    hero: "/images/after-sales/workshop-technician.webp",
    heroPosition: "object-[center_80%]",
    icon: CalendarCheck,
  },
] as const satisfies readonly AfterSalesPageInfo[];

export type AfterSalesSlug = (typeof afterSalesPages)[number]["slug"];

export function getAfterSalesPage(slug: AfterSalesSlug): AfterSalesPageInfo {
  return afterSalesPages.find((page) => page.slug === slug)!;
}
