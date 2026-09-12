# CLAUDE.md

Guidance for working in this repo.

## What this is

Single-page marketing site for MIRAGE. Static HTML, CSS and JS. No
build step, no framework, no backend. Open `index.html` directly or
serve the folder as static files.

## Before touching anything visual or writing copy

Read these, in this order. Do not duplicate their contents here.

- [`DESIGN.md`](DESIGN.md): tokens, type, layout system, backgrounds,
  logo usage, motion, and the pre-ship checklist.
- [`COPY.md`](COPY.md): voice rules, naming and formats, templates
  per channel, word list, and the copy checklist. Any words a person
  will read go through it.
- [`brand.md`](brand.md): brand facts, series details, voice.
- [`brandassets/`](brandassets/README.md): logos, flyer templates,
  `tokens.css`, `manifest.json`.

If a design decision changes, change `DESIGN.md` first, then
`brandassets/tokens.css`, then bring the code in line.

## Layout

```
index.html        markup for all sections, plus the inline logo SVG
css/styles.css    styles; palettes as custom properties at the top
js/main.js        fills "Next event" and "Past" from the data file
data/events.js    all event data (MIRAGE_EVENTS, MIRAGE_SERIES)
brandassets/      logos, flyers, tokens.css, manifest.json (see its README)
DESIGN.md         design guide
COPY.md           copy guide
brand.md          brand facts and voice
README.md         how to add events, links, flyers and the logo
```

## Code conventions

- Event data goes in `data/events.js` only. Never hard-code an event
  in markup.
- Palettes are switched by adding `theme-velvet` or `theme-nocturne`
  to an element. Colours are custom properties, never literals.
- Mobile-first CSS. Most traffic arrives from an Instagram bio link.
- Semantic HTML, keyboard reachable, visible focus.
- No dependencies. No build tooling unless the user asks for it.
- Keep README.md current when the data shape or the placeholder links
  change.

## Checking work

Serve the folder and view at a phone width (~390px) and a desktop
width. The page body must never scroll horizontally. Google Fonts may
be blocked in a sandbox, so fallback fonts in screenshots are expected.
Run the checklist at the end of `DESIGN.md` before shipping anything
visual, and the one at the end of `COPY.md` before shipping any words.
