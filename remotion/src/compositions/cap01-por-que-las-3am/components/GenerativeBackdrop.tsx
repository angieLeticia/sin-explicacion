import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export type BackdropPalette = {
  base: string;
  blobs: [string, string, string];
};

// Paletas por tramo temático del guion — sin fotos reales, pero con identidad
// visual distinta por sección para que el ojo distinga "estamos en el hilo
// del monasterio" de "estamos en el hilo de la ciencia del sueño" etc.
export const PALETTES: Record<string, BackdropPalette> = {
  gancho: { base: '#050505', blobs: ['#1a1006', '#0a0a0a', '#000000'] },
  monasterio: { base: '#0a0704', blobs: ['#8a5a1f', '#3d2a0f', '#120c05'] },
  demonologia: { base: '#0a0303', blobs: ['#7a1414', '#3a0a0a', '#150404'] },
  cienciaSueno: { base: '#03080a', blobs: ['#1f6a8a', '#0f3d55', '#051820'] },
  japon: { base: '#08040a', blobs: ['#6a2f8a', '#3d1a55', '#150822'] },
  giroMeta: { base: '#020a08', blobs: ['#1fa87a', '#0f5540', '#052018'] },
  cierre: { base: '#050505', blobs: ['#12100c', '#0a0a0a', '#000000'] },
};

const hashSeed = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return h;
};

/**
 * Fondo generativo (sin assets externos): 3 manchas de luz difusas que
 * derivan lentamente de forma determinística (función del frame, no CSS
 * @keyframes -- Remotion necesita que cada frame sea reproducible), más un
 * leve "Ken Burns" de escala. Reemplaza al placeholder gris plano mientras
 * no haya B-roll real (ver brollCues.ts / guion.md sección 4).
 */
export const GenerativeBackdrop: React.FC<{ paletteKey: string; seedId: string; durationInFrames: number }> = ({
  paletteKey,
  seedId,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const palette = PALETTES[paletteKey] ?? PALETTES.gancho;
  const seed = hashSeed(seedId);

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.06], { extrapolateRight: 'clamp' });

  const blob = (index: number, radius: number, speed: number, phase: number) => {
    const t = (frame + seed * 13 + phase) * speed;
    const x = 50 + Math.sin(t) * radius;
    const y = 50 + Math.cos(t * 0.8) * radius;
    return { x, y };
  };

  const b1 = blob(0, 28, 0.006, 0);
  const b2 = blob(1, 34, 0.004, 220);
  const b3 = blob(2, 22, 0.008, 480);

  return (
    <AbsoluteFill style={{ backgroundColor: palette.base, overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          background: `
            radial-gradient(circle at ${b1.x}% ${b1.y}%, ${palette.blobs[0]}66 0%, transparent 45%),
            radial-gradient(circle at ${b2.x}% ${b2.y}%, ${palette.blobs[1]}55 0%, transparent 50%),
            radial-gradient(circle at ${b3.x}% ${b3.y}%, ${palette.blobs[2]}77 0%, transparent 40%)
          `,
          filter: 'blur(2px)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
