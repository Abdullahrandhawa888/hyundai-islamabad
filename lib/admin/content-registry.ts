/** Every content file the admin dashboard is allowed to read/write, keyed by
 * the short name used in URLs (/admin/content/<key>, /api/admin/content/<key>).
 * Adding a new editable section later just means adding one entry here.
 * `group` places it on the dashboard; `viewHref` is the page it changes. */
export const CONTENT_REGISTRY = {
  vehicles: {
    path: "content/vehicles.json",
    label: "Vehicles & prices",
    description: "Every model's prices, taxes and charges, plus its details, pictures and colours.",
    group: "Prices",
    viewHref: "/prices",
  },
  "emi-plans": {
    path: "content/emi-plans.json",
    label: "EMI plans",
    description: "Installment figures for each model and tenure.",
    group: "Prices",
    viewHref: "/emi-plans",
  },
  "price-list": {
    path: "content/price-list.json",
    label: "Price list page",
    description: "Edition, model order, badges, payment terms and the PDF's extra pages.",
    group: "Prices",
    viewHref: "/prices",
  },
  "emi-page": {
    path: "content/emi-page.json",
    label: "EMI plans page",
    description: "Title, edition, introduction and notes.",
    group: "Prices",
    viewHref: "/emi-plans",
  },
  home: {
    path: "content/home.json",
    label: "Homepage",
    description: "Hero slides, feature tiles and the electric range banner.",
    group: "Website pages",
    viewHref: "/",
  },
  offers: {
    path: "content/offers.json",
    label: "Offers",
    description: "Promotions shown on the Offers page.",
    group: "Website pages",
    viewHref: "/offers",
  },
  news: {
    path: "content/news.json",
    label: "News",
    description: "News articles and press releases.",
    group: "Website pages",
    viewHref: "/news",
  },
  team: {
    path: "content/team.json",
    label: "Sales team",
    description: "Sales team photos, roles, bios and WhatsApp numbers.",
    group: "Website pages",
    viewHref: "/team",
  },
  "after-sales-team": {
    path: "content/after-sales-team.json",
    label: "After Sales team",
    description: "Cards on the After Sales Team page: names, roles, photos and contact numbers.",
    group: "Website pages",
    viewHref: "/after-sales-team",
  },
  service: {
    path: "content/service.json",
    label: "After Sales pages",
    description: "Warranty, free services, maintenance chart, manuals and more.",
    group: "Website pages",
    viewHref: "/after-sales",
  },
  about: {
    path: "content/about.json",
    label: "About us",
    description: "The About Us page introduction.",
    group: "Website pages",
    viewHref: "/about",
  },
  site: {
    path: "content/site.json",
    label: "Contact details & hours",
    description: "Phone numbers, WhatsApp, email, address, map, opening hours and social links.",
    group: "Settings",
    viewHref: "/contact",
  },
  nav: {
    path: "content/nav.json",
    label: "Menu",
    description: "The links and dropdowns in the website's top menu.",
    group: "Settings",
    viewHref: "/",
  },
  accessories: {
    path: "content/accessories.json",
    label: "Accessories shop",
    description: "Products customers can reserve and collect from the dealership: names, prices and pictures.",
    group: "Website pages",
    viewHref: "/accessories",
  },
  "booking-notice": {
    path: "content/booking-notice.json",
    label: "Booking pop-up",
    description: "The \"Booking your Hyundai?\" pop-up shown when someone opens the website. Turn it on or off and edit its text.",
    group: "Settings",
    viewHref: "/",
  },
} as const;

export type ContentKey = keyof typeof CONTENT_REGISTRY;

export const CONTENT_GROUPS = ["Prices", "Website pages", "Settings"] as const;

export function isContentKey(value: string): value is ContentKey {
  return Object.prototype.hasOwnProperty.call(CONTENT_REGISTRY, value);
}
