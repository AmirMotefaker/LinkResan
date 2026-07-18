const CACHE_NAME = 'linkresan-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.webmanifest'
];

// نصب Service Worker و کش کردن صفحات اصلی
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// پاک کردن کش‌های قدیمی هنگام فعال‌سازی
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// استراتژی Network Falling Back to Cache برای درخواست‌ها
self.addEventListener('fetch', (event) => {
  // فقط درخواست‌های GET را کش می‌کنیم
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});