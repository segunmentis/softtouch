// Single source of truth for the studio's business facts. Anything that appears
// in more than one place (header, footer, contact page, structured data) reads
// from here so the details cannot drift apart.

export const STUDIO_NAME = "Soft Touch Aesthetics Studio";

export const STUDIO_ADDRESS = {
  street: "410 Duchess Street, M2",
  city: "Saskatoon",
  region: "SK",
  postalCode: "S7K 0R2",
  country: "CA",
};

/**
 * Displayed as written; the footer's tel: link normalises it to E.164, so the
 * formatting here is purely presentational. Also emitted as `telephone` in the
 * LocalBusiness schema.
 */
export const STUDIO_PHONE = "(639) 525-2953";

/**
 * Opening hours. `days` uses schema.org day codes so the structured data and the
 * visible list can never disagree.
 */
export const OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:00", closes: "20:00" },
  { days: ["Saturday"], opens: "10:00", closes: "20:00" },
  { days: ["Sunday"], opens: "12:00", closes: "18:00" },
];
