<template>
  <div class="mx-auto max-w-7xl px-6 py-12">
    <div class="mx-auto max-w-5xl">
      <h1 class="mb-6 text-4xl font-bold">Our Services</h1>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="service in services"
          :key="service.title"
          class="flex h-full flex-col rounded-lg border border-gray-200 p-6 shadow-sm"
        >
          <svg
            class="mb-2 h-9 w-9 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            v-html="service.iconPath"
          />
          <h2 class="mb-2 text-xl font-semibold">{{ service.title }}</h2>
          <p class="text-sm text-gray-600">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const services = [
  {
    title: "Web Development",
    iconPath:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M12 3c2.5 2.5 3.75 5.5 3.75 9s-1.25 6.5-3.75 9c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3z" />',
    description:
      "Modern, responsive web applications built with the latest technologies.",
  },
  {
    title: "Mobile Apps",
    iconPath:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />',
    description: "Cross-platform mobile applications for iOS and Android.",
  },
  {
    title: "Consulting",
    iconPath:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />',
    description:
      "Expert technology consulting to help guide your digital strategy.",
  },
];
</script>
