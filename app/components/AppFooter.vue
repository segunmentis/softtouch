<template>
  <footer class="bg-[#211e14]">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
      <!-- Column 1: Brand -->
      <div>
        <img
          src="/images/logo-stacked.png"
          :alt="t('footer.brandName')"
          width="440"
          height="565"
          class="mb-5 h-auto w-[168px]"
        />
        <p class="mb-4 max-w-[42ch] text-sm leading-relaxed text-gray-300">
          {{ t('footer.brandBlurb') }}
        </p>
        <p class="mb-1.5 text-sm text-gray-300">{{ t('footer.address') }}</p>
        <dl class="mb-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-gray-300">
          <dt>{{ t('hours.weekdays') }}</dt>
          <dd>{{ t('hours.weekdaysTime') }}</dd>
          <dt>{{ t('hours.saturday') }}</dt>
          <dd>{{ t('hours.saturdayTime') }}</dd>
          <dt>{{ t('hours.sunday') }}</dt>
          <dd>{{ t('hours.sundayTime') }}</dd>
        </dl>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="footer-link text-sm font-semibold text-gold no-underline"
        >
          {{ t('footer.bookOnFresha') }} →
        </a>
      </div>

      <!-- Column 2: Studio -->
      <div>
        <h6 class="mb-4 text-sm font-bold text-white">{{ t('footer.companyHeading') }}</h6>
        <ul class="list-none space-y-3 p-0">
          <li v-for="link in companyLinks" :key="link.to">
            <NuxtLink :to="link.to" class="footer-link text-sm text-gray-300 no-underline">
              {{ t(link.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Column 3: Treatments -->
      <div>
        <h6 class="mb-4 text-sm font-bold text-white">{{ t('footer.quickLinksHeading') }}</h6>
        <ul class="list-none space-y-3 p-0">
          <li v-for="link in quickLinks" :key="link.to">
            <NuxtLink :to="link.to" class="footer-link text-sm text-gray-300 no-underline">
              {{ t(link.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Footer bottom bar -->
    <div class="border-t border-[#3a3320]">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-sm text-gray-400 md:flex-row">
        <span>
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
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();

const year = new Date().getFullYear();

const companyLinks = [
  { labelKey: "footer.companyLinks.about", to: "/about" },
  { labelKey: "footer.companyLinks.services", to: "/services" },
  { labelKey: "footer.companyLinks.faq", to: "/faq" },
  { labelKey: "footer.companyLinks.contact", to: "/contact" },
  { labelKey: "footer.companyLinks.privacy", to: "/contact" },
];

// Point at the standalone, crawlable service pages rather than filter anchors.
const quickLinks = [
  { labelKey: "footer.quickLinks.intimate", to: "/intimate-sugaring" },
  { labelKey: "footer.quickLinks.body", to: "/body-sugaring" },
  { labelKey: "footer.quickLinks.face", to: "/facial-sugaring" },
  { labelKey: "footer.quickLinks.mensSugaring", to: "/mens-sugaring" },
];
</script>

<style scoped>
.footer-link {
  transition: color 0.2s;
}
.footer-link:hover {
  color: #c1892f;
}
</style>
