// Referencia al audio de narración generado con ElevenLabs.
// El archivo todavía no existe en el repo — colocarlo en public/cap01-por-que-las-3am/audio/
// con este nombre exacto, o actualizar `file` acá.
//
// durationInFramesPlaceholder está calculado sobre el guion (1.614 palabras a 145 ppm = 11:07,
// sin pausas dramáticas). El total real con SFX/pausas ronda 12:30-13:30 (ver guion.md).
// UNA VEZ QUE EXISTA el mp3 real: correr `ffprobe -i narracion.mp3` (o el helper de
// @remotion/media-utils) y reemplazar este valor y los frames de subtitles.ts/sfxCues.ts
// contra el timing real del audio — el TTS casi nunca coincide 1:1 con el cálculo por palabras.

export const narration = {
  file: 'narracion.mp3',
  fps: 30,
  durationInFramesPlaceholder: 30 * 60 * 13, // 13:00 min como placeholder de trabajo
  wordCount: 1614,
  estimatedReadTime: '11:07–11:31 (sin pausas)',
};
