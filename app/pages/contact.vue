<template>
  <div class="mx-auto max-w-7xl px-6 py-12">
    <div class="mx-auto max-w-2xl">
      <h1 class="mb-6 text-4xl font-bold">Contact Us</h1>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="mb-1 block text-sm font-medium">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div class="mb-3">
          <label class="mb-1 block text-sm font-medium">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full rounded border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Message</label>
          <textarea
            v-model="form.message"
            rows="5"
            required
            class="w-full rounded border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          class="w-full rounded bg-primary px-6 py-3 text-white"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
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
