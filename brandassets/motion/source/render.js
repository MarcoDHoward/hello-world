const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const { execFileSync } = require('child_process');
const FF = require('@ffmpeg-installer/ffmpeg').path;
const FPS = 30, SECONDS = 8;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const name of ['neutral', 'velvet', 'nocturne']) {
    const svg = fs.readFileSync(`mirage-icon-animated-${name}.svg`, 'utf8');
    const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
    await p.setContent(`<body style="margin:0"><div style="width:1080px;height:1080px">${svg}</div></body>`);
    const dir = path.join('frames', name); fs.mkdirSync(dir, { recursive: true });
    await p.evaluate(() => document.getAnimations().forEach(a => a.pause()));
    for (let f = 0; f < FPS * SECONDS; f++) {
      await p.evaluate(t => document.getAnimations().forEach(a => { a.currentTime = t; }), f * 1000 / FPS);
      await p.screenshot({ path: path.join(dir, `f${String(f).padStart(3, '0')}.png`) });
    }
    execFileSync(FF, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(dir, 'f%03d.png'),
      '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart',
      `mirage-icon-animated-${name}.mp4`]);
    // rest state for a static still
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.screenshot({ path: `mirage-icon-${name}-still.png` });
    await p.close();
    console.log(name, 'mp4', fs.statSync(`mirage-icon-animated-${name}.mp4`).size, 'bytes');
  }
  await b.close();
})();
