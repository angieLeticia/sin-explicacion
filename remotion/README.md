# remotion/ — Sin Explicación

Proyecto Remotion (React + TypeScript) del canal. Un episodio por carpeta bajo `src/compositions/<episodio>/`, con `theme.ts` y `fonts.ts` compartidos en `src/` para mantener look consistente entre capítulos.

## Uso

```bash
cd remotion
npm install
npm run start     # abre Remotion Studio para previsualizar/editar timing
npm run render -- cap01-por-que-las-3am out/cap01-por-que-las-3am.mp4
```

## Estado actual del Capítulo 01 (placeholder generado en esta sesión)

`api.elevenlabs.io` está bloqueado por la política de red del sandbox donde se armó
este proyecto (403 en el proxy de salida — no es un problema de la key). Para poder
mostrar un resultado real de todas formas, se generó todo lo que SÍ se podía generar
sin red externa:

- **`public/cap01-por-que-las-3am/audio/narracion.mp3`** — narración completa sintetizada
  con **espeak-ng** (voz `es-419`, offline). Es un placeholder robótico, NO la voz final
  del canal. Pronuncia mal algunos términos extranjeros/técnicos (ushi mitsu doki, yōkai).
- **`public/cap01-por-que-las-3am/sfx/*.wav`** — los 14 efectos de `sfxCues.ts` generados
  100% procedimentalmente con ffmpeg (osciladores + ruido filtrado): respiración, tic-tac,
  estática, golpes, corazón latiendo, campana, gong, tema de cierre. No son grabaciones
  reales, pero sí son SFX reales (no silencio ni placeholder mudo).
- **`data/subtitles.ts`, `sfxCues.ts`, `brollCues.ts`, `scenes/timing.ts`, `data/narration.ts`,
  `scenes/Desarrollo.tsx`, `scenes/Cierre.tsx`** — TODOS los frames están calculados contra
  la duración REAL de `narracion.mp3` (no contra el conteo de palabras a 145 ppm original).
- **B-roll** — sigue sin existir. `api.elevenlabs.io`, Wikimedia Commons y Freesound están
  todos bloqueados por la misma política de red, así que no se pudo bajar ni una imagen de
  archivo real. `BRollSequence` muestra un placeholder con la query sugerida en cada tramo.

### Para reemplazar el placeholder por el audio real de ElevenLabs

1. Generar `narracion.mp3` con ElevenLabs (ver guion.md sección 3) fuera de este sandbox,
   o en un entorno cuya política de red permita `api.elevenlabs.io`.
2. Reemplazar `public/cap01-por-que-las-3am/audio/narracion.mp3` por ese archivo.
3. Resincronizar el timing: `scripts/regen_timing_from_audio.py` (y `build_narration_placeholder.py`,
   que muestra cómo se armó la línea de tiempo línea por línea) son el snapshot de cómo se generaron
   estos datos en esta sesión — no son un CLI generalizado, pero documentan el enfoque:
   sintetizar/medir cada línea del guion por separado, sumar los gaps de pausas dramáticas de la
   tabla de SFX, y de ahí derivar los frames de subtítulos/cues/escenas. Si ElevenLabs devuelve
   timestamps por palabra (lo hace, vía su API), es más preciso adaptar ese enfoque a esos
   timestamps en vez de recrear esta síntesis línea por línea.
4. **B-roll:** buscar los recursos con las queries de cada cue en `brollCues.ts` (o de la sección 4
   del guion) y guardarlos en `public/cap01-por-que-las-3am/broll/` con el nombre que le pongas en
   el campo `file` de cada cue.
5. **Intro:** `IntroPlaceholder` reserva 3s (90 frames) al principio — la intro real se edita
   aparte y se pega en el master final, no acá.

### Renderizar en un sandbox sin acceso a internet para descargar Chromium

Si `remotion render`/`remotion studio` intentan descargar su propio Chromium headless y la red
lo bloquea, apuntá `REMOTION_BROWSER_EXECUTABLE` a un Chromium ya instalado en el sistema
(`remotion.config.ts` ya lo lee de esa variable de entorno). Si además el proxy de salida
re-firma TLS con una CA propia que Chromium no confía (fonts de Google fallan con
`ERR_CERT_AUTHORITY_INVALID`), setear `REMOTION_IGNORE_CERT_ERRORS=1` (también leído en
`remotion.config.ts`) — solo pensado para este tipo de sandbox de desarrollo, no para producción.

## Agregar un episodio nuevo

1. Crear `src/compositions/<slug-del-episodio>/` siguiendo la misma estructura que `cap01-por-que-las-3am/` (`Composition.tsx`, `index.tsx`, `data/`, `scenes/`, `components/` si necesita alguno propio — reusar los de `cap01` cuando sea posible, sobre todo `GrainOverlay`).
2. Registrar la nueva composición en `src/Root.tsx`.
3. Reusar `src/theme.ts` y `src/fonts.ts` sin modificarlos, salvo que el canal decida cambiar de identidad visual para todos los episodios a la vez.
