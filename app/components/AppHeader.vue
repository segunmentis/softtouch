<template>
  <div class="dusk-header">
    <!-- Top info bar -->
    <div class="hidden border-b border-white/10 py-2 md:block">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <span class="flex items-center text-sm text-cream/90">
            <svg class="mr-1 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            410 Duchess Street, Saskatoon, SK
          </span>
        </div>
        <span class="text-sm text-cream/90">Mon–Fri 2–8pm · Sat 10–8pm · Sun 12–6pm</span>
      </div>
    </div>

    <!-- Main header -->
    <header class="h-[72px]">
      <div class="mx-auto flex h-full max-w-7xl items-center px-6">
        <!-- Logo -->
        <NuxtLink to="/" class="mr-8 flex items-center gap-3 no-underline">
          <img
            src="/images/logo-badge.png"
            alt="Soft Touch Aesthetics Studio"
            width="256"
            height="258"
            class="h-12 w-auto object-contain"
          />
          <span class="wordmark text-xl leading-none text-cream">Soft Touch</span>
        </NuxtLink>

        <div class="flex-1" />

        <!-- Nav links (desktop) -->
        <nav class="hidden items-center gap-1 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            exact-active-class="nav-link-active"
            class="nav-link px-3 py-2 text-base font-medium"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex-1" />

        <!-- CTA -->
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="ms-4 hidden items-center rounded-full bg-gold px-5 py-2 font-medium text-ink no-underline md:flex"
        >
          Book Appointment
          <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0V11.25a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v7.5" />
          </svg>
        </a>

        <!-- Mobile hamburger -->
        <button
          class="flex items-center justify-center p-2 text-cream md:hidden"
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
    <div v-if="drawer" class="border-t border-white/10 md:hidden">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        exact-active-class="drawer-link-active"
        class="drawer-link block border-l-2 border-transparent px-6 py-3 no-underline"
        @click="drawer = false"
      >
        {{ link.label }}
      </NuxtLink>
      <div class="px-6 py-3">
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="block rounded-full bg-gold px-5 py-2 text-center font-medium text-ink no-underline"
          @click="drawer = false"
        >
          Book Appointment
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const drawer = ref(false)

const navLinks = [
  { label: "Home", to: '/' },
  { label: "About", to: '/about' },
  { label: "Services", to: '/services' },
  { label: "Contact", to: '/contact' },
]
</script>

<style scoped>
.dusk-header {
  background: linear-gradient(120deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
/* The logo is two-tone by design (olive ring, cream monogram) — no colour
   filter here, or both tones collapse into one flat silhouette. */
.wordmark {
  letter-spacing: 0.015em;
  white-space: nowrap;
}
/* The current page is marked by colour alone. Inactive links sit back at
   65% cream; the active one is full-strength cream. A separate accent hue
   was not viable here — the header gradient runs olive → gold → ember
   directly behind the nav, so gold or ember text loses contrast against it. */
.nav-link {
  letter-spacing: 0.05em;
  color: rgba(243, 238, 216, 0.65);
  transition: color 0.2s;
}
.nav-link:hover {
  color: #f3eed8;
}
.nav-link-active {
  color: #f3eed8;
  font-weight: 600;
}

.drawer-link {
  color: rgba(243, 238, 216, 0.65);
  transition: color 0.2s;
}
.drawer-link:hover {
  color: #f3eed8;
}
.drawer-link-active {
  color: #f3eed8;
  border-left-color: #c1892f;
  background: rgba(255, 255, 255, 0.07);
  font-weight: 600;
}
</style>
