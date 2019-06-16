self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      // in case we get a response from the cache return the cached asset
      if (response) {
        return response;
      }

      //if the asset is not in the cache fetch it first, then cache it and then return it.
      return fetch(event.request).then(res =>
        caches.open("dynamic").then(function(cache) {
          //res clone is needed here since the res is consumed if used
          cache.put(event.request.url, res.clone());
          return res;
        })
      );
    })
  );
});

self.addEventListener("install", function(event) {
  var urlsToCache = [
    "/",
    "/restaurant.html",
    "/js/main.js",
    "/js/dbhelper.js",
    "/js/restaurant_info.js",
    "css/styles.css",
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/6.jpg",
    "img/7.jpg",
    "img/8.jpg",
    "img/9.jpg",
    "img/10.jpg"
  ];

  return event.waitUntil(
    caches.open("v6").then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});
