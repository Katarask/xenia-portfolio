// Service Worker for Xenia Portfolio
// Caches assets for offline support and faster loading

const CACHE_NAME = 'xenia-portfolio-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.png',
];

// Critical assets to precache for LCP
const CRITICAL_ASSETS = [
  '/images/portfolio/chandelier-300.avif',
  '/images/portfolio/chandelier-300.webp',
  '/images/portfolio/soap-skin-300.avif',
  '/images/portfolio/soap-skin-300.webp',
];

// Install event - cache static assets and critical images
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache static assets
        cache.addAll(STATIC_ASSETS);
        // Precache critical LCP images
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache images and assets
          if (event.request.destination === 'image' || 
              event.request.url.includes('/images/') ||
              event.request.url.includes('/assets/')) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        });
      })
      .catch(() => {
        // Fallback for offline
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

