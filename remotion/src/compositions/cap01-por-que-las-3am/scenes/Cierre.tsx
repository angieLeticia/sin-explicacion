import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../../../theme';

const STAMP_START = 1665; // relativo al inicio de la escena (~L52, "queda clasificado...")

/**
 * L47–L53. Sello de clasificación entrando sobre el final, coincidiendo con
 * L52 ("este caso queda clasificado, oficialmente..."). Frame calculado
 * contra el audio real de narración.
 */
export const Cierre: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [STAMP_START, STAMP_START + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          opacity,
          fontFamily: theme.fonts.sans,
          fontSize: 26,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: theme.colors.accent,
          border: `2px solid ${theme.colors.accent}`,
          padding: '14px 32px',
          transform: 'rotate(-4deg)',
        }}
      >
        No Concluyente
      </div>
    </AbsoluteFill>
  );
};
