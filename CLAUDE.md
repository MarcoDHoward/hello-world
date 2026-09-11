# CLAUDE.md

Guidance for working in this repo.

## What this is

Single-page marketing site for MIRAGE. Static HTML, CSS and JS. No
build step, no framework, no backend. Open `index.html` directly or
serve the folder as static files.

## Brand

All brand rules live in [`brand.md`](brand.md): series, palettes, type,
logo files, flyer layout and voice. Read it before touching anything
visual or writing copy. Do not duplicate its contents here. If a brand
decision changes, change `brand.md`, then bring the code in line with it.

## Layout

```
index.html        markup for all sections, plus the inline logo SVG
css/styles.css    styles; palettes as custom properties at the top
js/main.js        fills "Next event" and "Past" from the data file
data/events.js    all event data (MIRAGE_EVENTS, MIRAGE_SERIES)
assets/flyers/    flyer images referenced from events.js
brand.md          brand reference
README.md         how to add events, links, flyers and the logo
```

## Conventions

- Event data goes in `data/events.js` only. Never hard-code an event
  in markup.
- Palettes are switched by adding `theme-velvet` or `theme-nocturne`
  to an element. Add new colours as custom properties, not literals.
- Mobile-first CSS. Most traffic arrives from an Instagram bio link.
- Semantic HTML, keyboard reachable, visible focus, good contrast.
- Respect `prefers-reduced-motion` for any animation.
- No dependencies. No build tooling unless the user asks for it.
- Keep README.md current when the data shape or the placeholder links
  change.

## Checking work

Serve the folder and view at a phone width (~390px) and a desktop
width. The page body must never scroll horizontally. Google Fonts may
be blocked in a sandbox, so fallback fonts in screenshots are expected.
