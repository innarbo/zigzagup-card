const CACHE_NAME = 'zigzagup-card-v1.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css?v=1.0.0',
  './app.js?v=1.0.0',
  './manifest.webmanifest',
  './inna-arbo.vcf',
  './assets/brand/zigzagup-wordmark-light.png',
  './assets/brand/zigzagup-logo-tagline-dark.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/qr/zigzagup-card-qr.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(match => match || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok && new URL(event.request.url).origin === self.location.origin) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
