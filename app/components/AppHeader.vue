<template>
  <!-- Top info bar -->
  <div class="hidden bg-primary py-2 md:block">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6">
      <div class="flex items-center gap-4">
        <span class="flex items-center text-sm text-white">
          <svg class="mr-1 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.125 1.125 0 00-.852-1.09l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a11.25 11.25 0 01-5.62-5.62l1.293-.97a1.125 1.125 0 00.417-1.173L8.964 3.102a1.125 1.125 0 00-1.09-.852H6.5A2.25 2.25 0 004.25 4.5v.75z" />
          </svg>
          +01 123 5641 231
        </span>
        <span class="flex items-center text-sm text-white">
          <svg class="mr-1 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          hello@softtouch.com
        </span>
      </div>
      <span class="text-sm text-white">Mon – Fri: 9:00am – 6:00pm</span>
    </div>
  </div>

  <!-- Main header -->
  <header class="h-[72px] bg-white shadow">
    <div class="mx-auto flex h-full max-w-7xl items-center px-6">
      <!-- Logo -->
      <NuxtLink to="/" class="mr-8 flex items-center no-underline">
        <img src="/images/logo-arc.png" alt="Soft Touch Aesthetics Studio" class="h-14 w-auto object-contain" />
      </NuxtLink>

      <div class="flex-1" />

      <!-- Nav links (desktop) -->
      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link px-3 py-2 text-base font-medium"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex-1" />

      <!-- CTA -->
      <NuxtLink
        to="/contact"
        class="ms-4 hidden items-center rounded-full bg-primary px-5 py-2 text-white no-underline md:flex"
      >
        Book Appointment
        <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0V11.25a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v7.5" />
        </svg>
      </NuxtLink>

      <!-- Mobile hamburger -->
      <button
        class="flex items-center justify-center p-2 text-gray-700 md:hidden"
        aria-label="Toggle menu"
        @click="drawer = !drawer"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path v-if="!drawer" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </header>

  <!-- Mobile drawer -->
  <div v-if="drawer" class="border-t border-gray-200 bg-white md:hidden">
    <NuxtLink
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      class="block px-6 py-3 text-gray-800 no-underline"
      @click="drawer = false"
    >
      {{ link.label }}
    </NuxtLink>
    <div class="px-6 py-3">
      <NuxtLink
        to="/contact"
        class="block rounded-full bg-primary px-5 py-2 text-center text-white no-underline"
        @click="drawer = false"
      >
        Book Appointment
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const drawer = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]
</script>

<style scoped>
.nav-link {
  letter-spacing: 0.05em;
  color: #696740;
  transition: opacity 0.2s;
}
.nav-link:hover {
  opacity: 0.75;
}
</style>
