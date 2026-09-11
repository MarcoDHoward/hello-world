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
  doors: "10:00PM",              // display text only, shown as "10:00PM – 4:00AM"
  close: "4:00AM",
  venue: "Monkey Loft",
  address: "Seattle",            // optional
  headliner: "Artist Name",      // set in Archivo Black
  labels: ["Label", "Label"],    // optional label credits under the headliner
  support: ["Artist", "Artist"], // optional, one per line
  opener: "Artist",              // optional, sits below the support acts
  tickets: "https://ra.co/events/1234567", // optional. No link, no button.
  flyer: "assets/flyers/nocturne-005.jpg", // optional. See below.
  flyerAlt: "NOCTURNE 005 flyer. Artist Name, Monkey Loft, 14 Nov.", // optional
},
```

What happens automatically:

- The earliest event dated today or later becomes the **Next event**
  section and the hero button. The section takes that series' palette
  and lays the lineup out the way the flyers do: month over a heavy
  date numeral, series name, headliner, label credits, support acts,
  opener. If the event has a `flyer`, the image sits beside the text.
- The "Sound" line under the next event comes from `soundTags` on the
  series in `MIRAGE_SERIES`, joined with a middle dot.
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
`assets/flyers/velvet-2026-11-07.jpg` is the sample flyer, wired to the
sample VELVET 005 event.

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

Brand collateral lives in `assets/brand/`:

| File | Used for |
|---|---|
| `mirage-logo-stacked.png` | social preview (`og:image`) |
| `mirage-logo-horizontal.png` | reference; nav uses the wordmark as text |
| `mirage-icon-neutral.png` | favicon and Apple touch icon |
| `mirage-icon-velvet.png` | reference; Velvet colourway |

The hero mark is an inline SVG in `index.html`, marked with an HTML
comment. It is drawn from the geometry of the stacked logo so CSS can
recolour it per series. It follows the class contract in `brand.md`:

```css
.bar     { fill: var(--bar); }
.reflect { fill: var(--reflect); }
.accent  { fill: var(--accent); }
.word    { color: var(--word); }
```

The centre bar has `class="bar accent"`, and its reflection dashes have
`class="reflect reflect--accent"`. Each bar carries a `--i` custom
property and each reflection row a `--r`, which stagger the shimmer.

When the SVG versions of the logos arrive, add them to `assets/brand/`
and, if you want the hero to use the real file, paste `mirage-mark.svg`
over the inline SVG keeping `class="mark"` on the root and the class
names above on the shapes.

## Palettes

Defined once as custom properties at the top of `css/styles.css`. Add
`theme-velvet` or `theme-nocturne` to any element and everything inside
it, including buttons and labels, switches palette.

| Series   | bg        | deep      | accent    | accent 2  | text      | bar       | reflect   |
| -------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Parent   | `#0A0D12` | `#05080E` | `#9FB4C4` | `#6A5AE0` | `#E4EAF0` | `#E4EAF0` | `#6F8698` |
| Velvet   | `#0E070B` | `#4A1A28` | `#E3A45A` | `#C98B7A` | `#EDE3D6` | `#EDE3D6` | `#7A4C4A` |
| Nocturne | `#05080E` | `#15304A` | `#4FD8DC` | `#6A5AE0` | `#E4EAF0` | `#E4EAF0` | `#3E5B78` |

The source of truth for colours, type and voice is `brand.md`.

## Fonts

Loaded from Google Fonts in the `<head>`. Michroma ships in one weight
and `font-synthesis: none` on `body` stops browsers from faking a bold.
Archivo Black is likewise a single weight, so headliner names and the
date numeral use `font-weight: 400` with that family rather than `bold`.
Body copy is Archivo 400, support acts Archivo 300, times Michroma, and
the Velvet series name Cormorant Garamond italic, as `brand.md` sets out.

## Motion

The waveform shimmers slowly on load and the reflection breathes. Both
stop under `prefers-reduced-motion: reduce`, as does the hero fade-in.
