/** Every content file the admin dashboard is allowed to read/write, keyed by
 * the short name used in URLs (/admin/content-edit/<key>, /api/admin/content/<key>).
 * Adding a new editable section later just means adding one entry here. */
export const CONTENT_REGISTRY = {
  vehicles: { path: "content/vehicles.json", label: "Vehicles & Price List" },
  "price-list": { path: "content/price-list.json", label: "Price List Page (PDF, edition, terms, model order)" },
  "emi-plans": { path: "content/emi-plans.json", label: "EMI Plans" },
  "emi-page": { path: "content/emi-page.json", label: "EMI Plans Page (intro, notes, PDF name)" },
  offers: { path: "content/offers.json", label: "Offers" },
  news: { path: "content/news.json", label: "News" },
  team: { path: "content/team.json", label: "Our Team" },
  site: { path: "content/site.json", label: "Site Settings (contact, hours, social)" },
  nav: { path: "content/nav.json", label: "Navigation Menu" },
  home: { path: "content/home.json", label: "Homepage (hero slides, feature tiles)" },
  about: { path: "content/about.json", label: "About Page Text" },
  service: { path: "content/service.json", label: "After Sales (warranty, free services, maintenance, manuals)" },
} as const;

export type ContentKey = keyof typeof CONTENT_REGISTRY;

export function isContentKey(value: string): value is ContentKey {
  return Object.prototype.hasOwnProperty.call(CONTENT_REGISTRY, value);
}
