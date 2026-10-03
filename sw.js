/* Little Mantras service worker: cache-first, fully offline. Bump VERSION when files change. */
const VERSION = 'v5';
const CACHE = 'little-mantras-' + VERSION;
const CORE = [
  './',
  'index.html',
  'app.css',
  'app.js',
  'manifest.webmanifest',
  'fonts/baloo2-mantras.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png'
];
/* Recorded AI voice (ElevenLabs "Monika Sogam"): one MP3 per line / Chalisa verse;
   sung tracks (ElevenLabs Music) for the six short mantras + the Chalisa music bed in audio/sung/ */
const AUDIO = [
  'audio/shiva/00.mp3',
  'audio/gayatri/00.mp3',
  'audio/gayatri/01.mp3',
  'audio/gayatri/02.mp3',
  'audio/gayatri/03.mp3',
  'audio/ganesha/00.mp3',
  'audio/ganesha/01.mp3',
  'audio/ganesha/02.mp3',
  'audio/ganesha/03.mp3',
  'audio/lakshmi/00.mp3',
  'audio/saraswati/00.mp3',
  'audio/saraswati/01.mp3',
  'audio/saraswati/02.mp3',
  'audio/saraswati/03.mp3',
  'audio/mrityunjaya/00.mp3',
  'audio/mrityunjaya/01.mp3',
  'audio/mrityunjaya/02.mp3',
  'audio/mrityunjaya/03.mp3',
  'audio/chalisa/00.mp3',
  'audio/chalisa/01.mp3',
  'audio/chalisa/02.mp3',
  'audio/chalisa/03.mp3',
  'audio/chalisa/04.mp3',
  'audio/chalisa/05.mp3',
  'audio/chalisa/06.mp3',
  'audio/chalisa/07.mp3',
  'audio/chalisa/08.mp3',
  'audio/chalisa/09.mp3',
  'audio/chalisa/10.mp3',
  'audio/chalisa/11.mp3',
  'audio/chalisa/12.mp3',
  'audio/chalisa/13.mp3',
  'audio/chalisa/14.mp3',
  'audio/chalisa/15.mp3',
  'audio/chalisa/16.mp3',
  'audio/chalisa/17.mp3',
  'audio/chalisa/18.mp3',
  'audio/chalisa/19.mp3',
  'audio/chalisa/20.mp3',
  'audio/chalisa/21.mp3',
  'audio/chalisa/22.mp3',
  'audio/chalisa/23.mp3',
  'audio/chalisa/24.mp3',
  'audio/chalisa/25.mp3',
  'audio/chalisa/26.mp3',
  'audio/chalisa/27.mp3',
  'audio/chalisa/28.mp3',
  'audio/chalisa/29.mp3',
  'audio/chalisa/30.mp3',
  'audio/chalisa/31.mp3',
  'audio/chalisa/32.mp3',
  'audio/chalisa/33.mp3',
  'audio/chalisa/34.mp3',
  'audio/chalisa/35.mp3',
  'audio/chalisa/36.mp3',
  'audio/chalisa/37.mp3',
  'audio/chalisa/38.mp3',
  'audio/chalisa/39.mp3',
  'audio/chalisa/40.mp3',
  'audio/chalisa/41.mp3',
  'audio/chalisa/42.mp3',
  'audio/sung/gayatri.mp3',
  'audio/sung/ganesha.mp3',
  'audio/sung/saraswati.mp3',
  'audio/sung/mrityunjaya.mp3',
  'audio/sung/shiva.mp3',
  'audio/sung/lakshmi.mp3',
  'audio/sung/chalisa-bed.mp3'
];
const ASSETS = CORE.concat(AUDIO);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => (k.startsWith('gayatri-kids-') || k.startsWith('little-mantras-')) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Media elements may ask for byte ranges: answer them from the cached file (206) so audio also plays offline */
async function rangeResponse(req, res) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get('range') || '');
  if (!m || !res || res.status !== 200) return res;
  const buf = await res.arrayBuffer(), size = buf.byteLength;
  let start = m[1] === '' ? size - (+m[2] || 0) : +m[1];
  let end = m[1] !== '' && m[2] !== '' ? Math.min(+m[2], size - 1) : size - 1;
  if (!(start >= 0 && start <= end)) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg', 'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
    'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' } });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match(req, { ignoreSearch: true })
        .then((r) => r || caches.match('index.html'))
        .then((r) => r || fetch(req))
    );
    return;
  }

  if (req.headers.has('range')) {
    event.respondWith(
      caches.match(req.url, { ignoreSearch: true }).then((cached) => cached ? rangeResponse(req, cached) : fetch(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
