# Animated icon source

`gen-icon.js` writes the three SVGs. `render.js` plays each one in
headless Chromium, frame by frame, and encodes the MP4s. Neither is
part of the site; nothing here runs in the browser.

To rebuild:

```
npm install opentype.js@1.3.4 @ffmpeg-installer/ffmpeg playwright
# put Michroma-Regular.ttf from Google Fonts next to the scripts as michroma.ttf
node gen-icon.js .        # writes mirage-icon-animated-*.svg
node render.js            # writes mirage-icon-animated-*.mp4 and *-still.png
```

Playwright needs a Chromium; set `executablePath` in `render.js` to
yours, or remove it to use Playwright's own.

Geometry comes from the site's inline mark in `index.html`, scaled into
the 1080 square the way `logos/mirage-icon-neutral.png` is laid out.
Colours are the three palettes in `tokens.css`. Timings are the table
in section 6 of `DESIGN.md`; change them there first.
