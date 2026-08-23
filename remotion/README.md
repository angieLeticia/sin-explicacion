# remotion/ — Sin Explicación

Proyecto Remotion (React + TypeScript) del canal. Un episodio por carpeta bajo `src/compositions/<episodio>/`, con `theme.ts` y `fonts.ts` compartidos en `src/` para mantener look consistente entre capítulos.

## Uso

```bash
cd remotion
npm install
npm run start     # abre Remotion Studio para previsualizar/editar timing
npm run render -- cap01-por-que-las-3am out/cap01-por-que-las-3am.mp4
```

## Antes de poder renderizar el Capítulo 01

Este scaffold define toda la estructura (escenas, subtítulos, cues de SFX y B-roll) pero **no incluye assets** — hay que agregarlos primero:

1. **Audio de narración:** generar con ElevenLabs (ver `content/videos/cap01-por-que-las-3am/guion/guion.md`, sección 3) y guardarlo en `public/cap01-por-que-las-3am/audio/narracion.mp3`.
2. **Reajustar el timing:** `src/compositions/cap01-por-que-las-3am/data/subtitles.ts`, `sfxCues.ts` y `brollCues.ts` tienen frames calculados por conteo de palabras (145 ppm), NO por el audio real. Una vez que exista `narracion.mp3`, correr `ffprobe` (o `@remotion/media-utils`) para sacar la duración real y ajustar los frames a mano contra ese audio.
3. **B-roll:** buscar los recursos con las queries de cada cue en `brollCues.ts` (o de la sección 4 del guion) y guardarlos en `public/cap01-por-que-las-3am/broll/` con el nombre que le pongas en el campo `file` de cada cue. Hasta entonces, `BRollSequence` muestra un placeholder con la query sugerida.
4. **SFX:** conseguir/grabar los efectos de `sfxCues.ts` (respiración, tic-tac, estática, golpes secos, corazón latiendo, campana, gong) y guardarlos en `public/cap01-por-que-las-3am/sfx/` con los nombres de archivo indicados en cada cue.
5. **Intro:** `IntroPlaceholder` reserva 3s (90 frames) al principio — la intro real se edita aparte y se pega en el master final, no acá.

## Agregar un episodio nuevo

1. Crear `src/compositions/<slug-del-episodio>/` siguiendo la misma estructura que `cap01-por-que-las-3am/` (`Composition.tsx`, `index.tsx`, `data/`, `scenes/`, `components/` si necesita alguno propio — reusar los de `cap01` cuando sea posible, sobre todo `GrainOverlay`).
2. Registrar la nueva composición en `src/Root.tsx`.
3. Reusar `src/theme.ts` y `src/fonts.ts` sin modificarlos, salvo que el canal decida cambiar de identidad visual para todos los episodios a la vez.
