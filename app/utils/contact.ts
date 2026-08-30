// ─────────────────────────────────────────────────────────────────────────────
// Anything left empty is hidden on the contact page rather than rendered as a
// dead link, so the page stays coherent until it is supplied.
// ─────────────────────────────────────────────────────────────────────────────

// The studio inbox is NOT here — it lives in runtime config so it can be set by
// environment rather than committed. Read it through `useContactEmail()`, and
// the contact form's endpoint through `useContactFormEndpoint()`, both in
// app/composables/useContact.ts.

/** Google Maps link for the studio. Empty hides the map card. */
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=410+Duchess+Street+Saskatoon+SK+S7K+0R2";

/** Social profiles. Entries without a `url` are not rendered. */
export const SOCIAL_LINKS: { key: string; label: string; handle: string; url: string }[] = [
  { key: "facebook", label: "Facebook", handle: "", url: "https://www.facebook.com/profile.php?id=61590793826908" },
  { key: "instagram", label: "Instagram", handle: "@softtouchaestheticsstudio", url: "https://www.instagram.com/softtouchaestheticsstudio/" },
  { key: "tiktok", label: "TikTok", handle: "@softtouchaesthetics", url: "https://www.tiktok.com/@softtouchaesthetics" },
];
