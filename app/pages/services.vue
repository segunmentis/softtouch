<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h1 class="text-h3 font-weight-bold mb-6">Our Services</h1>
        <v-row>
          <v-col v-for="service in services" :key="service.title" cols="12" md="4">
            <v-card height="100%">
              <v-card-item>
                <v-icon :icon="service.icon" size="36" color="primary" class="mb-2" />
                <v-card-title>{{ service.title }}</v-card-title>
              </v-card-item>
              <v-card-text>{{ service.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const services = [
  {
    title: 'Web Development',
    icon: 'mdi-web',
    description: 'Modern, responsive web applications built with the latest technologies.',
  },
  {
    title: 'Mobile Apps',
    icon: 'mdi-cellphone',
    description: 'Cross-platform mobile applications for iOS and Android.',
  },
  {
    title: 'Consulting',
    icon: 'mdi-lightbulb-outline',
    description: 'Expert technology consulting to help guide your digital strategy.',
  },
]
</script>
