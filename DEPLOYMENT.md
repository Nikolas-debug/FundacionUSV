# Despliegue — Fundación Unidad Sebastián de Vida

Guía para publicar y mantener el sitio en Netlify.

---

## 1. Qué hay en el proyecto

```
index.html              Cáscara de la app (header, router-view, footer)
styles.css              Todos los estilos y la paleta de marca
manifest.json           Identidad de la PWA (nombre, colores, iconos)
sw.js                   Service worker: habilita la instalación en el celular
favicon.ico
netlify.toml            Configuración de Netlify (cabeceras, caché, funciones)
package.json            Solo dependencias de las funciones

js/
  app.js                Rutas, arranque de Vue, registro del service worker
  views/                Una vista por archivo
    inicio.js  nosotros.js  ejes.js  galeria.js  contacto.js

netlify/functions/
  instagram.mjs         Trae las publicaciones de Instagram

img/
  logo.png
  ejes/                 Ilustraciones SVG de los cinco ejes
  icons/                Iconos de la PWA (circulares)
  gallery1-3.jpg        Respaldo de la galería si Instagram no responde
```

No hay compilación del front-end. Vue, vue-router y Bootstrap entran por CDN,
así que **su descarga no consume el ancho de banda de tu cuenta de Netlify**.

---

## 2. Publicar en Netlify

### Opción recomendada: conectar el repositorio

1. Sube la carpeta a GitHub.
2. En Netlify: **Add new site → Import an existing project** y elige el repo.
3. Netlify lee `netlify.toml`, así que no cambies nada en la pantalla de build:
   - Publish directory: `.`
   - Build command: `npm install --omit=dev || true`
   - Functions directory: `netlify/functions`
4. **Deploy**.

Cada `git push` publica sola la nueva versión.

### Opción rápida: arrastrar la carpeta

Sirve para una prueba, pero **las funciones no se despliegan así de forma
confiable** y pierdes el historial. Para el sitio definitivo usa Git.

---

## 3. Variables de entorno

En **Site configuration → Environment variables**:

| Variable   | Para qué sirve                                | ¿Obligatoria?                       |
|------------|-----------------------------------------------|-------------------------------------|
| `IG_TOKEN` | Token de larga duración de Instagram          | Solo si quieres la galería conectada |

Sin `IG_TOKEN` el sitio funciona igual: la galería muestra las tres fotos
locales de `img/` en lugar de las publicaciones de Instagram.

---

## 4. Conectar Instagram

### 4.1 Convertir la cuenta a profesional

La API solo funciona con cuentas **profesionales** (Empresa o Creador). Es
gratis, se hace desde el celular y se puede revertir cuando quieras:

1. Abre Instagram → tu perfil → menú (☰) → **Configuración**.
2. **Tipo de cuenta y herramientas → Cambiar a cuenta profesional**.
3. Elige **Empresa** (o Creador) y termina el asistente.

No cambia nada visible para quien visita el perfil.

### 4.2 Crear la app en Meta

1. Entra a <https://developers.facebook.com/> con la cuenta de Facebook de la
   fundación y crea una app.
2. Agrega el producto **Instagram** y entra a *API con inicio de sesión de
   Instagram* (**Instagram API with Instagram Login**).
3. En esa pantalla, agrega la cuenta de Instagram de la fundación y genera el
   **token de acceso**. El permiso que hace falta se llama
   `instagram_business_basic`.
4. Copia el token que te muestra: dura **60 días**.

> El orden exacto de los botones en Meta cambia seguido. Si algo no calza con
> estos pasos, la referencia buena es la documentación oficial:
> <https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login>

### 4.3 Guardar el token

Pega el token en Netlify como `IG_TOKEN` y vuelve a desplegar.

### 4.4 La renovación es automática

El token vence a los 60 días. La función lo renueva sola cuando pasa de 30 días
y guarda el nuevo en **Netlify Blobs**, así que **no tienes que hacer nada**
mientras el sitio reciba al menos una visita cada dos meses.

Para que eso funcione, la dependencia debe estar instalada. Una vez, en tu
computador, dentro de la carpeta del proyecto:

```bash
npm install @netlify/blobs
```

Eso fija la versión correcta en `package.json`. Súbelo al repo.

Si Blobs no está disponible, la función **sigue trayendo las publicaciones**
usando el token de la variable de entorno, pero sin renovarlo: en ese caso
tendrías que generar un token nuevo cada 60 días a mano.

### 4.5 Comprobar que quedó

Abre en el navegador:

```
https://TU-SITIO.netlify.app/.netlify/functions/instagram
```

- `{"ok":true,"posts":[...]}` → todo bien.
- `{"ok":false,"motivo":"..."}` → el motivo dice qué falta. Los logs completos
  están en **Netlify → Logs → Functions**.

---

## 5. Formulario de contacto

Usa **Netlify Forms**. No hay backend que mantener.

Como el sitio es una SPA, Vue dibuja el formulario en el navegador y el
detector de Netlify no lo vería. Por eso `index.html` incluye una **copia
estática oculta** del formulario: esa es la que Netlify registra al desplegar.

**Si agregas o quitas un campo, cámbialo en los dos lados:**

- La copia oculta en `index.html` (el `<form name="contacto" ...>` justo
  después de `<body>`).
- El formulario real en `js/views/contacto.js`.

Los `name` de los campos deben coincidir exactamente. Si no, el envío llega
vacío o Netlify lo rechaza.

Los mensajes llegan a **Netlify → Forms → contacto**. Para que además te
avisen por correo: **Forms → Settings and usage → Form notifications**.

El formulario trae una trampa para bots (*honeypot*) llamada `bot-field`, ya
declarada en los dos lados.

---

## 6. La PWA

El sitio se puede instalar en el celular. Para que eso funcione hace falta
**https**, así que solo opera en Netlify o en `localhost` — abriendo el
`index.html` con doble clic (`file://`) no vas a ver el botón de instalar.

### Al publicar cambios, sube la versión del caché

En la primera línea útil de `sw.js`:

```js
const VERSION = 'usv-v1';   // → 'usv-v2' en el siguiente cambio
```

Si no lo haces, quien ya visitó el sitio puede seguir viendo la versión vieja
guardada en su teléfono. Es el único paso manual del despliegue: no lo olvides.

### Iconos

Están en `img/icons/`, recortados en círculo desde el logo:

| Archivo                | Para qué                                        |
|------------------------|-------------------------------------------------|
| `icon-192/512.png`     | Circulares con fondo transparente               |
| `maskable-192/512.png` | Android les aplica su propia máscara            |
| `apple-touch-icon.png` | iOS (no admite transparencia, va sobre el verde)|

---

## 7. Créditos de Netlify: qué gasta qué

El plan gratuito da **300 créditos al mes**, repartidos así:

| Concepto              | Costo               | Qué significa en la práctica          |
|-----------------------|---------------------|---------------------------------------|
| Deploy de producción  | 15 créditos         | ~20 despliegues al mes                |
| Ancho de banda        | 20 créditos por GB  |                                        |
| Peticiones web        | 2 créditos por 10k  |                                        |
| Cómputo (funciones)   | 10 créditos por GB-hora | Insignificante para este sitio     |

**Los despliegues son lo caro.** Por eso la galería usa una función en vivo y
no reconstruye el sitio: refrescar Instagram con despliegues programados se
habría comido el presupuesto entero.

Lo que ya está hecho para gastar poco:

- La respuesta de Instagram se cachea **una hora en el CDN**, así que la
  función casi nunca se ejecuta aunque el sitio reciba muchas visitas.
- El navegador además la guarda 30 minutos en `sessionStorage`.
- Las imágenes de `img/` se cachean un año (`immutable`).
- El CSS y el JS revalidan con ETag: si no cambiaron, Netlify responde `304`
  sin volver a enviarlos.
- Vue, vue-router y Bootstrap vienen de CDN externo y **no gastan** tu ancho
  de banda.
- El service worker guarda la cáscara en el teléfono: las visitas repetidas
  casi no piden nada al servidor.

Consejo: agrupa varios cambios en un solo `push` en vez de desplegar cinco
veces seguidas.

---

## 8. Trabajar en local

Para el sitio a secas basta cualquier servidor estático:

```bash
npx serve .
# o
python -m http.server 8000
```

Para probar **funciones y formularios** necesitas la CLI de Netlify:

```bash
npm install -g netlify-cli
netlify dev
```

`netlify dev` levanta el sitio con las funciones y las variables de entorno del
proyecto vinculado.

---

## 9. Si algo falla

| Síntoma                                    | Causa más probable                                              |
|--------------------------------------------|-----------------------------------------------------------------|
| La galería muestra solo las 3 fotos locales | Falta `IG_TOKEN`, el token venció o la cuenta no es profesional |
| Los cambios no se ven en el celular         | No subiste `VERSION` en `sw.js`                                 |
| El formulario no registra nada              | Los `name` no coinciden entre la copia oculta y el formulario real |
| El botón de instalar no aparece             | Estás en `file://`, o la app ya está instalada                  |
| La función responde `ok:false`              | Mira `motivo` y los logs en Netlify → Logs → Functions          |

---

## 10. Enlaces

- Instagram API with Instagram Login — <https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login>
- Netlify Forms (SPA) — <https://docs.netlify.com/manage/forms/setup/>
- Netlify Blobs — <https://docs.netlify.com/build/data-and-storage/netlify-blobs/>
- Precios y créditos — <https://www.netlify.com/pricing/>
