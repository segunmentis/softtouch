# Soft Touch Aesthetics Studio

Website for a sugaring (natural hair removal) studio in Saskatoon, SK.

Nuxt 4 · Vue 3 · Tailwind · English-only · server-rendered and prerendered to
static HTML. No test suite.

Working on this with Claude Code? Read [CLAUDE.md](CLAUDE.md) first — it covers
how the owner likes to work, the design system and the settled UI conventions.

## Running it

Requires Node 20+ (developed on 24).

```bash
npm install
npm run dev          # http://localhost:1080
npm run dev:host     # same, exposed on the LAN for phone testing
```

The dev server runs on **port 1080**, not Nuxt's default 3000.

```bash
npm run build        # production build into .output/
npm run preview      # serve that build locally
```

## Configuration

Two values live in `runtimeConfig.public` in
[nuxt.config.ts](nuxt.config.ts) and can be overridden by environment
variable:

| Variable                    | Drives                                                                    |
| --------------------------- | ------------------------------------------------------------------------- |
| `NUXT_PUBLIC_SITE_URL`      | Canonical tags, absolute `og:image`, the sitemap                          |
| `NUXT_PUBLIC_CONTACT_EMAIL` | Contact form endpoint, the email row, `email` in the LocalBusiness schema |

**Both must be set at build time, not runtime.** Pages are prerendered to static
HTML, so the values are baked into the generated output. Setting them on an
already-running server changes nothing:

```bash
NUXT_PUBLIC_SITE_URL=https://example.ca npm run build   # correct
NUXT_PUBLIC_SITE_URL=https://example.ca node .output/server/index.mjs   # no effect
```

Anything left empty is **hidden rather than rendered as a dead link**, so the
site stays coherent while a value is outstanding. That is deliberate — a
canonical pointing at the wrong origin can deindex the site, so omitting beats
guessing.

## How it fits together

Shared data modules are the single source of truth; components read from them so
details cannot drift apart.

| File                                               | Holds                                                         |
| -------------------------------------------------- | ------------------------------------------------------------- |
| [app/utils/studio.ts](app/utils/studio.ts)         | Name, address, phone, opening hours                           |
| [app/utils/treatments.ts](app/utils/treatments.ts) | The service menu — price, duration, description per treatment |
| [app/utils/faqs.ts](app/utils/faqs.ts)             | The nine Q&As, shared by `/faq` and the homepage              |
| [app/utils/prepare.ts](app/utils/prepare.ts)       | Before/after care, shared by the homepage and `/services`     |
| [app/utils/contact.ts](app/utils/contact.ts)       | Map URL and social profiles                                   |
| [app/utils/fresha.ts](app/utils/fresha.ts)         | The Fresha booking URL                                        |

Pages: `index`, `about`, `services`, `contact`, `faq`, plus `app/error.vue` for
404s and 500s.

SEO is a deliberate layer rather than a default:
[usePageSeo](app/composables/usePageSeo.ts) gives each page a unique title,
description, canonical and Open Graph tags;
[local-business-schema.ts](app/plugins/local-business-schema.ts) emits
LocalBusiness JSON-LD; [sitemap.xml.get.ts](server/routes/sitemap.xml.get.ts)
generates the sitemap. `/faq` additionally emits FAQPage structured data.

## The contact form

Posts from the browser to **FormSubmit**, at
`https://formsubmit.co/ajax/<NUXT_PUBLIC_CONTACT_EMAIL>`. There is no server
route and no mail dependency.

The `/ajax/` endpoint is used rather than a plain form `action` so the visitor
stays on the page and the site's own sending / thanks / error states still mean
something.

Two things to know:

- **FormSubmit requires activation.** The first submission to a new address
  triggers a confirmation email that has to be clicked before anything is
  forwarded. Until then it answers `200` with `{"success":"false"}` — which is
  why the handler checks the response body rather than trusting the status code.
- A `_honey` honeypot field sits off-screen in the form. Anything non-empty
  there is dropped before the request is made.

## Assets

Every served image is **WebP**; the JPEG/PNG originals were removed rather than
kept as fallbacks. Convert new images before adding them:

```bash
cwebp -q 80 -m 6 input.jpg -o public/images/input.webp
```

**EB Garamond is self-hosted** in `public/fonts/` (latin subset only), declared
in `app/assets/css/fonts.css`. Regenerate by re-fetching the Google Fonts CSS
and keeping only the `latin` blocks.

Logo masters live in [brand/](brand/), outside `public/` so they are not served.
See [brand/README.md](brand/README.md) for which derivative comes from which
master.

## Prices come from Fresha

Every price, duration and description in `treatments.ts` is transcribed from the
live Fresha booking menu. **Fresha stays the source of truth** — a price changed
there has to be changed here too, or the site quotes a stale figure. Nothing in
that file is invented; a service only appears once it exists on the booking menu.
