const cacheName = "v1";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
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

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        // Recurso encontrado en la caché, se devuelve la respuesta almacenada
        return response;
      } else {
        // Recurso no encontrado en la caché, se realiza una solicitud a la red
        return fetch(event.request).then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            // Clonar la respuesta de la red antes de almacenarla en la caché
            const clonedResponse = networkResponse.clone();

            // Almacenar el recurso clonado en la caché
            caches.open(cacheName).then(function (cache) {
              cache.put(event.request, clonedResponse);
            });
          }
          return networkResponse;
        });
      }
    })
  );
});
