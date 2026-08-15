<template>
  <div class="bg-[#100f0a]">
    <DarkHero
      :image="heroImage"
      :image-alt="t('alt.application')"
      :kicker="t('faq.kicker')"
      :title="t('faq.title')"
      :sub="t('faq.heroSub')"
    />

    <section class="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-[240px_minmax(0,1fr)] md:gap-14">
        <!-- Question index: a scroll strip on mobile, a sticky rail from md up -->
        <nav
          class="-mx-6 flex gap-1 overflow-x-auto px-6 pb-2 md:mx-0 md:sticky md:top-6 md:mt-1 md:h-max md:flex-col md:overflow-visible md:border-l md:border-cream/15 md:px-0 md:pb-0"
          :aria-label="t('faq.title')"
        >
          <a
            v-for="item in questions"
            :key="item.id"
            :href="`#${item.id}`"
            class="rail whitespace-nowrap rounded-full border border-cream/15 px-3 py-1.5 text-xs no-underline transition-colors md:-ml-px md:whitespace-normal md:rounded-none md:border-0 md:border-l-2 md:border-transparent md:px-3.5 md:py-2 md:text-[13px] md:leading-snug"
            :class="active === item.id ? 'is-active' : 'text-cream/50'"
            @click="active = item.id"
          >
            {{ t(item.qKey) }}
          </a>
        </nav>

        <!-- Answers, always open -->
        <div>
          <Reveal
            v-for="item in questions"
            :id="item.id"
            :key="item.id"
            ref="answerRefs"
            tag="article"
            class="scroll-mt-8 border-b border-cream/10 pb-7 last:border-none [&:not(:first-child)]:pt-7"
          >
            <h2 class="mb-2 text-xl italic text-cream md:text-2xl">{{ t(item.qKey) }}</h2>
            <p class="max-w-[62ch] text-base leading-relaxed text-cream/75">{{ t(item.aKey) }}</p>
          </Reveal>

          <!-- Whoever didn't find their answer gets a route out -->
          <Reveal
            class="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cream/12 bg-[#191710] p-6"
          >
            <div>
              <p class="text-xl italic text-cream">{{ t('faq.stillHeading') }}</p>
              <p class="mt-0.5 text-sm text-cream/60">{{ t('faq.stillBody') }}</p>
            </div>
            <NuxtLink
              to="/contact"
              class="inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white no-underline transition-transform hover:-translate-y-0.5"
            >
              {{ t('faq.stillCta') }}
            </NuxtLink>
          </Reveal>
        </div>
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
          {{ t('pages.home.cta') }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

usePageSeo({ path: "/faq", titleKey: "seo.faq.title", descriptionKey: "seo.faq.description" });

const heroImage = "/images/faq-hero.jpg";

// Ids are stable and human-readable so a single answer can be linked directly,
// e.g. /faq#hair-length in a reply to a client.
const questions = [
  { id: "hair-length", qKey: "faq.q1", aKey: "faq.a1" },
  { id: "how-long-results-last", qKey: "faq.q2", aKey: "faq.a2" },
  { id: "sensitive-skin", qKey: "faq.q3", aKey: "faq.a3" },
  { id: "brazilian-frequency", qKey: "faq.q4", aKey: "faq.a4" },
  { id: "first-brazilian", qKey: "faq.q5", aKey: "faq.a5" },
  { id: "after-sugaring", qKey: "faq.q6", aKey: "faq.a6" },
  { id: "waxing-vs-sugaring", qKey: "faq.q7", aKey: "faq.a7" },
  { id: "location", qKey: "faq.q8", aKey: "faq.a8" },
  { id: "mens-sugaring", qKey: "faq.q9", aKey: "faq.a9" },
];

// Search engines read the Q&As from JSON-LD rather than the rendered DOM.
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: questions.map((item) => ({
            "@type": "Question",
            name: t(item.qKey),
            acceptedAnswer: { "@type": "Answer", text: t(item.aKey) },
          })),
        })
      ),
    },
  ],
});

// Scroll-spy for the rail — same IntersectionObserver pattern as the homepage steps.
const active = ref(questions[0]!.id);

const route = useRoute();

onMounted(async () => {
  // The page is client-rendered, so the anchor does not exist yet when the router
  // would normally handle the hash — scroll to it once the answers are in the DOM.
  const fromHash = questions.find((q) => q.id === route.hash.replace("#", ""));
  if (fromHash) {
    active.value = fromHash.id;
    await nextTick();
    requestAnimationFrame(() => {
      document.getElementById(fromHash.id)?.scrollIntoView({ block: "start", behavior: "auto" });
    });
  }

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible?.target.id) {
        active.value = visible.target.id;
      } else if (window.scrollY < 200) {
        // Above the first answer nothing is in the detection band; without this the
        // highlight would stay wherever it was left.
        active.value = questions[0]!.id;
      }
    },
    { rootMargin: "-10% 0px -70% 0px" }
  );

  questions.forEach((q) => {
    const el = document.getElementById(q.id);
    if (el) observer.observe(el);
  });
  onUnmounted(() => observer.disconnect());
});
</script>

<style scoped>
.final-cta {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
.rail:hover {
  color: #f3eed8;
}
.rail.is-active {
  color: #f3eed8;
  border-color: #c1892f;
}
@media (min-width: 768px) {
  .rail.is-active {
    border-left-color: #c1892f;
  }
}
html {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>
