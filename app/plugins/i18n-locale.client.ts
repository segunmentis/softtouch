const STORAGE_KEY = "locale";

export default defineNuxtPlugin((nuxtApp) => {
  const locale = nuxtApp.$i18n.locale;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "fr") {
    locale.value = saved;
  }

  watch(locale, (value) => {
    localStorage.setItem(STORAGE_KEY, value);
  });
});
