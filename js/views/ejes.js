/* Vista: Ejes estratégicos
   Cada eje se abre en un cuadro superpuesto con su ilustración y su detalle.
   Para editar textos o agregar un eje, toca únicamente el array `ejes`. */

const VistaEjes = {
  data() {
    return {
      abierto: null,   // objeto del eje abierto, o null
      ejes: [
        {
          num: '01',
          titulo: 'Empoderamiento económico y social',
          resumen: 'Autonomía para las madres cabeza de hogar.',
          imagen: 'img/ejes/eje1.svg',
          alt: 'Una madre y su hija tomadas de la mano',
          parrafos: [
            'Este eje está centrado en las madres cabeza de hogar: mujeres que sostienen solas a su familia y que rara vez encuentran una puerta abierta. Nuestro trabajo es que esa puerta exista.',
            'No damos una ayuda que se acaba el mismo día. Buscamos que cada mujer construya una fuente de ingresos propia y sostenible, y con ella la autonomía para decidir sobre su vida y la de los suyos.'
          ],
          puntos: [
            'Formación para el trabajo y para el emprendimiento',
            'Fortalecimiento de ingresos y de iniciativas productivas',
            'Acompañamiento social a la mujer y a su familia'
          ],
          enlace: null
        },
        {
          num: '02',
          titulo: 'Bienestar emocional y salud mental',
          resumen: 'Superar adicciones y trastornos, con acompañamiento real.',
          imagen: 'img/ejes/eje2.svg',
          alt: 'Silueta de una cabeza con un brote creciendo dentro',
          parrafos: [
            'Acompañamos a quienes enfrentan adicciones y trastornos emocionales. Nadie sale de ahí solo, y tampoco de un día para otro: hace falta un proceso, un lugar y gente que no suelte.',
            'Uno de los medios para lograrlo es la sede CREAS de Acción Salud, donde el proceso se sostiene en el tiempo con atención profesional.',
            'En paralelo promovemos hábitos de vida saludable y comportamientos exitosos, porque la recuperación se sostiene sobre una rutina que vale la pena vivir.'
          ],
          puntos: [
            'Acompañamiento en procesos de adicción',
            'Atención a trastornos emocionales y salud mental',
            'Hábitos de vida saludable y comportamientos exitosos'
          ],
          // Cuando la web de CREAS esté lista, pon aquí la URL y el botón se activa solo
          enlace: { texto: 'Sede CREAS — Acción Salud', url: '' }
        },
        {
          num: '03',
          titulo: 'Juventud con propósito',
          resumen: 'Becas, salud y acompañamiento para jóvenes y adolescentes.',
          imagen: 'img/ejes/eje3.svg',
          alt: 'Birrete de grado sobre un libro abierto',
          parrafos: [
            'Un joven con un propósito claro y una oportunidad concreta cambia el rumbo de toda su familia. Ese es el punto de partida de este eje.',
            'Tenemos previsto otorgar becas con corporaciones en niveles técnico y tecnológico, para que estudiar deje de ser un privilegio y pase a ser un camino posible.',
            'Junto a la formación acompañamos al joven y al adolescente en lo que sostiene ese camino: su salud, su cuerpo y sus decisiones.'
          ],
          puntos: [
            'Becas en niveles técnico y tecnológico con corporaciones aliadas',
            'Cuidado del joven y del adolescente',
            'Salud y deporte',
            'Educación sexual y reproductiva'
          ],
          enlace: null
        },
        {
          num: '04',
          titulo: 'Enfermedades huérfanas y discapacidad',
          resumen: 'Nadie debería enfrentar su condición sin lo necesario.',
          imagen: 'img/ejes/eje4.svg',
          alt: 'Persona en silla de ruedas junto a un corazón con una cruz de salud',
          parrafos: [
            'Hay personas que cargan con una condición y, además, con la ausencia de todo lo que necesitarían para sobrellevarla. Alguien sin piernas que no tiene su silla de ruedas queda por fuera de su propia vida, y no por su enfermedad, sino por el abandono.',
            'Este eje existe para cerrar esa brecha: llegar con el equipamiento, el apoyo y el acompañamiento que hacen la diferencia entre sobrevivir y vivir con dignidad.',
            'Sumamos además la detección temprana, porque una enfermedad encontrada a tiempo es una historia distinta, y el cuidado del adulto mayor: un adulto feliz es una vida sana y digna.'
          ],
          puntos: [
            'Equipamiento y apoyos para personas con discapacidad',
            'Acompañamiento a personas con enfermedades huérfanas',
            'Tamizajes de cáncer de mama, cérvix y próstata',
            'Cuidado del adulto mayor'
          ],
          enlace: null
        },
        {
          num: '05',
          titulo: 'Conciencia ambiental y sostenibilidad',
          resumen: 'Patrullas de limpieza y campañas en la comunidad.',
          imagen: 'img/ejes/eje5.svg',
          alt: 'Manos que sostienen un brote creciendo',
          parrafos: [
            'Organizamos patrullas que salen a limpiar las calles del barrio. Es un trabajo sencillo y visible, y justo por eso convence: el cambio se ve el mismo día.',
            'Alrededor de esas jornadas hacemos campañas de concientización, para que el cuidado del entorno deje de ser una jornada suelta y se vuelva una costumbre del vecindario.'
          ],
          puntos: [
            'Patrullas de limpieza de calles',
            'Campañas de concientización ambiental',
            'Cultura del cuidado del entorno'
          ],
          enlace: null
        }
      ]
    };
  },

  methods: {
    abrir(eje) {
      this.abierto = eje;
      document.body.classList.add('sin-scroll');
      this.$nextTick(() => {
        if (this.$refs.cerrar) this.$refs.cerrar.focus();
      });
    },
    cerrar() {
      this.abierto = null;
      document.body.classList.remove('sin-scroll');
    }
  },

  mounted() {
    this._esc = (e) => { if (e.key === 'Escape') this.cerrar(); };
    window.addEventListener('keydown', this._esc);
  },
  unmounted() {
    window.removeEventListener('keydown', this._esc);
    document.body.classList.remove('sin-scroll');
  },

  template: `
    <section class="section section-alt">
      <div class="container">

        <div class="section-head">
          <h2 class="section-title">Ejes estratégicos</h2>
          <p class="section-sub">Programas diseñados para generar oportunidades, autocuidado y sostenibilidad.</p>
        </div>

        <div class="row g-4">
          <div class="col-sm-6 col-lg-4" v-for="eje in ejes" :key="eje.num">
            <article class="eje-card h-100" tabindex="0" role="button"
                     :aria-label="'Ver detalle de ' + eje.titulo"
                     @click="abrir(eje)" @keydown.enter="abrir(eje)" @keydown.space.prevent="abrir(eje)">

              <div class="eje-img">
                <img :src="eje.imagen" :alt="eje.alt" loading="lazy">
              </div>
              <span class="eje-num">{{ eje.num }}</span>

              <div class="eje-body">
                <h3 class="eje-title">{{ eje.titulo }}</h3>
                <p class="eje-resumen">{{ eje.resumen }}</p>
                <span class="eje-mas">Conocer más <span aria-hidden="true">→</span></span>
              </div>

            </article>
          </div>
        </div>

      </div>

      <!-- ============ CUADRO DE DETALLE ============ -->
      <transition name="modal">
        <div class="modal-eje" v-if="abierto" @click.self="cerrar"
             role="dialog" aria-modal="true" aria-labelledby="tituloEje">
          <div class="modal-caja">
            <button type="button" class="modal-cerrar" ref="cerrar" @click="cerrar" aria-label="Cerrar">×</button>
            <div class="modal-figura">
              <img :src="abierto.imagen" :alt="abierto.alt">
            </div>

            <div class="modal-cuerpo">
              <span class="modal-num">Eje {{ abierto.num }}</span>
              <h3 class="modal-titulo" id="tituloEje">{{ abierto.titulo }}</h3>

              <p v-for="(p, i) in abierto.parrafos" :key="i" class="modal-parrafo">{{ p }}</p>

              <ul class="modal-lista">
                <li v-for="(punto, i) in abierto.puntos" :key="i">{{ punto }}</li>
              </ul>

              <div class="modal-pie" v-if="abierto.enlace">
                <a v-if="abierto.enlace.url" class="btn btn-brand"
                   :href="abierto.enlace.url" target="_blank" rel="noopener">
                  {{ abierto.enlace.texto }}
                </a>
                <span v-else class="enlace-pendiente">
                  {{ abierto.enlace.texto }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </transition>
    </section>
  `
};
