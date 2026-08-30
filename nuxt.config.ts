// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  // Was false. A client-rendered SPA serves crawlers an empty shell, so titles,
  // meta descriptions, headings and JSON-LD only existed after JS ran — which
  // undercuts every SEO change below. Now server-rendered and prerendered to
  // static HTML at build time.
  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sitemap.xml"],
    },

    // The four category pages were replaced by the tabbed menu on /services in
    // 4756703. They were crawlable and are still indexed, so they redirect
    // rather than 404 — a 301 passes their accumulated ranking to the tab that
    // replaced them. Body and Face have no tab of their own, so they land on
    // the menu itself.
    routeRules: {
      "/intimate-sugaring": { redirect: { to: "/services?tab=intimate", statusCode: 301 } },
      "/mens-sugaring": { redirect: { to: "/services?tab=mens", statusCode: 301 } },
      "/body-sugaring": { redirect: { to: "/services", statusCode: 301 } },
      "/facial-sugaring": { redirect: { to: "/services", statusCode: 301 } },
    },
  },

  runtimeConfig: {
    public: {
      // REQUIRED before launch: set NUXT_PUBLIC_SITE_URL to the live origin
      // (e.g. https://softtouchstudio.ca). Canonical tags, absolute og:image and
      // the sitemap are all omitted while this is empty — a canonical pointing at
      // the wrong origin can deindex the whole site, so guessing is worse than
      // leaving it out.
      //
      // NOTE: pages are prerendered, so this must be set at BUILD time, not
      // runtime — `NUXT_PUBLIC_SITE_URL=https://… npm run build`. Setting it only
      // on the running server has no effect on the already-generated HTML.
      siteUrl: "https://softtouchaestheticsstudio.com",

      // The studio inbox. The contact form POSTs to FormSubmit, whose endpoint
      // is keyed by this address, and it is also emitted as `email` in the
      // LocalBusiness schema. Set NUXT_PUBLIC_CONTACT_EMAIL.
      //
      // Same BUILD-time caveat as siteUrl above: the contact page is
      // prerendered, so this is baked into the generated HTML and payload.
      // Setting it only on the running server changes nothing.
      //
      // Public on purpose — the browser posts the form directly, so the address
      // is in the page source either way. Do not put secrets here.
      contactEmail: "soniapologbo04@gmail.com",
    },
  },

  app: {
    head: {
      // @nuxtjs/i18n used to set this. The site is English-only now, so it is
      // declared here — screen readers and search engines both rely on it.
      htmlAttrs: { lang: "en-CA" },

      // Scroll-reveal sections start at opacity 0 and are shown by JS. Pages are
      // server-rendered, so their text is in the HTML from the first byte — this
      // keeps it visible for anyone (or anything) that never runs the script.
      //
      // Declared here rather than as a <noscript> in app.vue: the browser parses
      // noscript content as raw text when scripting is on, while Vue's client
      // vdom expects an element, which produced a hydration mismatch on every
      // page.
      noscript: [{ innerHTML: ".reveal{opacity:1!important;transform:none!important}" }],
      link: [
        // EB Garamond is self-hosted (app/assets/css/fonts.css). These two faces
        // carry the hero and the nav, so they are fetched in parallel with the
        // stylesheet rather than after it.
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/eb-garamond-400.woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/eb-garamond-400-italic.woff2",
          crossorigin: "anonymous",
        },
        // Cream monogram on an ink plate — cream on transparent disappears in a light tab.
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/icon-512.png",
        },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
      meta: [
        { name: "theme-color", content: "#2a2818" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Soft Touch Aesthetics Studio" },
        { property: "og:locale", content: "en_CA" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Soft Touch Aesthetics Studio" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    },
  },

  modules: ["@nuxtjs/tailwindcss"],

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },


  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },

  devServer: {
    port: 1080,
  },
});
