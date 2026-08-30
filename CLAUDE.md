# Soft Touch Aesthetics Studio — project notes

Marketing site for a sugaring (natural hair removal) studio in Saskatoon, SK.
Nuxt 4 + Vue 3 + Tailwind, bilingual EN/FR, no test suite. Dev server runs on
port **1080** (`npm run dev`, or `npm run dev:host` to expose on the LAN).

## How the owner likes to work

This is the most important thing to carry between sessions.

**Design work is proposed before it is built.** For any visual change of
substance — a new page, a page redesign, a new content block — the expected
flow is:

1. Build an **Artifact** showing the proposed design, usually **3 distinct
   options**, not variations on one idea.
2. **Wait for confirmation.** Do not touch the code until an option is picked.
   The owner replies with the option letter/number (e.g. "A", "use B for the
   FAQ page and option 1 for the homepage") and then says "continue making
   code changes".
3. When a design is revised, **update the existing artifact** rather than
   publishing a new one — the URL is the thing being reviewed.

Small, unambiguous fixes (alignment, a colour, removing a line of copy) skip
the artifact and go straight into the code.

**Feedback arrives as screenshots.** Desktop and mobile, often both. Read them
carefully — the reported bug is usually visible in the image, and mobile
regressions have been a recurring theme (carousel controls overlapping text,
chevrons off-centre in their buttons).

**Copy comes from the owner, verbatim.** Treatment descriptions, the "Why
Choose Sugaring?" block, before/after-care instructions, and the FAQ answers
were all supplied as text to be placed, not written or embellished. Do not
invent studio facts — services, prices, hours, phone number. If a fact isn't
confirmed, the site falls back to pointing at the full menu on Fresha. See the
comment at the top of [app/utils/treatments.ts](app/utils/treatments.ts).

Commits and pushes happen when asked ("commit and push changes to git"), not
automatically.

## Design system

Full-bleed **dark** theme across the whole site, with a card-based page
structure (the "Menu card" layout the owner asked for on About and Services,
since applied site-wide). Page background is `#100f0a`.

Palette lives in [tailwind.config.js](tailwind.config.js):

| Token | Hex | Use |
|---|---|---|
| `ink` | `#2a2818` | Deep base, theme-color |
| `cream` | `#f3eed8` | Body text (usually at `/80` opacity) |
| `gold` | `#c1892f` | Primary CTA, "Book Appointment" |
| `ember` | `#a15b28` | Accent |
| `primary` | `#696740` | Muted olive |

Typography is **EB Garamond** throughout, loaded from Google Fonts and applied
via a `*` rule in [app/assets/css/main.css](app/assets/css/main.css).

Settled UI conventions, each the result of a specific correction:

- **Active nav state is a colour change, not an underline.**
- The "Book Appointment" CTA has a fixed text colour used consistently
  everywhere it appears.
- Carousel chevrons must be optically centred inside their buttons.
- **On mobile the hero slider has no visible controls** — it is swipe-only.
  Bottom controls were tried and rejected for colliding with the copy.
- Socials are Facebook, Instagram and TikTok. There is deliberately no "Book on
  Fresha" or "Call the studio" block on the contact page, and no "replies
  within one business day" line.

## Architecture

**Shared data modules** are the single source of truth; components read from
them so details cannot drift:

- [app/utils/studio.ts](app/utils/studio.ts) — name, address, opening hours.
  Consumed by the header, footer, contact page and the LocalBusiness schema.
- [app/utils/treatments.ts](app/utils/treatments.ts) — treatment catalogue and
  the four category pages.
- [app/utils/contact.ts](app/utils/contact.ts), [app/utils/fresha.ts](app/utils/fresha.ts)
  — contact details and the Fresha booking URL.

**Pages**: index, about, services, contact, faq, plus four crawlable category
pages (`/intimate-sugaring`, `/body-sugaring`, `/mens-sugaring`,
`/facial-sugaring`) all rendered through the shared
[app/components/CategoryPage.vue](app/components/CategoryPage.vue).

**i18n**: `@nuxtjs/i18n` with `strategy: "no_prefix"` — EN and FR share one set
of URLs. Locale persistence is handled manually in
[app/plugins/i18n-locale.client.ts](app/plugins/i18n-locale.client.ts) rather
than by browser detection. **All user-facing copy goes in
[i18n/locales/en.json](i18n/locales/en.json) and
[i18n/locales/fr.json](i18n/locales/fr.json)** — components reference keys,
never literals.

**SEO** (a later pass over the whole site):

- `ssr: true` with Nitro prerendering. It was previously an SPA, which served
  crawlers an empty shell.
- [app/composables/usePageSeo.ts](app/composables/usePageSeo.ts) gives each page
  a unique title, description, canonical and Open Graph tags.
- [app/plugins/local-business-schema.ts](app/plugins/local-business-schema.ts)
  emits LocalBusiness JSON-LD.
- [server/routes/sitemap.xml.get.ts](server/routes/sitemap.xml.get.ts) generates
  the sitemap.

## One thing is still blocking launch

**`NUXT_PUBLIC_SITE_URL` is empty.** Canonical tags, absolute `og:image` and
the sitemap are all suppressed until it is set. Because pages are prerendered
it must be set at **build** time:
`NUXT_PUBLIC_SITE_URL=https://… npm run build`. Setting it on the running
server does nothing to the already-generated HTML. This is deliberate —
guessing an origin can deindex the site — so leave it empty until the owner
supplies the real value.

`STUDIO_PHONE` is now filled in and the LocalBusiness schema emits it.

## Contact details that are still partly empty

Every field in [app/utils/contact.ts](app/utils/contact.ts) follows one rule:
**anything empty is hidden rather than rendered as a dead link**, so the page
stays coherent while values are outstanding. All three `SOCIAL_LINKS` URLs and
`STUDIO_PHONE` are now set.

The studio inbox is **not** in that file — it comes from
`NUXT_PUBLIC_CONTACT_EMAIL` and is read through `useContactEmail()` in
[app/composables/useContact.ts](app/composables/useContact.ts). It drives three
things: the email row on the contact page, `email` in the LocalBusiness schema,
and the contact form's endpoint. **It is still empty**, so the form currently
fails honestly rather than pretending to send.

## The contact form

Posts from the browser to **FormSubmit**, at
`https://formsubmit.co/ajax/<NUXT_PUBLIC_CONTACT_EMAIL>`. The `/ajax/` endpoint
is deliberate: the plain form `action` would navigate the visitor to
formsubmit.co, discarding the page's own translated sending / thanks / error
states. There is no server route and no mail dependency.

Two things to know:

- **FormSubmit needs activating.** The first submission to a new address
  triggers a confirmation email that must be clicked before anything is
  forwarded. Until then it answers `200` with `{"success":"false"}` — which is
  why the handler checks the body rather than trusting the status code.
- A `_honey` honeypot field sits off-screen in the form. Anything non-empty
  there is dropped before the request is made.

## Assets

Brand marks and imagery live in [public/](public/) and [brand/](brand/). The
favicon is a cream monogram **on an ink plate**, not on transparency, because
cream-on-transparent vanishes in a light browser tab. Unused images have been
pruned from the bundle once already; keep the served set tight.
