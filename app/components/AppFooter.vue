<template>
  <footer>
    <!-- Main footer body -->
    <div class="bg-gray-900 py-12">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-10">
        <!-- Column 1: Brand -->
        <div class="md:col-span-4">
          <NuxtLink to="/" class="mb-5 inline-block no-underline">
            <div class="inline-block rounded-lg bg-cream p-3">
              <img
                src="/images/logo-full.png"
                alt="Soft Touch Aesthetics Studio"
                class="footer-logo block"
              />
            </div>
          </NuxtLink>
          <p class="mb-5 text-sm text-gray-300">
            We build elegant, modern software solutions tailored to your
            business. Helping companies grow through technology since 2018.
          </p>
          <ul class="list-none space-y-3 p-0">
            <li class="flex items-start">
              <svg class="mr-3 mt-1 h-[18px] w-[18px] flex-shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span class="text-sm text-gray-300">70-80 Upper St, Lagos, NG</span>
            </li>
            <li class="flex items-start">
              <svg class="mr-3 mt-1 h-[18px] w-[18px] flex-shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.125 1.125 0 00-.852-1.09l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a11.25 11.25 0 01-5.62-5.62l1.293-.97a1.125 1.125 0 00.417-1.173L8.964 3.102a1.125 1.125 0 00-1.09-.852H6.5A2.25 2.25 0 004.25 4.5v.75z" />
              </svg>
              <a href="tel:+011235641231" class="footer-link text-sm text-gray-300 no-underline">
                +01 123 5641 231
              </a>
            </li>
            <li class="flex items-start">
              <svg class="mr-3 mt-1 h-[18px] w-[18px] flex-shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <a href="mailto:hello@softtouch.com" class="footer-link text-sm text-gray-300 no-underline">
                hello@softtouch.com
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 2: Company -->
        <div class="md:col-span-2 md:col-start-6">
          <h6 class="mb-5 text-base font-bold text-white">Company</h6>
          <ul class="list-none space-y-3 p-0">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link text-sm text-gray-300 no-underline">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 3: Quick Links -->
        <div class="md:col-span-2">
          <h6 class="mb-5 text-base font-bold text-white">Quick Links</h6>
          <ul class="list-none space-y-3 p-0">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link text-sm text-gray-300 no-underline">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 4: Newsletter -->
        <div class="md:col-span-3">
          <h6 class="mb-3 text-base font-bold text-white">Stay Updated</h6>
          <p class="mb-4 text-sm text-gray-300">
            Enter your email to subscribe to our newsletter.
          </p>
          <div class="mb-6 flex">
            <input
              v-model="email"
              type="email"
              placeholder="Your email address"
              class="min-w-0 flex-1 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              class="flex items-center bg-primary px-4 py-2 text-sm text-white"
              @click="subscribe"
            >
              Subscribe
              <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          <!-- Social icons -->
          <div class="flex gap-2">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener"
              class="social-btn flex h-9 w-9 items-center justify-center rounded-full border border-gray-400 text-xs text-gray-300 no-underline"
            >
              {{ social.label }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer bottom bar -->
    <div class="border-t border-gray-800 bg-gray-900">
      <div class="mx-auto max-w-7xl px-6">
        <hr class="border-gray-800" />
        <div class="flex flex-col items-center justify-between gap-2 py-4 md:flex-row">
          <span class="text-sm text-gray-400">
            Copyright © {{ year }}
            <NuxtLink to="/" class="font-medium no-underline" style="color: #f3eed8">
              Soft Touch Aesthetics Studio</NuxtLink
            >. All Rights Reserved.
          </span>
          <div class="flex gap-4">
            <NuxtLink to="/contact" class="footer-link text-sm text-gray-400 no-underline">Privacy Policy</NuxtLink>
            <NuxtLink to="/contact" class="footer-link text-sm text-gray-400 no-underline">Terms of Use</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref("");
const year = new Date().getFullYear();

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/contact" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Web Development", to: "/services" },
  { label: "Mobile Apps", to: "/services" },
  { label: "Consulting", to: "/services" },
];

const socials = [
  { label: "f", href: "https://facebook.com" },
  { label: "in", href: "https://linkedin.com" },
  { label: "ig", href: "https://instagram.com" },
  { label: "x", href: "https://twitter.com" },
  { label: "yt", href: "https://youtube.com" },
];

function subscribe() {
  if (email.value) {
    email.value = "";
  }
}
</script>

<style scoped>
.footer-logo {
  height: 90px;
  width: auto;
  object-fit: contain;
}
.footer-link {
  transition: color 0.2s;
}
.footer-link:hover {
  color: #696740;
}
.social-btn {
  transition:
    background-color 0.2s,
    color 0.2s;
}
.social-btn:hover {
  background-color: #696740;
  color: white;
  border-color: #696740;
}
</style>
