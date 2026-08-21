// sw.js
const CACHE_NAME = 'sasha-blog-v1';
const urlsToCache = [
  '/blogdesasha/',
  '/blogdesasha/index.html',
  '/blogdesasha/manifest.json',
  '/blogdesasha/icon-512.png',
  // Si tienes otros archivos (CSS, fuentes) agrégalos aquí
];

// Instalación: cachear recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: responder con cache o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
