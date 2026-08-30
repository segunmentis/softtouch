<template>
  <!-- error.vue replaces app.vue rather than rendering inside it, so the header,
       the footer and the noscript reveal fix all have to be repeated here. -->
  <div class="flex min-h-screen flex-col bg-[#100f0a]">
    <noscript>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <component :is="'style'">.reveal { opacity: 1 !important; transform: none !important; }</component>
    </noscript>
    <NuxtRouteAnnouncer />
    <AppHeader />

    <main class="flex flex-1 items-center justify-center">
      <div class="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
        <!-- The zero is the ring from the stacked logo. Hidden from the
             accessibility tree: read out it becomes "four, graphic, four", and
             the code is already announced properly by the "Error 404" kicker
             directly below. -->
        <p class="numeral flex items-center justify-center gap-1.5 text-cream/90" aria-hidden="true">
          <span>4</span>
          <svg class="zero-ring flex-shrink-0" viewBox="0 0 100 100" focusable="false">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#696740" stroke-width="2.4" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f3eed8" stroke-width="0.7" opacity="0.5" />
          </svg>
          <span>4</span>
        </p>

        <p class="mt-7 text-sm font-semibold uppercase tracking-widest text-gold md:mt-8">
          Error 404
        </p>
        <h1 class="mx-auto mt-3 max-w-[16ch] text-3xl italic text-cream md:text-[38px]">
          That page isn't here.
        </h1>
        <p class="mx-auto mt-4 max-w-[52ch] text-sm leading-relaxed text-cream/60 md:text-base">
          The link may be out of date, or the page may have moved.
        </p>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

// Nuxt hands the error in as a prop. Declared but unused in the template: this
// page is deliberately the same for a 404 and a 500, and the status code is
// never shown as raw text.
defineProps<{ error?: NuxtError }>();

useHead({
  title: () => "Page not found",
  meta: [
    { name: "description", content: () => "That page could not be found. Browse the treatment menu, hours and contact details for Soft Touch Aesthetics Studio in Saskatoon." },
    // An error page must never be indexed, whatever the status code.
    { name: "robots", content: "noindex, follow" },
  ],
});
</script>

<style scoped>
/* Sized in one place so the ring and the digits cannot drift apart: the ring is
   set in em so it always tracks the numeral's font-size. */
.numeral {
  font-size: 88px;
  font-style: italic;
  line-height: 0.86;
  margin: 0;
  font-variant-numeric: lining-nums;
  font-feature-settings: "lnum" 1;
}
/* Not `.ring` — that is a Tailwind utility and paints a blue focus halo. */
.zero-ring {
  width: 0.88em;
  height: 0.88em;
}
@media (min-width: 768px) {
  .numeral {
    font-size: 170px;
  }
}
</style>
