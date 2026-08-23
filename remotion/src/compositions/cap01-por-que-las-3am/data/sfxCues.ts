// Marcas de SFX/música del guion (ver tabla completa en guion.md, sección 2).
// frame/durationInFrames calculados contra el audio real de narración
// (remotion/public/cap01-por-que-las-3am/audio/narracion.mp3, placeholder espeak-ng).

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
  /** ruta bajo public/cap01-por-que-las-3am/sfx/ */
  file: string;
  note: string;
  durationInFrames: number;
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
    frame: 89,
    type: 'breathing',
    file: 'breathing-slow-loop.wav',
    note: 'Respiración lenta y baja bajo la voz, continúa hasta el final de L05.',
    durationInFrames: 1318,
  },
  {
    id: 'sfx-03',
    lineId: 'L04',
    frame: 830,
    type: 'clockTick',
    file: 'clock-tick-tenue-loop.wav',
    note: 'Tic-tac tenue de fondo, se mantiene hasta el final de L08.',
    durationInFrames: 1642,
  },
  {
    id: 'sfx-04',
    lineId: 'L06',
    frame: 1416,
    type: 'staticBurst',
    file: 'static-burst-short.wav',
    note: 'Estática breve (0.3s) en "la hora bruja". Textura, no golpe.',
    durationInFrames: 9,
  },
  {
    id: 'sfx-05',
    lineId: 'L08',
    frame: 2472,
    type: 'stinger',
    file: 'stinger-capitulo-uno.wav',
    note: 'Golpe seco/stinger corto justo al cerrar "Capítulo uno".',
    durationInFrames: 36,
  },
  {
    id: 'sfx-06',
    lineId: 'L08',
    frame: 2472,
    type: 'dramaticSilence',
    file: 'silence.wav',
    note: 'Silencio dramático inmediatamente después del stinger, antes de L09.',
    durationInFrames: 45,
  },
  {
    id: 'sfx-07',
    lineId: 'L12',
    frame: 3667,
    type: 'bell',
    file: 'monastery-bell-single.wav',
    note: 'Una sola campanada de monasterio, distante. Marca el salto temporal.',
    durationInFrames: 90,
  },
  {
    id: 'sfx-08',
    lineId: 'L18',
    frame: 7093,
    type: 'pageTexture',
    file: 'page-turn-quill.wav',
    note: 'Textura breve de página vieja/pluma. Marca el giro literario (Shakespeare).',
    durationInFrames: 18,
  },
  {
    id: 'sfx-09',
    lineId: 'L21',
    frame: 9093,
    type: 'musicDip',
    file: 'static-burst-short.wav',
    note: 'Estática breve + la música ambiente baja de volumen (tensión).',
    durationInFrames: 9,
  },
  {
    id: 'sfx-10',
    lineId: 'L23',
    frame: 10038,
    type: 'softHit',
    file: 'soft-hit.wav',
    note: 'Golpe seco leve al mencionar "2013"/la película. Acento, no susto.',
    durationInFrames: 12,
  },
  {
    id: 'sfx-11',
    lineId: 'L28',
    frame: 12482,
    type: 'heartbeat',
    file: 'heartbeat-slow-loop.wav',
    note: 'Corazón latiendo, lento y muy bajo. Crece hasta el final de L32.',
    durationInFrames: 2411,
  },
  {
    id: 'sfx-12',
    lineId: 'L32',
    frame: 14893,
    type: 'dramaticSilence',
    file: 'silence.wav',
    note: 'Silencio dramático justo después de "aunque no haya nadie". Corte total de música y corazón.',
    durationInFrames: 30,
  },
  {
    id: 'sfx-13',
    lineId: 'L37',
    frame: 16777,
    type: 'gong',
    file: 'suzu-gong-sutil.wav',
    note: 'Textura sonora distinta (gong/campanita japonesa). No repetir la campana monástica.',
    durationInFrames: 90,
  },
  {
    id: 'sfx-14',
    lineId: 'L40',
    frame: 18895,
    type: 'heartbeat',
    file: 'heartbeat-fast-loop.wav',
    note: 'El corazón vuelve a entrar, ligeramente más rápido que en L28. Tensión ascendente hasta L43.',
    durationInFrames: 2377,
  },
  {
    id: 'sfx-15',
    lineId: 'L43',
    frame: 21272,
    type: 'hardHit',
    file: 'hard-hit.wav',
    note: 'Golpe seco fuerte en "Otra vez". El momento más fuerte del episodio.',
    durationInFrames: 15,
  },
  {
    id: 'sfx-16',
    lineId: 'L43',
    frame: 21272,
    type: 'dramaticSilence',
    file: 'silence.wav',
    note: 'Corte total a silencio inmediatamente después del golpe.',
    durationInFrames: 30,
  },
  {
    id: 'sfx-17',
    lineId: 'L45',
    frame: 21764,
    type: 'staticBurst',
    file: 'static-burst-short.wav',
    note: 'Estática breve al decir "el que estás viendo ahora mismo". Ruptura de cuarta pared, sutil.',
    durationInFrames: 9,
  },
  {
    id: 'sfx-18',
    lineId: 'L49',
    frame: 23210,
    type: 'breathing',
    file: 'breathing-return-fade.wav',
    note: 'La respiración vuelve y se atenúa gradualmente hacia el cierre.',
    durationInFrames: 1541,
  },
  {
    id: 'sfx-19',
    lineId: 'L52',
    frame: 24389,
    type: 'silence',
    file: 'silence.wav',
    note: 'Silencio antes de la frase de cierre.',
    durationInFrames: 20,
  },
  {
    id: 'sfx-20',
    lineId: 'L53',
    frame: 24409,
    type: 'themeIn',
    file: 'theme-cierre-canal.wav',
    note: 'Entra el stinger/tema de cierre del canal, sube en los últimos segundos.',
    durationInFrames: 180,
  },
];
