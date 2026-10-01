// Single source of truth for the studio's business facts. Anything that appears
// in more than one place (header, footer, contact page, structured data) reads
// from here so the details cannot drift apart.

export const STUDIO_NAME = "Soft Touch Aesthetics Studio";

export const STUDIO_ADDRESS = {
  street: "432 21st Street East",
  city: "Saskatoon",
  region: "SK",
  /** Not yet confirmed. Empty is omitted from the display and the schema. */
  postalCode: "",
  country: "CA",
};

/** The address on one line, for the header and the contact page's map card. */
export const STUDIO_ADDRESS_LINE = [
  STUDIO_ADDRESS.street,
  STUDIO_ADDRESS.city,
  [STUDIO_ADDRESS.region, STUDIO_ADDRESS.postalCode].filter(Boolean).join(" "),
].join(", ");

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
