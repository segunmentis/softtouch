<template>
  <div class="relative">
    <button type="button" class="tc-arrow tc-prev" aria-label="Scroll left" @click="scroll(-1)">‹</button>
    <div ref="track" class="carousel" :class="{ dragging }" @mousedown="onDown">
      <slot />
    </div>
    <button type="button" class="tc-arrow tc-next" aria-label="Scroll right" @click="scroll(1)">›</button>
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
  top: 40%;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #ddd6c9;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
  color: #211d18;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  z-index: 2;
}
.tc-prev {
  left: -20px;
}
.tc-next {
  right: -20px;
}
</style>
