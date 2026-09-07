const EJE_SIN_CLASIFICAR = {
  num: '00',
  etiqueta: 'Nuestras publicaciones',
  titulo: 'Nuestras publicaciones'
};

const EJES_GALERIA = [
  {
    num: '01',
    etiqueta: 'Empoderamiento',
    titulo: 'Empoderamiento económico y social',
    etiquetas: ['empoderamiento', 'madrecabezadehogar'],
    fuertes: ['cabeza de hogar', 'emprendimient', 'emprendedor', 'empoderamiento',
              'capital semilla', 'unidad productiva', 'formacion para el trabajo'],
    claves:  ['negocio', 'ingresos', 'autonomia', 'productiv', 'madres']
  },
  {
    num: '02',
    etiqueta: 'Salud mental',
    titulo: 'Bienestar emocional y salud mental',
    etiquetas: ['saludmental', 'bienestaremocional', 'creas'],
    fuertes: ['salud mental', 'bienestar emocional', 'adiccion', 'adicciones',
              'consumo de sustancias', 'rehabilitacion', 'creas', 'psicolog'],
    claves:  ['emocional', 'terapia', 'ansiedad', 'depresion', 'duelo']
  },
  {
    num: '03',
    etiqueta: 'Juventud',
    titulo: 'Juventud con propósito',
    etiquetas: ['juventudconproposito', 'beca'],
    fuertes: ['beca', 'tecnologico', 'universidad', 'matricula', 'graduacion', 'graduad'],
    claves:  ['estudi', 'tecnico', 'formacion academica', 'primer empleo']
  },
  {
    num: '04',
    etiqueta: 'Discapacidad',
    titulo: 'Enfermedades huérfanas y discapacidad',
    etiquetas: ['discapacidad', 'enfermedadeshuerfanas'],
    fuertes: ['discapacidad', 'huerfana', 'enfermedad rara', 'silla de ruedas',
              'protesis', 'caminador', 'baston'],
    claves:  ['inclusion', 'movilidad', 'condicion especial', 'ayuda tecnica']
  },
  {
    num: '05',
    etiqueta: 'Ambiente',
    titulo: 'Conciencia ambiental y sostenibilidad',
    etiquetas: ['ambiental', 'medioambiente', 'sostenibilidad'],
    fuertes: ['ambiental', 'medio ambiente', 'reciclaje', 'reciclar', 'sostenib',
              'jornada de limpieza', 'patrulla', 'siembra', 'arboriz'],
    claves:  ['limpieza', 'basura', 'residuos', 'ecolog', 'planeta', 'arbol']
  },
  {
    num: '06',
    etiqueta: 'Adolescencia',
    titulo: 'Cuidado del joven y del adolescente',
    etiquetas: ['adolescencia', 'jovenes'],
    fuertes: ['adolescen', 'proyecto de vida', 'entorno protector',
              'prevencion de riesgos', 'presion de grupo'],
    claves:  ['joven', 'escucha', 'orientacion']
  },
  {
    num: '07',
    etiqueta: 'Nutrición infantil',
    titulo: 'Prevención de la desnutrición infantil',
    etiquetas: ['desnutricion', 'nutricioninfantil'],
    fuertes: ['desnutricion', 'nutricion', 'nutricional', 'entrega de mercado',
              'peso y talla', 'seguridad alimentaria'],
    claves:  ['nino', 'infantil', 'alimento', 'merienda', 'hambre', 'comedor', 'mercado']
  },
  {
    num: '08',
    etiqueta: 'Adulto mayor',
    titulo: 'Cuidado del adulto mayor',
    etiquetas: ['adultomayor', 'terceraedad'],
    fuertes: ['adulto mayor', 'adultos mayores', 'tercera edad', 'abuelo', 'abuela',
              'anciano'],
    claves:  ['mayores', 'envejec']
  },
  {
    num: '09',
    etiqueta: 'Deporte',
    titulo: 'Deporte',
    etiquetas: ['deporte', 'deportivo'],
    fuertes: ['deporte', 'deportiv', 'futbol', 'baloncesto', 'voleibol', 'atletismo',
              'torneo', 'campeonato', 'ciclismo'],
    claves:  ['cancha', 'partido', 'entrenamiento', 'jugad']
  },
  {
    num: '10',
    etiqueta: 'Educación sexual',
    titulo: 'Educación sexual y reproductiva',
    etiquetas: ['educacionsexual', 'saludsexual'],
    fuertes: ['educacion sexual', 'salud sexual', 'reproductiv', 'planificacion familiar',
              'anticoncep', 'embarazo adolescente', 'infecciones de transmision', 'vih'],
    claves:  ['sexualidad', 'preservativo', 'condon', 'embarazo']
  },
  {
    num: '11',
    etiqueta: 'Tamizajes',
    titulo: 'Tamizajes de cáncer de mama, cérvix y próstata',
    etiquetas: ['tamizaje', 'deteccciontemprana'],
    fuertes: ['tamizaje', 'cancer', 'citologia', 'mamografia', 'cervix', 'prostata',
              'deteccion temprana', 'autoexamen'],
    claves:  ['examen', 'jornada de salud']
  },
  {
    num: '12',
    etiqueta: 'Vida saludable',
    titulo: 'Hábitos de vida saludable y comportamientos exitosos',
    etiquetas: ['vidasaludable', 'habitossaludables'],
    fuertes: ['vida saludable', 'habitos saludables', 'habitos de vida',
              'comportamientos exitosos', 'autocuidado', 'alimentacion saludable'],
    claves:  ['habito', 'ejercicio', 'caminata', 'rutina']
  }
];

/* Minúscula, sin tildes y con los espacios parejos: así "Cáncer" y "cancer"
   se comparan igual y las listas de arriba se pueden escribir sin acentos. */
function normalizarTexto(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function clasificarPost(descripcion) {
  const texto = normalizarTexto(descripcion);
  if (!texto) return EJE_SIN_CLASIFICAR;

  /* 1) Etiqueta por número: #eje5, #eje05, #eje_5 */
  const porNumero = texto.match(/#eje[\s_-]?0?(\d{1,2})\b/);
  if (porNumero) {
    const eje = EJES_GALERIA.find((e) => Number(e.num) === Number(porNumero[1]));
    if (eje) return eje;
  }

  /* 1b) Etiqueta por nombre: #deporte, #adultomayor... */
  for (const eje of EJES_GALERIA) {
    if (eje.etiquetas.some((etiqueta) => texto.includes('#' + etiqueta))) return eje;
  }

  /* 2) Palabras clave, por puntaje */
  let mejor = null;
  let mejorPuntaje = 0;

  for (const eje of EJES_GALERIA) {
    let puntaje = 0;
    for (const palabra of eje.fuertes) if (texto.includes(palabra)) puntaje += 3;
    for (const palabra of eje.claves)  if (texto.includes(palabra)) puntaje += 1;

    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejor = eje;
    }
  }

  /* 3) Nada coincidió */
  return mejor || EJE_SIN_CLASIFICAR;
}
