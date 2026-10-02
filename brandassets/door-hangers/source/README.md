# Door hanger source

`build.js` writes the print PDF, the dieline and the PNG previews from
one HTML template. `velvet-door-hanger.html` is the rendered template
for a look in a browser; it expects the four Google Fonts as TTFs in a
`fonts/` folder beside it, or swap its `<style>` block for the Google
Fonts link.

To rebuild:

```
npm install playwright qrcode
node build.js ../            # writes into brandassets/door-hangers/
```

Set `FONTS_DIR` to a folder holding Michroma, Cormorant Garamond
italic 500 and Archivo 300 and 400 as TTFs, plus the `spec.css` Google
Fonts served for Archivo, or leave it unset and the build loads the
fonts from Google Fonts. Playwright needs a Chromium; change
`executablePath` in `build.js` to yours, or remove it.

The playlist URL, the offer line and the handle are constants at the
top of `build.js` and in the `front` and `back` blocks.
