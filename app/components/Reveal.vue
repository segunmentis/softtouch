<template>
  <component :is="tag" ref="el" class="reveal" :class="{ in: visible }">
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ tag?: string }>(), { tag: "div" });

const el = ref<HTMLElement | null>(null);
const visible = ref(false);

onMounted(() => {
  const target = (el.value as any)?.$el ?? el.value;
  if (!target || !("IntersectionObserver" in window)) {
    visible.value = true;
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  observer.observe(target);
});
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.in {
  opacity: 1;
  transform: translateY(0);
}
</style>
