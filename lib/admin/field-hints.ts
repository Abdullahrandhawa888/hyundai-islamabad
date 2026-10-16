import { rangeTabs, seriesFilters, vehicles } from "@/lib/data";

// How the admin editor should present each field: friendly labels, help text,
// dropdowns instead of free typing, tabs for long items, and live totals.
// The editor still renders any field it has no hint for, so a new field in a
// content file always shows up - hints only make it nicer.
//
// Keys are field paths with list positions written as "[]": in vehicles.json,
// "[].variants[].price" is the price of any variant of any vehicle.

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type JsonObject = { [key: string]: Json };

export type FieldOption = { label: string; value: string };

export type FieldHint = {
  label?: string;
  help?: string;
  /** How to edit the value. Inferred from the data when not set. */
  control?: "select" | "checkboxes" | "color" | "money" | "locked" | "textarea";
  options?: FieldOption[];
  /** Not shown at all (managed by the site itself). */
  hidden?: boolean;
  /** For lists: text on the add button, e.g. "Add variant". */
  addLabel?: string;
  /** For list items: split the item's fields into tabs. Fields not listed go in a last "More" tab. */
  groups?: { title: string; fields: string[] }[];
  /** For list items: the line shown on the collapsed item. */
  summary?: (item: JsonObject) => { title?: string; detail?: string };
  /** For objects: a read-only line under the fields, e.g. a computed total. */
  footer?: (item: JsonObject) => string | null;
  /** For objects: show these fields first, in this order. */
  order?: string[];
  /** For objects: fields per row on wide screens (default 3). */
  columns?: 3 | 4;
};

export type FieldHints = Record<string, FieldHint>;

const num = (value: Json | undefined) => (typeof value === "number" ? value : Number(value) || 0);
export const rupees = (value: number) => `Rs ${Math.round(value).toLocaleString("en-PK")}`;

const vehicleOptions: FieldOption[] = vehicles.map((vehicle) => ({ label: vehicle.shortName, value: vehicle.slug }));
const variantOptions: FieldOption[] = vehicles.flatMap((vehicle) =>
  vehicle.variants.map((variant) => ({ label: `${vehicle.shortName} - ${variant.name}`, value: variant.name })),
);

const lockedSlug: FieldHint = {
  label: "Web address",
  control: "locked",
  help: "Part of this item's page link. Changing it breaks links people have saved or shared, so only change it if you have to.",
};

const vehicleHints: FieldHints = {
  "": { addLabel: "Add vehicle" },
  "[]": {
    groups: [
      { title: "Prices", fields: ["variants"] },
      { title: "Details", fields: ["name", "shortName", "tagline", "description", "highlights"] },
      { title: "Pictures", fields: ["cardImage", "heroImage", "gallery"] },
      { title: "Colours", fields: ["colors"] },
      { title: "Specifications", fields: ["specs"] },
      { title: "Settings", fields: ["category", "fuel", "ranges", "series", "brochure", "slug"] },
    ],
    summary: (item) => {
      const variants = Array.isArray(item.variants) ? (item.variants as JsonObject[]) : [];
      const prices = variants.map((v) => num(v.discountedPrice ?? v.price)).filter((p) => p > 0);
      const from = prices.length ? ` · from ${rupees(Math.min(...prices))}` : "";
      return { detail: `${variants.length} price${variants.length === 1 ? "" : "s"}${from}` };
    },
  },
  "[].name": { label: "Full name", help: 'The heading on the model page, e.g. "THE Elantra Hybrid".' },
  "[].shortName": { label: "Short name", help: "Used in menus, lists and forms, e.g. \"Elantra Hybrid\"." },
  "[].tagline": { label: "Tagline", help: "One short line under the name." },
  "[].description": { label: "Description", control: "textarea" },
  "[].highlights": { label: "Key features", help: "Bullet points on the model page.", addLabel: "Add feature" },
  "[].cardImage": { label: "List picture", help: "Side view on a transparent background, used in model lists and the homepage." },
  "[].heroImage": { label: "Top picture", help: "The large picture at the top of the model page." },
  "[].gallery": { label: "Gallery pictures", addLabel: "Add picture" },
  "[].colors": { label: "Colours", help: "Shown as colour chips on the model page and price list.", addLabel: "Add colour" },
  "[].colors[].name": { label: "Colour name" },
  "[].colors[].hex": { label: "Colour", control: "color" },
  "[].specs": { label: "Specifications", addLabel: "Add specification" },
  "[].specs[].label": { label: "Name", help: undefined },
  "[].specs[].value": { label: "Value" },
  "[].category": {
    label: "Category",
    control: "select",
    options: ["Sedan", "SUV", "Electric", "Commercial"].map((v) => ({ label: v, value: v })),
  },
  "[].fuel": {
    label: "Fuel",
    control: "select",
    options: ["Petrol", "Hybrid", "Electric", "Diesel"].map((v) => ({ label: v, value: v })),
  },
  "[].ranges": {
    label: "Show under these homepage tabs",
    control: "checkboxes",
    options: rangeTabs.map((tab) => ({ label: tab.label, value: tab.id })),
  },
  "[].series": {
    label: "Homepage letter filter",
    control: "select",
    options: seriesFilters.map((filter) => ({ label: filter.label, value: filter.id })),
  },
  "[].brochure": { label: "Brochure link" },
  "[].slug": lockedSlug,

  "[].variants": {
    label: "Prices",
    help: "One entry per variant, exactly as on the printed price list. Totals add up by themselves.",
    addLabel: "Add variant",
  },
  "[].variants[]": {
    order: ["grade", "variantLabel", "option", "price", "discountedPrice", "transportation", "whtTax", "nevLevy", "cvt", "note", "name"],
    columns: 4,
    footer: (v) => {
      const total =
        num(v.discountedPrice ?? v.price) + num(v.transportation) + num(v.nevLevy) + num(v.whtTax) + num(v.cvt);
      return `Total charges: ${rupees(total)}`;
    },
  },
  "[].variants[].name": {
    label: "Variant name",
    control: "locked",
    help: "EMI plans find this variant by its exact name. Change it here only together with the matching EMI plan, or the website won't update.",
  },
  "[].variants[].price": { label: "Price (ex-factory)", control: "money" },
  "[].variants[].discountedPrice": { label: "Promotional price", control: "money" },
  "[].variants[].grade": { label: "Grade", help: 'The price list\'s "Grade" column.' },
  "[].variants[].variantLabel": { label: "Variant", help: 'The price list\'s "Variant" column.' },
  "[].variants[].option": {
    label: "Option",
    help: 'e.g. "With AC". Leave empty if there are no options. Same grade + variant with different options share one row.',
  },
  "[].variants[].transportation": { label: "Transportation charges", control: "money" },
  "[].variants[].nevLevy": { label: "NEV levy", control: "money", help: "0 if it doesn't apply." },
  "[].variants[].whtTax": { label: "WHT tax", control: "money" },
  "[].variants[].cvt": { label: "CVT (1%)", control: "money", help: "0 if it doesn't apply." },
  "[].variants[].note": { label: "Note" },
};

const emiPlanHints: FieldHints = {
  "": { addLabel: "Add EMI plan" },
  "[]": {
    summary: (item) => {
      const tenures = Array.isArray(item.tenures) ? (item.tenures as JsonObject[]) : [];
      return { detail: tenures.map((t) => `${num(t.months)} months`).join(" · ") };
    },
  },
  "[].id": { ...lockedSlug, label: "Plan ID", help: "Used for the plan's link on the EMI page." },
  "[].modelLabel": { label: "Name shown on the page", help: 'e.g. "Santa Fe Hybrid AWD".' },
  "[].vehicleSlug": {
    label: "Vehicle",
    control: "select",
    options: vehicleOptions,
    help: "The ex-factory price is taken from this vehicle on the price list.",
  },
  "[].variantName": {
    label: "Variant",
    control: "select",
    options: variantOptions,
    help: "Must be a variant of the vehicle chosen above.",
  },
  "[].tenures": { label: "Tenures", addLabel: "Add tenure" },
  "[].tenures[]": {
    columns: 4,
    summary: (t) => ({ title: num(t.months) ? `${num(t.months)} months` : "New tenure" }),
    footer: (t) => {
      const total =
        num(t.advanceAmount) +
        num(t.transitFreightInsurance) +
        num(t.advanceIncomeTaxFiler) +
        num(t.insuranceAmountSGI) +
        num(t.trackerChargesSGI) +
        num(t.processingChargesSGI);
      return `Total advance payment: ${rupees(total)}`;
    },
  },
  "[].tenures[].months": { label: "Months" },
  "[].tenures[].advanceAmount": { label: "Advance", control: "money" },
  "[].tenures[].transitFreightInsurance": { label: "Transit freight & insurance", control: "money" },
  "[].tenures[].advanceIncomeTaxFiler": { label: "Advance income tax (filer)", control: "money" },
  "[].tenures[].insuranceAmountSGI": { label: "Insurance", control: "money" },
  "[].tenures[].trackerChargesSGI": { label: "Tracker charges", control: "money" },
  "[].tenures[].processingChargesSGI": { label: "Processing charges", control: "money" },
  "[].tenures[].monthlyInstallment": { label: "Monthly cheque", control: "money" },
  "[].tenures[].adminCharges": { label: "Admin charges", control: "money" },
};

const priceListHints: FieldHints = {
  edition: { label: "Edition", help: 'e.g. "October 2026". Shown in the page and PDF titles.' },
  intro: { control: "textarea" },
  pdfDownloadName: { label: "PDF file name" },
  pdfPagesAfterPriceList: { label: "Extra PDF pages after the main list", help: "Full-page pictures, e.g. the PPF packages page.", addLabel: "Add page" },
  pdfPagesAtEnd: { label: "Extra PDF pages at the end", help: "e.g. the payment guide.", addLabel: "Add page" },
  columns: { label: "Column headings" },
  models: { label: "Models on the price list", help: "Use the arrows to change the order. This is the order on the page and in the PDF.", addLabel: "Add model" },
  "models[].vehicleSlug": { label: "Vehicle", control: "select", options: vehicleOptions },
  "models[].label": { label: "Name in the table" },
  "models[].image": { label: "Picture" },
  "models[].spec": { label: "Highlight line (optional)" },
  "models[].badges": { label: "Warranty badges (optional)", addLabel: "Add badge" },
  "models[].showExFactoryPrice": { label: "Show the blue ex-factory price box" },
  paymentTerms: { label: "Payment terms" },
};

const teamHints: FieldHints = {
  "": { addLabel: "Add team member" },
  "[].slug": lockedSlug,
  "[].image": { label: "Photo" },
  "[].whatsappHref": { label: "WhatsApp link", help: "Format: https://wa.me/923001234567 (country code, no + or spaces)." },
  "[].phoneDisplay": { label: "Phone (as shown)" },
  "[].bio": { label: "Bio", control: "textarea" },
};

const newsHints: FieldHints = {
  "": { addLabel: "Add article" },
  "[].slug": lockedSlug,
  "[].body": { label: "Paragraphs", addLabel: "Add paragraph" },
};

const siteHints: FieldHints = {
  "site.whatsapp": { label: "WhatsApp link", help: "Format: https://wa.me/923001234567 (country code, no + or spaces). Used by every WhatsApp button." },
  "site.phoneHref": { label: "Phone link", help: "Format: tel:+9251111500200" },
  "site.mapUrl": { label: "Google Maps link", help: "Opens when someone taps the map." },
  "site.mapEmbedUrl": { label: "Map shown on the page", help: "From Google Maps: Share → Embed a map → copy the link inside src=\"...\"." },
  extraPhones: { label: "Extra phone lines", addLabel: "Add phone line" },
  locations: { label: "Locations", addLabel: "Add location" },
};

const navHints: FieldHints = {
  "": { addLabel: "Add menu item" },
  "[].children": { label: "Dropdown links", addLabel: "Add link" },
  "[].children[].group": { label: "Column heading", help: "Links with the same heading are listed together." },
  "[].image": { label: "Faded picture behind the dropdown" },
};

export const FIELD_HINTS: Record<string, FieldHints> = {
  vehicles: vehicleHints,
  "emi-plans": emiPlanHints,
  "price-list": priceListHints,
  team: teamHints,
  news: newsHints,
  site: siteHints,
  nav: navHints,
  offers: { "": { addLabel: "Add offer" } },
  about: { "": { addLabel: "Add paragraph" } },
};
