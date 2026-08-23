// The studio's service menu, mirroring the live Fresha booking menu.
//
// Prices, durations and groupings here are transcribed from Fresha. Fresha
// remains the source of truth: if a price changes there, change it here too, or
// the site will quote a stale figure. Nothing in this file is invented — a
// service only appears once it exists on the booking menu.
//
// Copy (name, duration, description) lives in the locale files under
// `pages.services.items.<key>` so both languages stay in step.

/** The section a service belongs to on the booking menu. */
export type ServiceCategory = "mens" | "bundles" | "intimate" | "face";

/** The tabs shown on /services. "featured" is a curated view, not a section. */
export type ServiceTab = "featured" | "mens" | "bundles" | "intimate";

export type Service = {
  key: string;
  category: ServiceCategory;
  /** Appears under the Featured tab, as it does on Fresha. */
  featured?: boolean;
  /** CAD. Rendered as CA$<price>. */
  price: number;
  /** Bundles only: the combined price of the services bought separately. */
  compareAt?: number;
  /** Bundles only: how many treatments are included. */
  includes?: number;
  femaleOnly?: boolean;
};

/**
 * A taste of each part of the menu, not the whole thing — about four per tab,
 * in the order Fresha lists them, with a link out to the full menu. Fresha
 * carries services that deliberately do not appear here (all of Body and Face,
 * and the rest of Men's), so never describe this list as complete.
 */
export const SERVICES: Service[] = [
  // Intimate
  { key: "buttCheeks", category: "intimate", price: 25 },
  { key: "brazilian", category: "intimate", featured: true, price: 60 },
  { key: "extendedBikini", category: "intimate", price: 45 },
  { key: "bikini", category: "intimate", price: 35 },

  // Men's sugaring
  { key: "mensFullBack", category: "mens", price: 80 },
  { key: "mensShoulders", category: "mens", price: 25 },
  { key: "mensStomach", category: "mens", price: 30 },
  { key: "mensChest", category: "mens", price: 60 },

  // Bundles
  { key: "faceRefresh", category: "bundles", price: 42, compareAt: 47, includes: 3 },
  { key: "smoothEssentials", category: "bundles", price: 75, compareAt: 80, includes: 2, femaleOnly: true },
  { key: "summerReady", category: "bundles", featured: true, price: 125, compareAt: 135, includes: 2, femaleOnly: true },

  // Face — only surfaced through the Featured tab, as on Fresha.
  { key: "upperLip", category: "face", featured: true, price: 12 },
  { key: "chin", category: "face", featured: true, price: 15 },
];

export const SERVICE_TABS: ServiceTab[] = ["featured", "mens", "bundles", "intimate"];

/** Keeps every tab to a short, scannable list rather than a full price list. */
export const MAX_PER_TAB = 4;

export function servicesIn(tab: ServiceTab): Service[] {
  const all = tab === "featured"
    ? SERVICES.filter((s) => s.featured)
    : SERVICES.filter((s) => s.category === tab);
  return all.slice(0, MAX_PER_TAB);
}

/** Percentage saved on a bundle, rounded the way Fresha displays it. */
export function bundleSaving(service: Service): number | null {
  if (!service.compareAt) return null;
  return Math.round(((service.compareAt - service.price) / service.compareAt) * 100);
}

export function formatPrice(amount: number): string {
  return `CA$${amount}`;
}

/**
 * The four cards in the homepage carousel. Kept short and hand-picked, with an
 * image each — the full menu lives on /services.
 */
export const HOME_FEATURED = [
  { key: "brazilian", image: "/images/faq-hero.jpg", altKey: "alt.application" },
  { key: "summerReady", image: "/images/hero/hero-2.jpg", altKey: "alt.legs" },
  { key: "faceRefresh", image: "/images/home/portrait.jpg", altKey: "alt.portrait" },
  { key: "mensFullBack", image: "/images/home/table.jpg", altKey: "alt.treatment" },
];
