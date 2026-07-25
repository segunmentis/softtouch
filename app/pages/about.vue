<template>
  <div>
    <PageBanner :kicker="t('pages.about.kicker')" :title="t('pages.about.title')" />

    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="mx-auto max-w-2xl">
        <p class="mb-5 text-base leading-relaxed text-gray-700">
          {{ t('pages.about.paragraph1') }}
        </p>
        <p class="mb-5 text-base leading-relaxed text-gray-700">
          {{ t('pages.about.paragraph2') }}
        </p>
        <p class="mb-10 text-base leading-relaxed text-gray-700">
          {{ t('pages.about.paragraph3') }}
        </p>

        <div class="rounded-lg bg-cream p-8">
          <h2 class="mb-2 text-xl font-semibold">{{ t('pages.about.ctaHeading') }}</h2>
          <p class="mb-5 text-sm text-gray-700">{{ t('pages.about.ctaBody') }}</p>
          <a
            :href="FRESHA_BOOKING_URL"
            target="_blank"
            rel="noopener"
            class="inline-block rounded-full bg-gold px-6 py-3 font-medium text-ink no-underline"
          >
            {{ t('pages.about.cta') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
