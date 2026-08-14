<template>
  <section
    class="hero-slider relative overflow-hidden text-center"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="absolute inset-0">
      <div
        v-for="(slide, i) in slides"
        :key="slide"
        class="slide absolute inset-0 bg-cover bg-center"
        :class="{ active: active === i }"
        :style="{ backgroundImage: `url(${slide})` }"
      />
      <div class="absolute inset-0 overlay" />
    </div>

    <button type="button" class="arrow prev" aria-label="Previous slide" @click="prev">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M15 5l-6 7 6 7" />
      </svg>
    </button>
    <button type="button" class="arrow next" aria-label="Next slide" @click="next">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 5l6 7-6 7" />
      </svg>
    </button>

    <div class="relative z-10 mx-auto max-w-3xl px-6 py-24 md:py-32">
      <p class="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
        <slot name="kicker" />
      </p>
      <h1 class="hero-title mb-6 text-5xl italic text-cream md:text-6xl">
        <slot name="title" />
      </h1>
      <p class="mx-auto mb-9 max-w-xl text-lg text-cream/85">
        <slot name="subtitle" />
      </p>
      <slot name="cta" />
    </div>

    <div class="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
      <button
        v-for="(slide, i) in slides"
        :key="`dot-${slide}`"
        type="button"
        class="h-2 rounded-full transition-all"
        :class="active === i ? 'w-6 bg-gold' : 'w-2 bg-white/50'"
        :aria-label="`Go to slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  slides: string[];
}>();

const active = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

function goTo(i: number) {
  active.value = i;
  restart();
}
function next() {
  goTo((active.value + 1) % props.slides.length);
}
function prev() {
  goTo((active.value - 1 + props.slides.length) % props.slides.length);
}

// Swipe. The arrows are hidden below md, so this is the primary control there.
// Both listeners are passive and never call preventDefault, so vertical page
// scrolling is left completely alone.
const SWIPE_MIN_PX = 45;
const HORIZONTAL_BIAS = 1.5;
let startX = 0;
let startY = 0;

function onTouchStart(e: TouchEvent) {
  const touch = e.changedTouches[0];
  if (!touch) return;
  startX = touch.clientX;
  startY = touch.clientY;
}

function onTouchEnd(e: TouchEvent) {
  const touch = e.changedTouches[0];
  if (!touch) return;
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;
  // Ignore short drags, and any drag that is more vertical than horizontal —
  // otherwise scrolling the page past the hero would flip slides.
  if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * HORIZONTAL_BIAS) return;
  if (dx < 0) next();
  else prev();
}

function restart() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    active.value = (active.value + 1) % props.slides.length;
  }, 5500);
}

onMounted(restart);
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.hero-slider {
  min-height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slide {
  opacity: 0;
  transform: scale(1);
  transition: opacity 1.1s ease;
}
.slide.active {
  opacity: 1;
  animation: kenburns 9s ease-in-out forwards;
}
@keyframes kenburns {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.08);
  }
}
.overlay {
  /* Matches the DarkHero ramp on /about and /services: type sits on solid
     ground and the section resolves into the page background at the bottom. */
  background:
    radial-gradient(65% 60% at 50% 45%, rgba(16, 15, 10, 0.55) 0%, rgba(16, 15, 10, 0.2) 70%, rgba(16, 15, 10, 0) 100%),
    linear-gradient(180deg, rgba(16, 15, 10, 0.4) 0%, rgba(16, 15, 10, 0.62) 55%, #100f0a 100%);
}
.hero-title {
  font-weight: 600;
  line-height: 1.1;
  text-wrap: balance;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* Above the hero copy (z-10), which spans the full width on small screens. */
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
}
/* An SVG chevron rather than a text glyph: text sits on a baseline, so its
   ink lands off-centre in the circle no matter how the line box is aligned. */
.arrow svg {
  width: 20px;
  height: 20px;
  display: block;
}
.arrow:hover {
  background: rgba(255, 255, 255, 0.3);
}
.arrow.prev {
  left: 24px;
}
.arrow.next {
  right: 24px;
}
/* Below md the hero copy is full-bleed, so side-mounted arrows land behind it —
   unreachable, with the subtitle running straight through them. Hide them there
   and let the slider be swiped instead; the dots still give position and a tap
   target. */
@media (max-width: 767px) {
  .arrow {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .slide.active {
    animation: none;
  }
}
</style>
