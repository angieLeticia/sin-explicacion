import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { theme } from '../../../theme';
import { brollCues } from '../data/brollCues';
import { GenerativeBackdrop } from './GenerativeBackdrop';

const CROSSFADE_FRAMES = 15;

// Fuentes de imágenes/video reales (Wikimedia, Unsplash, Pexels, Archive.org, etc.)
// están bloqueadas por la política de red de este sandbox -- ver remotion/README.md.
// Mapeo de cue.id a la paleta generativa de GenerativeBackdrop mientras no haya B-roll real.
const PALETTE_BY_CUE: Record<string, string> = {
  'broll-gancho': 'gancho',
  'broll-monasterio': 'monasterio',
  'broll-demonologia': 'demonologia',
  'broll-ciencia-sueno': 'cienciaSueno',
  'broll-japon': 'japon',
  'broll-giro-meta': 'giroMeta',
  'broll-cierre': 'cierre',
};

/**
 * Secuencia de B-roll mapeada 1:1 a los tramos del guion (data/brollCues.ts).
 * Los tramos marcados `remove: true` son "edición por remoción" (guion.md, sección 6):
 * en vez de meter imagen nueva, se sostiene un fondo casi negro sin cortes.
 *
 * Los archivos reales todavía no existen en public/cap01-por-que-las-3am/broll/ —
 * mientras no estén, cada cue usa un fondo generativo con la paleta de su tramo
 * (ver GenerativeBackdrop.tsx), con la query de búsqueda sugerida como
 * referencia de producción discreta en la esquina.
 */
const BRollCueBlock: React.FC<{ cue: (typeof brollCues)[number]; durationInFrames: number }> = ({
  cue,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, CROSSFADE_FRAMES, durationInFrames - CROSSFADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  if (cue.remove) {
    return (
      <AbsoluteFill style={{ opacity: 0.92 }}>
        <GenerativeBackdrop
          paletteKey={PALETTE_BY_CUE[cue.id] ?? 'gancho'}
          seedId={cue.id}
          durationInFrames={durationInFrames}
        />
      </AbsoluteFill>
    );
  }

  if (!cue.file) {
    return (
      <AbsoluteFill style={{ opacity }}>
        <GenerativeBackdrop
          paletteKey={PALETTE_BY_CUE[cue.id] ?? 'gancho'}
          seedId={cue.id}
          durationInFrames={durationInFrames}
        />
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'flex-start', padding: 28 }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 13,
              color: 'rgba(255,255,255,0.32)',
              maxWidth: '55%',
            }}
          >
            [b-roll pendiente] {cue.searchQueries[0]}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ opacity }}>
      <Img
        src={staticFile(`cap01-por-que-las-3am/broll/${cue.file}`)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </AbsoluteFill>
  );
};

export const BRollSequence: React.FC = () => {
  return (
    <>
      {brollCues.map((cue) => {
        const durationInFrames = cue.endFrame - cue.startFrame;
        return (
          <Sequence key={cue.id} from={cue.startFrame} durationInFrames={durationInFrames} name={cue.id}>
            <BRollCueBlock cue={cue} durationInFrames={durationInFrames} />
          </Sequence>
        );
      })}
    </>
  );
};
