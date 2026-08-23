import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { theme } from '../../../theme';
import { brollCues } from '../data/brollCues';

const CROSSFADE_FRAMES = 15;

/**
 * Secuencia de B-roll mapeada 1:1 a los tramos del guion (data/brollCues.ts).
 * Los tramos marcados `remove: true` son "edición por remoción" (guion.md, sección 6):
 * en vez de meter imagen nueva, se sostiene un fondo casi negro sin cortes.
 *
 * Los archivos reales todavía no existen en public/cap01-por-que-las-3am/broll/ —
 * mientras no estén, cada cue se renderiza como un placeholder con la query de
 * búsqueda sugerida, para poder ver el timing en Remotion Studio sin assets.
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
      <AbsoluteFill style={{ backgroundColor: theme.colors.background, opacity: 0.92 }} />
    );
  }

  if (!cue.file) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#151515', opacity, justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            fontFamily: theme.fonts.sans,
            fontSize: 20,
            color: theme.colors.muted,
            maxWidth: '70%',
            textAlign: 'center',
          }}
        >
          [B-ROLL PENDIENTE] {cue.searchQueries[0]}
        </div>
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
