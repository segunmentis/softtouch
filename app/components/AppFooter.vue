<template>
  <footer>
    <!-- Utility slab. Reuses the gold→ember gradient from the Services page's
         final CTA, so it reads as part of the existing system rather than a new
         flourish. Deliberately a thin bar and not a second hero: everything on
         it sits at roughly the same weight. -->
    <div class="slab">
      <div
        class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5"
      >
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a v-if="STUDIO_PHONE" :href="telHref" class="tap-link tel">
            <svg class="h-[15px] w-[15px] flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="TEL_ICON" fill="currentColor" />
            </svg>
            <span>{{ STUDIO_PHONE }}</span>
            <span class="sr-only">— {{ t('footer.callStudio') }}</span>
          </a>

          <span v-if="STUDIO_PHONE" class="hidden h-4 w-px bg-ink/30 sm:block" aria-hidden="true" />

          <p class="m-0 text-sm text-ink/70">{{ t('footer.hours') }}</p>
        </div>

        <ul v-if="socials.length" class="m-0 flex list-none gap-2 p-0">
          <li v-for="social in socials" :key="social.key">
            <a
              :href="social.url"
              target="_blank"
              rel="noopener"
              :aria-label="social.label"
              class="soc"
            >
              <svg class="h-[17px] w-[17px]" viewBox="0 0 24 24" aria-hidden="true">
                <template v-if="social.key === 'instagram'">
                  <rect
                    x="3.2"
                    y="3.2"
                    width="17.6"
                    height="17.6"
                    rx="5.2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <circle cx="12" cy="12" r="4.05" fill="none" stroke="currentColor" stroke-width="1.7" />
                  <circle cx="17.15" cy="6.9" r="1.2" fill="currentColor" />
                </template>
                <path v-else :d="SOCIAL_ICONS[social.key]" fill="currentColor" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-[#211e14]">
      <div
        class="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-9 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10"
      >
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <img
            src="/images/logo-stacked.png"
            :alt="t('footer.brandName')"
            width="440"
            height="565"
            loading="lazy"
            decoding="async"
            class="mb-4 h-auto w-[120px]"
          />
          <p class="m-0 max-w-[42ch] text-sm leading-relaxed text-cream/60">
            {{ t('footer.brandBlurb') }}
          </p>
        </div>

        <!-- Studio -->
        <div>
          <h6 class="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-cream/50">
            {{ t('footer.companyHeading') }}
          </h6>
          <ul class="list-none space-y-3 p-0">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link tap-link text-sm text-cream/70 no-underline">
                {{ t(link.labelKey) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Treatments -->
        <div>
          <h6 class="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-cream/50">
            {{ t('footer.quickLinksHeading') }}
          </h6>
          <ul class="list-none space-y-3 p-0">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link tap-link text-sm text-cream/70 no-underline">
                {{ t(link.labelKey) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Visit -->
        <div>
          <h6 class="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-cream/50">
            {{ t('footer.visitHeading') }}
          </h6>
          <address class="mb-4 text-sm not-italic leading-relaxed text-cream/60">
            {{ STUDIO_ADDRESS.street }}<br />
            {{ STUDIO_ADDRESS.city }}, {{ STUDIO_ADDRESS.region }} {{ STUDIO_ADDRESS.postalCode }}
          </address>
          <a
            v-if="MAP_URL"
            :href="MAP_URL"
            target="_blank"
            rel="noopener"
            class="footer-link tap-link text-sm font-semibold text-gold no-underline"
          >
            {{ t('footer.directions') }} →
          </a>
        </div>
      </div>

      <!-- Footer bottom bar -->
      <div class="border-t border-[#3a3320]">
        <div
          class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-sm text-cream/40 md:flex-row"
        >
          <span>
            {{ t('footer.copyright', { year }) }}
            <NuxtLink to="/" class="font-medium no-underline" style="color: #f3eed8">
              {{ t('footer.brandName') }}</NuxtLink
            >. {{ t('footer.allRightsReserved') }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();

const year = new Date().getFullYear();

/**
 * tel: wants digits only — the displayed number keeps its formatting. A bare
 * 10-digit number gets the +1 country code so the link also works for someone
 * dialling from outside Canada; an explicit + in the source is left alone.
 */
const telHref = computed(() => {
  const digits = STUDIO_PHONE.replace(/[^\d+]/g, "");
  return `tel:${!digits.startsWith("+") && digits.length === 10 ? `+1${digits}` : digits}`;
});

// Entries without a url are dropped, so the slab stays coherent while the real
// profile links are outstanding. Same rule the contact page already applies.
const socials = computed(() => SOCIAL_LINKS.filter((s) => s.url));

const TEL_ICON =
  "M6.6 3.5c.5 0 .93.32 1.08.79l1.06 3.3c.14.44-.01.91-.38 1.18l-1.5 1.11a12.4 12.4 0 0 0 5.26 5.26l1.11-1.5c.27-.37.74-.52 1.18-.38l3.3 1.06c.47.15.79.58.79 1.08v3.1c0 .74-.62 1.34-1.36 1.29C8.9 19.2 4.8 15.1 4.21 4.86 4.16 4.12 4.76 3.5 5.5 3.5h1.1z";

// Instagram is drawn inline from primitives rather than a path — its glyph is a
// stroked square and circle, which a single filled path cannot express cleanly.
const SOCIAL_ICONS: Record<string, string> = {
  facebook:
    "M13.5 21v-8h2.68l.4-3.11H13.5V7.92c0-.9.25-1.51 1.54-1.51h1.65V3.63c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.02 1.46-4.02 4.13v2.26H7.57V13h2.69v8h3.24z",
  tiktok:
    "M16.52 3h-2.9v12.1c0 1.16-.72 2.03-1.83 2.19-1.12.16-2.23-.63-2.34-1.83-.12-1.31 1-2.27 2.4-2.02V10.7c-2.92-.2-5.17 2.1-4.92 5 .2 2.2 1.8 3.9 3.99 4.2 2.8.25 5.4-1.85 5.4-5.35V8.9c1 .7 2.2 1.1 3.5 1v-2.6C17.99 7.05 16.86 4.9 16.52 3z",
};

const companyLinks = [
  { labelKey: "footer.companyLinks.about", to: "/about" },
  { labelKey: "footer.companyLinks.services", to: "/services" },
  { labelKey: "footer.companyLinks.faq", to: "/faq" },
  { labelKey: "footer.companyLinks.contact", to: "/contact" },
];

// Point at the standalone, crawlable service pages rather than filter anchors.
// The menu is one page with tabs, so these deep-link to a tab rather than to
// pages of their own.
const quickLinks = [
  { labelKey: "footer.quickLinks.featured", to: "/services" },
  { labelKey: "footer.quickLinks.mens", to: "/services?tab=mens" },
  { labelKey: "footer.quickLinks.bundles", to: "/services?tab=bundles" },
  { labelKey: "footer.quickLinks.intimate", to: "/services?tab=intimate" },
];
</script>

<style scoped>
.slab {
  background: linear-gradient(103deg, #c1892f 0%, #d0982f 46%, #a15b28 100%);
}
.tel {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 17px;
  font-weight: 700;
  color: #2a2818;
  text-decoration: none;
  font-variant-numeric: tabular-nums;
}
.soc {
  display: flex;
  height: 36px;
  width: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  /* Solid ink, matching the Book Appointment pill. A translucent fill washes
     out against the ember end of the gradient, where these buttons sit. */
  background: #2a2818;
  color: #f3eed8;
  transition: background-color 0.2s;
}
.soc:hover {
  background: #3a3726;
}
.footer-link {
  transition: color 0.2s;
}
.footer-link:hover {
  color: #c1892f;
}
@media (prefers-reduced-motion: reduce) {
  .soc,
  .footer-link {
    transition: none;
  }
}
</style>
