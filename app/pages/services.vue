<template>
  <div>
    <PageBanner :kicker="t('pages.services.kicker')" :title="t('pages.services.title')" />

    <div class="mx-auto max-w-7xl px-6 py-16">
    <div class="mx-auto mb-12 max-w-2xl text-center">
      <p class="mb-6 text-base leading-relaxed text-gray-700">
        {{ t('pages.services.intro') }}
      </p>
      <a
        :href="FRESHA_BOOKING_URL"
        target="_blank"
        rel="noopener"
        class="inline-block rounded-full bg-gold px-6 py-3 font-medium text-ink no-underline"
      >
        {{ t('pages.services.viewFullMenu') }}
      </a>
    </div>

    <div class="mx-auto max-w-5xl space-y-14">
      <div v-for="category in categories" :id="category.anchor" :key="category.key" class="scroll-mt-24">
        <h2 class="mb-6 border-b border-gray-200 pb-3 text-2xl italic">
          {{ t(`pages.services.categories.${category.key}`) }}
        </h2>

        <div v-if="category.items.length" class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            v-for="item in category.items"
            :key="item.key"
            class="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 class="mb-2 text-xl italic">{{ t(`pages.services.items.${item.key}.name`) }}</h3>
            <p class="text-sm text-gray-500">{{ t(`pages.services.items.${item.key}.duration`) }}</p>
            <p v-if="item.hasNote" class="mt-2 text-sm text-gray-600">
              {{ t(`pages.services.items.${item.key}.note`) }}
            </p>
          </div>
        </div>

        <p v-else class="text-sm text-gray-500">
          {{ t('pages.services.moreOnFresha') }}
          <a :href="FRESHA_BOOKING_URL" target="_blank" rel="noopener" class="font-medium text-gold no-underline">
            {{ t('pages.services.viewFullMenu') }}
          </a>
        </p>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

type ServiceItem = { key: string; hasNote: boolean };

const categories: { key: string; anchor: string; items: ServiceItem[] }[] = [
  { key: "mensSugaring", anchor: "mens-sugaring", items: [] },
  { key: "intimate", anchor: "intimate", items: [{ key: "brazilian", hasNote: false }] },
  { key: "body", anchor: "body", items: [{ key: "underarms", hasNote: false }] },
  { key: "face", anchor: "face", items: [] },
  {
    key: "bundles",
    anchor: "bundles",
    items: [
      { key: "faceRefresh", hasNote: true },
      { key: "summerReady", hasNote: true },
    ],
  },
];
</script>
