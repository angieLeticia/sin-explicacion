// Mapeo 1:1 entre tramos del guion y recursos visuales (ver guion.md, sección 4).
// startFrame/endFrame calculados contra el audio real de narración (ver subtitles.ts).
// `file` es un nombre esperado bajo public/cap01-por-que-las-3am/broll/ -- no existen todavía,
// hay que buscarlos con las queries de `searchQueries` y colocarlos con ese nombre.
// `remove` marca los tramos de "edición por remoción" (guion.md, sección 6).

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
    endFrame: 821,
    searchQueries: ['smartphone screen 3:00 AM macro photo', 'empty bedroom window moonlight photo'],
    remove: true,
    note: 'Edición por remoción: pantalla casi negra o un solo plano fijo muy oscuro, sin cortes.',
  },
  {
    id: 'broll-monasterio',
    fromLineId: 'L11',
    toLineId: 'L20',
    startFrame: 3490,
    endFrame: 9084,
    searchQueries: ['Benedictine monastery night illuminated manuscript', 'medieval Book of Hours nocturnal prayer illustration', 'Rule of Saint Benedict manuscript page', 'monastery bell tower silhouette night engraving', 'medieval candle scriptorium archive photo', 'Shakespeare First Folio Hamlet 1623 page witching hour'],
  },
  {
    id: 'broll-demonologia',
    fromLineId: 'L21',
    toLineId: 'L25',
    startFrame: 9093,
    endFrame: 11822,
    searchQueries: ['1970s demonology archive photograph', 'vintage exorcism case file document 1970s', 'gothic church door night black and white photo'],
    note: 'Evitar imágenes con derechos de la película puntual; buscar material de época genérico.',
  },
  {
    id: 'broll-ciencia-sueno',
    fromLineId: 'L26',
    toLineId: 'L35',
    startFrame: 11831,
    endFrame: 16506,
    searchQueries: ['vintage EEG polysomnography lab photo archive', 'sleep paralysis old hag folklore illustration 19th century', 'Henry Fuseli The Nightmare painting 1781', 'antique alarm clock macro photo 1900s'],
    note: 'El gráfico de cortisol/ritmo circadiano se genera propio (ver ChapterTitle/gráfico en vez de stock).',
  },
  {
    id: 'broll-japon',
    fromLineId: 'L36',
    toLineId: 'L39',
    startFrame: 16515,
    endFrame: 18886,
    searchQueries: ['Toriyama Sekien yokai woodblock print public domain', 'Edo period night yokai parade ukiyo-e', 'Shinto shrine torii gate night photo', 'wara ningyo straw doll folklore archive photo'],
  },
  {
    id: 'broll-giro-meta',
    fromLineId: 'L40',
    toLineId: 'L46',
    startFrame: 18895,
    endFrame: 22535,
    searchQueries: ['smartphone screen 3:00 AM macro photo', 'server room blue light photo', 'crowd of phone screens at night photo'],
  },
  {
    id: 'broll-cierre',
    fromLineId: 'L47',
    toLineId: 'L53',
    startFrame: 22544,
    endFrame: 24751,
    searchQueries: ['empty bedroom window moonlight photo', 'digital clock 2:47 AM close up'],
    remove: true,
    note: 'Edición por remoción: volver al plano del gancho, bajando intensidad hacia el cierre.',
  },
];
