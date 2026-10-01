# Little Mantras (offline PWA)

A gentle, installable app that teaches seven mantras to children aged 3–5.
No ads, no accounts, no links out, no internet needed after the first visit.
(Formerly “Gayatri Mantra for Kids”. Installed copies update in place: same manifest `id`.)

## Mantras (home screen order, easiest first)
| # | Mantra | Deity picture |
|---|--------|---------------|
| 1 | ॐ नमः शिवाय – Om Namah Shivaya (Panchakshari) | Shiva meditating: blue skin, crescent moon, Ganga in his hair, third eye, rudraksha mala, cobra, trident beside him, tiger skin |
| 2 | Gayatri Mantra (Rig Veda 3.62.10) | Surya Dev: golden crown, sun-disc halo, two lotuses |
| 3 | वक्रतुण्ड महाकाय … (Ganesha) | Ganesha: elephant head, curved trunk, one whole tusk plus a broken one, modak, mouse |
| 4 | ॐ श्रीं महालक्ष्म्यै नमः (Lakshmi) | Lakshmi: red sari, pink lotuses, gold coins, gold pot, lotus seat |
| 5 | सरस्वति नमस्तुभ्यं … (Saraswati) | Saraswati: white sari, veena, book, mala, white swan |
| 6 | Mahamrityunjaya (Rig Veda 7.59.12), marked **Older kids** | Shiva standing, blessing, with trident and damaru |
| 7 | Hanuman Chalisa (Tulsidas, public domain): 2 dohas + 40 chaupais + closing doha | Hanuman: orange, crown, gada (mace), lifting the herb mountain in the sky |

Every deity is original offline SVG, drawn friendly and respectful. Each appears on its home card, large on its mantra page, and as a round badge on every activity screen.

## Living pictures (tap the deity)
On each mantra page the big picture gently breathes, blinks and glows. Now and then a small gesture plays, and a soft “tap me” hand appears if nobody has tapped for a few seconds.
Tapping the deity makes them hop (Hanuman flies a little) with a soft bell. Each special part has its own reaction and soft sound:

| Deity | Tap… | Reaction |
|-------|------|----------|
| Shiva | Ganga, moon, cobra, trident | water drops, moon twinkle, cobra nods, trident shines; conch for Shiva |
| Mahamrityunjaya | also damaru, blessing hand, sun rays | damaru shakes (drum sound), blessing glow |
| Surya | rays, lotuses | rays turn and shine; lotuses open with petals |
| Ganesha | trunk, ears, modak, mouse | trunk wiggles, ears flap, modak bounces with sparkles, mouse scurries (squeak) |
| Lakshmi | lotuses, gold coins | lotuses open; gold coins shower with a jingle |
| Saraswati | veena, book, mala, swan | veena strings ripple with a real plucked note and music notes; swan glides |
| Hanuman | mountain, gada, tail | mountain lifts with herb leaves, gada swings with stars, tail curls |

After six taps the deity blesses the child: a petal shower and a greeting (“Jai Hanuman!”, “Jai Shri Ganesha!”…).
Home cards are subtler: a soft bell and sparkle on touch, and one card at a time gently says hello.
All sounds are generated on the device with WebAudio and kept quiet. All motion uses transform and opacity only, so it stays smooth on low-end Android.
With **Reduce motion** turned on in the phone settings there is no idle motion and no particles; taps still answer with a sound.

## Offer a flower
When a recitation finishes, the child offers a flower. This happens:
- at the end of Listen;
- after each Learn line (for the Chalisa, after each verse on Hanuman’s journey);
- with a **bigger** celebration when all 43 Chalisa verses are done, or at the end of the full Chalisa in Listen.

A basket of the deity’s own flowers appears. For example: bel leaves, jasmine and white lotus for Shiva; hibiscus, durva grass and marigold for Ganesha; pink lotus for Lakshmi; white lotus and jasmine for Saraswati; marigold and hibiscus for Hanuman.
The child taps a flower, or drags it, and it floats to the deity’s feet. The deity glows, a soft bell rings, petals fall, and a star (with a sticker) is given.
Offered flowers stay at the deity’s feet. They are saved per mantra and shown on the mantra page with a “flowers offered” count, and as a small count and pile on the home card.

## Activities (for each mantra)
- **Listen**: karaoke-style highlighting of syllables (or words, for the Chalisa) with a bead counter (1 / 3 / 11 / 21 repeats). For the Hanuman Chalisa you can play everything, or pick a verse with the arrows and play from there.
- **Learn**: hear a line, then “Your turn!” (no scoring), then offer a flower and get a star. Each line opens after the one before. For the Chalisa this is **Hanuman’s journey**: 43 stepping stones on a winding path, from Doha 1 to Lord Rama’s temple. Each verse is shown as two half-lines with a short kid-level meaning.
- **My stars**: total stars, stars per mantra, and a sticker collection.
- **Grown-ups area** (tap the gear at the top right):
  - Pick a mantra and record your own voice for each line or verse, plus the full mantra for the multi-line ones. Recordings are stored in IndexedDB under keys like `shiva/line0` and `gayatri/full`.
  - See progress (stars and flowers offered), set the repeat count, unlock all lines, and reset progress.
  - Read the meanings aloud; sources are included.

Progress (stars, practised lines, flowers offered) is saved per mantra in localStorage (`little-mantras-state-v2`). Existing Gayatri progress (`gayatri-kids-state-v1`) and recordings (`line0…line3`, `full`) are migrated automatically on first launch.
Without a recording, the built-in voice is used (Hindi hi-IN if available, slow rate 0.6).

## Text notes
Texts were checked against several sources (Rig Veda samhita text, sanskritdocuments.org, Gita Press–style Chalisa editions, stotra.in, shlokam.org). Where editions differ, the app uses these readings:
- **Chalisa:**
  - बरनउँ, and बुद्धि in Doha 2
  - कुंचित, and बिद्यावान in chaupai 7
  - सम्हारो and हाँक तें in 23
  - जो कोई लावै and सोइ in 28
  - दीन in 31, and सेइ in 35
  - गोसाईं, गुरुदेव and नाईं in 37
- **Mahamrityunjaya:** shown in the usual recitation form, with ॐ added, split into four lines (बन्धनान् / मृत्योः), and माऽमृतात् written with the avagraha.
- **Transliterations** are simple phonetic spellings for parents, not IAST.

## Publish on GitHub Pages
Everything uses relative paths, so it works from `https://<user>.github.io/<repo>/`. Push `main`, then set GitHub → Settings → Pages → Deploy from branch: main / (root).
When you change any file, bump `VERSION` in `sw.js` (now `v3`) so installed copies update.

## Files
`index.html`, `app.css`, `app.js`, `manifest.webmanifest`, `sw.js`, `icons/` (192, 512, maskable 512, apple-touch, favicon), `fonts/baloo2-mantras.woff2` (subset of Baloo 2 with the full Devanagari block, SIL OFL 1.1; see `fonts/OFL.txt`), `.nojekyll`.

Privacy: no analytics, and no network requests beyond the app’s own files. Recordings and progress never leave the device.
