<template>
  <div class="bg-[#100f0a]">
    <DarkHero
      :image="heroImage"
      :kicker="t('pages.services.kicker')"
      :title="t('pages.services.title')"
      :sub="t('pages.services.intro')"
    />

    <!-- Sticky filter chips -->
    <div class="sticky top-0 z-30 border-b border-cream/10 bg-[#100f0a]/95 backdrop-blur">
      <div class="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 py-4">
        <button
          v-for="chip in chips"
          :key="chip.key"
          type="button"
          :aria-pressed="active === chip.key"
          class="chip rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
          :class="
            active === chip.key
              ? 'border-gold bg-gold text-ink'
              : 'border-cream/20 text-cream/65 hover:border-gold/60 hover:text-cream'
          "
          @click="select(chip.key)"
        >
          {{ chip.key === 'all' ? t('pages.services.filterAll') : t(`pages.services.categories.${chip.key}`) }}
        </button>
      </div>
    </div>

    <!-- Treatment rows -->
    <section class="mx-auto max-w-7xl px-6 pb-4 pt-10">
      <div class="max-w-3xl">
        <p class="mb-6 text-sm uppercase tracking-widest text-cream/40">
          {{
            active === 'all'
              ? t('pages.services.showingAll')
              : t('pages.services.showingCategory', { category: t(`pages.services.categories.${active}`) })
          }}
        </p>

        <ul v-if="visibleItems.length" class="list-none space-y-1 p-0">
          <li v-for="item in visibleItems" :key="item.key">
            <a
              :href="FRESHA_BOOKING_URL"
              target="_blank"
              rel="noopener"
              class="row grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-lg px-3 py-4 no-underline transition-colors hover:bg-cream/[0.06] md:gap-6"
            >
              <img :src="item.image" alt="" class="thumb h-16 w-16 rounded-md object-cover" />
              <div class="min-w-0">
                <p class="text-[11px] font-semibold uppercase tracking-widest text-gold">
                  {{ t(`pages.services.categories.${item.category}`) }}
                </p>
                <h2 class="truncate text-xl italic text-cream md:text-2xl">
                  {{ t(`pages.services.items.${item.key}.name`) }}
                </h2>
                <p v-if="item.hasNote" class="mt-0.5 truncate text-sm text-cream/50">
                  {{ t(`pages.services.items.${item.key}.note`) }}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm uppercase tracking-wide text-cream/60">
                  {{ t(`pages.services.items.${item.key}.duration`) }}
                </span>
                <span
                  class="book hidden rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white md:inline-block"
                >
                  {{ t('pages.services.book') }}
                </span>
              </div>
            </a>
          </li>
        </ul>

        <!-- Category with nothing listed yet -->
        <div v-else class="rounded-xl border border-dashed border-cream/20 px-6 py-12 text-center">
          <h2 class="mb-2 text-2xl italic text-cream">{{ t('pages.services.emptyHeading') }}</h2>
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

    <!-- Bundle spotlights -->
    <section v-if="showBundles" class="mx-auto max-w-7xl px-6 py-12">
      <Reveal class="mb-6">
        <h2 class="text-2xl italic text-cream">{{ t('pages.services.bundlesHeading') }}</h2>
        <p class="text-sm text-cream/55">{{ t('pages.services.bundlesBody') }}</p>
      </Reveal>
      <div class="grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
        <Reveal v-for="bundle in bundles" :key="bundle.key">
          <a
            :href="FRESHA_BOOKING_URL"
            target="_blank"
            rel="noopener"
            class="bundle relative flex h-64 items-end overflow-hidden rounded-xl no-underline"
          >
            <img :src="bundle.image" alt="" class="absolute inset-0 h-full w-full object-cover" />
            <span class="bundle-scrim absolute inset-0" />
            <span class="relative block p-5">
              <span class="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-gold">
                {{ t(`pages.services.items.${bundle.key}.duration`) }}
              </span>
              <span class="mb-1 block text-2xl italic text-cream">
                {{ t(`pages.services.items.${bundle.key}.name`) }}
              </span>
              <span class="block text-sm text-cream/70">{{ t(`pages.services.items.${bundle.key}.note`) }}</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>

    <!-- Why choose sugaring — always shown, unlike the conditional bundles above -->
    <section class="mx-auto max-w-7xl px-6 py-12 md:py-14">
      <div class="grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <Reveal>
          <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            {{ t('pages.services.whyKicker') }}
          </p>
          <h2 class="mb-3 text-3xl italic text-cream">{{ t('pages.services.whyHeading') }}</h2>
          <p class="mb-4 text-base leading-relaxed text-cream/75">{{ t('pages.services.whyIntro') }}</p>
          <p class="text-sm leading-relaxed text-cream/55">{{ t('pages.services.whyClosing') }}</p>
        </Reveal>

        <Reveal>
          <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-cream/50">
            {{ t('pages.services.whyUnlike') }}
          </p>
          <ul class="list-none p-0">
            <li
              v-for="n in 5"
              :key="n"
              class="flex gap-3 border-b border-cream/10 py-3 text-sm leading-relaxed text-cream/80 last:border-none"
            >
              <span
                class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-gold/50 text-[10px] text-gold"
                aria-hidden="true"
              >
                ✓
              </span>
              {{ t(`pages.services.whyPoint${n}`) }}
            </li>
          </ul>
        </Reveal>
      </div>
    </section>

    <!-- Before / after your appointment — shared with the homepage via the `prepare` namespace -->
    <section class="border-y border-cream/10 bg-[#191710] py-14 md:py-16">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2 md:gap-8">
        <Reveal class="rounded-2xl border border-cream/10 bg-[#100f0a] p-6 md:p-8">
          <span
            class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold"
          >
            <span aria-hidden="true">✓</span>{{ t('prepare.doLabel') }}
          </span>
          <h2 class="text-2xl italic text-cream">{{ t('prepare.beforeHeading') }}</h2>
          <p class="mt-1 text-sm text-cream/60">{{ t('prepare.beforeIntro') }}</p>
          <ul class="mt-3 list-none p-0">
            <li
              v-for="n in 5"
              :key="n"
              class="flex gap-3 border-b border-dashed border-cream/15 py-2.5 text-sm leading-relaxed text-cream/80 last:border-none"
            >
              <span class="mt-0.5 flex-shrink-0 text-xs text-gold" aria-hidden="true">✓</span>
              {{ t(`prepare.before${n}`) }}
            </li>
          </ul>
        </Reveal>

        <Reveal class="rounded-2xl border border-cream/10 bg-[#100f0a] p-6 md:p-8">
          <span
            class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream/50"
          >
            <span aria-hidden="true">✕</span>{{ t('prepare.avoidLabel') }}
          </span>
          <h2 class="text-2xl italic text-cream">{{ t('prepare.afterHeading') }}</h2>
          <p class="mt-1 text-sm text-cream/60">{{ t('prepare.afterIntro') }}</p>
          <p class="mt-3 text-[11px] font-bold uppercase tracking-[0.1em] text-cream/45">
            {{ t('prepare.avoidIntro') }}
          </p>
          <ul class="mt-1 list-none p-0">
            <li
              v-for="n in 5"
              :key="n"
              class="flex gap-3 border-b border-dashed border-cream/15 py-2.5 text-sm leading-relaxed text-cream/80 last:border-none"
            >
              <span class="mt-0.5 flex-shrink-0 text-xs text-cream/35" aria-hidden="true">✕</span>
              {{ t(`prepare.avoid${n}`) }}
            </li>
          </ul>
          <p class="mt-4 rounded-lg border border-gold/25 bg-gold/[0.08] px-3.5 py-2.5 text-sm leading-relaxed text-cream/75">
            {{ t('prepare.afterTip') }}
          </p>
        </Reveal>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta px-6 py-16 text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-4 text-3xl italic text-cream">{{ t('pages.services.livePricing') }}</h2>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-white no-underline shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {{ t('pages.services.viewFullMenu') }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

const heroImage = "/images/hero/hero-2.jpg";

type ServiceItem = { key: string; category: string; hasNote: boolean; image: string };

const categories = [
  { key: "mensSugaring", anchor: "mens-sugaring" },
  { key: "intimate", anchor: "intimate" },
  { key: "body", anchor: "body" },
  { key: "face", anchor: "face" },
  { key: "bundles", anchor: "bundles" },
];

// Only treatments that exist in the locale files — nothing is invented here.
const items: ServiceItem[] = [
  { key: "brazilian", category: "intimate", hasNote: false, image: "/images/hero/hero-2.jpg" },
  { key: "underarms", category: "body", hasNote: false, image: "/images/hero/hero-3.jpg" },
  { key: "faceRefresh", category: "bundles", hasNote: true, image: "/images/home/portrait.jpg" },
  { key: "summerReady", category: "bundles", hasNote: true, image: "/images/hero/hero-1.jpg" },
];

const chips = [{ key: "all" }, ...categories.map((c) => ({ key: c.key }))];

const active = ref("all");

const visibleItems = computed(() =>
  items.filter((item) => item.category !== "bundles" && (active.value === "all" || item.category === active.value))
);
const bundles = computed(() => items.filter((item) => item.category === "bundles"));
const showBundles = computed(() => active.value === "all" || active.value === "bundles");

function select(key: string) {
  active.value = key;
  const anchor = categories.find((c) => c.key === key)?.anchor;
  const hash = anchor ? `#${anchor}` : "";
  history.replaceState(history.state, "", `${route.path}${hash}`);
}

// Honour the deep links in the footer (/services#intimate, #body, …)
function syncFromHash() {
  const anchor = route.hash.replace("#", "");
  active.value = categories.find((c) => c.anchor === anchor)?.key ?? "all";
}
onMounted(syncFromHash);
watch(() => route.hash, syncFromHash);
</script>

<style scoped>
.final-cta {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
.bundle-scrim {
  background: linear-gradient(0deg, rgba(16, 15, 10, 0.9) 15%, rgba(16, 15, 10, 0.05) 75%);
}
.thumb {
  filter: grayscale(0.6);
  transition: filter 0.3s ease, transform 0.3s ease;
}
.row:hover .thumb {
  filter: none;
  transform: scale(1.05);
}
.bundle img {
  transition: transform 0.6s ease;
}
.bundle:hover img {
  transform: scale(1.06);
}
@media (prefers-reduced-motion: reduce) {
  .thumb,
  .bundle img {
    transition: none;
  }
}
</style>
