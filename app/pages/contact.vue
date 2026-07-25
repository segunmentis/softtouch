<template>
  <div>
    <PageBanner :kicker="t('pages.contact.kicker')" :title="t('pages.contact.title')" />

    <div class="mx-auto max-w-7xl px-6 py-16">
    <div class="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
      <div>
        <div class="mb-8">
          <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            {{ t('pages.contact.addressHeading') }}
          </h2>
          <p class="text-base text-gray-700">{{ t('footer.address') }}</p>
        </div>
        <div class="mb-8">
          <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            {{ t('pages.contact.hoursHeading') }}
          </h2>
          <p class="text-base text-gray-700">{{ t('footer.hours') }}</p>
        </div>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-6 py-3 font-medium text-ink no-underline"
        >
          {{ t('pages.contact.bookOnFresha') }}
        </a>
      </div>

      <div>
        <h2 class="mb-2 text-xl italic">{{ t('pages.contact.formHeading') }}</h2>
        <p class="mb-5 text-sm text-gray-600">{{ t('pages.contact.formIntro') }}</p>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label class="mb-1 block text-sm font-medium">{{ t('pages.contact.name') }}</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full rounded border border-gray-300 px-3 py-2 focus:border-gold focus:outline-none"
            />
          </div>
          <div class="mb-3">
            <label class="mb-1 block text-sm font-medium">{{ t('pages.contact.email') }}</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full rounded border border-gray-300 px-3 py-2 focus:border-gold focus:outline-none"
            />
          </div>
          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium">{{ t('pages.contact.message') }}</label>
            <textarea
              v-model="form.message"
              rows="5"
              required
              class="w-full rounded border border-gray-300 px-3 py-2 focus:border-gold focus:outline-none"
            />
          </div>
          <button
            type="submit"
            class="w-full rounded bg-primary px-6 py-3 text-white"
          >
            {{ t('pages.contact.send') }}
          </button>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const form = reactive({
  name: "",
  email: "",
  message: "",
});

function submit() {
  alert(t("pages.contact.thanks", { name: form.name }));
}
</script>
