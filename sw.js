const CACHE = 'lamp-v4';
const PRECACHE = ['/', '/index.html', '/icon.png', '/manifest.json', '/data/mcq.js', '/data/tf.js', '/data/verse.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Only cache same-origin requests
  if (url.origin !== location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});

self.addEventListener('push', function(event) {
  if (!event.data) return;
  let data;
  try { data = event.data.json(); } catch(e) { return; }
  const options = {
    body: data.body || '',
    icon: './icon.png',
    badge: './icon.png'
  };
  event.waitUntil(self.registration.showNotification(data.title || 'Lamp', options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
