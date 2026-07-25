<template>
  <section class="dusk-banner text-center">
    <div class="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
        {{ kicker }}
      </p>
      <h1 class="text-4xl italic text-cream md:text-5xl">
        {{ title }}
      </h1>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  kicker: string;
  title: string;
}>();
</script>

<style scoped>
.dusk-banner {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
</style>
