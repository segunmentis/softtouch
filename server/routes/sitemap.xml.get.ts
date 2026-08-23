// XML sitemap. Prerendered at build time alongside the pages.
//
// Emits nothing useful until NUXT_PUBLIC_SITE_URL is set — sitemap entries must
// be absolute URLs on the site's own origin, and a sitemap full of wrong hosts
// is worse than no sitemap at all.

const ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/services", priority: "0.9" },
  { path: "/faq", priority: "0.7" },
  { path: "/about", priority: "0.7" },
  { path: "/contact", priority: "0.7" },
];

export default defineEventHandler((event) => {
  const origin = (useRuntimeConfig(event).public.siteUrl as string || "").replace(/\/$/, "");
  const lastmod = new Date().toISOString().split("T")[0];

  const urls = origin
    ? ROUTES.map(
        (route) =>
          `  <url>\n` +
          `    <loc>${origin}${route.path === "/" ? "/" : route.path}</loc>\n` +
          `    <lastmod>${lastmod}</lastmod>\n` +
          `    <priority>${route.priority}</priority>\n` +
          `  </url>`
      ).join("\n")
    : "";

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
});
