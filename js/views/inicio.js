/* Vista: Inicio (hero) */
const VistaInicio = {
  template: `
    <section class="hero">
      <div class="container">
        <div class="row align-items-center g-5">

          <div class="col-lg-5 text-center">
            <img src="img/logo.png" alt="Logo Fundación Unidad Sebastián de Vida" class="hero-logo">
          </div>

          <div class="col-lg-7 text-center text-lg-start">
            <p class="hero-motto">Fe que transforma</p>
            <h1 class="hero-title">Fundación Unidad<br>Sebastián de Vida</h1>
            <p class="hero-text">
              Desde el corazón del caribe Colombiano trabajamos para encender la luz
              donde otros ven dificultad y sembrar vida donde más se necesita.
            </p>

            <div class="hero-actions">
              <router-link class="btn btn-brand" to="/ejes">Nuestros ejes</router-link>
              <router-link class="btn btn-brand-outline" to="/contacto">Contáctanos</router-link>
            </div>

            <ul class="hero-contact list-unstyled">
              <li>
                <span class="hero-contact-ico" aria-hidden="true">✆</span>
                <a href="tel:+573103538881">310 353 8881</a>
              </li>
              <li>
                <span class="hero-contact-ico" aria-hidden="true">✉</span>
                <a href="mailto:fundacionusv@gmail.com">fundacionusv@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  `
};
