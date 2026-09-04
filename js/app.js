const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

/* ---- Rutas -------------------------------------------------
   Para agregar un módulo nuevo:
   1) crea js/views/mimodulo.js con `const MiModulo = { template: ... }`
   2) añade el <script> en index.html
   3) agrega la ruta aquí y el enlace en el nav
------------------------------------------------------------ */
const routes = [
  { path: '/',          name: 'inicio',   component: VistaInicio,   meta: { titulo: 'Inicio' } },
  { path: '/nosotros',  name: 'nosotros', component: VistaNosotros, meta: { titulo: 'Nosotros' } },
  { path: '/ejes',      name: 'ejes',     component: VistaEjes,     meta: { titulo: 'Ejes estratégicos' } },
  { path: '/galeria',   name: 'galeria',  component: VistaGaleria,  meta: { titulo: 'Galería' } },
  { path: '/contacto',  name: 'contacto', component: VistaContacto, meta: { titulo: 'Contáctanos' } },
  // Cualquier ruta desconocida vuelve al inicio
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

const BASE_TITULO = 'Fundación Unidad Sebastián de Vida';

router.afterEach((to) => {
  // Título de la pestaña por vista
  document.title = to.meta.titulo
    ? to.meta.titulo + ' — ' + BASE_TITULO
    : BASE_TITULO + ' — Fe que transforma';

  // En móvil, cerrar el menú colapsado al navegar
  const nav = document.getElementById('mainNav');
  if (nav && nav.classList.contains('show') && window.bootstrap) {
    bootstrap.Collapse.getOrCreateInstance(nav).hide();
  }
});

createApp({
  data() {
    return {
      anio: new Date().getFullYear(),
      promptInstalar: null,   
      puedeInstalar: false
    };
  },

  methods: {
    async instalar() {
      if (!this.promptInstalar) return;
      this.promptInstalar.prompt();
      await this.promptInstalar.userChoice;
      // El evento solo sirve una vez
      this.promptInstalar = null;
      this.puedeInstalar = false;
    }
  },

  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.promptInstalar = e;
      this.puedeInstalar = true;
    });

    window.addEventListener('appinstalled', () => {
      this.promptInstalar = null;
      this.puedeInstalar = false;
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.puedeInstalar = false;
    }
  }
})
  .use(router)
  .mount('#app');

/* ---- Service worker ----------------------------------------
   Habilita la instalación en el celular. Necesita https (o
   localhost); abriendo el index con doble clic (file://) no
   corre, y eso es normal.
------------------------------------------------------------ */
const soportaSW =
  'serviceWorker' in navigator &&
  (location.protocol === 'https:' || location.hostname === 'localhost');

if (soportaSW) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .catch((err) => console.warn('No se pudo registrar el service worker:', err));
  });
}
