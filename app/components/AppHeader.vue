<template>
  <!-- Top info bar -->
  <div class="header-topbar bg-primary py-2 d-none d-md-block">
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center gap-4">
          <span class="text-white text-body-2">
            <v-icon icon="mdi-phone" size="14" class="me-1" />
            +01 123 5641 231
          </span>
          <span class="text-white text-body-2">
            <v-icon icon="mdi-email-outline" size="14" class="me-1" />
            hello@softtouch.com
          </span>
        </div>
        <span class="text-white text-body-2">
          Mon – Fri: 9:00am – 6:00pm
        </span>
      </div>
    </v-container>
  </div>

  <!-- Main header -->
  <v-app-bar color="white" elevation="1" height="72">
    <v-container class="d-flex align-center h-100 pa-0">
      <!-- Logo -->
      <NuxtLink to="/" class="text-decoration-none d-flex align-center me-8">
        <v-icon icon="mdi-layers-triple" color="primary" size="32" class="me-2" />
        <span class="text-h6 font-weight-bold text-grey-darken-4">
          Soft<span class="text-primary">Touch</span>
        </span>
      </NuxtLink>

      <v-spacer />

      <!-- Nav links (desktop) -->
      <nav class="d-none d-md-flex align-center ga-1">
        <v-btn
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          variant="text"
          color="grey-darken-3"
          class="nav-link text-body-2 font-weight-medium"
          rounded="0"
        >
          {{ link.label }}
        </v-btn>
      </nav>

      <v-spacer />

      <!-- CTA -->
      <v-btn
        to="/contact"
        color="primary"
        variant="elevated"
        class="d-none d-md-flex ms-4 text-white"
        rounded="pill"
        elevation="0"
      >
        Book Appointment
        <v-icon icon="mdi-calendar-check" end />
      </v-btn>

      <!-- Mobile hamburger -->
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click="drawer = !drawer"
        color="grey-darken-3"
      />
    </v-container>
  </v-app-bar>

  <!-- Mobile drawer -->
  <v-navigation-drawer v-model="drawer" location="end" temporary>
    <v-list>
      <v-list-item
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :title="link.label"
        @click="drawer = false"
      />
      <v-divider class="my-2" />
      <v-list-item>
        <v-btn to="/contact" color="primary" block rounded="pill" elevation="0">
          Book Appointment
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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
  letter-spacing: 0;
  transition: color 0.2s;
}
.nav-link:hover {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
