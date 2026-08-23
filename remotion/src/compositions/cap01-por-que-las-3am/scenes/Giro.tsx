import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

/**
 * L40–L46 (08:33–10:13), el punto de giro. Viñeta que oscurece de forma
 * gradual a lo largo de la escena — refuerza la tensión ascendente sin
 * agregar B-roll extra (el B-roll de esta escena ya está en brollCues.ts).
 */
export const Giro: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const vignetteOpacity = interpolate(frame, [0, durationInFrames], [0, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignetteOpacity}) 100%)`,
      }}
    />
  );
};
