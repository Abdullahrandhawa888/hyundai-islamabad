export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Location = {
  id: string;
  name: string;
  type: "Sales" | "Service";
  phone: string;
  phoneHref: string;
  address: string;
};

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  image: string;
};

export type FeatureTile = {
  id: string;
  title: string;
  href: string;
  image: string;
};

export type VehicleRange = "hyundai" | "n" | "ioniq";
export type VehicleSeries = "E" | "S" | "T" | "I" | "C" | "P";

export type VehicleColor = {
  name: string;
  hex: string;
};

export type VehicleSpec = {
  label: string;
  value: string;
};

export type VehicleVariant = {
  name: string;
  price: number;
  discountedPrice?: number;
  note?: string;
};

export type Vehicle = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  highlights: string[];
  ranges: VehicleRange[];
  series: VehicleSeries;
  category: "Sedan" | "SUV" | "Electric" | "Commercial";
  fuel: "Petrol" | "Hybrid" | "Electric" | "Diesel";
  cardImage: string;
  heroImage: string;
  gallery: string[];
  colors: VehicleColor[];
  specs: VehicleSpec[];
  variants: VehicleVariant[];
  brochure: string;
};

export type Offer = {
  id: string;
  title: string;
  summary: string;
  validUntil: string;
  image: string;
  href: string;
  savings?: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
  image: string;
  author: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  whatsappHref: string;
  phoneDisplay: string;
  bio: string;
};

export type FormOption = {
  label: string;
  value: string;
};
