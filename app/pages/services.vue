<template>
  <div class="bg-[#100f0a]">
    <DarkHero
      :image="heroImage"
      image-alt="Smooth legs resting on a velvet sofa after a sugaring treatment"
      kicker="Treatment Menu"
      title="Sugaring, done right"
      sub="What each treatment includes, and what it costs. Booking and live availability are on Fresha."
    />

    <!-- Menu tabs -->
    <div class="sticky top-0 z-30 border-b border-cream/10 bg-[#100f0a]/95 backdrop-blur">
      <div
        role="tablist"
        aria-label="Treatment Menu"
        class="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4"
      >
        <button
          v-for="tab in SERVICE_TABS"
          :id="`tab-${tab}`"
          :key="tab"
          type="button"
          role="tab"
          :aria-selected="active === tab"
          :aria-controls="`panel-${tab}`"
          class="chip flex-shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
          :class="
            active === tab
              ? 'border-gold bg-gold text-ink'
              : 'border-cream/20 text-cream/65 hover:border-gold/60 hover:text-cream'
          "
          @click="select(tab)"
        >
          {{ SERVICE_TAB_LABELS[tab] }}
        </button>
      </div>
    </div>

    <!-- Service list -->
    <section class="mx-auto max-w-7xl px-6 pb-6 pt-10">
      <div class="max-w-3xl">
        <!-- Every panel is rendered and the inactive ones hidden, rather than
             swapped in on click. The page is prerendered, so a v-if would leave
             12 of the 18 services out of the HTML entirely and invisible to
             search engines. -->
        <div v-for="tab in SERVICE_TABS" v-show="active === tab" :key="tab">
          <p
            v-if="tab === 'mens'"
            class="mb-6 rounded-lg border border-cream/12 bg-[#191710] px-4 py-3 text-sm leading-relaxed text-cream/70"
          >
            Men's intimate sugaring (Brazilian and bikini) is not currently offered.
          </p>

          <ul :id="`panel-${tab}`" role="tabpanel" :aria-labelledby="`tab-${tab}`" class="list-none p-0">
            <li v-for="service in servicesIn(tab)" :key="service.key">
            <a
              :href="FRESHA_BOOKING_URL"
              target="_blank"
              rel="noopener"
              class="row grid grid-cols-[1fr_auto] items-start gap-4 border-b border-cream/10 py-5 no-underline transition-colors hover:bg-cream/[0.04] md:gap-8"
            >
              <div class="min-w-0">
                <h2 class="text-xl italic text-cream md:text-2xl">
                  {{ service.name }}
                </h2>

                <p class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-cream/50">
                  <span>{{ service.duration }}</span>
                  <span v-if="service.includes" class="text-gold">
                    {{ service.includes }} treatments
                  </span>
                  <span v-if="service.femaleOnly">Female only</span>
                </p>

                <p class="mt-2 max-w-prose text-sm leading-relaxed text-cream/70">
                  {{ service.description }}
                </p>
              </div>

              <div class="text-right">
                <span class="block text-lg text-cream tabular-nums md:text-xl">
                  {{ formatPrice(service.price) }}
                </span>
                <span v-if="service.compareAt" class="mt-0.5 block text-xs text-cream/40 line-through tabular-nums">
                  {{ formatPrice(service.compareAt) }}
                </span>
                <span v-if="bundleSaving(service)" class="mt-1 block text-[11px] font-semibold uppercase tracking-wider text-gold">
                  Save {{ bundleSaving(service) }}%
                </span>
                <span
                  class="book mt-2 hidden rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink md:inline-block"
                >
                  Book
                </span>
              </div>
            </a>
            </li>
          </ul>

          <!-- Fresha has no per-category URL, so this opens the booking menu
               where the rest of this section can be browsed. -->
          <a
            :href="FRESHA_BOOKING_URL"
            target="_blank"
            rel="noopener"
            class="see-all tap-link mt-6 gap-2 text-sm font-semibold uppercase tracking-wider text-gold no-underline"
          >
            See full list
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Why choose sugaring -->
    <section class="mx-auto max-w-7xl px-6 py-12 md:py-14">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
        <Reveal>
          <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
            The method
          </p>
          <h2 class="mb-3 text-3xl italic text-cream">Why Choose Sugaring?</h2>
          <p class="mb-4 text-base leading-relaxed text-cream/75">Sugaring is a natural method of hair removal made from only sugar, water, and lemon.</p>
          <p class="text-sm leading-relaxed text-cream/55">Whether you're booking a Brazilian, underarms, legs, facial sugaring, or body treatment, you'll receive personalized care from start to finish.</p>
        </Reveal>

        <Reveal>
          <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-cream/50">
            Unlike traditional waxing, sugaring:
          </p>
          <ul class="list-none p-0">
            <li
              v-for="point in WHY_POINTS"
              :key="point"
              class="flex gap-3 border-b border-cream/10 py-3 text-sm leading-relaxed text-cream/80 last:border-none"
            >
              <span
                class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-gold/50 text-[10px] text-gold"
                aria-hidden="true"
              >
                ✓
              </span>
              {{ point }}
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
            <span aria-hidden="true">✓</span>Do
          </span>
          <h2 class="text-2xl italic text-cream">Before Your Appointment</h2>
          <p class="mt-1 text-sm text-cream/60">For the best results:</p>
          <ul class="mt-3 list-none p-0">
            <li
              v-for="item in BEFORE_CARE"
              :key="item"
              class="flex gap-3 border-b border-dashed border-cream/15 py-2.5 text-sm leading-relaxed text-cream/80 last:border-none"
            >
              <span class="mt-0.5 flex-shrink-0 text-xs text-gold" aria-hidden="true">✓</span>
              {{ item }}
            </li>
          </ul>
        </Reveal>

        <Reveal class="rounded-2xl border border-cream/10 bg-[#100f0a] p-6 md:p-8">
          <span
            class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream/50"
          >
            <span aria-hidden="true">✕</span>Avoid
          </span>
          <h2 class="text-2xl italic text-cream">After Your Appointment</h2>
          <p class="mt-1 text-sm text-cream/60">To keep your skin looking its best:</p>
          <p class="mt-3 text-[11px] font-bold uppercase tracking-[0.1em] text-cream/45">
            For the first 24–48 hours avoid:
          </p>
          <ul class="mt-1 list-none p-0">
            <li
              v-for="item in AVOID_AFTER"
              :key="item"
              class="flex gap-3 border-b border-dashed border-cream/15 py-2.5 text-sm leading-relaxed text-cream/80 last:border-none"
            >
              <span class="mt-0.5 flex-shrink-0 text-xs text-cream/35" aria-hidden="true">✕</span>
              {{ item }}
            </li>
          </ul>
          <p class="mt-4 rounded-lg border border-gold/25 bg-gold/[0.08] px-3.5 py-2.5 text-sm leading-relaxed text-cream/75">
            Resume gentle exfoliation after a few days to help reduce ingrown hairs.
          </p>
        </Reveal>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta px-6 py-16 text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-4 text-3xl italic text-cream">Live pricing and full availability are always on Fresha.</h2>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink no-underline shadow-sm transition-transform hover:-translate-y-0.5"
        >
          View Full Menu &amp; Book
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

usePageSeo({ path: "/services", title: "Sugaring Menu Saskatoon | Soft Touch Aesthetics Studio", description: "The full sugaring menu at Soft Touch Aesthetics Studio in Saskatoon — Brazilian, body, facial and men's services in a private studio." });

const heroImage = "/images/hero/hero-2.jpg";

const WHY_POINTS = [
  "Removes hair in the natural direction of growth",
  "Is gentle on sensitive skin",
  "Helps reduce ingrown hairs",
  "Can lead to finer hair over time",
  "Leaves skin feeling softer and smoother",
];

const active = ref<ServiceTab>("featured");

function select(tab: ServiceTab) {
  active.value = tab;
  // Keep the tab in the URL so the footer links and a shared link both land on
  // the right one. replace(), so tabbing does not fill the back button.
  router.replace({ path: route.path, query: tab === "featured" ? {} : { tab } });
}

/** Honour /services?tab=intimate, used by the footer links. */
function syncFromQuery() {
  const tab = route.query.tab as string | undefined;
  active.value = SERVICE_TABS.includes(tab as ServiceTab) ? (tab as ServiceTab) : "featured";
}
syncFromQuery();
watch(() => route.query.tab, syncFromQuery);
</script>

<style scoped>
.final-cta {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
.row:hover .book {
  background: #d0982f;
}
.see-all {
  display: inline-flex;
  align-items: center;
}
.see-all span {
  transition: transform 0.2s ease;
}
.see-all:hover span {
  transform: translateX(3px);
}
@media (prefers-reduced-motion: reduce) {
  .see-all span {
    transition: none;
  }
}
</style>
