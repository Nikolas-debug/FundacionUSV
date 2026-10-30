/* Vista: Inicio (hero) */
const VistaInicio = {
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-grid">

          <div class="hero-copy">
            <p class="hero-motto">Fe que transforma</p>
            <h1 class="hero-title">
              <span class="hero-antetitulo">Fundación Unidad</span>
              Sebastián de Vida
            </h1>
            <p class="hero-text">
              Desde el corazón del caribe Colombiano trabajamos para encender la luz
              donde otros ven dificultad y sembrar vida donde más se necesita.
            </p>

            <div class="hero-actions">
              <router-link class="btn btn-brand" to="/ejes">Nuestros ejes <span aria-hidden="true">→</span></router-link>
              <router-link class="enlace-texto" to="/contacto">Contáctanos</router-link>
            </div>

            <ul class="hero-contact list-unstyled">
              <li>
                <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>
                <a href="tel:+573103538881">310 353 8881</a>
              </li>
              <li>
                <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                <a href="mailto:fundacionusv@gmail.com">fundacionusv@gmail.com</a>
              </li>
            </ul>
          </div>

          <div class="hero-emblema">
            <img src="img/logo.png" alt="Logo Fundación Unidad Sebastián de Vida" class="hero-logo">
          </div>

        </div>
      </div>
    </section>
  `
};
