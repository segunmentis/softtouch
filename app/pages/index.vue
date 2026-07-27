<template>
  <div>
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

    <!-- Trust strip -->
    <section class="border-b border-gray-100 bg-white py-6">
      <Reveal class="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-sm font-medium text-gray-600">
        <span v-for="n in [1, 2, 3, 4]" :key="n" class="flex items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-gold" />
          {{ t(`pages.home.trust${n}`) }}
        </span>
      </Reveal>
    </section>

    <!-- Popular treatments carousel -->
    <section class="mx-auto max-w-7xl px-6 py-16">
      <Reveal class="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">{{ t('pages.services.kicker') }}</p>
          <h2 class="text-3xl italic">{{ t('pages.home.featuredHeading') }}</h2>
        </div>
        <NuxtLink to="/services" class="text-sm font-semibold uppercase tracking-wide text-primary no-underline">
          {{ t('pages.home.viewAll') }} →
        </NuxtLink>
      </Reveal>
      <TreatmentCarousel>
        <div
          v-for="item in featured"
          :key="item.key"
          class="t-card w-[320px] flex-shrink-0 snap-start flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div class="t-img h-48 overflow-hidden">
            <img :src="item.image" alt="" class="h-full w-full object-cover" />
          </div>
          <div class="flex flex-col p-5">
            <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {{ t(`pages.services.categories.${item.category}`) }}
            </p>
            <h3 class="mb-1 text-xl italic">{{ t(`pages.services.items.${item.key}.name`) }}</h3>
            <p class="text-sm text-gray-500">{{ t(`pages.services.items.${item.key}.duration`) }}</p>
          </div>
        </div>
      </TreatmentCarousel>
    </section>

    <!-- Why sugaring -->
    <section class="bg-cream py-16">
      <div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <Reveal class="h-[420px] overflow-hidden rounded-2xl">
          <img src="/images/hero/hero-3.jpg" alt="" class="h-full w-full object-cover" />
        </Reveal>
        <div>
          <Reveal tag="p" class="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">{{ t('pages.services.kicker') }}</Reveal>
          <Reveal tag="h2" class="mb-6 text-3xl italic">{{ t('pages.home.whyHeading') }}</Reveal>
          <Reveal v-for="n in [1, 2, 3]" :key="n" class="flex gap-4 border-b border-gray-200 py-4 last:border-none">
            <span class="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-gold">✓</span>
            <div>
              <h3 class="mb-1 font-semibold">{{ t(`pages.home.why${n}Title`) }}</h3>
              <p class="text-sm text-gray-700">{{ t(`pages.home.why${n}Body`) }}</p>
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
            <img :src="g.src" alt="" class="h-full w-full object-cover" />
            <div class="g-cap absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-cream">{{ t(g.captionKey) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="mx-auto max-w-7xl px-6 py-16">
      <Reveal tag="h2" class="mb-10 text-3xl italic">{{ t('pages.home.howHeading') }}</Reveal>
      <div ref="stepsWrap" class="relative grid grid-cols-1 gap-8 md:grid-cols-4">
        <div class="steps-line absolute left-[60px] right-[60px] top-[22px] hidden h-0.5 bg-gray-200 md:block">
          <div class="steps-line-fill h-full bg-gold transition-all duration-700" :style="{ width: lineFillPct + '%' }" />
        </div>
        <div v-for="n in [1, 2, 3, 4]" :key="n" ref="stepRefs" class="step relative text-center">
          <div
            class="step-num relative z-10 mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white font-semibold text-ink transition-colors"
            :class="activeStep >= n - 1 ? 'border-gold bg-cream text-gold' : 'border-gray-300'"
          >
            {{ String(n).padStart(2, "0") }}
          </div>
          <h3 class="mb-2 text-lg font-semibold italic">{{ t(`pages.home.step${n}Title`) }}</h3>
          <p class="text-sm text-gray-700">{{ t(`pages.home.step${n}Body`) }}</p>
        </div>
      </div>
    </section>

    <!-- Prep & Aftercare tabs -->
    <section class="bg-cream py-16">
      <div class="mx-auto max-w-4xl px-6">
        <Reveal class="rounded-2xl bg-white p-8 shadow-sm md:p-12">
          <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">{{ t('pages.home.readyKicker') }}</p>
          <h2 class="mb-6 text-2xl italic">{{ t('pages.home.readyHeading') }}</h2>
          <div class="mb-8 flex gap-2">
            <button
              type="button"
              class="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
              :class="activeTab === 'before' ? 'bg-primary text-white' : 'border border-gray-200 text-gray-500'"
              @click="activeTab = 'before'"
            >
              {{ t('pages.home.prepHeading') }}
            </button>
            <button
              type="button"
              class="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
              :class="activeTab === 'after' ? 'bg-primary text-white' : 'border border-gray-200 text-gray-500'"
              @click="activeTab = 'after'"
            >
              {{ t('pages.home.aftercareHeading') }}
            </button>
          </div>
          <ul v-if="activeTab === 'before'" class="space-y-3">
            <li v-for="n in [1, 2, 3, 4]" :key="n" class="flex gap-3 border-b border-dashed border-gray-200 pb-3 text-sm text-gray-700 last:border-none">
              <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
              {{ t(`pages.home.prep${n}`) }}
            </li>
          </ul>
          <ul v-else class="space-y-3">
            <li v-for="n in [1, 2, 3, 4]" :key="n" class="flex gap-3 border-b border-dashed border-gray-200 pb-3 text-sm text-gray-700 last:border-none">
              <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
              {{ t(`pages.home.aftercare${n}`) }}
            </li>
          </ul>
        </Reveal>
      </div>
    </section>

    <!-- FAQ accordion -->
    <section class="mx-auto max-w-3xl px-6 py-16">
      <Reveal tag="h2" class="mb-10 text-center text-3xl italic">{{ t('pages.home.faqHeading') }}</Reveal>
      <Reveal v-for="n in [1, 2, 3, 4]" :key="n" class="border-b border-gray-200">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold"
          @click="openFaq = openFaq === n ? null : n"
        >
          {{ t(`pages.home.faq${n}Q`) }}
          <span class="flex-shrink-0 text-xl text-gold transition-transform" :class="{ 'rotate-45': openFaq === n }">+</span>
        </button>
        <div class="grid overflow-hidden transition-all duration-300" :style="{ gridTemplateRows: openFaq === n ? '1fr' : '0fr' }">
          <p class="min-h-0 pb-5 text-sm text-gray-700">{{ t(`pages.home.faq${n}A`) }}</p>
        </div>
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

const heroImages = ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg", "/images/hero/hero-3.jpg"];

const featured = [
  { key: "underarms", category: "body", image: "/images/hero/hero-2.jpg" },
  { key: "brazilian", category: "intimate", image: "/images/home/table.jpg" },
  { key: "faceRefresh", category: "bundles", image: "/images/home/portrait.jpg" },
  { key: "summerReady", category: "bundles", image: "/images/hero/hero-1.jpg" },
];

const gallery = [
  { src: "/images/hero/hero-1.jpg", captionKey: "pages.home.gallery1" },
  { src: "/images/hero/hero-3.jpg", captionKey: "pages.home.gallery2" },
  { src: "/images/hero/hero-2.jpg", captionKey: "pages.home.gallery3" },
  { src: "/images/home/table.jpg", captionKey: "pages.home.gallery4" },
  { src: "/images/home/portrait.jpg", captionKey: "pages.home.gallery5" },
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
