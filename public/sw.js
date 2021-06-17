console.warn("sw is in public folder");
let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/main.chunk.js.map",
        "/static/js/vendors~main.chunk.js",
        "/manifest.json",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "/index.html",
        "/favicon%20(2).ico",
        "/android-chrome-192x192.png",
        "/",
        "/posts",
        "/catalog",
        "/stores",
      ]);
    })
  );
});
this.addEventListener("activate", (event) => {
  event.waitUntil(this.clients.claim());
});
this.addEventListener("fetch", (event) => {
  console.log("fetch2", event.request.method);
  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (!navigator.onLine) {
        console.log("not on line", event.request.url);
        return resp;
      }
      return fetch(event.request).then((response) => {
        console.log("on line", event.request.url);
        return caches.open("appV1").then((cache) => {
          if (event.request.method === "GET")
            cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
