const VistaEjes = {
  data() {
    return {
      abierto: null,
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
            'El trabajo no termina en la persona. Incluye a la familia, que suele llegar tan agotada como quien consume y necesita entender qué está pasando para poder sostener el proceso.'
          ],
          puntos: [
            'Acompañamiento en procesos de adicción',
            'Atención a trastornos emocionales y salud mental',
            'Proceso profesional sostenido en la sede CREAS',
            'Apoyo y orientación a la familia'
          ],
          // Cuando la web de CREAS esté lista, pon aquí la URL y el botón se activa solo
          enlace: { texto: 'Sede CREAS — Acción Salud', url: '' }
        },
        {
          num: '03',
          titulo: 'Juventud con propósito',
          resumen: 'Becas técnicas y tecnológicas para que estudiar sea posible.',
          imagen: 'img/ejes/eje3.svg',
          alt: 'Birrete de grado sobre un libro abierto',
          parrafos: [
            'Un joven con un propósito claro y una oportunidad concreta cambia el rumbo de toda su familia. Ese es el punto de partida de este eje.',
            'Tenemos previsto otorgar becas con corporaciones en niveles técnico y tecnológico, para que estudiar deje de ser un privilegio y pase a ser un camino posible.',
            'La beca es el medio, no el final. Junto a ella acompañamos al joven para que sostenga el estudio, lo termine y lo convierta en un oficio y en un ingreso propio.'
          ],
          puntos: [
            'Becas en niveles técnico y tecnológico con corporaciones aliadas',
            'Orientación vocacional y proyecto de vida',
            'Acompañamiento para sostener y terminar el estudio',
            'Puente hacia el primer empleo'
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
            'Las enfermedades huérfanas suman un problema más. Son tan poco frecuentes que casi nadie las conoce, y la familia termina peleando sola contra un sistema que no sabe qué hacer con ellas. Acompañar ahí también es parte del trabajo.'
          ],
          puntos: [
            'Equipamiento y apoyos para personas con discapacidad',
            'Acompañamiento a personas con enfermedades huérfanas',
            'Orientación a las familias frente al sistema de salud',
            'Inclusión y participación en la comunidad'
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
        },
        {
          num: '06',
          titulo: 'Cuidado del joven y del adolescente',
          resumen: 'Acompañar la etapa en la que todo se define.',
          imagen: 'img/ejes/eje6.svg',
          alt: 'Una persona adulta con el brazo sobre el hombro de un adolescente',
          parrafos: [
            'La adolescencia es la etapa en la que se toman las decisiones que marcan el resto de la vida, y suele ser también aquella en la que el acompañamiento desaparece. El joven dejó de ser niño, todavía no es adulto, y muchas veces queda solo justo cuando más necesita a alguien al lado.',
            'Trabajamos con adolescentes y jóvenes en la construcción de su proyecto de vida, en el manejo de la presión del entorno y en la prevención de los riesgos propios de esa edad. No se trata de dar sermones, sino de estar presentes y de ofrecer alternativas reales.'
          ],
          puntos: [
            'Acompañamiento en la construcción del proyecto de vida',
            'Prevención de riesgos y manejo de la presión del entorno',
            'Entornos protectores en la familia y en la comunidad',
            'Espacios de escucha para adolescentes'
          ],
          enlace: null
        },
        {
          num: '07',
          titulo: 'Prevención de la desnutrición infantil',
          resumen: 'Ningún niño debería crecer con hambre.',
          imagen: 'img/ejes/eje7.svg',
          alt: 'Manos que sostienen un plato de comida bajo un corazón',
          parrafos: [
            'La desnutrición en los primeros años deja huellas que no se borran: afecta el crecimiento, el aprendizaje y la salud del resto de la vida. Y casi siempre llega en silencio, sin que nadie la note a tiempo.',
            'Por eso trabajamos en la detección temprana y en el acompañamiento a las familias. Un niño pesado y medido a tiempo, con una madre que sabe qué buscar y a dónde acudir, es un niño que se recupera.'
          ],
          puntos: [
            'Tamizaje nutricional y seguimiento de peso y talla',
            'Apoyo alimentario a familias en riesgo',
            'Educación nutricional a madres y cuidadores',
            'Remisión oportuna a los servicios de salud'
          ],
          enlace: null
        },
        {
          num: '08',
          titulo: 'Cuidado del adulto mayor',
          resumen: 'Un adulto feliz es una vida sana y digna.',
          imagen: 'img/ejes/eje8.svg',
          alt: 'Persona mayor apoyada en un bastón junto a un corazón',
          parrafos: [
            'Un adulto feliz es una vida sana y digna. Esa frase resume lo que buscamos: que llegar a viejo no signifique quedarse solo ni volverse invisible para los demás.',
            'El abandono del adulto mayor es una de las formas de pobreza más calladas que existen. Acompañamos a quienes están en esa situación con presencia, actividad y comunidad, porque envejecer bien depende tanto del cuerpo como de sentirse parte de algo.'
          ],
          puntos: [
            'Acompañamiento y prevención del abandono',
            'Envejecimiento activo y actividad física adaptada',
            'Encuentros intergeneracionales',
            'Orientación en salud y autocuidado'
          ],
          enlace: null
        },
        {
          num: '09',
          titulo: 'Deporte',
          resumen: 'El deporte como escuela y como alternativa.',
          imagen: 'img/ejes/eje9.svg',
          alt: 'Silueta de una persona corriendo junto a un balón',
          parrafos: [
            'El deporte hace mucho más que cuidar el cuerpo. Ordena la rutina, enseña disciplina, obliga a convivir y ocupa el tiempo que de otro modo queda libre para lo que no conviene.',
            'Promovemos la práctica deportiva y recreativa como una alternativa concreta para niños, adolescentes y jóvenes, y como un espacio donde la comunidad se encuentra y se reconoce.'
          ],
          puntos: [
            'Escuelas y encuentros deportivos',
            'Recreación y uso positivo del tiempo libre',
            'Trabajo en equipo, disciplina y convivencia',
            'Actividad física para todas las edades'
          ],
          enlace: null
        },
        {
          num: '10',
          titulo: 'Educación sexual y reproductiva',
          resumen: 'Información clara para decidir con libertad.',
          imagen: 'img/ejes/eje10.svg',
          alt: 'Un escudo con un corazón en el centro',
          parrafos: [
            'La falta de información no protege a nadie. Lo que hace es dejar a los jóvenes expuestos a un embarazo no planeado, a una infección o a una relación en la que no alcanzan a reconocer el peligro.',
            'Hablamos del tema de frente, con lenguaje claro y sin juicios, para que cada persona conozca su cuerpo, sus derechos y sus opciones, y pueda decidir con libertad y con criterio.'
          ],
          puntos: [
            'Prevención del embarazo en adolescentes',
            'Prevención de infecciones de transmisión sexual',
            'Derechos sexuales y reproductivos',
            'Orientación en planificación familiar'
          ],
          enlace: null
        },
        {
          num: '11',
          titulo: 'Tamizajes de cáncer de mama, cérvix y próstata',
          resumen: 'Detectar a tiempo cambia el desenlace.',
          imagen: 'img/ejes/eje11.svg',
          alt: 'Lazo de detección temprana junto a una lupa',
          parrafos: [
            'En estos tres tipos de cáncer el momento del diagnóstico define casi todo. Detectado a tiempo, el tratamiento suele ser más corto y el pronóstico mucho mejor; detectado tarde, la historia es otra.',
            'Organizamos jornadas de tamizaje y enseñamos lo que cada persona puede hacer por su cuenta, porque el examen que salva vidas es el que efectivamente se hace. Y cuando aparece un hallazgo, acompañamos a la persona para que no quede sola en el camino que sigue.'
          ],
          puntos: [
            'Jornadas de tamizaje de cáncer de mama y de cérvix',
            'Tamizaje de cáncer de próstata',
            'Enseñanza del autoexamen y de los signos de alarma',
            'Acompañamiento y remisión ante un hallazgo'
          ],
          enlace: null
        },
        {
          num: '12',
          titulo: 'Hábitos de vida saludable y comportamientos exitosos',
          resumen: 'Lo que se repite todos los días es lo que cambia una vida.',
          imagen: 'img/ejes/eje12.svg',
          alt: 'Un ciclo de hábitos alrededor de un corazón',
          parrafos: [
            'Ningún programa se sostiene si la persona vuelve cada noche a la misma rutina que la enfermó. Los hábitos son el terreno donde todo lo demás echa raíz o se pierde.',
            'Trabajamos sobre lo cotidiano: cómo se come, cómo se duerme, cómo se mueve el cuerpo, cómo se maneja la presión del día. Son cambios pequeños y repetidos, y por eso mismo son los que duran.'
          ],
          puntos: [
            'Alimentación y actividad física en el día a día',
            'Descanso y manejo del estrés',
            'Comportamientos exitosos y disciplina personal',
            'Acompañamiento para sostener el cambio en el tiempo'
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
          <p class="section-sub">Los frentes de trabajo con los que la fundación llega a la comunidad.</p>
        </div>

        <div class="row g-4 justify-content-center">
          <div class="col-sm-6 col-lg-4 col-xxl-3" v-for="eje in ejes" :key="eje.num">
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
