#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json

COMP = "/home/user/sin-explicacion/remotion/src/compositions/cap01-por-que-las-3am"
SCRATCH = "/tmp/claude-0/-home-user-sin-explicacion/e85db1ad-0e1f-55b3-b6a9-07fc228e1a0a/scratchpad"

lines = json.load(open(f"{SCRATCH}/lines_final.json"))
real = json.load(open(f"{SCRATCH}/real_frames.json"))
F = {k: tuple(v) for k, v in real["frames"].items()}  # id -> (start, end)
TOTAL = real["episodeTotalFrames"]

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

# ---------- subtitles.ts ----------
out = []
out.append("// Generado a partir del audio real (espeak-ng placeholder, ver remotion/README.md).")
out.append("// Reemplazar por el timing del audio final de ElevenLabs cuando exista.")
out.append("export type Subtitle = {")
out.append("  id: string;")
out.append("  section: 'GANCHO' | 'DESARROLLO' | 'GIRO' | 'CIERRE';")
out.append("  text: string;")
out.append("  startFrame: number;")
out.append("  endFrame: number;")
out.append("};")
out.append("")
out.append("export const subtitles: Subtitle[] = [")
for d in lines:
    s, e = F[d["id"]]
    out.append("  {")
    out.append(f"    id: '{d['id']}',")
    out.append(f"    section: '{d['section']}',")
    out.append(f"    text: '{esc(d['text'])}',")
    out.append(f"    startFrame: {s},")
    out.append(f"    endFrame: {e},")
    out.append("  },")
out.append("];")
out.append("")
open(f"{COMP}/data/subtitles.ts", "w", encoding="utf-8").write("\n".join(out))
print("wrote subtitles.ts")

# ---------- sfxCues.ts ----------
def start(lid): return F[lid][0]
def end(lid): return F[lid][1]

cues = [
    dict(id='sfx-01', lineId='L01', frame=start('L01'), type='silence', file='silence-intro.wav',
         note='Silencio total 0.5s, luego ruido de habitación muy sutil.', dur=15),
    dict(id='sfx-02', lineId='L02', frame=start('L02'), type='breathing', file='breathing-slow-loop.wav',
         note='Respiración lenta y baja bajo la voz, continúa hasta el final de L05.', dur=end('L05') - start('L02')),
    dict(id='sfx-03', lineId='L04', frame=start('L04'), type='clockTick', file='clock-tick-tenue-loop.wav',
         note='Tic-tac tenue de fondo, se mantiene hasta el final de L08.', dur=end('L08') - start('L04')),
    dict(id='sfx-04', lineId='L06', frame=start('L06'), type='staticBurst', file='static-burst-short.wav',
         note='Estática breve (0.3s) en "la hora bruja". Textura, no golpe.', dur=9),
    dict(id='sfx-05', lineId='L08', frame=end('L08'), type='stinger', file='stinger-capitulo-uno.wav',
         note='Golpe seco/stinger corto justo al cerrar "Capítulo uno".', dur=36),
    dict(id='sfx-06', lineId='L08', frame=end('L08'), type='dramaticSilence', file='silence.wav',
         note='Silencio dramático inmediatamente después del stinger, antes de L09.', dur=start('L09') - end('L08')),
    dict(id='sfx-07', lineId='L12', frame=start('L12'), type='bell', file='monastery-bell-single.wav',
         note='Una sola campanada de monasterio, distante. Marca el salto temporal.', dur=90),
    dict(id='sfx-08', lineId='L18', frame=start('L18'), type='pageTexture', file='page-turn-quill.wav',
         note='Textura breve de página vieja/pluma. Marca el giro literario (Shakespeare).', dur=18),
    dict(id='sfx-09', lineId='L21', frame=start('L21'), type='musicDip', file='static-burst-short.wav',
         note='Estática breve + la música ambiente baja de volumen (tensión).', dur=9),
    dict(id='sfx-10', lineId='L23', frame=start('L23'), type='softHit', file='soft-hit.wav',
         note='Golpe seco leve al mencionar "2013"/la película. Acento, no susto.', dur=12),
    dict(id='sfx-11', lineId='L28', frame=start('L28'), type='heartbeat', file='heartbeat-slow-loop.wav',
         note='Corazón latiendo, lento y muy bajo. Crece hasta el final de L32.', dur=end('L32') - start('L28')),
    dict(id='sfx-12', lineId='L32', frame=end('L32'), type='dramaticSilence', file='silence.wav',
         note='Silencio dramático justo después de "aunque no haya nadie". Corte total de música y corazón.',
         dur=start('L33') - end('L32')),
    dict(id='sfx-13', lineId='L37', frame=start('L37'), type='gong', file='suzu-gong-sutil.wav',
         note='Textura sonora distinta (gong/campanita japonesa). No repetir la campana monástica.', dur=90),
    dict(id='sfx-14', lineId='L40', frame=start('L40'), type='heartbeat', file='heartbeat-fast-loop.wav',
         note='El corazón vuelve a entrar, ligeramente más rápido que en L28. Tensión ascendente hasta L43.',
         dur=end('L43') - start('L40')),
    dict(id='sfx-15', lineId='L43', frame=end('L43'), type='hardHit', file='hard-hit.wav',
         note='Golpe seco fuerte en "Otra vez". El momento más fuerte del episodio.', dur=15),
    dict(id='sfx-16', lineId='L43', frame=end('L43'), type='dramaticSilence', file='silence.wav',
         note='Corte total a silencio inmediatamente después del golpe.', dur=start('L44') - end('L43')),
    dict(id='sfx-17', lineId='L45', frame=start('L45'), type='staticBurst', file='static-burst-short.wav',
         note='Estática breve al decir "el que estás viendo ahora mismo". Ruptura de cuarta pared, sutil.', dur=9),
    dict(id='sfx-18', lineId='L49', frame=start('L49'), type='breathing', file='breathing-return-fade.wav',
         note='La respiración vuelve y se atenúa gradualmente hacia el cierre.', dur=TOTAL - start('L49')),
    dict(id='sfx-19', lineId='L52', frame=end('L52'), type='silence', file='silence.wav',
         note='Silencio antes de la frase de cierre.', dur=start('L53') - end('L52')),
    dict(id='sfx-20', lineId='L53', frame=start('L53'), type='themeIn', file='theme-cierre-canal.wav',
         note='Entra el stinger/tema de cierre del canal, sube en los últimos segundos.', dur=180),
]

out = []
out.append("// Marcas de SFX/música del guion (ver tabla completa en guion.md, sección 2).")
out.append("// frame/durationInFrames calculados contra el audio real de narración")
out.append("// (remotion/public/cap01-por-que-las-3am/audio/narracion.mp3, placeholder espeak-ng).")
out.append("")
out.append("export type SfxType =")
out.append("  | 'silence'")
out.append("  | 'roomtone'")
out.append("  | 'breathing'")
out.append("  | 'clockTick'")
out.append("  | 'staticBurst'")
out.append("  | 'stinger'")
out.append("  | 'dramaticSilence'")
out.append("  | 'bell'")
out.append("  | 'pageTexture'")
out.append("  | 'musicDip'")
out.append("  | 'softHit'")
out.append("  | 'heartbeat'")
out.append("  | 'gong'")
out.append("  | 'hardHit'")
out.append("  | 'themeIn';")
out.append("")
out.append("export type SfxCue = {")
out.append("  id: string;")
out.append("  lineId: string;")
out.append("  frame: number;")
out.append("  type: SfxType;")
out.append("  /** ruta bajo public/cap01-por-que-las-3am/sfx/ */")
out.append("  file: string;")
out.append("  note: string;")
out.append("  durationInFrames: number;")
out.append("};")
out.append("")
out.append("export const sfxCues: SfxCue[] = [")
for c in cues:
    out.append("  {")
    out.append(f"    id: '{c['id']}',")
    out.append(f"    lineId: '{c['lineId']}',")
    out.append(f"    frame: {c['frame']},")
    out.append(f"    type: '{c['type']}',")
    out.append(f"    file: '{c['file']}',")
    out.append(f"    note: '{esc(c['note'])}',")
    out.append(f"    durationInFrames: {c['dur']},")
    out.append("  },")
out.append("];")
out.append("")
open(f"{COMP}/data/sfxCues.ts", "w", encoding="utf-8").write("\n".join(out))
print("wrote sfxCues.ts")

# ---------- brollCues.ts ----------
groups = [
    dict(id='broll-gancho', fromLineId='L01', toLineId='L03',
         queries=['smartphone screen 3:00 AM macro photo', 'empty bedroom window moonlight photo'],
         remove=True, note='Edición por remoción: pantalla casi negra o un solo plano fijo muy oscuro, sin cortes.'),
    dict(id='broll-monasterio', fromLineId='L11', toLineId='L20', queries=[
        'Benedictine monastery night illuminated manuscript',
        'medieval Book of Hours nocturnal prayer illustration',
        'Rule of Saint Benedict manuscript page',
        'monastery bell tower silhouette night engraving',
        'medieval candle scriptorium archive photo',
        'Shakespeare First Folio Hamlet 1623 page witching hour',
    ]),
    dict(id='broll-demonologia', fromLineId='L21', toLineId='L25', queries=[
        '1970s demonology archive photograph',
        'vintage exorcism case file document 1970s',
        'gothic church door night black and white photo',
    ], note='Evitar imágenes con derechos de la película puntual; buscar material de época genérico.'),
    dict(id='broll-ciencia-sueno', fromLineId='L26', toLineId='L35', queries=[
        'vintage EEG polysomnography lab photo archive',
        'sleep paralysis old hag folklore illustration 19th century',
        'Henry Fuseli The Nightmare painting 1781',
        'antique alarm clock macro photo 1900s',
    ], note='El gráfico de cortisol/ritmo circadiano se genera propio (ver ChapterTitle/gráfico en vez de stock).'),
    dict(id='broll-japon', fromLineId='L36', toLineId='L39', queries=[
        'Toriyama Sekien yokai woodblock print public domain',
        'Edo period night yokai parade ukiyo-e',
        'Shinto shrine torii gate night photo',
        'wara ningyo straw doll folklore archive photo',
    ]),
    dict(id='broll-giro-meta', fromLineId='L40', toLineId='L46', queries=[
        'smartphone screen 3:00 AM macro photo',
        'server room blue light photo',
        'crowd of phone screens at night photo',
    ]),
    dict(id='broll-cierre', fromLineId='L47', toLineId='L53', queries=[
        'empty bedroom window moonlight photo', 'digital clock 2:47 AM close up',
    ], remove=True, note='Edición por remoción: volver al plano del gancho, bajando intensidad hacia el cierre.'),
]

out = []
out.append("// Mapeo 1:1 entre tramos del guion y recursos visuales (ver guion.md, sección 4).")
out.append("// startFrame/endFrame calculados contra el audio real de narración (ver subtitles.ts).")
out.append("// `file` es un nombre esperado bajo public/cap01-por-que-las-3am/broll/ -- no existen todavía,")
out.append("// hay que buscarlos con las queries de `searchQueries` y colocarlos con ese nombre.")
out.append("// `remove` marca los tramos de \"edición por remoción\" (guion.md, sección 6).")
out.append("")
out.append("export type BRollCue = {")
out.append("  id: string;")
out.append("  fromLineId: string;")
out.append("  toLineId: string;")
out.append("  startFrame: number;")
out.append("  endFrame: number;")
out.append("  searchQueries: string[];")
out.append("  file?: string;")
out.append("  remove?: boolean;")
out.append("  note?: string;")
out.append("};")
out.append("")
out.append("export const brollCues: BRollCue[] = [")
for g in groups:
    s = start(g['fromLineId']) if g['fromLineId'] != 'L01' else 0
    e = end(g['toLineId']) if g['toLineId'] != 'L53' else TOTAL
    out.append("  {")
    out.append(f"    id: '{g['id']}',")
    out.append(f"    fromLineId: '{g['fromLineId']}',")
    out.append(f"    toLineId: '{g['toLineId']}',")
    out.append(f"    startFrame: {s},")
    out.append(f"    endFrame: {e},")
    qlist = ", ".join(f"'{esc(q)}'" for q in g['queries'])
    out.append(f"    searchQueries: [{qlist}],")
    if g.get('remove'):
        out.append("    remove: true,")
    if g.get('note'):
        out.append(f"    note: '{esc(g['note'])}',")
    out.append("  },")
out.append("];")
out.append("")
open(f"{COMP}/data/brollCues.ts", "w", encoding="utf-8").write("\n".join(out))
print("wrote brollCues.ts")

# ---------- scenes/timing.ts ----------
gancho_from, gancho_dur = 0, start('L09')
desarrollo_from, desarrollo_dur = start('L09'), start('L40') - start('L09')
giro_from, giro_dur = start('L40'), start('L47') - start('L40')
cierre_from, cierre_dur = start('L47'), TOTAL - start('L47')

out = f"""// Límites de cada escena, en frames absolutos dentro del contenido del episodio
// (ya sin contar el IntroPlaceholder). Calculado contra el audio real de narración.
// Cambiar el timing de UNA escena acá no afecta a las demás.

export const SCENE_TIMING = {{
  gancho: {{ from: {gancho_from}, durationInFrames: {gancho_dur} }}, // L01–L08
  desarrollo: {{ from: {desarrollo_from}, durationInFrames: {desarrollo_dur} }}, // L09–L39
  giro: {{ from: {giro_from}, durationInFrames: {giro_dur} }}, // L40–L46
  cierre: {{ from: {cierre_from}, durationInFrames: {cierre_dur} }}, // L47–L53 + cola de cierre
}} as const;

export const EPISODE_DURATION_IN_FRAMES =
  SCENE_TIMING.cierre.from + SCENE_TIMING.cierre.durationInFrames;
"""
open(f"{COMP}/scenes/timing.ts", "w", encoding="utf-8").write(out)
print("wrote scenes/timing.ts")

# ---------- data/narration.ts ----------
out = f"""// Referencia al audio de narración. GENERADO con espeak-ng (placeholder offline):
// la API de ElevenLabs está bloqueada por la política de red de este sandbox
// (ver remotion/README.md). Reemplazar narracion.mp3 por el audio real de
// ElevenLabs y volver a correr scripts/regen_ts.py (o regenerar a mano) para
// resincronizar subtitles.ts/sfxCues.ts/brollCues.ts/scenes/timing.ts contra
// el nuevo timing.

export const narration = {{
  file: 'narracion.mp3',
  fps: 30,
  durationInFrames: {TOTAL},
  durationSeconds: {real['narracionDurationSeconds']:.3f},
  wordCount: 1614,
  engine: 'espeak-ng (es-419) -- PLACEHOLDER, no es la voz final del canal',
}};
"""
open(f"{COMP}/data/narration.ts", "w", encoding="utf-8").write(out)
print("wrote data/narration.ts")

# ---------- scenes/Desarrollo.tsx ----------
d_from = desarrollo_from
hilos = [
    ("Hilo 1 — La vigilia monástica", start('L11') - d_from, end('L20') - d_from),
    ("Hilo 2 — Demonología moderna y cine", start('L21') - d_from, end('L25') - d_from),
    ("Hilo 3 — El cuerpo", start('L26') - d_from, end('L35') - d_from),
    ("Hilo 4 — Una hora que no es universal", start('L36') - d_from, end('L39') - d_from),
]
hilos_lines = "\n".join(f"  {{ label: '{esc(l)}', from: {f}, to: {t} }}," for l, f, t in hilos)

out = f"""import {{ AbsoluteFill, interpolate, useCurrentFrame }} from 'remotion';
import {{ theme }} from '../../../theme';

/**
 * L09–L39. El B-roll y los subtítulos son layers globales
 * (BRollSequence/SubtitleLayer en Composition.tsx) — esta escena solo agrega
 * el "kicker" de qué hilo de investigación está activo, como un rótulo de
 * documento clasificado, sin tapar el B-roll.
 * Frames calculados contra el audio real de narración (ver data/subtitles.ts).
 */
const HILOS = [
{hilos_lines}
];

const FADE_FRAMES = 15;

export const Desarrollo: React.FC = () => {{
  const frame = useCurrentFrame();
  const active = HILOS.find((h) => frame >= h.from && frame < h.to);
  if (!active) return null;

  const opacity = interpolate(
    frame,
    [active.from, active.from + FADE_FRAMES, active.to - FADE_FRAMES, active.to],
    [0, 1, 1, 0],
    {{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }},
  );

  return (
    <AbsoluteFill style={{{{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 56 }}}}>
      <div
        style={{{{
          opacity,
          fontFamily: theme.fonts.sans,
          fontSize: 20,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: theme.colors.muted,
          border: `1px solid ${{theme.colors.muted}}`,
          padding: '8px 18px',
        }}}}
      >
        {{active.label}}
      </div>
    </AbsoluteFill>
  );
}};
"""
open(f"{COMP}/scenes/Desarrollo.tsx", "w", encoding="utf-8").write(out)
print("wrote scenes/Desarrollo.tsx")

# ---------- scenes/Cierre.tsx ----------
stamp_start = start('L52') - cierre_from
out = f"""import {{ AbsoluteFill, interpolate, useCurrentFrame }} from 'remotion';
import {{ theme }} from '../../../theme';

const STAMP_START = {stamp_start}; // relativo al inicio de la escena (~L52, "queda clasificado...")

/**
 * L47–L53. Sello de clasificación entrando sobre el final, coincidiendo con
 * L52 ("este caso queda clasificado, oficialmente..."). Frame calculado
 * contra el audio real de narración.
 */
export const Cierre: React.FC<{{ durationInFrames: number }}> = ({{ durationInFrames }}) => {{
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [STAMP_START, STAMP_START + 20], [0, 1], {{
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }});

  return (
    <AbsoluteFill style={{{{ justifyContent: 'center', alignItems: 'center' }}}}>
      <div
        style={{{{
          opacity,
          fontFamily: theme.fonts.sans,
          fontSize: 26,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: theme.colors.accent,
          border: `2px solid ${{theme.colors.accent}}`,
          padding: '14px 32px',
          transform: 'rotate(-4deg)',
        }}}}
      >
        No Concluyente
      </div>
    </AbsoluteFill>
  );
}};
"""
open(f"{COMP}/scenes/Cierre.tsx", "w", encoding="utf-8").write(out)
print("wrote scenes/Cierre.tsx")

print("EPISODE TOTAL FRAMES:", TOTAL, "=", TOTAL/30, "s")
