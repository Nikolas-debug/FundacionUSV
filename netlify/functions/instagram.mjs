const CUANTOS = 12;            
const DIAS_PARA_RENOVAR = 30;             
const MS_POR_DIA = 24 * 60 * 60 * 1000;

/* ---- Almacén del token (Netlify Blobs, opcional) ---- */
async function abrirAlmacen() {
  try {
    const { getStore } = await import('@netlify/blobs');
    return getStore('instagram');
  } catch (err) {
    console.warn('Netlify Blobs no disponible; se usará solo IG_TOKEN:', err.message);
    return null;
  }
}

async function leerToken(almacen) {
  const semilla = process.env.IG_TOKEN;
  if (!almacen) return { token: semilla, obtenido: Date.now(), persistible: false };

  try {
    const guardado = await almacen.get('token', { type: 'json' });
    if (guardado && guardado.token) return { ...guardado, persistible: true };
  } catch (err) {
    console.warn('No se pudo leer el token guardado:', err.message);
  }
  return { token: semilla, obtenido: 0, persistible: true };
}

async function guardarToken(almacen, token) {
  if (!almacen) return;
  try {
    await almacen.setJSON('token', { token, obtenido: Date.now() });
  } catch (err) {
    console.warn('No se pudo guardar el token renovado:', err.message);
  }
}

async function renovar(token) {
  const url = 'https://graph.instagram.com/refresh_access_token'
            + '?grant_type=ig_refresh_token&access_token=' + encodeURIComponent(token);
  const r = await fetch(url);
  if (!r.ok) throw new Error('renovación falló: ' + r.status);
  const datos = await r.json();
  if (!datos.access_token) throw new Error('la renovación no devolvió token');
  return datos.access_token;
}

/* ---- Normaliza lo que devuelve Instagram a lo que la galería necesita ---- */
function normalizar(item) {
  const esVideo = item.media_type === 'VIDEO';
  return {
    id: item.id,
    tipo: item.media_type,
    imagen: esVideo ? item.thumbnail_url : item.media_url,
    descripcion: (item.caption || '').trim(),
    enlace: item.permalink,
    fecha: item.timestamp
  };
}

function responder(cuerpo, { estado = 200, segundos = 3600 } = {}) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=300, s-maxage=${segundos}, stale-while-revalidate=86400`
    }
  });
}

export default async () => {
  if (!process.env.IG_TOKEN) {
    return responder(
      { ok: false, motivo: 'Falta la variable de entorno IG_TOKEN', posts: [] },
      { segundos: 60 }
    );
  }

  try {
    const almacen = await abrirAlmacen();
    let { token, obtenido, persistible } = await leerToken(almacen);

    // ¿Toca renovar?
    if (persistible && Date.now() - (obtenido || 0) > DIAS_PARA_RENOVAR * MS_POR_DIA) {
      try {
        token = await renovar(token);
        await guardarToken(almacen, token);
        console.log('Token de Instagram renovado.');
      } catch (err) {
        console.warn('No se pudo renovar el token, se usa el actual:', err.message);
      }
    }

    const campos = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const url = 'https://graph.instagram.com/me/media'
              + `?fields=${campos}&limit=${CUANTOS}&access_token=${encodeURIComponent(token)}`;

    const r = await fetch(url);
    const datos = await r.json();

    if (!r.ok || datos.error) {
      const motivo = (datos.error && datos.error.message) || ('HTTP ' + r.status);
      console.error('Instagram respondió con error:', motivo);
      return responder({ ok: false, motivo, posts: [] }, { segundos: 60 });
    }

    const posts = (datos.data || [])
      .map(normalizar)
      .filter((p) => p.imagen);

    return responder({ ok: true, posts });

  } catch (err) {
    console.error('Fallo consultando Instagram:', err);
    return responder({ ok: false, motivo: err.message, posts: [] }, { segundos: 60 });
  }
};
