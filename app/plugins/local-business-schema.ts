/**
 * LocalBusiness structured data, emitted once on every page.
 *
 * Type is `HealthAndBeautyBusiness` — the closest schema.org subtype for a
 * sugaring studio. Fields with no confirmed value (phone, social profiles,
 * absolute URLs) are omitted rather than guessed: Google flags invented or
 * inconsistent NAP data, and a wrong address hurts local ranking more than a
 * missing one.
 */
export default defineNuxtPlugin(() => {
  const siteUrl = (useRuntimeConfig().public.siteUrl as string) || "";
  const origin = siteUrl.replace(/\/$/, "");

  const sameAs = SOCIAL_LINKS.filter((link) => link.url).map((link) => link.url);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: STUDIO_NAME,
    description:
      "Private body sugaring studio in City Park, Saskatoon offering Brazilian, body, facial and select men's sugaring services.",
    address: {
      "@type": "PostalAddress",
      streetAddress: STUDIO_ADDRESS.street,
      addressLocality: STUDIO_ADDRESS.city,
      addressRegion: STUDIO_ADDRESS.region,
      postalCode: STUDIO_ADDRESS.postalCode,
      addressCountry: STUDIO_ADDRESS.country,
    },
    areaServed: { "@type": "City", name: "Saskatoon" },
    openingHoursSpecification: OPENING_HOURS.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    currenciesAccepted: "CAD",
    hasMap: MAP_URL || undefined,
    potentialAction: {
      "@type": "ReserveAction",
      target: { "@type": "EntryPoint", urlTemplate: FRESHA_BOOKING_URL },
      name: "Book an appointment",
    },
  };

  if (origin) {
    schema.url = origin;
    schema["@id"] = `${origin}/#studio`;
    schema.logo = `${origin}/icon-512.png`;
    schema.image = `${origin}/og-image.png`;
  }
  if (STUDIO_PHONE) schema.telephone = STUDIO_PHONE;
  if (CONTACT_EMAIL) schema.email = CONTACT_EMAIL;
  if (sameAs.length) schema.sameAs = sameAs;

  useHead({
    script: [{ type: "application/ld+json", innerHTML: JSON.stringify(schema) }],
  });
});
