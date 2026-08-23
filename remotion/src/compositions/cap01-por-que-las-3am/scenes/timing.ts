// Límites de cada escena, en frames absolutos dentro del contenido del episodio
// (ya sin contar el IntroPlaceholder). Calculado contra el audio real de narración.
// Cambiar el timing de UNA escena acá no afecta a las demás.

export const SCENE_TIMING = {
  gancho: { from: 0, durationInFrames: 2517 }, // L01–L08
  desarrollo: { from: 2517, durationInFrames: 16378 }, // L09–L39
  giro: { from: 18895, durationInFrames: 3649 }, // L40–L46
  cierre: { from: 22544, durationInFrames: 2207 }, // L47–L53 + cola de cierre
} as const;

export const EPISODE_DURATION_IN_FRAMES =
  SCENE_TIMING.cierre.from + SCENE_TIMING.cierre.durationInFrames;
