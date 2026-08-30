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
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
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
