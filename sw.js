// Офлайн-кеш PERO.
// Страница приложения грузится из сети, если она есть (так обновления приходят сразу),
// а без интернета берётся из кеша. Иконки и шрифты — сначала из кеша.
const CACHE = 'pero-v58';
const ASSETS = ["./a/f645108f98.webp", "./a/232e60ff51.webp", "./a/2a2fcda1e1.webp", "./a/36fdde5332.webp", "./a/265d07bc9b.webp", "./a/b2c403231a.webp", "./a/713bab2c8c.webp", "./a/d91210f13b.webp", "./a/717475d808.webp", "./a/3b3f0b5b4a.webp", "./a/727e9cef16.webp", "./a/a005b40cf5.webp", "./a/ebc2522ade.webp", "./a/afb4be7370.webp", "./a/b8dffce994.webp", "./a/6dd70982e7.webp", "./a/8587ba2504.webp", "./a/1af01d0020.webp", "./a/581c7961fa.webp", "./a/8ffb6261ba.webp", "./a/352933104a.webp", "./a/4a08feb38a.webp", "./a/3753a58919.webp", "./a/7c410ae040.webp", "./a/8dcb97bb77.webp", "./a/5649fce7aa.webp", "./a/9ad2853de6.webp", "./a/5f36db2ec0.webp", "./a/b0d711a1c8.webp", "./a/e7bb5c41c1.webp", "./a/dac6af7304.webp", "./a/13fab6336b.webp", "./a/dc2483417d.webp", "./a/4bafaca7ef.webp", "./a/79c6047fbd.webp", "./a/b13ac04faa.webp", "./a/08fef8cc07.webp", "./a/39a21abd53.webp", "./a/c09ecd5eb3.webp", "./a/64ad3365ff.webp", "./a/ea5c09e7e2.webp", "./a/a231578819.webp", "./a/a653e0a089.webp", "./a/6bbe61a8ee.webp", "./a/b1b7d44415.webp", "./a/e135cf6e2b.webp", "./a/4f9f626742.webp", "./a/d8ffc85d05.png", "./a/bab7e1fbe6.png", "./a/da8d525895.webp", "./a/0a18c3918f.webp", "./a/db963b69ba.webp", "./a/8f978194af.webp", "./a/6341775202.webp", "./a/bb3afa26d4.webp", "./a/98ae870a0a.webp", "./a/d5837715fa.webp", "./a/53b086b87a.webp", "./a/ba06f3b0a6.webp", "./a/de191f2aa1.webp", "./a/691d1321aa.webp", "./a/84b225597e.webp", "./a/88ad2fea62.webp", "./a/c94738b517.webp", "./a/b0604a333c.webp", "./a/802b019832.webp", "./a/ae168d2847.webp", "./a/7337303086.webp", "./a/00ffa681e2.webp", "./a/b301a74e5c.webp", "./a/b76f771d04.webp", "./a/01106609ac.webp", "./a/479fa13c2a.webp", "./a/8f0773a2e4.webp", "./a/fd1e434a7f.webp", "./a/6463f26928.webp", "./a/ad186705ec.webp", "./a/be5ffafe5f.webp", "./a/6c5562949c.webp", "./a/293e166026.webp", "./a/e3933f6250.webp", "./a/4f89ebb6ab.webp", "./a/ecb9fea374.webp", "./a/6ee00858a3.webp", "./a/701ea6280a.webp", "./a/c0aa626b7a.webp"];
const SHELL = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.concat(ASSETS))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put('./index.html', copy));
      return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  const url = new URL(req.url);
  const cacheable = url.origin === location.origin || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!cacheable) return;
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
