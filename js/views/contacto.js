/* Vista: Contacto — datos + formulario

   El envío va a Netlify Forms: se hace POST a la propia raíz del sitio con
   el cuerpo codificado como formulario y el campo form-name. Netlify lo
   registra al desplegar gracias a la copia oculta que está en index.html.

   Si el POST falla (por ejemplo abriendo el index con file://, donde no hay
   Netlify), caemos al cliente de correo para no dejar al visitante sin salida.
*/
const NOMBRE_FORM = 'contacto';

const VistaContacto = {
  data() {
    return {
      form: { nombre: '', correo: '', telefono: '', mensaje: '' },
      trampa: '',   // honeypot: si un bot lo llena, descartamos el envío
      errores: {},
      enviando: false,
      estado: null   // 'ok' | 'error' | null
    };
  },
  methods: {
    validar() {
      const e = {};
      if (!this.form.nombre.trim()) e.nombre = 'Escribe tu nombre.';
      if (!this.form.correo.trim()) {
        e.correo = 'Escribe tu correo.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.correo.trim())) {
        e.correo = 'Ese correo no parece válido.';
      }
      if (!this.form.mensaje.trim()) e.mensaje = 'Cuéntanos en qué podemos ayudarte.';
      this.errores = e;
      return Object.keys(e).length === 0;
    },

    abrirCorreo() {
      const asunto = encodeURIComponent('Contacto web — ' + this.form.nombre);
      const cuerpo = encodeURIComponent(
        'Nombre: ' + this.form.nombre + '\n' +
        'Correo: ' + this.form.correo + '\n' +
        'Teléfono: ' + (this.form.telefono || '—') + '\n\n' +
        this.form.mensaje
      );
      window.location.href =
        'mailto:fundacionusv@gmail.com?subject=' + asunto + '&body=' + cuerpo;
    },

    async enviar() {
      this.estado = null;
      if (!this.validar()) return;
      if (this.trampa) return;   // bot

      this.enviando = true;
      try {
        const datos = new URLSearchParams({
          'form-name': NOMBRE_FORM,
          'bot-field': '',
          nombre: this.form.nombre,
          correo: this.form.correo,
          telefono: this.form.telefono,
          mensaje: this.form.mensaje
        });

        const r = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: datos.toString()
        });
        if (!r.ok) throw new Error('respuesta ' + r.status);

        this.estado = 'ok';
        this.form = { nombre: '', correo: '', telefono: '', mensaje: '' };
        this.errores = {};
      } catch (err) {
        console.warn('Netlify Forms no disponible, abriendo el correo:', err);
        this.abrirCorreo();
      } finally {
        this.enviando = false;
      }
    }
  },
  template: `
    <section class="section section-contact">
      <div class="container">

        <div class="section-head">
          <h2 class="section-title">Contáctanos</h2>
          <p class="section-sub">¿Quieres ser voluntario, donar o conocer más? Escríbenos.</p>
        </div>

        <div class="row g-4">

          <!-- Datos -->
          <div class="col-lg-5">
            <div class="row g-4">
              <div class="col-sm-6 col-lg-12">
                <a class="contact-card" href="tel:+573103538881">
                  <span class="contact-ico" aria-hidden="true">✆</span>
                  <span class="contact-label">Teléfono</span>
                  <span class="contact-value">310 353 8881</span>
                </a>
              </div>
              <div class="col-sm-6 col-lg-12">
                <a class="contact-card" href="mailto:fundacionusv@gmail.com">
                  <span class="contact-ico" aria-hidden="true">✉</span>
                  <span class="contact-label">Correo</span>
                  <span class="contact-value">fundacionusv@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Formulario -->
          <div class="col-lg-7">
            <form class="form-card" @submit.prevent="enviar" novalidate>

              <div class="campo">
                <label for="f-nombre">Nombre <span class="req">*</span></label>
                <input id="f-nombre" type="text" v-model.trim="form.nombre"
                       :class="{ 'con-error': errores.nombre }" placeholder="Tu nombre completo">
                <small class="msg-error" v-if="errores.nombre">{{ errores.nombre }}</small>
              </div>

              <div class="row g-3">
                <div class="col-md-6">
                  <div class="campo">
                    <label for="f-correo">Correo <span class="req">*</span></label>
                    <input id="f-correo" type="email" v-model.trim="form.correo"
                           :class="{ 'con-error': errores.correo }" placeholder="tu@correo.com">
                    <small class="msg-error" v-if="errores.correo">{{ errores.correo }}</small>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="campo">
                    <label for="f-tel">Teléfono</label>
                    <input id="f-tel" type="tel" v-model.trim="form.telefono" placeholder="Opcional">
                  </div>
                </div>
              </div>

              <div class="campo">
                <label for="f-msg">Mensaje <span class="req">*</span></label>
                <textarea id="f-msg" rows="5" v-model.trim="form.mensaje"
                          :class="{ 'con-error': errores.mensaje }"
                          placeholder="Cuéntanos en qué podemos ayudarte"></textarea>
                <small class="msg-error" v-if="errores.mensaje">{{ errores.mensaje }}</small>
              </div>

              <!-- trampa para bots: invisible para las personas -->
              <p class="trampa-bot" aria-hidden="true">
                <label>No llenar este campo
                  <input type="text" v-model="trampa" tabindex="-1" autocomplete="off">
                </label>
              </p>

              <div class="form-pie">
                <button class="btn btn-brand" type="submit" :disabled="enviando">
                  {{ enviando ? 'Enviando…' : 'Enviar mensaje' }}
                </button>
                <a class="btn btn-brand-outline"
                   href="https://wa.me/573103538881?text=Hola%20Fundaci%C3%B3n%20Unidad%20Sebasti%C3%A1n%20de%20Vida"
                   target="_blank" rel="noopener">WhatsApp</a>
              </div>

              <p class="aviso ok"    v-if="estado === 'ok'">¡Gracias! Recibimos tu mensaje y te responderemos pronto.</p>
              <p class="aviso error" v-if="estado === 'error'">No pudimos enviar el mensaje. Escríbenos por WhatsApp o al correo.</p>

            </form>
          </div>

        </div>
      </div>
    </section>
  `
};
