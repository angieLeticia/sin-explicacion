import { AbsoluteFill, useCurrentFrame } from 'remotion';

/**
 * Grano de video del canal — este capítulo (001) define el look base;
 * los episodios siguientes deben reusar este mismo componente sin cambios,
 * para mantener consistencia visual entre capítulos (ver POST-PRODUCCION.md).
 *
 * Implementado con un filtro SVG (feTurbulence) en vez de una textura de imagen
 * para que el proyecto quede autocontenido, sin depender de assets externos.
 * El seed rota de forma determinística por frame para que el grano no se sienta
 * como una textura estática pegada a la imagen.
 */
export const GrainOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => {
  const frame = useCurrentFrame();
  const seed = frame % 8;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'overlay', opacity }}>
      <svg width="100%" height="100%">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </AbsoluteFill>
  );
};
