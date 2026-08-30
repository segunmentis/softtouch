/**
 * Per-page SEO: unique title, unique meta description, canonical, Open Graph.
 *
 * Canonical and absolute og:image are emitted only when NUXT_PUBLIC_SITE_URL is
 * set. A canonical pointing at the wrong origin is worse than none — it can
 * deindex the site — so an unset origin means those tags are skipped.
 */
export function usePageSeo(options: { path: string; title: string; description: string }) {
  const siteUrl = (useRuntimeConfig().public.siteUrl as string) || "";
  const origin = siteUrl.replace(/\/$/, "");
  const url = origin ? `${origin}${options.path === "/" ? "" : options.path}` : "";

  useHead(() => ({
    title: options.title,
    link: url ? [{ rel: "canonical", href: url }] : [],
    meta: [
      { name: "description", content: options.description },
      { property: "og:title", content: options.title },
      { property: "og:description", content: options.description },
      ...(url
        ? [
            { property: "og:url", content: url },
            { property: "og:image", content: `${origin}/og-image.png` },
          ]
        : []),
    ],
  }));
}
