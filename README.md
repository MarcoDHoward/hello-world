# MIRAGE

Single-page marketing site for MIRAGE, a Seattle electronic music event
brand with two series: VELVET and NOCTURNE.

Static site. No build step, no backend, no framework. Open `index.html`
in a browser or host the folder anywhere that serves static files
(GitHub Pages, Netlify, Cloudflare Pages).

```
index.html        markup for all six sections, plus the inline logo SVG
css/styles.css    styles and the three palettes (parent, Velvet, Nocturne)
js/main.js        fills "Next event" and "Past" from the data file
data/events.js    all event data. Edit this to add or change events
assets/flyers/    drop flyer images here
```

## Adding an event

Open `data/events.js` and add an object to the `MIRAGE_EVENTS` array.
Order does not matter. The page sorts by date.

```js
{
  series: "nocturne",            // "velvet" or "nocturne". Picks the palette.
  edition: "NOCTURNE 005",       // short name shown above the date
  date: "2026-11-14",            // YYYY-MM-DD, Seattle local date
  doors: "10pm",                 // display text only
  close: "4am",
  venue: "Monkey Loft",
  address: "Seattle",            // optional
  headliner: "Artist Name",      // set in Archivo Black
  support: ["Artist", "Artist"], // optional
  tickets: "https://ra.co/events/1234567", // optional. No link, no button.
  flyer: "assets/flyers/nocturne-005.jpg", // optional. See below.
  flyerAlt: "NOCTURNE 005 flyer. Artist Name, Monkey Loft, 14 Nov.", // optional
},
```

What happens automatically:

- The earliest event dated today or later becomes the **Next event**
  section and the hero button. The section takes that series' palette.
- Every event dated before today goes to the **Past** grid, newest
  first, up to eight tiles.
- If there is no upcoming event, the Next section says so and the hero
  button points at the mailing list.

## Flyer images

Put flyers in `assets/flyers/` and set the `flyer` field to that path.
Tiles are 4:5, the Instagram portrait ratio, and images are cropped to
cover. A JPEG around 800 by 1000 pixels is plenty.

If `flyer` is empty the tile is drawn from the event data in the series
palette, so the grid never looks broken while you wait on artwork.

## Ticket links

Per event, in the `tickets` field of `data/events.js`. Leave it as an
empty string until tickets are on sale and the button will not render.

## Social and contact links

In `index.html`, inside `<footer class="site-footer">`. Four placeholder
hrefs to swap:

| Link            | Placeholder                              |
| --------------- | ---------------------------------------- |
| Instagram       | `https://instagram.com/YOUR_HANDLE`      |
| Resident Advisor| `https://ra.co/promoters/YOUR_ID`        |
| SoundCloud      | `https://soundcloud.com/YOUR_HANDLE`     |
| Email           | `mailto:hello@example.com`               |

The footer also has a "Seattle. 21+." line. Change or remove it as needed.

## Mailing list

The form is in `index.html` under `<section class="list">`.

**Buttondown.** Replace `YOUR_USERNAME` in the form `action`:

```
https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME
```

**Mailchimp.** In Mailchimp go to Audience, Signup forms, Embedded forms,
and copy the `action` URL from the generated form. Paste it into the
form `action`, and change the email input's `name` from `email` to
`EMAIL`. Mailchimp also expects a hidden honeypot input. Copy the one
from its embed code if you want it.

The form posts in a new tab so the site stays open.

## The logo

The waveform mark in the hero is an inline SVG in `index.html`, marked
with an HTML comment. The version in this repo is a stand-in drawn to
match the description of the real mark. To use the real file, paste the
contents of `mirage-ig-velvet-wordmark.svg` in its place and keep:

- `class="wordmark"` on the root `<svg>` so it sizes correctly
- `fill="currentColor"` on the bars, so CSS colours the mark
- `class="bar"` on each bar and a `--i` custom property counting up
  from 0, if you want the slow shimmer on load
- `class="reflection"` on the mirrored group for the reflection breathe

If your SVG already contains the word MIRAGE, add `class="visually-hidden"`
to the `<h1 class="hero__title">` so it stays for screen readers without
doubling on screen, or delete it.

The mark takes its colour from the `color` on `.wordmark`. Set it to
`var(--accent)` inside a `.theme-velvet` or `.theme-nocturne` block to
recolour it per series.

## Palettes

Defined once as custom properties at the top of `css/styles.css`. Add
`theme-velvet` or `theme-nocturne` to any element and everything inside
it, including buttons and labels, switches palette.

| Series   | bg        | deep      | accent    | accent 2  | text      |
| -------- | --------- | --------- | --------- | --------- | --------- |
| Parent   | `#0A0D12` | `#05080E` | `#E4EAF0` | `#6A5AE0` | `#E4EAF0` |
| Velvet   | `#0E070B` | `#4A1A28` | `#E3A45A` | `#C98B7A` | `#EDE3D6` |
| Nocturne | `#05080E` | `#15304A` | `#4FD8DC` | `#6A5AE0` | `#E4EAF0` |

## Fonts

Loaded from Google Fonts in the `<head>`. Michroma ships in one weight
and `font-synthesis: none` on `body` stops browsers from faking a bold.
Archivo Black is likewise a single weight, so headliner names use
`font-weight: 400` with that family rather than `bold`.

## Motion

The waveform shimmers slowly on load and the reflection breathes. Both
stop under `prefers-reduced-motion: reduce`, as does the hero fade-in.
