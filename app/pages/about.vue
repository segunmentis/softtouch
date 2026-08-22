<template>
  <div class="bg-[#100f0a]">
    <DarkHero
      :image="heroImage"
      :image-alt="t('alt.lemons')"
      :kicker="t('pages.about.kicker')"
      :title="t('pages.about.title')"
      :sub="t('pages.about.heroSub')"
    />

    <!-- Scattered prints -->
    <section class="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <div class="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.15fr_1fr]">
        <!-- Stacked on mobile, scattered on desktop -->
        <Reveal class="relative grid grid-cols-2 gap-4 md:block md:h-[460px]">
          <figure
            v-for="print in prints"
            :key="print.src"
            class="print relative bg-cream p-2 pb-3 shadow-2xl md:absolute md:pb-8"
            :class="print.position"
          >
            <img :src="print.src" :alt="t(print.altKey)" loading="lazy" decoding="async" class="h-40 w-full object-cover md:h-[calc(100%-1.5rem)]" />
            <figcaption
              class="mt-2 text-[11px] font-semibold uppercase leading-tight tracking-widest text-ink/55 md:absolute md:inset-x-3 md:bottom-2 md:mt-0 md:truncate"
            >
              {{ t(print.captionKey) }}
            </figcaption>
          </figure>

          <div class="note col-span-2 self-center bg-primary p-5 text-cream md:absolute md:bottom-0 md:right-4 md:w-[54%] md:p-6">
            <p class="text-lg italic leading-snug">{{ t('pages.about.noteCard') }}</p>
          </div>
        </Reveal>

        <div>
          <Reveal tag="p" class="mb-5 text-base leading-relaxed text-cream/80">
            {{ t('pages.about.paragraph1') }}
          </Reveal>
          <Reveal tag="p" class="mb-5 text-base leading-relaxed text-cream/80">
            {{ t('pages.about.paragraph2') }}
          </Reveal>
          <Reveal tag="p" class="text-base leading-relaxed text-cream/80">
            {{ t('pages.about.paragraph3') }}
          </Reveal>
        </div>
      </div>
    </section>

    <!-- Visit band -->
    <section class="border-y border-cream/10 bg-[#191710]">
      <div class="mx-auto max-w-7xl px-6 py-12">
        <Reveal>
          <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            {{ t('pages.about.visitKicker') }}
          </p>
          <h2 class="mb-2 text-3xl italic text-cream md:text-4xl">{{ t('pages.about.visitHeading') }}</h2>
          <p class="text-cream/65">{{ t('pages.about.visitBody') }}</p>
        </Reveal>
      </div>
    </section>

    <!-- Timeline -->
    <section class="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <ol class="max-w-3xl list-none p-0">
        <Reveal v-for="n in 4" :key="n" tag="li" class="grid grid-cols-[28px_1fr] gap-5">
          <div class="flex flex-col items-center">
            <span class="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-gold bg-[#100f0a]" />
            <span v-if="n < 4" class="w-px flex-1 bg-cream/15" />
          </div>
          <div class="pb-10">
            <h3 class="mb-1.5 text-xl italic text-cream">{{ t(`pages.about.step${n}Title`) }}</h3>
            <p class="text-base leading-relaxed text-cream/70">{{ t(`pages.about.step${n}Body`) }}</p>
          </div>
        </Reveal>
      </ol>
    </section>

    <!-- Final CTA -->
    <section class="final-cta px-6 py-16 text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-4 text-3xl italic text-cream">{{ t('pages.about.ctaHeading') }}</h2>
        <p class="mx-auto mb-8 max-w-lg text-cream/85">{{ t('pages.about.ctaBody') }}</p>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink no-underline shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {{ t('pages.about.cta') }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

usePageSeo({ path: "/about", titleKey: "seo.about.title", descriptionKey: "seo.about.description" });

const heroImage = "/images/hero/hero-3.jpg";

const prints = [
  { src: "/images/home/table.jpg", captionKey: "pages.about.gallery2", altKey: "alt.treatment", position: "md:left-0 md:top-4 md:h-[62%] md:w-[46%] md:-rotate-[5deg]" },
  { src: "/images/home/portrait.jpg", captionKey: "pages.about.gallery1", altKey: "alt.portrait", position: "md:left-[34%] md:top-[16%] md:h-[64%] md:w-[44%] md:rotate-[3.5deg] md:z-10" },
  { src: "/images/hero/hero-1.jpg", captionKey: "pages.about.gallery3", altKey: "alt.paste", position: "md:right-0 md:top-0 md:h-[54%] md:w-[40%] md:rotate-[6deg]" },
];
</script>

<style scoped>
.final-cta {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
.print {
  transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.35s ease;
}
@media (min-width: 768px) {
  .print:hover {
    transform: rotate(0deg) scale(1.05) translateY(-6px);
    z-index: 20;
  }
  .note {
    transform: rotate(-1.5deg);
    z-index: 15;
  }
}
@media (prefers-reduced-motion: reduce) {
  .print {
    transition: none;
  }
}
</style>
