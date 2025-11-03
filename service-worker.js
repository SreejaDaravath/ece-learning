// Simple service worker to cache core assets for offline/fast loads
const CACHE_NAME = 'ece-master-core-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/game-engine.js',
  '/main.js',
  '/levels-data.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // For navigation requests, try network first then fallback to cache
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For other requests, try cache then network
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).catch(() => cached))
  );
});
