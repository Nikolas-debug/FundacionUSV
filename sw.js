/* Service worker de la Fundación Unidad Sebastián de Vida.
   Su objetivo principal es habilitar la instalación en el celular (PWA).
   El caché es mínimo: solo la cáscara de la app, para que abra sin conexión.
   Sube el número de VERSION cada vez que publiques cambios. */

const VERSION = 'usv-v3';

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

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(VERSION)
      // addAll falla entero si un archivo falla: guardamos uno a uno
      .then((cache) => Promise.all(
        CASCARA.map((url) => cache.add(url).catch(() => null))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(
        claves.filter((k) => k !== VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const req = evento.request;

  // Solo GET del propio sitio; el CDN y todo lo demás pasa de largo
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Las funciones y los envíos de formulario los maneja Netlify, no nosotros
  if (url.pathname.startsWith('/.netlify/')) return;

  evento.respondWith(
    fetch(req)
      .then((res) => {
        // Guardamos una copia fresca de lo que sí se pudo traer
        const copia = res.clone();
        caches.open(VERSION).then((cache) => cache.put(req, copia)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) =>
          hit || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)
        )
      )
  );
});
