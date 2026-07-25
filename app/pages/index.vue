<template>
  <div>
    <!-- Hero -->
    <section class="hero-section relative overflow-hidden text-center">
      <div class="relative z-10 mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p class="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
          {{ t('pages.home.kicker') }}
        </p>
        <h1 class="hero-title mb-6 text-5xl italic text-cream md:text-6xl">
          {{ t('pages.home.title') }}
        </h1>
        <p class="mx-auto mb-9 max-w-xl text-lg text-cream/85">
          {{ t('pages.home.subtitle') }}
        </p>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink no-underline shadow-sm"
        >
          {{ t('pages.home.cta') }}
        </a>
      </div>
    </section>

    <!-- Featured treatments -->
    <section class="mx-auto max-w-7xl px-6 py-16">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 class="text-3xl italic">{{ t('pages.home.featuredHeading') }}</h2>
        <NuxtLink to="/services" class="text-sm font-semibold uppercase tracking-wide text-primary no-underline">
          {{ t('pages.home.viewAll') }} →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="item in featured"
          :key="item.key"
          class="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
            {{ t(`pages.services.categories.${item.category}`) }}
          </p>
          <h3 class="mb-3 text-xl italic">{{ t(`pages.services.items.${item.key}.name`) }}</h3>
          <div class="mt-auto flex items-center justify-between text-sm text-gray-500">
            <span>{{ t(`pages.services.items.${item.key}.duration`) }}</span>
            <span class="text-base font-bold text-gold">{{ t(`pages.services.items.${item.key}.price`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Why sugaring -->
    <section class="bg-cream py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="mb-10 text-3xl italic">{{ t('pages.home.whyHeading') }}</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div v-for="n in [1, 2, 3]" :key="n">
            <h3 class="mb-2 text-lg font-semibold">{{ t(`pages.home.why${n}Title`) }}</h3>
            <p class="text-sm text-gray-700">{{ t(`pages.home.why${n}Body`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const featured = [
  { key: "underarms", category: "body" },
  { key: "brazilian", category: "intimate" },
  { key: "faceRefresh", category: "bundles" },
];
</script>

<style scoped>
.hero-section {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
.hero-title {
  font-weight: 600;
  line-height: 1.1;
  text-wrap: balance;
}
</style>
