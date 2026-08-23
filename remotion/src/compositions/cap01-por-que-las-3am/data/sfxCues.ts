// Marcas de SFX/música del guion (ver tabla completa en guion.md, sección 2).
// frame = timestamp aproximado a 30fps sobre el timing placeholder de subtitles.ts.
// Reajustar frame contra el audio final de ElevenLabs antes de renderizar.

export type SfxType =
  | 'silence'
  | 'roomtone'
  | 'breathing'
  | 'clockTick'
  | 'staticBurst'
  | 'stinger'
  | 'dramaticSilence'
  | 'bell'
  | 'pageTexture'
  | 'musicDip'
  | 'softHit'
  | 'heartbeat'
  | 'gong'
  | 'hardHit'
  | 'themeIn';

export type SfxCue = {
  id: string;
  lineId: string;
  frame: number;
  type: SfxType;
  /** ruta esperada bajo public/cap01-por-que-las-3am/sfx/ una vez que existan los archivos reales */
  file: string;
  note: string;
  /** duración del cue en frames, cuando aplica (silencios, cortes) */
  durationInFrames?: number;
};

export const sfxCues: SfxCue[] = [
  {
    id: 'sfx-01',
    lineId: 'L01',
    frame: 0,
    type: 'silence',
    file: 'silence-intro.wav',
    note: 'Silencio total 0.5s, luego ruido de habitación muy sutil.',
    durationInFrames: 15,
  },
  {
    id: 'sfx-02',
    lineId: 'L02',
    frame: 60,
    type: 'breathing',
    file: 'breathing-slow-loop.wav',
    note: 'Respiración lenta y baja bajo la voz, continúa hasta L05 (~frame 810).',
  },
  {
    id: 'sfx-03',
    lineId: 'L04',
    frame: 630,
    type: 'clockTick',
    file: 'clock-tick-tenue-loop.wav',
    note: 'Tic-tac tenue de fondo, se mantiene hasta L08 (~frame 1740).',
  },
  {
    id: 'sfx-04',
    lineId: 'L06',
    frame: 1050,
    type: 'staticBurst',
    file: 'static-burst-short.wav',
    note: 'Estática breve (0.3s) en "la hora bruja". Textura, no golpe.',
    durationInFrames: 9,
  },
  {
    id: 'sfx-05',
    lineId: 'L08',
    frame: 1740,
    type: 'stinger',
    file: 'stinger-capitulo-uno.wav',
    note: 'Golpe seco/stinger corto en "Capítulo uno".',
  },
  {
    id: 'sfx-06',
    lineId: 'L08',
    frame: 1785,
    type: 'dramaticSilence',
    file: 'silence.wav',
    note: 'Silencio dramático de 1.5s inmediatamente después del stinger, antes de L09.',
    durationInFrames: 45,
  },
  {
    id: 'sfx-07',
    lineId: 'L12',
    frame: 2820,
    type: 'bell',
    file: 'monastery-bell-single.wav',
    note: 'Una sola campanada de monasterio, distante. Marca el salto temporal.',
  },
  {
    id: 'sfx-08',
    lineId: 'L18',
    frame: 5580,
    type: 'pageTexture',
    file: 'page-turn-quill.wav',
    note: 'Textura breve de página vieja/pluma. Marca el giro literario (Shakespeare).',
  },
  {
    id: 'sfx-09',
    lineId: 'L21',
    frame: 7260,
    type: 'musicDip',
    file: 'static-burst-short.wav',
    note: 'Estática breve + la música ambiente baja de volumen (tensión).',
  },
  {
    id: 'sfx-10',
    lineId: 'L23',
    frame: 8070,
    type: 'softHit',
    file: 'soft-hit.wav',
    note: 'Golpe seco leve al mencionar "2013"/la película. Acento, no susto.',
  },
  {
    id: 'sfx-11',
    lineId: 'L28',
    frame: 10050,
    type: 'heartbeat',
    file: 'heartbeat-slow-loop.wav',
    note: 'Corazón latiendo, lento y muy bajo. Crece de forma casi imperceptible hasta L32.',
  },
  {
    id: 'sfx-12',
    lineId: 'L32',
    frame: 11970,
    type: 'dramaticSilence',
    file: 'silence.wav',
    note: 'Silencio dramático (1s) justo después de "aunque no haya nadie". Corte total de música y corazón.',
    durationInFrames: 30,
  },
  {
    id: 'sfx-13',
    lineId: 'L37',
    frame: 13590,
    type: 'gong',
    file: 'suzu-gong-sutil.wav',
    note: 'Textura sonora distinta (gong/campanita japonesa). No repetir la campana monástica.',
  },
  {
    id: 'sfx-14',
    lineId: 'L40',
    frame: 15390,
    type: 'heartbeat',
    file: 'heartbeat-fast-loop.wav',
    note: 'El corazón vuelve a entrar, ligeramente más rápido que en L28. Tensión ascendente.',
  },
  {
    id: 'sfx-15',
    lineId: 'L43',
    frame: 16770,
    type: 'hardHit',
    file: 'hard-hit.wav',
    note: 'Golpe seco fuerte en "Otra vez". El momento más fuerte del episodio.',
  },
  {
    id: 'sfx-16',
    lineId: 'L43',
    frame: 16800,
    type: 'dramaticSilence',
    file: 'silence.wav',
    note: 'Corte total a silencio (1s) inmediatamente después del golpe.',
    durationInFrames: 30,
  },
  {
    id: 'sfx-17',
    lineId: 'L45',
    frame: 17700,
    type: 'staticBurst',
    file: 'static-burst-short.wav',
    note: 'Estática breve al decir "el que estás viendo ahora mismo". Ruptura de cuarta pared, sutil.',
    durationInFrames: 9,
  },
  {
    id: 'sfx-18',
    lineId: 'L49',
    frame: 18840,
    type: 'breathing',
    file: 'breathing-slow-loop.wav',
    note: 'La respiración vuelve y se atenúa gradualmente hacia el cierre.',
  },
  {
    id: 'sfx-19',
    lineId: 'L52',
    frame: 19770,
    type: 'silence',
    file: 'silence.wav',
    note: 'Silencio antes de la frase de cierre.',
    durationInFrames: 20,
  },
  {
    id: 'sfx-20',
    lineId: 'L53',
    frame: 19860,
    type: 'themeIn',
    file: 'theme-cierre-canal.wav',
    note: 'Entra el stinger/tema de cierre del canal, sube en los últimos 2s tras terminar de hablar.',
  },
];
