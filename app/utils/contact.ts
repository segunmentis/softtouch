// ─────────────────────────────────────────────────────────────────────────────
// TODO: fill these in with the studio's real details before deploying.
//
// Anything left empty is hidden on the contact page rather than rendered as a
// dead link, so the page stays coherent until these are supplied.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Where the contact form posts. A hosted form endpoint (Formspree, Web3Forms,
 * Basin, …) that accepts a JSON POST. Leave empty to fall back to CONTACT_EMAIL.
 * e.g. "https://formspree.io/f/xxxxxxx"
 */
export const CONTACT_FORM_ENDPOINT = "";

/**
 * The studio inbox. Used for the email row, and as the contact form's fallback
 * (the form opens a pre-filled message) when CONTACT_FORM_ENDPOINT is empty.
 * e.g. "hello@softtouchaesthetics.ca"
 */
export const CONTACT_EMAIL = "";

/** Google Maps link for the studio. Empty hides the map card. */
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=410+Duchess+Street+Saskatoon+SK+S7K+0R2";

/** Social profiles. Entries without a `url` are not rendered. */
export const SOCIAL_LINKS: { key: string; label: string; handle: string; url: string }[] = [
  { key: "facebook", label: "Facebook", handle: "", url: "https://www.facebook.com/profile.php?id=61590793826908" },
  { key: "instagram", label: "Instagram", handle: "@softtouchaestheticsstudio", url: "https://www.instagram.com/softtouchaestheticsstudio/" },
  { key: "tiktok", label: "TikTok", handle: "@softtouchaesthetics", url: "https://www.tiktok.com/@softtouchaesthetics" },
];
