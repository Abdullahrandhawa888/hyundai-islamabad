import aboutData from "@/content/about.json";
import emiPageData from "@/content/emi-page.json";
import emiPlansData from "@/content/emi-plans.json";
import homeData from "@/content/home.json";
import navData from "@/content/nav.json";
import newsData from "@/content/news.json";
import offersData from "@/content/offers.json";
import priceListData from "@/content/price-list.json";
import serviceData from "@/content/service.json";
import siteData from "@/content/site.json";
import teamData from "@/content/team.json";
import vehiclesData from "@/content/vehicles.json";
import type {
  EmiPage,
  EmiPlan,
  EmiTenure,
  FormOption,
  Location,
  NavItem,
  NewsArticle,
  Offer,
  PriceList,
  TeamMember,
  Vehicle,
  VehicleRange,
  VehicleSeries,
  VehicleVariant,
} from "./types";

// All content below is loaded from JSON files in /content, which is what the
// admin dashboard (/admin) reads and writes. Edit content there - either
// through the dashboard, or by hand-editing the JSON files directly - not in
// this file. This file only keeps the typed re-exports and derived helpers
// that the rest of the app imports from "@/lib/data".

export const site = siteData.site;
export const extraPhones = siteData.extraPhones;
export const locations = siteData.locations;

/** The workshop's own contact entry (the "Service" location in site.json),
 * shown across the After Sales pages. Falls back to the first location so
 * the pages still render if that entry is ever removed. */
export const serviceLocation =
  (locations as Location[]).find((location) => location.type === "Service") ??
  (locations as Location[])[0];

export const navItems = navData as NavItem[];

export const vehicles = vehiclesData as Vehicle[];

export const rangeTabs: { id: VehicleRange; label: string }[] = [
  { id: "hyundai", label: "Hyundai" },
  { id: "n", label: "Hyundai N" },
  { id: "ioniq", label: "Hyundai IONIQ" },
];

export const seriesFilters: { id: VehicleSeries; label: string }[] = [
  { id: "E", label: "E" },
  { id: "S", label: "S" },
  { id: "T", label: "T" },
  { id: "I", label: "I" },
  { id: "C", label: "C" },
  { id: "P", label: "P" },
];

export const heroSlides = homeData.heroSlides;
export const featureTiles = homeData.featureTiles;
export const electricCopy = homeData.electricCopy;

export const electricModels = vehicles.filter((vehicle) =>
  vehicle.ranges.includes("ioniq"),
);

export const offers = offersData as Offer[];

// Interest-free installment plans. Figures (advance amount, freight,
// insurance, tax, admin charges, monthly cheque) come from bank/leasing
// partner flyers supplied by the dealership and are set by them, not
// computed here - update a plan's tenures in content/emi-plans.json when a
// new flyer is issued.
// The ex-factory price shown is NOT stored here: it's read live from the
// matching vehicle/variant in `vehicles` via getEmiExFactoryPrice, so it
// always matches the Price List page and stays correct if that price
// changes.
export const emiPlans = emiPlansData as EmiPlan[];

// Wording and PDF settings for the EMI Plans page (/emi-plans).
export const emiPage = emiPageData as EmiPage;

/** Picture for a vehicle on the price list and EMI pages (and their PDFs):
 * the price list's cut-out for that model, else its regular card image. */
export function getPricingImage(vehicleSlug: string) {
  const fromPriceList = priceList.models.find((model) => model.vehicleSlug === vehicleSlug)?.image;
  return fromPriceList || getVehicle(vehicleSlug)?.cardImage || "";
}

export const news = newsData as NewsArticle[];

export const teamRowSizes = [2, 3, 2, 1] as const;

export const team = teamData as TeamMember[];

// After Sales section (/after-sales/*).
export const afterSalesOverview = serviceData.overview;
export const dealershipFacility = serviceData.facility;
export const ownerManuals = serviceData.ownerManuals;
export const customerPromise = serviceData.customerPromise;
export const maintenanceCharts = serviceData.maintenanceCharts;
export const freeServices = serviceData.freeServices;
export const warranty = serviceData.warranty;

export const aboutParagraphs = aboutData;

export const modelOptions: FormOption[] = vehicles.map((vehicle) => ({
  label: vehicle.shortName,
  value: vehicle.slug,
}));

// Every model the workshop services, including ones no longer on sale, so
// this is deliberately not derived from `vehicles` (the current price list).
export const serviceModelOptions: FormOption[] = [
  { label: "Elantra", value: "elantra" },
  { label: "Elantra Hybrid", value: "elantra-hybrid" },
  { label: "Sonata", value: "sonata" },
  { label: "Sonata N Line", value: "sonata-n-line" },
  { label: "Tucson", value: "tucson" },
  { label: "Tucson Hybrid", value: "tucson-hybrid" },
  { label: "Santa Fe Hybrid", value: "santa-fe-hybrid" },
  { label: "Palisade", value: "palisade" },
  { label: "IONIQ Hybrid", value: "ioniq" },
  { label: "IONIQ 5", value: "ioniq-5" },
  { label: "IONIQ 6", value: "ioniq-6" },
  { label: "Staria", value: "staria" },
  { label: "Grand Starex", value: "starex" },
  { label: "Porter", value: "porter" },
  { label: "Other", value: "other" },
];

const OLDEST_SERVICE_MODEL_YEAR = 2015;

/** Model years for the service booking form, newest first, ending in "Older".
 * Built from the current date at render time - a hard-coded list stopped at
 * 2023, leaving owners of newer cars no year to pick. */
export function getServiceYearOptions(now = new Date()): FormOption[] {
  const options: FormOption[] = [];
  for (let year = now.getFullYear(); year >= OLDEST_SERVICE_MODEL_YEAR; year--) {
    options.push({ label: String(year), value: String(year) });
  }
  options.push({ label: "Older", value: "older" });
  return options;
}

export const serviceTypes: FormOption[] = [
  { label: "General", value: "general" },
  { label: "Periodic Maintenance", value: "periodic" },
  { label: "Body Paint", value: "body" },
  { label: "Mechanical", value: "mechanical" },
  { label: "Free Service", value: "free" },
];

export const feedbackTypes: FormOption[] = [
  { label: "Query", value: "query" },
  { label: "Complaint", value: "complaint" },
  { label: "Suggestion", value: "suggestion" },
];

export function getVehicle(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

/** What the customer pays for the vehicle itself: the promotional price if
 * one is set, otherwise the list price. */
export function effectivePrice(variant: VehicleVariant) {
  return variant.discountedPrice ?? variant.price;
}

/** "Total Charges" on the price list: price plus transportation and every
 * tax or levy. Computed, never stored, so it can't disagree with its parts. */
export function variantTotal(variant: VehicleVariant) {
  return (
    effectivePrice(variant) +
    variant.transportation +
    variant.nevLevy +
    variant.whtTax +
    variant.cvt
  );
}

/** Lowest priced variant ("From Rs ..."), whatever order variants are in.
 * 0 when no variant has a price yet ("Contact for Pricing"). */
export function fromPrice(vehicle: Vehicle) {
  const prices = vehicle.variants.map(effectivePrice).filter((price) => price > 0);
  return prices.length ? Math.min(...prices) : 0;
}

// The Price List page (/prices). Prices, charges and taxes live on each
// vehicle's variants in content/vehicles.json; content/price-list.json only
// says which vehicles appear, in what order, and how the page is labelled.
export const priceList = priceListData as PriceList;

export type PriceListRow = {
  grade: string;
  variantLabel: string;
  /** Usually one variant; several for "With AC" / "Without AC" style options. */
  options: VehicleVariant[];
};

/** Rows as printed on the price list: consecutive variants with the same grade
 * and variant label but different options (e.g. Porter With AC / Without AC)
 * share one row. */
export function priceListRows(vehicle: Vehicle): PriceListRow[] {
  const rows: PriceListRow[] = [];
  for (const variant of vehicle.variants) {
    const last = rows[rows.length - 1];
    if (
      last &&
      variant.option &&
      last.options[0].option &&
      last.grade === variant.grade &&
      last.variantLabel === variant.variantLabel
    ) {
      last.options.push(variant);
    } else {
      rows.push({ grade: variant.grade, variantLabel: variant.variantLabel, options: [variant] });
    }
  }
  return rows;
}

export function getPriceListSections() {
  return priceList.models
    .filter((model) => model.vehicleSlug.trim())
    .map((model) => {
      const vehicle = getVehicle(model.vehicleSlug);
      if (!vehicle) {
        throw new Error(
          `Price list model "${model.label}" references vehicle "${model.vehicleSlug}", which no longer exists in \`vehicles\`. Update its vehicleSlug in content/price-list.json.`,
        );
      }
      return { model, vehicle, rows: priceListRows(vehicle) };
    });
}

/** The live price for an EMI plan's vehicle/variant - whatever the Price
 * List page shows for it right now (promotional price if one is set). */
export function getEmiExFactoryPrice(plan: EmiPlan) {
  const vehicle = getVehicle(plan.vehicleSlug);
  const variant = vehicle?.variants.find((item) => item.name === plan.variantName);
  if (!variant) {
    throw new Error(
      `EMI plan "${plan.id}" references vehicle "${plan.vehicleSlug}" variant "${plan.variantName}", which no longer exists in \`vehicles\`. Update the plan's vehicleSlug/variantName.`,
    );
  }
  return variant.discountedPrice ?? variant.price;
}

/** "Total advance payment (filer)": everything due before delivery. */
export function emiTotalAdvance(tenure: EmiTenure) {
  return (
    tenure.advanceAmount +
    tenure.transitFreightInsurance +
    tenure.advanceIncomeTaxFiler +
    tenure.insuranceAmountSGI +
    tenure.trackerChargesSGI +
    tenure.processingChargesSGI
  );
}

/** The advance as a share of the live ex-factory price, e.g. 45 or 59.9. */
export function emiAdvancePercent(tenure: EmiTenure, exFactoryPrice: number) {
  if (exFactoryPrice <= 0) return 0;
  return Math.round((tenure.advanceAmount / exFactoryPrice) * 1000) / 10;
}

/** Rows of an EMI plan table, in flyer order. Shared by the EMI page and its PDF. */
export const emiRows: { key: keyof EmiTenure; label: string }[] = [
  { key: "advanceAmount", label: "Advance" },
  { key: "transitFreightInsurance", label: "Transit Freight & Insurance (HNMPL)" },
  { key: "advanceIncomeTaxFiler", label: "Advance Income Tax (Filer)" },
  { key: "insuranceAmountSGI", label: "Insurance Amount (SGI)" },
  { key: "trackerChargesSGI", label: "Tracker Charges (SGI)" },
  { key: "processingChargesSGI", label: "Processing Charges (SGI)" },
];

export function getNews(slug: string) {
  return news.find((article) => article.slug === slug);
}

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}

export function vehiclesByRange(range: VehicleRange) {
  return vehicles.filter((vehicle) => vehicle.ranges.includes(range));
}

export function formatPrice(value: number) {
  if (value <= 0) return "Contact for Pricing";
  return `Rs ${value.toLocaleString("en-PK")}`;
}

/** A plain PKR figure as printed on the price list, e.g. "14,720,000". */
export function formatAmount(value: number) {
  return value.toLocaleString("en-PK");
}
