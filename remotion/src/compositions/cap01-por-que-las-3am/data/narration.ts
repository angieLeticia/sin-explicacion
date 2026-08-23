// Referencia al audio de narración. GENERADO con espeak-ng (placeholder offline):
// la API de ElevenLabs está bloqueada por la política de red de este sandbox
// (ver remotion/README.md). Reemplazar narracion.mp3 por el audio real de
// ElevenLabs y volver a correr scripts/regen_ts.py (o regenerar a mano) para
// resincronizar subtitles.ts/sfxCues.ts/brollCues.ts/scenes/timing.ts contra
// el nuevo timing.

export const narration = {
  file: 'narracion.mp3',
  fps: 30,
  durationInFrames: 24751,
  durationSeconds: 825.026,
  wordCount: 1614,
  engine: 'espeak-ng (es-419) -- PLACEHOLDER, no es la voz final del canal',
};
