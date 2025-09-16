self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  // Bloqueia qualquer tentativa de download automático
  if (event.request.url.match(/\.(apk|exe|zip|rar)$/i)) {
    event.respondWith(new Response("", { status: 403 }));
  }
});
