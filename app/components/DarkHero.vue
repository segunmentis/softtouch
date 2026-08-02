<template>
  <section class="relative flex min-h-[340px] items-end overflow-hidden bg-[#100f0a] md:min-h-[440px]">
    <img :src="image" alt="" class="absolute inset-0 h-full w-full object-cover" />
    <div class="scrim absolute inset-0" />
    <div class="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-24 md:pb-16">
      <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">{{ kicker }}</p>
      <h1 class="max-w-[16ch] text-4xl italic leading-[1.04] text-cream md:text-6xl">{{ title }}</h1>
      <p v-if="sub" class="mt-4 max-w-[38ch] text-base text-cream/70">{{ sub }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  kicker: string;
  title: string;
  sub?: string;
}>();
</script>

<style scoped>
.scrim {
  background: linear-gradient(180deg, rgba(16, 15, 10, 0.35) 0%, rgba(16, 15, 10, 0.6) 55%, #100f0a 100%);
}
</style>
