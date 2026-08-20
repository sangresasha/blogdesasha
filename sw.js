const CACHE_NAME = 'blog-sasha-v1';
const urlsToCache = [
  '/blogdesasha/',
  '/blogdesasha/index.html',
  '/blogdesasha/picmix.com_2174009.gif'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
