export type NavLink = {
  label: string;
  href: string;
  /** Heading this link is listed under in its dropdown. Links with no group
   * render as a plain list, like the Offers & Plans menu. */
  group?: string;
};

export type NavItem = {
  label: string;
  /** On an item with children, clicking the label opens this page and
   * hovering shows the dropdown. */
  href?: string;
  children?: NavLink[];
  /** Faded picture behind a grouped dropdown's columns. */
  image?: string;
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
  imagePosition?: string;
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
  // Price list columns. A variant's total is never stored: it is always
  // price + transportation + nevLevy + whtTax + cvt (see variantTotal).
  grade: string;
  /** The price list's "Variant" column, e.g. "1.6(T-GDI) HEV" or "Beige". */
  variantLabel: string;
  /** e.g. "With AC". Consecutive variants with the same grade and variant
   * label share one price list row, one line per option. */
  option: string;
  transportation: number;
  nevLevy: number;
  whtTax: number;
  cvt: number;
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

export type PriceListBadge = {
  /** Big number on the badge, e.g. "8" for an 8-year warranty. */
  years: string;
  title: string;
  text: string;
};

export type PriceListModel = {
  /** Must match a Vehicle.slug; the rows and colours come from that vehicle. */
  vehicleSlug: string;
  label: string;
  image: string;
  spec: { title: string; text: string };
  badges: PriceListBadge[];
  showExFactoryPrice: boolean;
};

export type PriceList = {
  edition: string;
  issuer: string;
  issuerTagline: string;
  intro: string;
  /** File name for the generated PDF (/price-list.pdf), which is built from
   * these same prices whenever the site rebuilds. */
  pdfDownloadName: string;
  /** Extra full-page images in the PDF, e.g. the PPF packages page, placed
   * straight after the main price list page... */
  pdfPagesAfterPriceList: string[];
  /** ...and at the very end, e.g. the payment guide. */
  pdfPagesAtEnd: string[];
  columns: {
    price: string;
    transportation: string;
    nevLevy: string;
    whtTax: string;
    cvt: string;
    total: string;
  };
  models: PriceListModel[];
  paymentTerms: { title: string; left: string[]; right: string[] };
};

export type EmiPage = {
  title: string;
  subtitle: string;
  edition: string;
  intro: string;
  /** File name for the generated PDF (/emi-plans.pdf). */
  pdfDownloadName: string;
  notes: string[];
};

export type EmiTenure = {
  months: number;
  advanceAmount: number;
  transitFreightInsurance: number;
  advanceIncomeTaxFiler: number;
  insuranceAmountSGI: number;
  trackerChargesSGI: number;
  processingChargesSGI: number;
  // "Total advance payment" is never stored: it is always the sum of the six
  // amounts above (see emiTotalAdvance), like the price list's Total Charges.
  monthlyInstallment: number;
  adminCharges: number;
};

export type EmiPlan = {
  id: string;
  modelLabel: string;
  /** Must match a Vehicle.slug in `vehicles` - the ex-factory price is read
   * live from that vehicle's variant, never stored here, so it can never
   * drift from the Price List page. */
  vehicleSlug: string;
  /** Must match a VehicleVariant.name on that vehicle. */
  variantName: string;
  tenures: EmiTenure[];
};
