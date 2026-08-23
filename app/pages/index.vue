<template>
  <div class="bg-[#100f0a]">
    <!-- Hero -->
    <HeroSlider :slides="heroImages">
      <template #kicker>{{ t('pages.home.kicker') }}</template>
      <template #title>{{ t('pages.home.title') }}</template>
      <template #subtitle>{{ t('pages.home.subtitle') }}</template>
      <template #cta>
        <div class="flex flex-wrap justify-center gap-3">
          <a
            :href="FRESHA_BOOKING_URL"
            target="_blank"
            rel="noopener"
            class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink no-underline shadow-sm"
          >
            {{ t('pages.home.cta') }}
          </a>
          <NuxtLink
            to="/services"
            class="inline-block rounded-full border border-white/60 px-7 py-3 font-semibold text-white no-underline"
          >
            {{ t('pages.home.viewAll') }}
          </NuxtLink>
        </div>
      </template>
    </HeroSlider>

    <!-- Intro -->
    <section class="border-b border-cream/10 bg-[#100f0a] px-6 pb-12 pt-14">
      <Reveal tag="p" class="mx-auto max-w-3xl text-center text-lg leading-relaxed text-cream/80">
        {{ t('pages.home.intro') }}
      </Reveal>
    </section>

    <!-- Trust strip. These four are the studio's actual differentiators, so they
         carry more weight than the decorative strip further down the page. -->
    <section class="border-b border-cream/10 bg-[#100f0a] py-9 md:py-11">
      <Reveal class="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-6 text-base font-medium text-cream/90">
        <span v-for="n in [1, 2, 3, 4]" :key="n" class="flex items-center gap-2.5">
          <span class="h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
          {{ t(`pages.home.trust${n}`) }}
        </span>
      </Reveal>
    </section>

    <!-- Popular treatments carousel -->
    <section class="mx-auto max-w-7xl px-6 py-16">
      <Reveal class="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">{{ t('pages.services.kicker') }}</p>
          <h2 class="text-3xl italic text-cream">{{ t('pages.home.featuredHeading') }}</h2>
        </div>
        <NuxtLink to="/services" class="tap-link text-sm font-semibold uppercase tracking-wide text-gold no-underline">
          {{ t('pages.home.viewAll') }} →
        </NuxtLink>
      </Reveal>
      <TreatmentCarousel>
        <div
          v-for="item in featured"
          :key="item.key"
          class="t-card w-[320px] flex-shrink-0 snap-start flex flex-col overflow-hidden rounded-xl border border-cream/10 bg-[#191710]"
        >
          <div class="t-img h-48 overflow-hidden">
            <img :src="item.image" :alt="t(item.altKey)" width="320" height="192" loading="lazy" decoding="async" class="h-full w-full object-cover" />
          </div>
          <div class="flex flex-col p-5">
            <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-gold">
              {{ t(`pages.services.tabs.${item.category}`) }}
            </p>
            <h3 class="mb-1 text-xl italic text-cream">{{ t(`pages.services.items.${item.key}.name`) }}</h3>
            <p class="flex items-baseline gap-2 text-sm text-cream/50">
              <span>{{ t(`pages.services.items.${item.key}.duration`) }}</span>
              <span class="text-cream/80 tabular-nums">{{ formatPrice(item.price) }}</span>
            </p>
          </div>
        </div>
      </TreatmentCarousel>
    </section>

    <!-- Why sugaring -->
    <section class="border-y border-cream/10 bg-[#191710] py-16">
      <div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <Reveal class="h-[420px] overflow-hidden rounded-2xl">
          <img src="/images/hero/hero-3.jpg" :alt="t('alt.lemons')" width="1920" height="1200" loading="lazy" decoding="async" class="h-full w-full object-cover" />
        </Reveal>
        <div>
          <Reveal tag="p" class="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">{{ t('pages.services.whyKicker') }}</Reveal>
          <Reveal tag="h2" class="mb-6 text-3xl italic text-cream">{{ t('pages.home.whyHeading') }}</Reveal>
          <Reveal v-for="n in [1, 2, 3]" :key="n" class="flex gap-4 border-b border-cream/10 py-4 last:border-none">
            <span class="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">✓</span>
            <div>
              <h3 class="mb-1 font-semibold text-cream">{{ t(`pages.home.why${n}Title`) }}</h3>
              <p class="text-sm text-cream/70">{{ t(`pages.home.why${n}Body`) }}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- Gallery marquee -->
    <section class="overflow-hidden bg-[#211e14] py-16">
      <Reveal class="mx-auto max-w-7xl px-6">
        <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">{{ t('pages.home.galleryKicker') }}</p>
        <h2 class="mb-2 text-3xl italic text-cream">{{ t('pages.home.galleryHeading') }}</h2>
        <p class="text-sm text-cream/70">{{ t('pages.home.galleryBody') }}</p>
      </Reveal>
      <div class="marquee mt-10">
        <div class="marquee-track">
          <div v-for="(g, i) in galleryDoubled" :key="i" class="g-card relative h-80 w-64 flex-shrink-0 overflow-hidden rounded-xl">
            <img :src="g.src" :alt="t(g.altKey)" width="256" height="320" loading="lazy" decoding="async" class="h-full w-full object-cover" />
            <div class="g-cap absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-cream">{{ t(g.captionKey) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="mx-auto max-w-7xl px-6 py-16">
      <Reveal tag="h2" class="mb-10 text-3xl italic text-cream">{{ t('pages.home.howHeading') }}</Reveal>
      <div ref="stepsWrap" class="relative grid grid-cols-1 gap-8 md:grid-cols-4">
        <div class="steps-line absolute left-[60px] right-[60px] top-[22px] hidden h-0.5 bg-cream/15 md:block">
          <div class="steps-line-fill h-full bg-gold transition-all duration-700" :style="{ width: lineFillPct + '%' }" />
        </div>
        <div v-for="n in [1, 2, 3, 4]" :key="n" ref="stepRefs" class="step relative text-center">
          <div
            class="step-num relative z-10 mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border-2 font-semibold transition-colors"
            :class="
              activeStep >= n - 1
                ? 'border-gold bg-[#26200f] text-gold'
                : 'border-cream/25 bg-[#100f0a] text-cream/60'
            "
          >
            {{ String(n).padStart(2, "0") }}
          </div>
          <h3 class="mb-2 text-lg font-semibold italic text-cream">{{ t(`pages.home.step${n}Title`) }}</h3>
          <p class="text-sm text-cream/70">{{ t(`pages.home.step${n}Body`) }}</p>
        </div>
      </div>
    </section>

    <!-- Prep & Aftercare tabs -->
    <section class="border-y border-cream/10 bg-[#191710] py-16">
      <div class="mx-auto max-w-4xl px-6">
        <Reveal class="rounded-2xl border border-cream/10 bg-[#100f0a] p-8 md:p-12">
          <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">{{ t('pages.home.readyKicker') }}</p>
          <h2 class="mb-6 text-2xl italic text-cream">{{ t('pages.home.readyHeading') }}</h2>
          <div class="mb-8 flex gap-2">
            <button
              type="button"
              class="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
              :class="activeTab === 'before' ? 'bg-gold text-ink' : 'border border-cream/20 text-cream/60'"
              @click="activeTab = 'before'"
            >
              {{ t('prepare.beforeHeading') }}
            </button>
            <button
              type="button"
              class="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
              :class="activeTab === 'after' ? 'bg-gold text-ink' : 'border border-cream/20 text-cream/60'"
              @click="activeTab = 'after'"
            >
              {{ t('prepare.afterHeading') }}
            </button>
          </div>

          <!-- Both tabs read from the shared `prepare` namespace, so this and the
               Services page can never give conflicting advice. -->
          <template v-if="activeTab === 'before'">
            <p class="mb-2 text-sm text-cream/60">{{ t('prepare.beforeIntro') }}</p>
            <ul class="space-y-3">
              <li v-for="n in 5" :key="n" class="flex gap-3 border-b border-dashed border-cream/15 pb-3 text-sm text-cream/75 last:border-none">
                <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                {{ t(`prepare.before${n}`) }}
              </li>
            </ul>
          </template>
          <template v-else>
            <p class="text-sm text-cream/60">{{ t('prepare.afterIntro') }}</p>
            <p class="mb-2 mt-3 text-[11px] font-bold uppercase tracking-[0.1em] text-cream/45">
              {{ t('prepare.avoidIntro') }}
            </p>
            <ul class="space-y-3">
              <li v-for="n in 5" :key="n" class="flex gap-3 border-b border-dashed border-cream/15 pb-3 text-sm text-cream/75 last:border-none">
                <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cream/35" />
                {{ t(`prepare.avoid${n}`) }}
              </li>
            </ul>
            <p class="mt-4 rounded-lg border border-gold/25 bg-gold/[0.08] px-3.5 py-2.5 text-sm leading-relaxed text-cream/75">
              {{ t('prepare.afterTip') }}
            </p>
          </template>
        </Reveal>
      </div>
    </section>

    <!-- FAQ accordion -->
    <section class="mx-auto max-w-3xl px-6 py-16">
      <Reveal tag="h2" class="mb-10 text-center text-3xl italic text-cream">{{ t('pages.home.faqHeading') }}</Reveal>
      <!-- A teaser only: the first three of the shared `faq` set, full list at /faq -->
      <Reveal v-for="n in 3" :key="n" class="border-b border-cream/12">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-cream"
          @click="openFaq = openFaq === n ? null : n"
        >
          {{ t(`faq.q${n}`) }}
          <span class="flex-shrink-0 text-xl text-gold transition-transform" :class="{ 'rotate-45': openFaq === n }">+</span>
        </button>
        <div class="grid overflow-hidden transition-all duration-300" :style="{ gridTemplateRows: openFaq === n ? '1fr' : '0fr' }">
          <!-- Padding lives on the inner element so the row collapses fully to 0 -->
          <div class="min-h-0">
            <p class="pb-5 text-sm text-cream/70">{{ t(`faq.a${n}`) }}</p>
          </div>
        </div>
      </Reveal>
      <Reveal class="mt-8 text-center">
        <NuxtLink
          to="/faq"
          class="tap-link text-sm font-semibold uppercase tracking-wide text-gold no-underline"
        >
          {{ t('faq.seeAll') }} →
        </NuxtLink>
      </Reveal>
    </section>

    <!-- Final CTA -->
    <section class="final-cta py-16 text-center">
      <div class="mx-auto max-w-2xl px-6">
        <h2 class="mb-4 text-3xl italic text-cream">{{ t('pages.home.finalCtaHeading') }}</h2>
        <p class="mx-auto mb-8 max-w-lg text-cream/85">{{ t('pages.home.finalCtaBody') }}</p>
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
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

usePageSeo({ path: "/", titleKey: "seo.home.title", descriptionKey: "seo.home.description" });

const heroImages = ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg", "/images/hero/hero-3.jpg"];

// Four hand-picked cards, resolved against the shared menu so the name, duration
// and price shown here can never disagree with /services.
const featured = HOME_FEATURED.map((card) => {
  const service = SERVICES.find((s) => s.key === card.key);
  if (!service) throw new Error(`HOME_FEATURED references unknown service: ${card.key}`);
  return { ...card, ...service };
});

const gallery = [
  { src: "/images/hero/hero-1.jpg", captionKey: "pages.home.gallery1", altKey: "alt.paste" },
  { src: "/images/hero/hero-3.jpg", captionKey: "pages.home.gallery2", altKey: "alt.lemons" },
  { src: "/images/hero/hero-2.jpg", captionKey: "pages.home.gallery3", altKey: "alt.legs" },
  { src: "/images/home/table.jpg", captionKey: "pages.home.gallery4", altKey: "alt.treatment" },
  { src: "/images/home/portrait.jpg", captionKey: "pages.home.gallery5", altKey: "alt.portrait" },
];
const galleryDoubled = [...gallery, ...gallery];

// How it works: scroll-driven step progress
const stepsWrap = ref<HTMLElement | null>(null);
const stepRefs = ref<HTMLElement[]>([]);
const activeStep = ref(-1);
const lineFillPct = computed(() => (activeStep.value <= 0 ? 0 : (activeStep.value / 3) * 100));

onMounted(() => {
  if (!("IntersectionObserver" in window)) {
    activeStep.value = 3;
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const i = stepRefs.value.indexOf(entry.target as HTMLElement);
        if (i > activeStep.value) activeStep.value = i;
      });
    },
    { threshold: 0.6 }
  );
  stepRefs.value.forEach((el) => el && observer.observe(el));
});

// Prep/Aftercare tabs
const activeTab = ref<"before" | "after">("before");

// FAQ accordion
const openFaq = ref<number | null>(null);
</script>

<style scoped>
.final-cta {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
.g-cap {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
}
/* Matches the treatment rows on /services */
.t-card {
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.t-card:hover {
  border-color: rgba(217, 163, 77, 0.55);
  transform: translateY(-3px);
}
.t-img img {
  filter: grayscale(0.55);
  transition: filter 0.3s ease, transform 0.5s ease;
}
.t-card:hover .t-img img {
  filter: none;
  transform: scale(1.05);
}
@media (prefers-reduced-motion: reduce) {
  .t-card,
  .t-img img {
    transition: none;
  }
}
.marquee {
  overflow: hidden;
}
.marquee-track {
  display: flex;
  gap: 20px;
  width: max-content;
  padding: 0 24px;
  animation: marquee 34s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
