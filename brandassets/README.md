# MIRAGE brand assets

Everything visual for MIRAGE lives here. Design rules are in
[`../DESIGN.md`](../DESIGN.md) and brand facts in
[`../brand.md`](../brand.md). This folder holds the files.

```
brandassets/
  README.md        this index
  manifest.json    machine-readable list of every asset, palette and font
  tokens.css       colours and type as CSS custom properties
  logos/           lockups and icons
  flyers/          flyer templates, one per series
  tent-cards/      Revelry Room table tent cards, print files and design source
```

For a design tool or an agent: read `manifest.json` first. It lists every
file with its size, colourway and intended use, the palettes with hex
values, the Google Fonts URL, and the flyer layout in words. `tokens.css`
carries the same colours as variables, ready to paste into a stylesheet.

## Logos

| File | Size | Use |
|---|---|---|
| `logos/mirage-logo-stacked.png` | 1200×965, transparent | Primary. Mark over wordmark. |
| `logos/mirage-logo-horizontal.png` | 1200×269, transparent | Nav bars, headers, banners. |
| `logos/mirage-icon-neutral.png` | 1080×1080 | Instagram profile, favicon. |
| `logos/mirage-icon-velvet.png` | 1080×1080 | Velvet colourway square. |

The mark is a waveform with a reflection of dashes below. The centre bar
is the accent colour. Below about 32px the reflection merges, so use the
mark without it. The wordmark is illegible below about 90px.

Not here yet: the SVG versions and the Nocturne icon. `manifest.json`
lists them under `missing`. When they arrive, drop them in `logos/` and
add a row to the manifest.

## Flyers

| File | Series | Notes |
|---|---|---|
| `flyers/velvet-flyer-template.jpg` | Velvet | Amber shimmer column. Series name in Cormorant italic. |
| `flyers/nocturne-flyer-template.jpg` | Nocturne | Navy light trails. Series name in Michroma. |

Both are 1080×1350 with placeholder names. Use them as the layout
reference for new flyers. The grid is described in `brand.md` and in the
`flyerLayout` block of `manifest.json`.

Finished flyers for real events also go in `flyers/`, named
`<series>-<yyyy-mm-dd>.jpg`, and are referenced from the site's
`data/events.js`.

## Tent cards

Foldable table tents for The Revelry Room, in the Velvet colourway. Each
face reads MIRAGE, Velvet, "Come in closer." and a QR code to
instagram.com/mirage.seattle.

| File | Use |
|---|---|
| `tent-cards/revelry-room-tent-sheet.pdf` | Print this. 4×12 in, fold in half at the dashed line. |
| `tent-cards/revelry-room-tent-sheet.png` | Same sheet as a 300 dpi image, 1200×3600. |
| `tent-cards/revelry-room-tent-face.png` | One face, 4×6 in at 300 dpi, for previews or a single-sided card. |
| `tent-cards/source/` | Editable design source for the Claude Design canvas. |

Print on heavy stock. The QR sits on cream so it scans in low light. To
change the handle, edit the canvas and re-export, or ask for a rebuild.

## Colour and type

See `tokens.css` for the variables and `brand.md` for the rules. In short:
dark backgrounds only, one accent per piece, Michroma never bold,
Archivo Black only for headliner names and the date numeral, Cormorant
italic only for Velvet.
