<template>
  <div class="bg-[#100f0a]">
    <DarkHero
      :image="image"
      :image-alt="t(altKey)"
      :kicker="t(`pages.categoryPages.${copyKey}.kicker`)"
      :title="t(`pages.categoryPages.${copyKey}.title`)"
    />

    <!-- Intro -->
    <section class="mx-auto max-w-7xl px-6 pt-14 md:pt-20">
      <Reveal tag="p" class="max-w-3xl text-lg leading-relaxed text-cream/80">
        {{ t(`pages.categoryPages.${copyKey}.intro`) }}
      </Reveal>
      <Reveal class="mt-8">
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-white no-underline shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {{ t('header.cta') }}
        </a>
      </Reveal>
    </section>

    <!-- Treatments in this category -->
    <section class="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <div class="max-w-3xl">
        <Reveal tag="h2" class="mb-6 text-2xl italic text-cream">
          {{ t('pages.categoryPages.treatmentsHeading') }}
        </Reveal>

        <ul v-if="items.length" class="list-none space-y-1 p-0">
          <li v-for="item in items" :key="item.key">
            <a
              :href="FRESHA_BOOKING_URL"
              target="_blank"
              rel="noopener"
              class="row grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-lg px-3 py-4 no-underline transition-colors hover:bg-cream/[0.06] md:gap-6"
            >
              <img :src="item.image" :alt="t(item.altKey)" width="64" height="64" class="thumb h-16 w-16 rounded-md object-cover" />
              <div class="min-w-0">
                <h3 class="truncate text-xl italic text-cream md:text-2xl">
                  {{ t(`pages.services.items.${item.key}.name`) }}
                </h3>
                <p v-if="item.hasNote" class="mt-0.5 truncate text-sm text-cream/50">
                  {{ t(`pages.services.items.${item.key}.note`) }}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm uppercase tracking-wide text-cream/60">
                  {{ t(`pages.services.items.${item.key}.duration`) }}
                </span>
                <span
                  class="hidden rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white md:inline-block"
                >
                  {{ t('pages.services.book') }}
                </span>
              </div>
            </a>
          </li>
        </ul>

        <!-- Nothing listed for this category yet -->
        <div v-else class="rounded-xl border border-dashed border-cream/20 px-6 py-12 text-center">
          <p class="mb-2 text-xl italic text-cream">{{ t('pages.services.emptyHeading') }}</p>
          <p class="mx-auto mb-6 max-w-md text-cream/60">{{ t('pages.services.moreOnFresha') }}</p>
          <a
            :href="FRESHA_BOOKING_URL"
            target="_blank"
            rel="noopener"
            class="inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white no-underline"
          >
            {{ t('pages.services.viewFullMenu') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Internal links to the sibling service pages -->
    <section class="border-t border-cream/10 bg-[#191710] py-12">
      <div class="mx-auto max-w-7xl px-6">
        <Reveal tag="p" class="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
          {{ t('pages.services.kicker') }}
        </Reveal>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal v-for="sibling in siblings" :key="sibling.path">
            <NuxtLink
              :to="sibling.path"
              class="sibling block h-full rounded-xl border border-cream/10 bg-[#100f0a] p-5 no-underline"
            >
              <span class="block text-lg italic text-cream">
                {{ t(`pages.categoryPages.${sibling.copyKey}.title`) }}
              </span>
            </NuxtLink>
          </Reveal>
        </div>
        <Reveal class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <NuxtLink to="/services" class="text-gold no-underline">{{ t('pages.services.viewFullMenu') }} →</NuxtLink>
          <NuxtLink to="/faq" class="text-cream/60 no-underline">{{ t('faq.title') }} →</NuxtLink>
          <NuxtLink to="/contact" class="text-cream/60 no-underline">{{ t('header.nav.contact') }} →</NuxtLink>
        </Reveal>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta px-6 py-16 text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-4 text-3xl italic text-cream">{{ t('pages.home.finalCtaHeading') }}</h2>
        <p class="mx-auto mb-8 max-w-lg text-cream/85">{{ t('pages.home.finalCtaBody') }}</p>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-white no-underline shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {{ t('header.cta') }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  copyKey: string;
  category: TreatmentCategory;
  image: string;
  altKey: string;
}>();

const { t } = useI18n();

const items = computed(() => treatmentsIn(props.category));
const siblings = computed(() => CATEGORY_PAGES.filter((page) => page.copyKey !== props.copyKey));
</script>

<style scoped>
.final-cta {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
.thumb {
  filter: grayscale(0.6);
  transition: filter 0.3s ease, transform 0.3s ease;
}
.row:hover .thumb {
  filter: none;
  transform: scale(1.05);
}
.sibling {
  transition: border-color 0.22s ease, transform 0.22s ease;
}
.sibling:hover {
  border-color: rgba(217, 163, 77, 0.5);
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .thumb,
  .sibling {
    transition: none;
  }
}
</style>
