<template>
  <footer>
    <!-- Main footer body -->
    <div class="bg-[#211e14] py-12">
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
            {{ t('footer.brandBlurb') }}
          </p>
          <ul class="list-none space-y-3 p-0">
            <li class="flex items-start">
              <svg class="mr-3 mt-1 h-[18px] w-[18px] flex-shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span class="text-sm text-gray-300">{{ t('footer.address') }}</span>
            </li>
            <li class="flex items-start">
              <svg class="mr-3 mt-1 h-[18px] w-[18px] flex-shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-gray-300">{{ t('footer.hours') }}</span>
            </li>
            <li class="flex items-start">
              <a
                :href="FRESHA_BOOKING_URL"
                target="_blank"
                rel="noopener"
                class="footer-link text-sm font-medium text-gold no-underline"
              >
                {{ t('footer.bookOnFresha') }} →
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 2: Company -->
        <div class="md:col-span-2 md:col-start-6">
          <h6 class="mb-5 text-base font-bold text-white">{{ t('footer.companyHeading') }}</h6>
          <ul class="list-none space-y-3 p-0">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link text-sm text-gray-300 no-underline">
                {{ t(link.labelKey) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 3: Quick Links -->
        <div class="md:col-span-2">
          <h6 class="mb-5 text-base font-bold text-white">{{ t('footer.quickLinksHeading') }}</h6>
          <ul class="list-none space-y-3 p-0">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link text-sm text-gray-300 no-underline">
                {{ t(link.labelKey) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Column 4: Newsletter -->
        <div class="md:col-span-3">
          <h6 class="mb-3 text-base font-bold text-white">{{ t('footer.newsletter.heading') }}</h6>
          <p class="mb-4 text-sm text-gray-300">
            {{ t('footer.newsletter.description') }}
          </p>
          <div class="mb-6 flex">
            <input
              v-model="email"
              type="email"
              :placeholder="t('footer.newsletter.placeholder')"
              class="min-w-0 flex-1 bg-[#332c1c] px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              class="flex items-center bg-primary px-4 py-2 text-sm text-white"
              @click="subscribe"
            >
              {{ t('footer.newsletter.subscribe') }}
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
    <div class="border-t border-[#3a3320] bg-[#211e14]">
      <div class="mx-auto max-w-7xl px-6">
        <hr class="border-[#3a3320]" />
        <div class="flex flex-col items-center justify-between gap-2 py-4 md:flex-row">
          <span class="text-sm text-gray-400">
            {{ t('footer.copyright', { year }) }}
            <NuxtLink to="/" class="font-medium no-underline" style="color: #f3eed8">
              {{ t('footer.brandName') }}</NuxtLink
            >. {{ t('footer.allRightsReserved') }}
          </span>
          <div class="flex gap-4">
            <NuxtLink to="/contact" class="footer-link text-sm text-gray-400 no-underline">{{ t('footer.privacyPolicy') }}</NuxtLink>
            <NuxtLink to="/contact" class="footer-link text-sm text-gray-400 no-underline">{{ t('footer.termsOfUse') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();

const email = ref("");
const year = new Date().getFullYear();

const companyLinks = [
  { labelKey: "footer.companyLinks.about", to: "/about" },
  { labelKey: "footer.companyLinks.services", to: "/services" },
  { labelKey: "footer.companyLinks.contact", to: "/contact" },
  { labelKey: "footer.companyLinks.privacy", to: "/contact" },
];

const quickLinks = [
  { labelKey: "footer.quickLinks.mensSugaring", to: "/services#mens-sugaring" },
  { labelKey: "footer.quickLinks.intimate", to: "/services#intimate" },
  { labelKey: "footer.quickLinks.body", to: "/services#body" },
  { labelKey: "footer.quickLinks.face", to: "/services#face" },
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
  color: #c1892f;
}
.social-btn {
  transition:
    background-color 0.2s,
    color 0.2s;
}
.social-btn:hover {
  background-color: #c1892f;
  color: white;
  border-color: #c1892f;
}
</style>
