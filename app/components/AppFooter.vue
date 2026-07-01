<template>
  <footer>
    <!-- Main footer body -->
    <div class="footer-body bg-grey-darken-4 py-12">
      <v-container>
        <v-row>
          <!-- Column 1: Brand -->
          <v-col cols="12" md="4" class="pe-md-8">
            <NuxtLink to="/" class="text-decoration-none d-flex align-center mb-4">
              <v-icon icon="mdi-layers-triple" color="primary" size="28" class="me-2" />
              <span class="text-h6 font-weight-bold text-white">
                Soft<span class="text-primary">Touch</span>
              </span>
            </NuxtLink>
            <p class="text-grey-lighten-1 text-body-2 mb-5">
              We build elegant, modern software solutions tailored to your
              business. Helping companies grow through technology since 2018.
            </p>
            <ul class="footer-contact-list">
              <li class="d-flex align-start mb-3">
                <v-icon icon="mdi-map-marker-outline" color="primary" size="18" class="me-3 mt-1 flex-shrink-0" />
                <span class="text-grey-lighten-1 text-body-2">70-80 Upper St, Lagos, NG</span>
              </li>
              <li class="d-flex align-start mb-3">
                <v-icon icon="mdi-phone-outline" color="primary" size="18" class="me-3 mt-1 flex-shrink-0" />
                <a href="tel:+011235641231" class="text-grey-lighten-1 text-body-2 text-decoration-none footer-link">
                  +01 123 5641 231
                </a>
              </li>
              <li class="d-flex align-start">
                <v-icon icon="mdi-email-outline" color="primary" size="18" class="me-3 mt-1 flex-shrink-0" />
                <a href="mailto:hello@softtouch.com" class="text-grey-lighten-1 text-body-2 text-decoration-none footer-link">
                  hello@softtouch.com
                </a>
              </li>
            </ul>
          </v-col>

          <!-- Column 2: Company -->
          <v-col cols="6" md="2" offset-md="1">
            <h6 class="text-white text-subtitle-1 font-weight-bold mb-5">Company</h6>
            <ul class="footer-link-list">
              <li v-for="link in companyLinks" :key="link.to" class="mb-3">
                <NuxtLink :to="link.to" class="text-grey-lighten-1 text-body-2 text-decoration-none footer-link">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </v-col>

          <!-- Column 3: Quick Links -->
          <v-col cols="6" md="2">
            <h6 class="text-white text-subtitle-1 font-weight-bold mb-5">Quick Links</h6>
            <ul class="footer-link-list">
              <li v-for="link in quickLinks" :key="link.to" class="mb-3">
                <NuxtLink :to="link.to" class="text-grey-lighten-1 text-body-2 text-decoration-none footer-link">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </v-col>

          <!-- Column 4: Newsletter -->
          <v-col cols="12" md="3">
            <h6 class="text-white text-subtitle-1 font-weight-bold mb-3">Stay Updated</h6>
            <p class="text-grey-lighten-1 text-body-2 mb-4">
              Enter your email to subscribe to our newsletter.
            </p>
            <div class="newsletter-form d-flex mb-6">
              <v-text-field
                v-model="email"
                placeholder="Your email address"
                variant="solo"
                density="compact"
                hide-details
                bg-color="grey-darken-3"
                color="primary"
                rounded="0"
                class="newsletter-input"
              />
              <v-btn
                color="primary"
                rounded="0"
                height="40"
                elevation="0"
                @click="subscribe"
              >
                Subscribe
                <v-icon icon="mdi-arrow-right" end size="16" />
              </v-btn>
            </div>

            <!-- Social icons -->
            <div class="d-flex ga-2">
              <v-btn
                v-for="social in socials"
                :key="social.icon"
                :href="social.href"
                :icon="social.icon"
                variant="outlined"
                color="grey-lighten-1"
                size="36"
                density="compact"
                target="_blank"
                rel="noopener"
                class="social-btn"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Footer bottom bar -->
    <div class="footer-bottom bg-grey-darken-4 border-t-sm">
      <v-container>
        <v-divider color="grey-darken-2" />
        <div class="d-flex flex-column flex-md-row justify-space-between align-center py-4 ga-2">
          <span class="text-grey text-body-2">
            Copyright © {{ year }}
            <NuxtLink to="/" class="text-primary text-decoration-none font-weight-medium">SoftTouch</NuxtLink>.
            All Rights Reserved.
          </span>
          <div class="d-flex ga-4">
            <NuxtLink to="/contact" class="text-grey text-body-2 text-decoration-none footer-link">Privacy Policy</NuxtLink>
            <NuxtLink to="/contact" class="text-grey text-body-2 text-decoration-none footer-link">Terms of Use</NuxtLink>
          </div>
        </div>
      </v-container>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref('')
const year = new Date().getFullYear()

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/contact' },
]

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Web Development', to: '/services' },
  { label: 'Mobile Apps', to: '/services' },
  { label: 'Consulting', to: '/services' },
]

const socials = [
  { icon: 'mdi-facebook', href: 'https://facebook.com' },
  { icon: 'mdi-linkedin', href: 'https://linkedin.com' },
  { icon: 'mdi-instagram', href: 'https://instagram.com' },
  { icon: 'mdi-twitter', href: 'https://twitter.com' },
  { icon: 'mdi-youtube', href: 'https://youtube.com' },
]

function subscribe() {
  if (email.value) {
    email.value = ''
  }
}
</script>

<style scoped>
.footer-link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-link {
  transition: color 0.2s;
}
.footer-link:hover {
  color: rgb(var(--v-theme-primary)) !important;
}
.newsletter-input :deep(.v-field__input) {
  min-height: 40px !important;
  padding-top: 8px !important;
}
.social-btn {
  transition: background-color 0.2s, color 0.2s;
}
.social-btn:hover {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  border-color: rgb(var(--v-theme-primary)) !important;
}
</style>
