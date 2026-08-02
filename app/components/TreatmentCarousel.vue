<template>
  <div class="relative">
    <button type="button" class="tc-arrow tc-prev" aria-label="Scroll left" @click="scroll(-1)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M15 5l-6 7 6 7" />
      </svg>
    </button>
    <div ref="track" class="carousel" :class="{ dragging }" @mousedown="onDown">
      <slot />
    </div>
    <button type="button" class="tc-arrow tc-next" aria-label="Scroll right" @click="scroll(1)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 5l6 7-6 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const track = ref<HTMLElement | null>(null);
const dragging = ref(false);
let startX = 0;
let startScroll = 0;

function onDown(e: MouseEvent) {
  if (!track.value) return;
  dragging.value = true;
  startX = e.pageX;
  startScroll = track.value.scrollLeft;
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}
function onMove(e: MouseEvent) {
  if (!track.value) return;
  track.value.scrollLeft = startScroll - (e.pageX - startX) * 1.4;
}
function onUp() {
  dragging.value = false;
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("mouseup", onUp);
}
function scroll(dir: number) {
  track.value?.scrollBy({ left: dir * 300, behavior: "smooth" });
}
</script>

<style scoped>
.carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 8px;
  cursor: grab;
  scrollbar-width: none;
}
.carousel::-webkit-scrollbar {
  display: none;
}
.carousel.dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}
.tc-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(243, 238, 216, 0.22);
  background: #191710;
  cursor: pointer;
  color: #f3eed8;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
  z-index: 2;
  transition: border-color 0.2s, background 0.2s;
}
.tc-arrow:hover {
  border-color: rgba(217, 163, 77, 0.6);
  background: #221f14;
}
/* See HeroSlider: SVG rather than a text glyph so the chevron is
   geometrically centred in the circle. */
.tc-arrow svg {
  width: 18px;
  height: 18px;
  display: block;
}
.tc-prev {
  left: -20px;
}
.tc-next {
  right: -20px;
}
</style>
