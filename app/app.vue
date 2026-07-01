<template>
  <v-app>
    <NuxtRouteAnnouncer />
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title>SoftTouch</v-app-bar-title>
      <v-spacer />
      <v-btn to="/" variant="text">Home</v-btn>
      <v-btn to="/about" variant="text">About</v-btn>
      <v-btn to="/services" variant="text">Services</v-btn>
      <v-btn to="/contact" variant="text">Contact</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>
