<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 class="text-h3 font-weight-bold mb-6">Contact Us</h1>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="form.name"
            label="Name"
            variant="outlined"
            class="mb-3"
            required
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            variant="outlined"
            class="mb-3"
            required
          />
          <v-textarea
            v-model="form.message"
            label="Message"
            variant="outlined"
            rows="5"
            class="mb-4"
            required
          />
          <v-btn type="submit" color="primary" size="large" block
            >Send Message</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const form = reactive({
  name: "",
  email: "",
  message: "",
});

function submit() {
  alert(`Thanks ${form.name}, we'll be in touch!`);
}
</script>
