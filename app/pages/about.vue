<template>
  <div class="bg-[#100f0a]">
    <DarkHero
      :image="heroImage"
      image-alt="Citrus and water — the kind of simple, natural ingredients sugaring is built on"
      kicker="About The Studio"
      title="A gentler way to remove hair"
      sub="Private body sugaring on Duchess Street, Saskatoon."
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
            <img :src="print.src" :alt="print.alt" loading="lazy" decoding="async" class="h-40 w-full object-cover md:h-[calc(100%-1.5rem)]" />
            <figcaption
              class="mt-2 text-[11px] font-semibold uppercase leading-tight tracking-widest text-ink/55 md:absolute md:inset-x-3 md:bottom-2 md:mt-0 md:truncate"
            >
              {{ print.caption }}
            </figcaption>
          </figure>

          <div class="note col-span-2 self-center bg-primary p-5 text-cream md:absolute md:bottom-0 md:right-4 md:w-[54%] md:p-6">
            <p class="text-lg italic leading-snug">Sugar, lemon, water — that's the whole recipe. Nothing artificial, ever.</p>
          </div>
        </Reveal>

        <div>
          <Reveal tag="p" class="mb-5 text-base leading-relaxed text-cream/80">
            Soft Touch Aesthetics Studio is a private body sugaring studio in Saskatoon, specializing in professional hair removal for women and select men's services. From Brazilian and bikini sugaring to legs, underarms, arms, face, back and stomach, every appointment is designed to feel private, comfortable and unrushed.
          </Reveal>
          <Reveal tag="p" class="mb-5 text-base leading-relaxed text-cream/80">
            Sugar paste is applied against the direction of hair growth and lifted away with it — gentler on skin than traditional waxing, with less breakage and fewer ingrown hairs over time.
          </Reveal>
          <Reveal tag="p" class="text-base leading-relaxed text-cream/80">
            The studio is woman-owned, clean and private, with every appointment given full, unhurried attention from start to finish.
          </Reveal>
        </div>
      </div>
    </section>

    <!-- Visit band -->
    <section class="border-y border-cream/10 bg-[#191710]">
      <div class="mx-auto max-w-7xl px-6 py-12">
        <Reveal>
          <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Your appointment
          </p>
          <h2 class="mb-2 text-3xl italic text-cream md:text-4xl">What an appointment is like</h2>
          <p class="text-cream/65">No surprises. Here is every step, start to finish.</p>
        </Reveal>
      </div>
    </section>

    <!-- Timeline -->
    <section class="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <ol class="max-w-3xl list-none p-0">
        <Reveal v-for="(step, i) in ABOUT_STEPS" :key="step.title" tag="li" class="grid grid-cols-[28px_1fr] gap-5">
          <div class="flex flex-col items-center">
            <span class="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-gold bg-[#100f0a]" />
            <span v-if="i < ABOUT_STEPS.length - 1" class="w-px flex-1 bg-cream/15" />
          </div>
          <div class="pb-10">
            <h3 class="mb-1.5 text-xl italic text-cream">{{ step.title }}</h3>
            <p class="text-base leading-relaxed text-cream/70">{{ step.body }}</p>
          </div>
        </Reveal>
      </ol>
    </section>

    <!-- Final CTA -->
    <section class="final-cta px-6 py-16 text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-4 text-3xl italic text-cream">Ready to book?</h2>
        <p class="mx-auto mb-8 max-w-lg text-cream/85">See the full treatment menu or book your appointment directly online.</p>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink no-underline shadow-sm transition-transform hover:-translate-y-0.5"
        >
          Book Appointment
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

usePageSeo({ path: "/about", title: "About Soft Touch Aesthetics Studio | Saskatoon Sugarist", description: "Meet Soft Touch Aesthetics Studio, a private body sugaring studio in Saskatoon offering professional and comfortable hair removal services." });

const ABOUT_STEPS = [
  { title: "You arrive", body: "A private entrance and one client at a time. No waiting room, no overlap with anyone else." },
  { title: "We talk it through", body: "Your skin, any sensitivities, and what you want done. If it is your first time, say so — it is welcome and completely normal." },
  { title: "The treatment", body: "Warm paste at body temperature, worked in sections against the direction of growth. You set the pace and we stop whenever you ask." },
  { title: "Aftercare", body: "Written aftercare to take with you, and rebooking whenever you are ready — never before." },
];

const heroImage = "/images/hero/hero-3.jpg";

// Captions describe the photograph they sit on. They previously did not: a
// massage shot was captioned "Paste, made fresh", a portrait "The treatment
// room", and the paste "Duchess Street".
const prints = [
  { src: "/images/hero/hero-1.jpg", caption: "Paste, made fresh", alt: "Amber sugar paste dripping from a spoon", position: "md:left-0 md:top-4 md:h-[62%] md:w-[46%] md:-rotate-[5deg]" },
  { src: "/images/home/portrait.jpg", caption: "Smooth, healthy skin", alt: "Close-up portrait of a client with smooth, clear skin", position: "md:left-[34%] md:top-[16%] md:h-[64%] md:w-[44%] md:rotate-[3.5deg] md:z-10" },
  { src: "/images/hero/hero-2.jpg", caption: "Results that last", alt: "Smooth legs resting on a velvet sofa after a sugaring treatment", position: "md:right-0 md:top-0 md:h-[54%] md:w-[40%] md:rotate-[6deg]" },
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
