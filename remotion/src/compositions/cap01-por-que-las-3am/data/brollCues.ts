// Mapeo 1:1 entre tramos del guion y recursos visuales (ver guion.md, sección 4).
// `file` es un nombre esperado bajo public/cap01-por-que-las-3am/broll/ — no existen todavía,
// hay que buscarlos con las queries de `searchQueries` y colocarlos con ese nombre antes de renderizar.
// `remove` marca los tramos de "edición por remoción" (ver guion.md, sección 6): en esos tramos
// NO se agrega B-roll nuevo, se sostiene el plano anterior o se corta a negro/opacidad baja.

export type BRollCue = {
  id: string;
  fromLineId: string;
  toLineId: string;
  startFrame: number;
  endFrame: number;
  searchQueries: string[];
  file?: string;
  remove?: boolean;
  note?: string;
};

export const brollCues: BRollCue[] = [
  {
    id: 'broll-gancho',
    fromLineId: 'L01',
    toLineId: 'L03',
    startFrame: 0,
    endFrame: 630,
    searchQueries: ['smartphone screen 3:00 AM macro photo', 'empty bedroom window moonlight photo'],
    remove: true,
    note: 'Edición por remoción: pantalla casi negra o un solo plano fijo muy oscuro, sin cortes.',
  },
  {
    id: 'broll-monasterio',
    fromLineId: 'L11',
    toLineId: 'L20',
    startFrame: 2670,
    endFrame: 4020,
    searchQueries: [
      'Benedictine monastery night illuminated manuscript',
      'medieval Book of Hours nocturnal prayer illustration',
      'Rule of Saint Benedict manuscript page',
      'monastery bell tower silhouette night engraving',
      'medieval candle scriptorium archive photo',
      'Shakespeare First Folio Hamlet 1623 page witching hour',
    ],
  },
  {
    id: 'broll-demonologia',
    fromLineId: 'L21',
    toLineId: 'L25',
    startFrame: 7260,
    endFrame: 9210,
    searchQueries: [
      '1970s demonology archive photograph',
      'vintage exorcism case file document 1970s',
      'gothic church door night black and white photo',
    ],
    note: 'Evitar imágenes con derechos de la película puntual; buscar material de época genérico.',
  },
  {
    id: 'broll-ciencia-sueno',
    fromLineId: 'L26',
    toLineId: 'L35',
    startFrame: 9540,
    endFrame: 11970,
    searchQueries: [
      'vintage EEG polysomnography lab photo archive',
      'sleep paralysis old hag folklore illustration 19th century',
      'Henry Fuseli The Nightmare painting 1781',
      'antique alarm clock macro photo 1900s',
    ],
    note: 'El gráfico de cortisol/ritmo circadiano se genera propio (ver ChapterTitle/gráfico en vez de stock).',
  },
  {
    id: 'broll-japon',
    fromLineId: 'L36',
    toLineId: 'L39',
    startFrame: 13290,
    endFrame: 14400,
    searchQueries: [
      'Toriyama Sekien yokai woodblock print public domain',
      'Edo period night yokai parade ukiyo-e',
      'Shinto shrine torii gate night photo',
      'wara ningyo straw doll folklore archive photo',
    ],
  },
  {
    id: 'broll-giro-meta',
    fromLineId: 'L40',
    toLineId: 'L46',
    startFrame: 15390,
    endFrame: 18390,
    searchQueries: [
      'smartphone screen 3:00 AM macro photo',
      'server room blue light photo',
      'crowd of phone screens at night photo',
    ],
  },
  {
    id: 'broll-cierre',
    fromLineId: 'L47',
    toLineId: 'L53',
    startFrame: 18390,
    endFrame: 20010,
    searchQueries: ['empty bedroom window moonlight photo', 'digital clock 2:47 AM close up'],
    remove: true,
    note: 'Edición por remoción: volver al plano del gancho, bajando intensidad hacia el cierre.',
  },
];
