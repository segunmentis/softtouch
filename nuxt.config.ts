// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
        },
        // Cream monogram on an ink plate — cream on transparent disappears in a light tab.
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
      meta: [
        { name: "theme-color", content: "#2a2818" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Soft Touch Aesthetics Studio" },
        // TODO: make this an absolute URL once the production domain is known —
        // Facebook and LinkedIn will not resolve a relative og:image.
        { property: "og:image", content: "/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },

  i18n: {
    strategy: "no_prefix",
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English" },
      { code: "fr", name: "Français" },
    ],
    // We handle persistence ourselves via localStorage (see app/plugins/i18n-locale.client.ts)
    detectBrowserLanguage: false,
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
