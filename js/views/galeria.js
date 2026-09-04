/* Vista: Galería

   Las fotos salen del Instagram de la fundación a través de la función
   /.netlify/functions/instagram. Cada publicación llega con su descripción
   y su enlace al post original.

   Si Instagram no responde —o si abres el sitio con file://, donde no hay
   funciones— la galería cae a las fotos locales de img/ y no se rompe.
   Todo lo que se publique en Instagram aparece aquí sin tocar el código. */

const API_INSTAGRAM = '/.netlify/functions/instagram';
const CLAVE_CACHE = 'usv-instagram';
const MINUTOS_CACHE = 30;

const VistaGaleria = {
  data() {
    return {
      posts: [],
      cargando: true,
      fuente: null,        // 'instagram' | 'local'
      activa: null,        // publicación abierta en el visor

      // Respaldo si Instagram no está disponible
      fotosLocales: [
        { id: 'l1', imagen: 'img/gallery1.jpg', descripcion: 'Jornada de la fundación', enlace: null },
        { id: 'l2', imagen: 'img/gallery2.jpg', descripcion: 'Taller comunitario',      enlace: null },
        { id: 'l3', imagen: 'img/gallery3.jpg', descripcion: 'Actividad con la comunidad', enlace: null }
      ]
    };
  },

  computed: {
    fotos() {
      return this.posts.length ? this.posts : this.fotosLocales;
    }
  },

  methods: {
    /* Un pie corto para la tarjeta; la descripción completa va en el visor */
    resumen(texto) {
      if (!texto) return '';
      const limpio = texto.replace(/\s+/g, ' ').trim();
      return limpio.length > 110 ? limpio.slice(0, 110) + '…' : limpio;
    },

    leerCache() {
      try {
        const crudo = sessionStorage.getItem(CLAVE_CACHE);
        if (!crudo) return null;
        const { guardado, posts } = JSON.parse(crudo);
        if (Date.now() - guardado > MINUTOS_CACHE * 60 * 1000) return null;
        return posts;
      } catch (e) {
        return null;
      }
    },

    escribirCache(posts) {
      try {
        sessionStorage.setItem(CLAVE_CACHE, JSON.stringify({ guardado: Date.now(), posts }));
      } catch (e) { /* modo privado, cuota llena: no pasa nada */ }
    },

    async cargar() {
      const guardadas = this.leerCache();
      if (guardadas && guardadas.length) {
        this.posts = guardadas;
        this.fuente = 'instagram';
        this.cargando = false;
        return;
      }

      try {
        const r = await fetch(API_INSTAGRAM);
        const datos = await r.json();

        if (datos.ok && datos.posts.length) {
          this.posts = datos.posts;
          this.fuente = 'instagram';
          this.escribirCache(datos.posts);
        } else {
          if (datos.motivo) console.warn('Instagram no disponible:', datos.motivo);
          this.fuente = 'local';
        }
      } catch (err) {
        console.warn('No se pudo consultar Instagram:', err.message);
        this.fuente = 'local';
      } finally {
        this.cargando = false;
      }
    },

    abrir(foto) {
      this.activa = foto;
      document.body.classList.add('sin-scroll');
    },
    cerrar() {
      this.activa = null;
      document.body.classList.remove('sin-scroll');
    }
  },

  mounted() {
    this.cargar();
    this._esc = (e) => { if (e.key === 'Escape') this.cerrar(); };
    window.addEventListener('keydown', this._esc);
  },
  unmounted() {
    window.removeEventListener('keydown', this._esc);
    document.body.classList.remove('sin-scroll');
  },

  template: `
    <section class="section">
      <div class="container">

        <div class="section-head">
          <h2 class="section-title">Galería</h2>
          <p class="section-sub">Imágenes de nuestras jornadas y talleres.</p>
          <a v-if="fuente === 'instagram'" class="enlace-ig"
             href="https://instagram.com/unidadsebastiandevida" target="_blank" rel="noopener">
            Síguenos en Instagram <span aria-hidden="true">→</span>
          </a>
        </div>

        <!-- Cargando -->
        <div v-if="cargando" class="row g-4" aria-hidden="true">
          <div class="col-sm-6 col-lg-4" v-for="n in 3" :key="n">
            <div class="foto-esqueleto"></div>
          </div>
        </div>

        <!-- Publicaciones -->
        <div v-else class="row g-4">
          <div class="col-sm-6 col-lg-4" v-for="foto in fotos" :key="foto.id">
            <button type="button" class="foto-card" @click="abrir(foto)">
              <img :src="foto.imagen" :alt="resumen(foto.descripcion) || 'Publicación de la fundación'" loading="lazy">
              <span class="foto-lupa" aria-hidden="true">⤢</span>
              <span class="foto-pie" v-if="foto.descripcion">{{ resumen(foto.descripcion) }}</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Visor -->
      <div class="visor" v-if="activa" @click.self="cerrar">
        <button type="button" class="visor-cerrar" @click="cerrar" aria-label="Cerrar">×</button>
        <div class="visor-caja">
          <img :src="activa.imagen" :alt="resumen(activa.descripcion) || 'Publicación'">
          <div class="visor-texto" v-if="activa.descripcion || activa.enlace">
            <p v-if="activa.descripcion">{{ activa.descripcion }}</p>
            <a v-if="activa.enlace" :href="activa.enlace" target="_blank" rel="noopener">
              Ver en Instagram <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
};
