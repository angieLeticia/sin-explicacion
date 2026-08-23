// Límites de cada escena, en frames absolutos dentro del contenido del episodio
// (es decir, ya sin contar el IntroPlaceholder). Fuente: guion.md + subtitles.ts.
// Cambiar el timing de UNA escena acá no afecta a las demás — cada una es un
// Sequence independiente en Composition.tsx.

export const SCENE_TIMING = {
  gancho: { from: 0, durationInFrames: 1980 }, // L01–L08, 00:00–00:58 (+dramatic silence)
  desarrollo: { from: 1980, durationInFrames: 13410 }, // L09–L39, 00:58–08:33
  giro: { from: 15390, durationInFrames: 3000 }, // L40–L46, 08:33–10:13
  cierre: { from: 18390, durationInFrames: 1620 }, // L47–L53, 10:13–11:07
} as const;

export const EPISODE_DURATION_IN_FRAMES =
  SCENE_TIMING.cierre.from + SCENE_TIMING.cierre.durationInFrames;
