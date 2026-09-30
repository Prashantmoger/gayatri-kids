# Gayatri Mantra for Kids (offline PWA)

A gentle, installable app that teaches the Gayatri Mantra to children aged 3–5.
No ads, no accounts, no links out, no internet needed after the first visit.

> ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यं । भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥
> Om Bhur Bhuvah Svah · Tat Savitur Varenyam · Bhargo Devasya Dheemahi · Dhiyo Yo Nah Prachodayat
> *We pray to the bright Sun to make our minds clever and kind.* (Rig Veda 3.62.10)

## Activities
- **Listen** – plays the whole mantra line by line with karaoke-style syllable highlighting, a picture per line, and a bead counter (1 / 3 / 11 / 21 repeats, set by a grown-up).
- **Learn a line** – hear a line, then “Your turn!” (big microphone animation, no scoring), then a star. Line 2 opens after line 1 is practised, and so on.
- **Clap along** – big pulsing syllable circles; every tap sparkles, on-beat taps earn a star badge.
- **My stars** – sticker collection (saved on the device in localStorage).
- **Grown-ups area** (press and hold the lock for 3 s) – record your own voice for each line and the full mantra (MediaRecorder → IndexedDB, used for all playback), repeat count, unlock all lines, reset progress, meanings to read aloud.

Without a recording, the app uses the browser’s built-in voice (Hindi hi-IN if available, slow rate 0.6). A recorded parent voice sounds much better.

## Publish on GitHub Pages
Everything uses relative paths, so it works from `https://<user>.github.io/<repo>/`.
```bash
git init -b main          # already done in this folder
git add -A
git commit -m "Gayatri Mantra for Kids PWA"
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
# GitHub → Settings → Pages → Deploy from branch: main / (root)
```
Then open the site in Chrome on Android → ⋮ → **Install app** / **Add to Home screen**.

When you change any file later, bump `VERSION` in `sw.js` so installed copies update.

## Files
`index.html`, `app.css`, `app.js`, `manifest.webmanifest`, `sw.js`, `icons/` (192, 512, maskable 512, apple-touch, favicon), `fonts/baloo2-gayatri.woff2` (subset of Baloo 2, SIL OFL 1.1 – see `fonts/OFL.txt`), `.nojekyll`.

Privacy: no analytics, no network requests beyond the app’s own files. Recordings and progress never leave the device.
