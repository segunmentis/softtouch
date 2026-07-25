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
