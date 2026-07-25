<template>
  <div class="flex items-center gap-1 text-sm">
    <button
      type="button"
      class="px-1 uppercase"
      :class="locale === 'en' ? 'font-bold underline' : 'opacity-70'"
      :aria-pressed="locale === 'en'"
      @click="locale = 'en'"
    >
      En
    </button>
    <span aria-hidden="true">|</span>
    <button
      type="button"
      class="px-1 uppercase"
      :class="locale === 'fr' ? 'font-bold underline' : 'opacity-70'"
      :aria-pressed="locale === 'fr'"
      @click="locale = 'fr'"
    >
      Fr
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
</script>
