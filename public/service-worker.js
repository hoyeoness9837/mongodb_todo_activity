//cache every files at these url routes
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open('list-cache-v1')
      .then((cache) =>
        cache.addAll(['/', '/db.js', '/app.js', 'manifest.json'])
      )
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch((err) => {
      //if the natual way of fetching is failed,
      return caches.match(event.request).then((match) => {
        if (match) {
          return match;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          // cache 중에 매칭한 데이터를 찾이 못하였을때 홈페이지로 돌려주는.
          return caches.match('/');
        }
      });
    })
  );
});

//app.js에 연결시킬것이다