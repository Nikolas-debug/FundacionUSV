/* Vista: Nosotros — misión, visión e historia */
const VistaNosotros = {
  data() {
    return {
      bloques: [
        {
          clave: 'mision',
          etiqueta: 'Misión',
          icono: '◈',
          texto: 'Acompañamos a mujeres, jóvenes, niños y adultos mayores en doce frentes con procesos sostenidos que buscan mejorar la calidad de vida individual y en sociedad. Es fe que se demuestra en obra.'
        },
        {
          clave: 'vision',
          etiqueta: 'Visión',
          icono: '◎',
          texto: 'Para el año 2030, la Fundación Unidad Sebastián de Vida será reconocida en la región Caribe por su liderazgo en procesos de transformación social, empoderamiento femenino y fortalecimiento comunitario sostenible.'
        },
        {
          clave: 'historia',
          etiqueta: 'Historia',
          icono: '❖',
          texto: 'La fundación nace en Córdoba como un símbolo de fe, esperanza y solidaridad, inspirada por el amor hacia las comunidades más vulnerables. Su nombre honra la vida de Sebastián, reflejando la misión de transformar el dolor en servicio y unidad.'
        }
      ]
    };
  },
  template: `
    <section class="section">
      <div class="container">

        <div class="section-head">
          <h2 class="section-title">Nosotros</h2>
          <p class="section-sub">
            Acompañamos a las familias del Caribe colombiano en doce frentes de trabajo,
            con procesos que sostienen en el tiempo.
          </p>
        </div>

        <!-- Frase que ancla la identidad -->
        <blockquote class="cita">
          <p>Transformar el dolor en servicio y unidad.</p>
          <cite>Fundación Unidad Sebastián de Vida</cite>
        </blockquote>

        <div class="row g-4">
          <div class="col-md-4" v-for="b in bloques" :key="b.clave">
            <article class="tarjeta-nosotros h-100">
              <span class="tarjeta-icono" aria-hidden="true">{{ b.icono }}</span>
              <h3 class="tarjeta-etiqueta">{{ b.etiqueta }}</h3>
              <p class="tarjeta-texto">{{ b.texto }}</p>
            </article>
          </div>
        </div>

        <div class="nosotros-pie">
          <p>¿Quieres acompañarnos en este trabajo?</p>
          <router-link class="btn btn-brand" to="/contacto">Hablemos</router-link>
        </div>

      </div>
    </section>
  `
};
