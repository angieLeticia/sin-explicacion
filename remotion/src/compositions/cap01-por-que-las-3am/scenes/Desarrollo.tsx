import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../../../theme';

/**
 * L09–L39 (00:58–08:33). El B-roll y los subtítulos son layers globales
 * (BRollSequence/SubtitleLayer en Composition.tsx) — esta escena solo agrega
 * el "kicker" de qué hilo de investigación está activo, como un rótulo de
 * documento clasificado, sin tapar el B-roll.
 */
const HILOS = [
  { label: 'Hilo 1 — La vigilia monástica', from: 2670 - 1980, to: 7260 - 1980 },
  { label: 'Hilo 2 — Demonología moderna y cine', from: 7260 - 1980, to: 9510 - 1980 },
  { label: 'Hilo 3 — El cuerpo', from: 9510 - 1980, to: 13380 - 1980 },
  { label: 'Hilo 4 — Una hora que no es universal', from: 13380 - 1980, to: 15390 - 1980 },
];

const FADE_FRAMES = 15;

export const Desarrollo: React.FC = () => {
  const frame = useCurrentFrame();
  const active = HILOS.find((h) => frame >= h.from && frame < h.to);
  if (!active) return null;

  const opacity = interpolate(
    frame,
    [active.from, active.from + FADE_FRAMES, active.to - FADE_FRAMES, active.to],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 56 }}>
      <div
        style={{
          opacity,
          fontFamily: theme.fonts.sans,
          fontSize: 20,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: theme.colors.muted,
          border: `1px solid ${theme.colors.muted}`,
          padding: '8px 18px',
        }}
      >
        {active.label}
      </div>
    </AbsoluteFill>
  );
};
