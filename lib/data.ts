import aboutData from "@/content/about.json";
import emiPlansData from "@/content/emi-plans.json";
import homeData from "@/content/home.json";
import navData from "@/content/nav.json";
import newsData from "@/content/news.json";
import offersData from "@/content/offers.json";
import serviceData from "@/content/service.json";
import siteData from "@/content/site.json";
import teamData from "@/content/team.json";
import vehiclesData from "@/content/vehicles.json";
import type {
  EmiPlan,
  FormOption,
  NavItem,
  NewsArticle,
  Offer,
  TeamMember,
  Vehicle,
  VehicleRange,
  VehicleSeries,
} from "./types";

// All content below is loaded from JSON files in /content, which is what the
// admin dashboard (/admin) reads and writes. Edit content there - either
// through the dashboard, or by hand-editing the JSON files directly - not in
// this file. This file only keeps the typed re-exports and derived helpers
// that the rest of the app imports from "@/lib/data".

export const site = siteData.site;
export const extraPhones = siteData.extraPhones;
export const locations = siteData.locations;

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

export const news = newsData as NewsArticle[];

export const teamRowSizes = [2, 3, 2, 1] as const;

export const team = teamData as TeamMember[];

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

export const serviceModelOptions: FormOption[] = [
  { label: "Elantra", value: "elantra" },
  { label: "Sonata", value: "sonata" },
  { label: "Tucson", value: "tucson" },
  { label: "Porter", value: "porter" },
  { label: "Staria", value: "staria" },
  { label: "Santa Fe Hybrid", value: "santa-fe-hybrid" },
  { label: "Starex", value: "starex" },
  { label: "Ioniq", value: "ioniq" },
  { label: "Other", value: "other" },
];

export const serviceYearOptions: FormOption[] = [
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
];

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
