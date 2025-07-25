self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('drquack-cache-v1').then(cache =>
      cache.match(event.request).then(response =>
        response || fetch(event.request).then(fetchResponse => {
          if (event.request.method === 'GET' && fetchResponse.ok) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        })
      )
    )
  );
});
