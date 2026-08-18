# Goalsquare — World of Goalkeeping

Redesign of [goalsquare.eu](https://goalsquare.eu) as a Next.js 15 application, in four languages
(Deutsch, English, Français, Nederlands).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /de
npm run build && npm start
npm run typecheck
```

Node 20+ required. No environment variables are needed for local development.

---

## What is included

| Area | Route (de) | Notes |
| --- | --- | --- |
| Home | `/de` | Hero, 4-step method, 5 elements, product world, planner showcase, audience, news |
| Concept | `/de/konzept` | Interactive 5-element explorer (see below) |
| Products | `/de/produkte` | Product world + BASIC/PRO/PLAN comparison table |
| Shop | `/de/shop` | Filter by category, sort by price, add to cart |
| Product detail | `/de/shop/basic-edition` | Features, specs, related products |
| Cart | `/de/warenkorb` | Quantity, remove, order summary |
| Checkout | `/de/kasse` | 3-step flow with validation → `/de/kasse/danke` |
| News archive | `/de/news` | Category filter + search |
| Article | `/de/news/<slug>` | MDX article layout with related posts |
| Contact | `/de/kontakt` | Form + club enquiry |

Downloads and Partner pages were intentionally left out, as agreed.

### Localised URLs

Each language gets its own path segment, e.g.

```
/de/konzept   /en/concept   /fr/concept      /nl/concept
/de/produkte  /en/products  /fr/produits     /nl/producten
/de/shop      /en/shop      /fr/boutique     /nl/shop
/de/news      /en/news      /fr/actualites   /nl/nieuws
/de/warenkorb /en/cart      /fr/panier       /nl/winkelwagen
/de/kasse     /en/checkout  /fr/commande     /nl/afrekenen
```

`sitemap.xml` emits `hreflang` alternates for all four locales automatically.

---

## The 5 core elements (client's final decision)

Built exactly as agreed with Walter Harth on 18 Aug:

- **No pyramid.** Element list on the left, matrix card on the right.
- Custom icons per element, colour-matched left border on the active row.
- The card shows a **big number** (`03`) instead of the word "STUFE".
- Under the title: the **bold intro line** from the client's Word document.
- `Mehr erfahren…` expands the remaining text from the same document.
- `Beispiel-Übung` opens a drill diagram, `Video` opens the element clip.
- Element colours: `01` blue · `02` magenta · `03` red · `04` yellow · `05` green.

Texts live in `src/lib/elements.ts`, one block per language, taken verbatim from
`5 elemets description text {GERMAN|ENGLISH|FRENCH|DUTCH}`.

**To swap in the real videos:** drop the client's clips into `public/media/`
as `GSV0001.mp4`, `GSV0044.mp4`, `GSV0089.mp4`, `GSV0114.mp4`, `GSV0128.mp4`
(the paths are already wired in `ELEMENT_META`).

---

## "Online planen" info screen

Because Goalsquare PLAN only goes live in September, every `Online planen` button opens an
**info modal** instead of leading to a dead end — launch date, feature list, an email
notify form and a fallback CTA to the BASIC/PRO software.
See `src/components/PlanInfoModal.tsx`; copy lives under the `plan.*` message keys.

When PLAN is live, replace `<PlanCta>` with a normal `<Link href="/plan">` (or the external
portal URL) and the modal disappears everywhere at once.

---

## Shop data

All products, prices and SKUs come from the live Goalsquare shop and the client's
updated product mockup:

| Product | Price |
| --- | --- |
| BASIC Edition | € 129 |
| PRO Suite | € 349 |
| Upgrade BASIC → PRO | € 219 |
| Goalsquare PLAN (monthly) | € 9,99 |
| Goalsquare PLAN (yearly) | € 99 |
| Drills Pack #1 / #2 / #3 | € 55 each |
| Bundle BASIC + DVD | € 135 |
| Bundle PRO + DVD | € 355 |
| DVD Goalkeeping Basics | € 14,95 |
| USB key (replacement) | € 35 |
| Mobile app | free |

Edit `src/lib/products.ts` to change prices, features or add products — the shop,
product pages, cart, checkout, sitemap and related-products all read from that one file.

### Checkout

The checkout is a **complete UI with validation but no payment gateway** — no card is charged
and a demo notice is shown to the user. To connect a real provider:

1. `CheckoutFlow.submit()` in `src/components/CheckoutFlow.tsx` is the single integration point.
2. Replace the local order-number generation with a call to your API route
   (e.g. `POST /api/checkout` creating a Stripe Checkout Session), then redirect to the
   returned URL.
3. `src/components/CartProvider.tsx` already exposes `lines`, `clear()` and totals.

---

## News

Articles are MDX files with front matter:

```
content/news/<slug>/de.mdx
content/news/<slug>/en.mdx
content/news/<slug>/fr.mdx
content/news/<slug>/nl.mdx
```

```yaml
---
title: "…"
excerpt: "…"
date: "2026-08-14"
category: "product" | "method" | "company" | "event"
author: "Walter Harth"
accent: "var(--color-el-5)"
featured: true          # optional
---
```

Adding a folder is enough — the archive, sitemap and static params pick it up automatically.
If a translation is missing, the German version is served as a fallback instead of a 404.

---

## Project layout

```
src/
  app/[locale]/          route segments (home, konzept, produkte, shop, news, kasse, …)
  components/            header, footer, cart, checkout, elements explorer, sections/
  i18n/                  routing (locales + localised pathnames), navigation, request config
  lib/                   elements.ts · products.ts · news.ts
  messages/              de.json · en.json · fr.json · nl.json
content/news/            MDX articles per language
public/img/              hero image
public/media/            ← drop element videos here
```

## Design tokens

Defined once in `src/app/globals.css` under `@theme`:

- Brand green `#00b862`, ink `#0a0d0c`, paper `#f6f8f7`
- Element colours `--color-el-1 … --color-el-5`
- Product accents `--color-acc-basic / pro / drills / app`
- Fonts: Archivo (display) + Inter (text), self-hosted via `@fontsource-variable`,
  so there is no Google Fonts request at runtime.

## Accessibility & SEO

- Skip link, focus-visible rings, `aria-selected` tabs, labelled form fields, `prefers-reduced-motion` respected.
- Per-page `generateMetadata`, Open Graph tags, `hreflang` alternates, `robots.txt`,
  `sitemap.xml` (cart and checkout excluded from indexing).
- All pages are statically generated; only the locale middleware runs at the edge.

## Adding a fifth language

1. Add the code to `locales` in `src/i18n/routing.ts` and to each `pathnames` entry.
2. Add `src/messages/<code>.json`.
3. Add the language block to `ELEMENT_TEXT` and `PRODUCT_TEXT`.
4. Add `content/news/<slug>/<code>.mdx` per article (optional — falls back to German).
