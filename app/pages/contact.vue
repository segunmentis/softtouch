<template>
  <div class="bg-[#100f0a]">
    <DarkHero
      :image="heroImage"
      :image-alt="t('alt.portrait')"
      :kicker="t('pages.contact.kicker')"
      :title="t('pages.contact.title')"
      :sub="t('pages.contact.heroSub')"
    />

    <section class="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-[0.85fr_1fr] md:gap-14">
        <!-- Studio details -->
        <Reveal class="flex flex-col gap-6">
          <div v-for="detail in details" :key="detail.key" class="flex gap-4 border-b border-cream/10 pb-5">
            <span
              class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/45 text-sm text-gold"
              aria-hidden="true"
            >
              {{ detail.icon }}
            </span>
            <div>
              <h2 class="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
                {{ t(detail.headingKey) }}
              </h2>

              <!-- Address: name / street / city, exactly as it should appear everywhere -->
              <address v-if="detail.key === 'address'" class="text-base not-italic leading-relaxed text-cream/80">
                {{ STUDIO_NAME }}<br />
                {{ STUDIO_ADDRESS.street }}<br />
                {{ STUDIO_ADDRESS.city }}, {{ STUDIO_ADDRESS.region }} {{ STUDIO_ADDRESS.postalCode }}
              </address>

              <!-- Hours: the full weekly schedule -->
              <dl v-else-if="detail.key === 'hours'" class="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-base text-cream/80">
                <dt>{{ t('hours.weekdays') }}</dt>
                <dd>{{ t('hours.weekdaysTime') }}</dd>
                <dt>{{ t('hours.saturday') }}</dt>
                <dd>{{ t('hours.saturdayTime') }}</dd>
                <dt>{{ t('hours.sunday') }}</dt>
                <dd>{{ t('hours.sundayTime') }}</dd>
              </dl>

              <a
                v-else-if="detail.href"
                :href="detail.href"
                class="text-base text-cream/80 no-underline transition-colors hover:text-cream"
              >
                {{ detail.value }}
              </a>
              <p v-else class="text-base leading-relaxed text-cream/80">{{ detail.value }}</p>
            </div>
          </div>

          <a
            v-if="MAP_URL"
            :href="MAP_URL"
            target="_blank"
            rel="noopener"
            class="map flex items-center justify-between gap-3 rounded-xl border border-cream/12 bg-[#191710] p-4 no-underline"
          >
            <span class="text-sm text-cream/85">{{ t('footer.address') }}</span>
            <span class="flex-shrink-0 text-[11px] font-semibold uppercase tracking-wider text-gold">
              {{ t('pages.contact.mapLink') }} →
            </span>
          </a>
        </Reveal>

        <!-- Message form -->
        <Reveal>
          <div class="rounded-2xl border border-cream/10 bg-[#191710] p-6 md:p-8">
            <p class="mb-1 text-sm font-semibold uppercase tracking-widest text-gold">
              {{ t('pages.contact.formKicker') }}
            </p>
            <h2 class="mb-2 text-2xl italic text-cream">{{ t('pages.contact.formHeading') }}</h2>
            <p class="mb-6 text-sm text-cream/60">{{ t('pages.contact.formIntro') }}</p>

            <form novalidate @submit.prevent="submit">
              <!-- Spam trap: off-screen rather than display:none, which some
                   bots detect and skip. Never shown to a real visitor. -->
              <div class="absolute left-[-9999px]" aria-hidden="true">
                <label for="contact-company">Company</label>
                <input id="contact-company" v-model="honey" type="text" tabindex="-1" autocomplete="off" />
              </div>

              <div class="mb-4">
                <label for="contact-name" class="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-cream/60">
                  {{ t('pages.contact.name') }}
                </label>
                <input id="contact-name" v-model="form.name" type="text" required class="field" />
              </div>
              <div class="mb-4">
                <label for="contact-email" class="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-cream/60">
                  {{ t('pages.contact.email') }}
                </label>
                <input id="contact-email" v-model="form.email" type="email" required class="field" />
              </div>
              <div class="mb-5">
                <label for="contact-message" class="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-cream/60">
                  {{ t('pages.contact.message') }}
                </label>
                <textarea id="contact-message" v-model="form.message" rows="5" required class="field" />
              </div>

              <button
                type="submit"
                :disabled="status === 'sending'"
                class="w-full rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
              >
                {{ status === 'sending' ? t('pages.contact.sending') : t('pages.contact.send') }}
              </button>

              <p
                v-if="status === 'sent'"
                role="status"
                class="mt-4 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-cream"
              >
                {{ t('pages.contact.thanks', { name: sentName }) }}
              </p>
              <p
                v-else-if="status === 'error'"
                role="alert"
                class="mt-4 rounded-lg border border-ember/50 bg-ember/10 px-4 py-3 text-sm text-cream"
              >
                {{ t('pages.contact.error') }}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- Socials -->
    <section v-if="socials.length" class="border-t border-cream/10 bg-[#191710] py-14">
      <div class="mx-auto max-w-7xl px-6">
        <Reveal tag="p" class="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
          {{ t('pages.contact.socialHeading') }}
        </Reveal>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Reveal v-for="social in socials" :key="social.key">
            <a
              :href="social.url"
              target="_blank"
              rel="noopener"
              class="social block h-full rounded-xl border border-cream/10 bg-[#100f0a] p-5 no-underline"
            >
              <span class="mb-0.5 block text-xl italic text-cream">{{ social.label }}</span>
              <span v-if="social.handle" class="block text-sm text-cream/60">{{ social.handle }}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta px-6 py-16 text-center">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-4 text-3xl italic text-cream">{{ t('pages.home.finalCtaHeading') }}</h2>
        <p class="mx-auto mb-8 max-w-lg text-cream/85">{{ t('pages.home.finalCtaBody') }}</p>
        <a
          :href="FRESHA_BOOKING_URL"
          target="_blank"
          rel="noopener"
          class="inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink no-underline shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {{ t('pages.contact.bookOnFresha') }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

usePageSeo({ path: "/contact", titleKey: "seo.contact.title", descriptionKey: "seo.contact.description" });

const heroImage = "/images/home/portrait.jpg";

const contactEmail = computed(() => useContactEmail());
const formEndpoint = computed(() => useContactFormEndpoint());

const details = computed(() =>
  [
    { key: "address", icon: "◎", headingKey: "pages.contact.addressHeading", value: t("footer.address"), href: "" },
    { key: "hours", icon: "◷", headingKey: "pages.contact.hoursHeading", value: t("footer.hours"), href: "" },
    contactEmail.value
      ? {
          key: "email",
          icon: "✉",
          headingKey: "pages.contact.emailHeading",
          value: contactEmail.value,
          href: `mailto:${contactEmail.value}`,
        }
      : null,
  ].filter((d): d is NonNullable<typeof d> => d !== null)
);

// Entries without a URL are omitted rather than rendered as dead links.
const socials = computed(() => SOCIAL_LINKS.filter((s) => s.url));

const form = reactive({ name: "", email: "", message: "" });
// Spam trap. Bots fill every field they find; a real visitor never sees this
// one, so anything non-empty here is discarded. FormSubmit honours `_honey`
// server-side too, but bailing early saves the request.
const honey = ref("");
const status = ref<"idle" | "sending" | "sent" | "error">("idle");
const sentName = ref("");

async function submit() {
  if (honey.value) return;

  // Nothing configured yet: fail honestly rather than claiming it sent.
  if (!formEndpoint.value) {
    status.value = "error";
    return;
  }

  status.value = "sending";
  sentName.value = form.name;

  try {
    // FormSubmit replies 200 with { success: "false", message } for a form that
    // has not been activated yet, so the body is checked rather than trusting
    // the status code.
    const res = await $fetch<{ success?: string | boolean; message?: string }>(formEndpoint.value, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: {
        name: form.name,
        email: form.email,
        message: form.message,
        // Names the studio, so the enquiry is identifiable in the inbox.
        _subject: `${STUDIO_NAME} — ${form.name}`,
        // Sends a readable table instead of FormSubmit's default layout, and
        // suppresses their captcha page (this is an AJAX POST, so a redirect to
        // a captcha would strand the visitor).
        _template: "table",
        _captcha: "false",
        _honey: honey.value,
      },
    });

    if (res && String(res.success) === "false") throw new Error(res.message || "rejected");

    status.value = "sent";
    Object.assign(form, { name: "", email: "", message: "" });
  } catch {
    status.value = "error";
  }
}
</script>

<style scoped>
.final-cta {
  background: linear-gradient(165deg, #2a2818 0%, #696740 45%, #c1892f 80%, #a15b28 100%);
}
.map {
  transition: border-color 0.22s ease;
}
.map:hover {
  border-color: rgba(217, 163, 77, 0.5);
}
.social {
  transition: border-color 0.22s ease, transform 0.22s ease;
}
.social:hover {
  border-color: rgba(217, 163, 77, 0.5);
  transform: translateY(-2px);
}
.field {
  width: 100%;
  border-radius: 7px;
  border: 1px solid rgba(243, 238, 216, 0.18);
  background: #100f0a;
  padding: 0.625rem 0.75rem;
  color: rgba(243, 238, 216, 0.9);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.field:hover {
  border-color: rgba(243, 238, 216, 0.32);
}
.field:focus {
  outline: none;
  border-color: #c1892f;
  box-shadow: 0 0 0 3px rgba(193, 137, 47, 0.22);
}
button:focus-visible,
a:focus-visible {
  outline: 2px solid #c1892f;
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .map img,
  .social,
  .field {
    transition: none;
  }
}
</style>
