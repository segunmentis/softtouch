/**
 * Per-page SEO: unique title, unique meta description, canonical, Open Graph.
 *
 * Canonical and absolute og:image are emitted only when NUXT_PUBLIC_SITE_URL is
 * set. A canonical pointing at the wrong origin is worse than none — it can
 * deindex the site — so an unset origin means those tags are skipped.
 */
export function usePageSeo(options: { path: string; titleKey: string; descriptionKey: string }) {
  const { t } = useI18n();
  const siteUrl = (useRuntimeConfig().public.siteUrl as string) || "";
  const origin = siteUrl.replace(/\/$/, "");
  const url = origin ? `${origin}${options.path === "/" ? "" : options.path}` : "";

  const title = computed(() => t(options.titleKey));
  const description = computed(() => t(options.descriptionKey));

  useHead(() => ({
    title: title.value,
    link: url ? [{ rel: "canonical", href: url }] : [],
    meta: [
      { name: "description", content: description.value },
      { property: "og:title", content: title.value },
      { property: "og:description", content: description.value },
      ...(url
        ? [
            { property: "og:url", content: url },
            { property: "og:image", content: `${origin}/og-image.png` },
          ]
        : []),
    ],
  }));
}
