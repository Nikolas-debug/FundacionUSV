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
      filtroActivo: null,  // num del eje elegido; null = todas

      // Respaldo si Instagram no está disponible
      fotosLocales: [
        { id: 'l1', imagen: 'img/gallery1.jpg', descripcion: 'Jornada de la fundación', enlace: null },
        { id: 'l2', imagen: 'img/gallery2.jpg', descripcion: 'Taller comunitario',      enlace: null },
        { id: 'l3', imagen: 'img/gallery3.jpg', descripcion: 'Actividad con la comunidad', enlace: null }
      ]
    };
  },

  computed: {
    /* Cada foto con su eje ya resuelto */
    fotos() {
      const base = this.posts.length ? this.posts : this.fotosLocales;
      return base.map((foto) => ({ ...foto, eje: clasificarPost(foto.descripcion) }));
    },

    /* Solo los ejes que de verdad tienen publicaciones, en orden y con su conteo.
       "Nuestras publicaciones" va siempre de último. */
    filtros() {
      const cuenta = new Map();
      for (const foto of this.fotos) {
        cuenta.set(foto.eje.num, (cuenta.get(foto.eje.num) || 0) + 1);
      }

      const lista = EJES_GALERIA
        .filter((eje) => cuenta.has(eje.num))
        .map((eje) => ({ num: eje.num, etiqueta: eje.etiqueta, titulo: eje.titulo, total: cuenta.get(eje.num) }));

      if (cuenta.has(EJE_SIN_CLASIFICAR.num)) {
        lista.push({
          num: EJE_SIN_CLASIFICAR.num,
          etiqueta: EJE_SIN_CLASIFICAR.etiqueta,
          titulo: EJE_SIN_CLASIFICAR.titulo,
          total: cuenta.get(EJE_SIN_CLASIFICAR.num)
        });
      }
      return lista;
    },

    /* La barra de filtros solo aparece si hay algo que filtrar */
    mostrarFiltros() {
      return !this.cargando && this.fuente === 'instagram' && this.filtros.length > 1;
    },

    fotosVisibles() {
      if (!this.filtroActivo) return this.fotos;
      return this.fotos.filter((foto) => foto.eje.num === this.filtroActivo);
    }
  },

  methods: {
    /* Un pie corto para la tarjeta; la descripción completa va en el visor */
    resumen(texto) {
      if (!texto) return '';
      const limpio = texto.replace(/\s+/g, ' ').trim();
      return limpio.length > 110 ? limpio.slice(0, 110) + '…' : limpio;
    },

    filtrar(num) {
      this.filtroActivo = this.filtroActivo === num ? null : num;
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
          <p class="section-sub">Imágenes de nuestras jornadas y talleres, agrupadas por eje.</p>
          <a v-if="fuente === 'instagram'" class="enlace-ig"
             href="https://instagram.com/unidadsebastiandevida" target="_blank" rel="noopener">
            Síguenos en Instagram <span aria-hidden="true">→</span>
          </a>
        </div>

        <!-- Filtros por eje -->
        <div class="filtros-ejes" v-if="mostrarFiltros" role="group" aria-label="Filtrar la galería por eje">
          <button type="button" class="filtro-chip"
                  :class="{ activo: !filtroActivo }"
                  :aria-pressed="!filtroActivo"
                  @click="filtroActivo = null">
            Todas <span class="filtro-conteo">{{ fotos.length }}</span>
          </button>

          <button type="button" class="filtro-chip"
                  v-for="f in filtros" :key="f.num"
                  :class="{ activo: filtroActivo === f.num, otras: f.num === '00' }"
                  :aria-pressed="filtroActivo === f.num"
                  :title="f.titulo"
                  @click="filtrar(f.num)">
            {{ f.etiqueta }} <span class="filtro-conteo">{{ f.total }}</span>
          </button>
        </div>

        <!-- Cargando -->
        <div v-if="cargando" class="row g-4" aria-hidden="true">
          <div class="col-sm-6 col-lg-4" v-for="n in 3" :key="n">
            <div class="foto-esqueleto"></div>
          </div>
        </div>

        <!-- Publicaciones -->
        <div v-else class="row g-4">
          <div class="col-sm-6 col-lg-4" v-for="foto in fotosVisibles" :key="foto.id">
            <button type="button" class="foto-card" @click="abrir(foto)">
              <img :src="foto.imagen" :alt="resumen(foto.descripcion) || 'Publicación de la fundación'" loading="lazy">
              <span class="foto-eje" v-if="!filtroActivo && foto.eje.num !== '00'">{{ foto.eje.etiqueta }}</span>
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
            <span class="visor-eje" v-if="activa.eje && activa.eje.num !== '00'">
              Eje {{ activa.eje.num }} · {{ activa.eje.titulo }}
            </span>
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
