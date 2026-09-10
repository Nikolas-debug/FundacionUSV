const VERSION = 'usv-v5';

const CASCARA = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './js/app.js',
  './js/ejes-galeria.js',
  './js/views/inicio.js',
  './js/views/nosotros.js',
  './js/views/ejes.js',
  './js/views/galeria.js',
  './js/views/contacto.js',
  './img/logo.png',
  './img/icons/icon-192.png'
];

/* ---- Instalación: precarga la cáscara con bytes frescos ---- */
self.addEventListener('install', (evento) => {
  evento.waitUntil((async () => {
    const cache = await caches.open(VERSION);

    // cache:'reload' es lo que impide precargar la copia vieja del navegador.
    // Se guarda uno por uno: si un archivo falla, no tumba la instalación.
    await Promise.all(CASCARA.map(async (url) => {
      try {
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (res.ok) await cache.put(url, res);
      } catch (err) { /* ese archivo se pedirá cuando toque */ }
    }));

    await self.skipWaiting();
  })());
});

/* ---- Activación: fuera las cachés de versiones anteriores ---- */
self.addEventListener('activate', (evento) => {
  evento.waitUntil((async () => {
    const claves = await caches.keys();
    await Promise.all(claves.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* ---- Estrategias ---- */

function esImagen(req) {
  if (req.destination === 'image') return true;   // lo que dice el navegador
  return /\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(new URL(req.url).pathname);
}

function sinConexion(mensaje) {
  return new Response(mensaje, {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

/* HTML, CSS, JS: lo del servidor manda; la caché es el paracaídas */
async function redPrimero(req) {
  const cache = await caches.open(VERSION);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone()).catch(() => {});
    return res;
  } catch (err) {
    const guardado = await cache.match(req);
    if (guardado) return guardado;

    if (req.mode === 'navigate') {
      const cascara = await cache.match('./index.html');
      if (cascara) return cascara;
    }
    return sinConexion('Sin conexión y sin copia guardada de esta página.');
  }
}

/* Imágenes: responde ya con lo guardado y revisa el servidor por detrás */
async function cachePrimeroYActualiza(req, evento) {
  const cache = await caches.open(VERSION);
  const guardado = await cache.match(req);

  // cache:'no-cache' fuerza una petición condicional al servidor: contesta 304
  // si no cambió (barato) o los bytes nuevos si cambió. No le cree a la caché
  // del navegador, que es justo lo que fallaba antes.
  const revalidar = (async () => {
    try {
      const res = await fetch(new Request(req.url, { cache: 'no-cache' }));
      if (res.ok) await cache.put(req, res.clone());
      return res;
    } catch (err) {
      return null;
    }
  })();

  if (guardado) {
    // Ya respondimos, pero el worker no debe dormirse antes de terminar esto
    evento.waitUntil(revalidar);
    return guardado;
  }

  const res = await revalidar;
  return res || sinConexion('Imagen no disponible sin conexión.');
}

/* ---- Enrutado ---- */
self.addEventListener('fetch', (evento) => {
  const req = evento.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // el CDN y Instagram pasan de largo
  if (url.pathname.startsWith('/.netlify/')) return; // funciones y formularios: cosa de Netlify

  evento.respondWith(
    esImagen(req) ? cachePrimeroYActualiza(req, evento) : redPrimero(req)
  );
});
