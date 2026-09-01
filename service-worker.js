const CACHE_CLEANUP_VERSION = 'zigzagup-card-cache-reset-v4';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});

// Intentionally no fetch handler.
// Once activated, normal browser/network behavior resumes.
