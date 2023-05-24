

const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([
        "/",
        "src/assets/icono.png",
        "src/css/styles.css",
        "src/lib/lit-html.js",
        "src/js/CardComponent.js",
        "src/js/NavbarComponent.js",
        "/index.html",
        "/app.js",
      ])
    );
  });
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Devolver respuesta desde la caché o solicitarla a la red
          return response || fetch(event.request);
        })
    );
  });