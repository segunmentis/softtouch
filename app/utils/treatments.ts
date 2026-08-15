// The treatment catalogue, shared by /services and the four category pages.
//
// Only treatments that exist in the locale files appear here — nothing is
// invented. Men's Sugaring and Face have no entries yet, so those pages fall
// back to the "full menu on Fresha" state rather than showing fabricated
// services. Add entries here (and matching `pages.services.items.*` strings in
// both locales) as the real menu is confirmed.

export type TreatmentCategory = "intimate" | "body" | "face" | "mensSugaring" | "bundles";

export type Treatment = {
  key: string;
  category: TreatmentCategory;
  hasNote: boolean;
  image: string;
  altKey: string;
};

export const TREATMENTS: Treatment[] = [
  { key: "brazilian", category: "intimate", hasNote: false, image: "/images/hero/hero-2.jpg", altKey: "alt.legs" },
  { key: "underarms", category: "body", hasNote: false, image: "/images/hero/hero-3.jpg", altKey: "alt.lemons" },
  { key: "faceRefresh", category: "bundles", hasNote: true, image: "/images/home/portrait.jpg", altKey: "alt.portrait" },
  { key: "summerReady", category: "bundles", hasNote: true, image: "/images/hero/hero-1.jpg", altKey: "alt.paste" },
];

export function treatmentsIn(category: TreatmentCategory) {
  return TREATMENTS.filter((item) => item.category === category);
}

/** The four standalone, crawlable category pages. */
export const CATEGORY_PAGES = [
  { path: "/intimate-sugaring", copyKey: "intimate", category: "intimate" as const, seoKey: "intimate", image: "/images/hero/hero-2.jpg", altKey: "alt.legs" },
  { path: "/body-sugaring", copyKey: "body", category: "body" as const, seoKey: "body", image: "/images/home/table.jpg", altKey: "alt.treatment" },
  { path: "/mens-sugaring", copyKey: "mens", category: "mensSugaring" as const, seoKey: "mens", image: "/images/hero/hero-1.jpg", altKey: "alt.paste" },
  { path: "/facial-sugaring", copyKey: "facial", category: "face" as const, seoKey: "facial", image: "/images/home/portrait.jpg", altKey: "alt.portrait" },
];
