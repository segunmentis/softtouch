<template>
  <section class="hero-slider relative overflow-hidden text-center">
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

    <button type="button" class="arrow prev" aria-label="Previous slide" @click="prev">‹</button>
    <button type="button" class="arrow next" aria-label="Next slide" @click="next">›</button>

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
  background:
    radial-gradient(60% 55% at 50% 50%, rgba(20, 18, 10, 0.55) 0%, rgba(20, 18, 10, 0.15) 70%, rgba(20, 18, 10, 0) 100%),
    linear-gradient(165deg, rgba(42, 40, 24, 0.55) 0%, rgba(105, 103, 64, 0.4) 45%, rgba(193, 137, 47, 0.32) 80%, rgba(161, 91, 40, 0.4) 100%);
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
  z-index: 3;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
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
@media (prefers-reduced-motion: reduce) {
  .slide.active {
    animation: none;
  }
}
</style>
