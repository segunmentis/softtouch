<template>
  <div class="flex min-h-screen flex-col">
    <!-- Scroll-reveal sections start at opacity 0 and are shown by JS. Now that
         pages are server-rendered, their text is in the HTML from the first byte —
         this keeps it visible for anyone (or anything) that never runs the script. -->
    <noscript>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <component :is="'style'">.reveal { opacity: 1 !important; transform: none !important; }</component>
    </noscript>
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
