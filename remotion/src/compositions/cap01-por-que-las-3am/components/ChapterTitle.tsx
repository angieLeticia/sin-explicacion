import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../../../theme';

type ChapterTitleProps = {
  numero: number;
  titulo: string;
  clasificacion: string;
  durationInFrames: number;
};

/**
 * Animación de entrada del título de capítulo. Pensada para sostenerse
 * unos segundos en pantalla completa antes de que arranque el gancho,
 * o para reaparecer como lower third breve al inicio del desarrollo.
 */
export const ChapterTitle: React.FC<ChapterTitleProps> = ({ numero, titulo, clasificacion, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 200, mass: 0.8 } });
  const opacity = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(entrance, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        opacity,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `translateY(${translateY}px)`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.sans,
            fontSize: 22,
            letterSpacing: 6,
            color: theme.colors.accent,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Capítulo {String(numero).padStart(2, '0')}
        </div>
        <div
          style={{
            fontFamily: theme.fonts.serif,
            fontSize: 72,
            color: theme.colors.foreground,
            maxWidth: 1100,
            lineHeight: 1.15,
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            fontFamily: theme.fonts.sans,
            fontSize: 18,
            letterSpacing: 3,
            color: theme.colors.muted,
            textTransform: 'uppercase',
            marginTop: 32,
            border: `1px solid ${theme.colors.muted}`,
            display: 'inline-block',
            padding: '6px 16px',
          }}
        >
          Clasificación: {clasificacion}
        </div>
      </div>
    </AbsoluteFill>
  );
};
