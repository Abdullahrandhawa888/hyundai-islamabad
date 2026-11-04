import {
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarCheck,
  CarFront,
  Droplets,
  Fuel,
  Gauge,
  Gift,
  HeartHandshake,
  Settings,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Crumb = { label: string; href?: string };

export type AfterSalesPageInfo = {
  slug: string;
  href: string;
  /** Breadcrumb label for this page. */
  navLabel: string;
  /** Big heading in the hero. */
  title: string;
  /** Browser-tab title. */
  metaTitle: string;
  /** Line under the heading in the hero; also the meta description. */
  tagline: string;
  /** One-liner on the After Sales overview cards. */
  summary: string;
  /** Hero photo. Empty for the plain beige hero with a centred heading. */
  hero: string;
  /** Text colour over the hero photo: "light" (white) or "dark" (black). */
  heroTone: "light" | "dark";
  /** Put the heading at the top of the photo instead of the middle, for photos
   * whose subject sits in the middle. */
  heroTop?: boolean;
  /** Without a photo: the plain panel is beige, or Hyundai blue with white text. */
  heroBlue?: boolean;
  /** Which part of the photo stays in view when it is cropped, e.g. "object-top". */
  heroPosition?: string;
  /** Show the photo whole on the right, with the heading on navy beside it.
   * For photos with their own text, which a full-width crop would cut off. */
  heroSplit?: boolean;
  /** Crumbs between Home and this page. */
  parents: readonly Crumb[];
  icon: LucideIcon;
};

const AFTER_SALES: Crumb = { label: "After Sales" };
const GENUINE_PARTS: Crumb = { label: "Genuine Parts", href: "/after-sales/genuine-parts" };

// The pages that make up /after-sales, laid out like hyundai-nishat.com.
// Each route is a real folder under app/(site)/after-sales. The header
// dropdown is configured separately in content/nav.json (editable in /admin).
export const afterSalesPages = [
  {
    slug: "overview",
    href: "/after-sales",
    navLabel: "After Sales",
    title: "After Sales",
    metaTitle: "After Sales",
    tagline: "Service, warranty and care for your Hyundai at our I-9/3 workshop.",
    summary: "",
    hero: "/images/after-sales/workshop-technician.webp",
    heroTone: "light",
    parents: [],
    icon: Wrench,
  },
  {
    slug: "services",
    href: "/after-sales/services",
    navLabel: "Our Services",
    title: "Our Services",
    metaTitle: "Our Services",
    tagline: "Maintenance, mechanical repairs, body & paint and paint protection, all at our I-9/3 workshop.",
    summary: "Accident repairs, paint protection, wheel alignment, A/C and more, under one roof.",
    hero: "/images/after-sales/workshop-lift.jpg",
    heroTone: "light",
    parents: [AFTER_SALES],
    icon: CarFront,
  },
  {
    slug: "warranty",
    href: "/after-sales/warranty",
    navLabel: "Conditions",
    title: "Conditions",
    metaTitle: "Warranty Conditions & Coverage",
    tagline:
      "A written promise from Hyundai Nishat Motor Limited to repair or replace a component of vehicle that develops a fault due to material or workmanship within a fixed period of time.",
    summary: "New vehicle, paint, OEM and hybrid system warranty cover.",
    hero: "/images/after-sales/warranty/conditions-banner.webp",
    heroTone: "light",
    parents: [],
    icon: ShieldCheck,
  },
  {
    slug: "extended-warranty",
    href: "/after-sales/extended-warranty",
    navLabel: "Extended Warranty",
    title: "Drive worry-free, mile after mile",
    metaTitle: "Hyundai Extended Warranty",
    tagline: "With Hyundai’s Extended Warranty, you can focus on the road, not the repairs.",
    summary: "Up to 5 years or 125,000 km of cover.",
    hero: "/images/after-sales/warranty/extended-warranty-banner.webp",
    heroTone: "light",
    parents: [],
    icon: BadgeCheck,
  },
  {
    slug: "genuine-parts",
    href: "/after-sales/genuine-parts",
    navLabel: "Genuine Parts",
    title: "Genuine Parts",
    metaTitle: "Hyundai Genuine Parts",
    tagline: "Your Partner in Parts and Service.",
    summary: "Filters, brake pads, timing belts and more, engineered for your Hyundai.",
    hero: "/images/after-sales/parts/genuine-parts-banner.webp",
    heroTone: "dark",
    parents: [],
    icon: Settings,
  },
  {
    slug: "genuine-part",
    href: "/after-sales/genuine-parts",
    navLabel: "Genuine Parts",
    title: "Genuine Parts",
    metaTitle: "Hyundai Genuine Parts",
    tagline: "Your Partner in Parts and Service.",
    summary: "",
    hero: "/images/after-sales/parts/genuine-parts-banner.webp",
    heroTone: "dark",
    parents: [GENUINE_PARTS],
    icon: Settings,
  },
  {
    slug: "lubricants",
    href: "/after-sales/lubricants",
    navLabel: "Lubricants",
    title: "Lubricants",
    metaTitle: "Hyundai Lubricants & Engine Oils",
    tagline: "Keep your engine running smoothly with our high-quality lubricants.",
    summary: "Hyundai-Shell co-branded engine oils, and which one fits your model.",
    hero: "/images/after-sales/lubricants/lubricants-hero.webp",
    heroPosition: "object-[center_20%]",
    heroTone: "light",
    parents: [AFTER_SALES],
    icon: Droplets,
  },
  {
    slug: "n-sprint",
    href: "/after-sales/n-sprint",
    navLabel: "N-Sprint (Nishat Genuine Engine Oil)",
    title: "N-Sprint (Nishat Genuine Engine Oil)",
    metaTitle: "N-Sprint Genuine Engine Oil",
    tagline: "Keep your engine running smoothly with our high-quality lubricants.",
    summary: "Nishat’s own fully synthetic engine oil range.",
    hero: "/images/after-sales/lubricants/lubricants-hero.webp",
    heroPosition: "object-[center_20%]",
    heroTone: "light",
    parents: [AFTER_SALES, { label: "Lubricants", href: "/after-sales/lubricants" }],
    icon: Fuel,
  },
  {
    slug: "customer-promise",
    href: "/after-sales/customer-promise",
    navLabel: "Customer Promise",
    title: "Customer Promise",
    metaTitle: "Customer Promise | Our Commitment to You",
    tagline: "Together, we promise to deliver exceptional service and exceed your expectations.",
    summary: "The commitments we make to you every time you visit our workshop.",
    hero: "/images/after-sales/customer-promise-hero.webp",
    heroTone: "light",
    heroTop: true,
    parents: [AFTER_SALES],
    icon: HeartHandshake,
  },
  {
    slug: "dealership-facility",
    href: "/after-sales/dealership-facility",
    navLabel: "Dealership Facility",
    title: "Dealership Facility",
    metaTitle: "Dealership Facility",
    tagline: "Experience the ultimate in automotive luxury and convenience at our dealership facility.",
    summary: "Diagnostic systems, wheel and chassis aligners, a paint booth and our customer lounge.",
    hero: "/images/after-sales/facility/dealership-banner.webp",
    heroTone: "light",
    parents: [AFTER_SALES],
    icon: Building2,
  },
  {
    slug: "free-services",
    href: "/after-sales/free-services",
    navLabel: "Free Services",
    title: "Free Services",
    metaTitle: "Hyundai Free Services",
    tagline: "At Hyundai, we put all our efforts to provide customers with the best after sales service",
    summary: "When your three complimentary services are due.",
    hero: "/images/after-sales/free-services/free-services-hero.webp",
    heroPosition: "object-right",
    heroTone: "light",
    parents: [AFTER_SALES],
    icon: Gift,
  },
  {
    slug: "maintenance-charts",
    href: "/after-sales/maintenance-charts",
    navLabel: "Periodic Maintenance Charts",
    title: "Periodic Maintenance Charts",
    metaTitle: "Hyundai Periodic Maintenance Charts",
    tagline: "Stay on top of your vehicle's maintenance with our easy-to-follow periodic maintenance chart.",
    summary: "Replacement intervals for petrol, diesel and electric Hyundai models.",
    hero: "/images/after-sales/maintenance-charts-hero.webp",
    heroSplit: true,
    heroTone: "light",
    parents: [AFTER_SALES],
    icon: Gauge,
  },
  {
    slug: "owners-manual",
    href: "/after-sales/owners-manual",
    navLabel: "Owner's Manual",
    title: "Owner's Manual",
    metaTitle: "Hyundai Owner's Manual Download",
    tagline: "Unlock the full potential of your vehicle with our comprehensive owner's manual.",
    summary: "Download the official manual for your model as a PDF.",
    hero: "",
    heroTone: "dark",
    parents: [AFTER_SALES],
    icon: BookOpen,
  },
  {
    slug: "book-a-service",
    href: "/after-sales/book-a-service",
    navLabel: "Service Appointment Request",
    title: "Book a Service",
    metaTitle: "Book a Hyundai Service | Online Booking",
    tagline: "Hyundai provide you with booking service for your valuable time.",
    summary: "Request an appointment at our I-9/3 workshop online.",
    hero: "",
    heroTone: "dark",
    heroBlue: true,
    parents: [AFTER_SALES],
    icon: CalendarCheck,
  },
] as const satisfies readonly AfterSalesPageInfo[];

export type AfterSalesSlug = (typeof afterSalesPages)[number]["slug"];

export function getAfterSalesPage(slug: AfterSalesSlug): AfterSalesPageInfo {
  return afterSalesPages.find((page) => page.slug === slug)!;
}
