// The studio's service menu, mirroring the live Fresha booking menu.
//
// Prices, durations and groupings here are transcribed from Fresha. Fresha
// remains the source of truth: if a price changes there, change it here too, or
// the site will quote a stale figure. Nothing in this file is invented — a
// service only appears once it exists on the booking menu.


/** The section a service belongs to on the booking menu. */
export type ServiceCategory = "mens" | "bundles" | "intimate" | "face";

/** The tabs shown on /services. "featured" is a curated view, not a section. */
export type ServiceTab = "featured" | "mens" | "bundles" | "intimate";

export type Service = {
  key: string;
  /** Display name, as it reads on the Fresha menu. */
  name: string;
  /** Human-readable length, e.g. "45 min". */
  duration: string;
  /** One or two sentences, supplied by the owner. */
  description: string;
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
  { key: "buttCheeks", name: "Butt Cheeks", duration: "20 min", category: "intimate", price: 25, description: "Hair removal from both cheeks." },
  { key: "brazilian", name: "Brazilian", duration: "45 min", category: "intimate", featured: true, price: 60, description: "Complete hair removal from the intimate area, including the front, labia and bum strip. Go completely bare, or leave a strip or triangle." },
  { key: "extendedBikini", name: "Extended Bikini", duration: "30 min", category: "intimate", price: 45, description: "A deeper clean-up than a standard bikini: everything in the Bikini, plus more from the front and further inward from the bikini line. Does not include the full labia or bum strip." },
  { key: "bikini", name: "Bikini", duration: "20 min", category: "intimate", price: 35, description: "Removes hair visible outside a standard bikini bottom, along the bikini line and upper thigh crease. Does not include the labia, bum strip or hair further inward." },

  // Men's sugaring
  { key: "mensFullBack", name: "Men's Full Back", duration: "1 hr", category: "mens", price: 80, description: "The entire back — upper, middle and lower — for smooth, long-lasting results." },
  { key: "mensShoulders", name: "Men's Shoulders", duration: "20 min", category: "mens", price: 25, description: "Both shoulders, leaving the skin smooth and well groomed." },
  { key: "mensStomach", name: "Men's Stomach", duration: "20 min", category: "mens", price: 30, description: "The stomach area, for smooth, long-lasting results." },
  { key: "mensChest", name: "Men's Chest", duration: "45 min", category: "mens", price: 60, description: "The chest, for smooth, long-lasting results and softer regrowth." },

  // Bundles
  { key: "faceRefresh", name: "Face Refresh", duration: "35 min", category: "bundles", price: 42, compareAt: 47, includes: 3, description: "Three facial treatments in one visit." },
  { key: "smoothEssentials", name: "Smooth Essentials", duration: "1 hr", category: "bundles", price: 75, compareAt: 80, includes: 2, femaleOnly: true, description: "Two everyday treatments in a single visit." },
  { key: "summerReady", name: "Summer Ready", duration: "1 hr 45 min", category: "bundles", featured: true, price: 125, compareAt: 135, includes: 2, femaleOnly: true, description: "Two treatments bundled for the season." },

  // Face — only surfaced through the Featured tab, as on Fresha.
  { key: "upperLip", name: "Upper Lip", duration: "10 min", category: "face", featured: true, price: 12, description: "Removes unwanted hair from the upper lip for a smooth finish." },
  { key: "chin", name: "Chin", duration: "10 min", category: "face", featured: true, price: 15, description: "Removes unwanted hair from the chin area." },
];

export const SERVICE_TABS: ServiceTab[] = ["featured", "mens", "bundles", "intimate"];

/** Display label for each tab, used by /services and the homepage cards. */
export const SERVICE_TAB_LABELS: Record<ServiceTab, string> = {
  featured: "Featured",
  mens: "Men's Sugaring",
  bundles: "Bundles",
  intimate: "Intimate",
};

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
 * The four cards in the homepage carousel — the full menu lives on /services.
 *
 * Deliberately without photographs. The studio has no photography of these
 * specific treatments, and the stock images previously used here showed a
 * massage, a wax-style spatula application and a pair of bare legs — none of
 * them sugaring, and each one implying a treatment the studio does not offer.
 * A card with no picture is better than a card with the wrong one. Add images
 * back here only alongside real photographs of the treatment named.
 */
export const HOME_FEATURED = [
  { key: "brazilian" },
  { key: "summerReady" },
  { key: "faceRefresh" },
  { key: "mensFullBack" },
];
