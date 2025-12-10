const CACHE_NAME = 'shopper-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Install Phase: Cache the files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. Fetch Phase: Serve from Cache if offline
self.addEventListener('fetch', (e) => {
  // Only cache same-origin requests (HTML/CSS), not the API calls to Google
  if (e.request.url.includes('script.google.com')) return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
