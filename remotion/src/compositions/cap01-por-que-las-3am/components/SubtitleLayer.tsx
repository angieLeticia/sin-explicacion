import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../../../theme';
import { subtitles } from '../data/subtitles';

const FADE_FRAMES = 6;

/**
 * Subtítulos sincronizados contra data/subtitles.ts. El timing ahí es un
 * placeholder calculado por conteo de palabras (ver narration.ts) — antes de
 * exportar hay que reajustarlo contra el audio final de ElevenLabs.
 */
export const SubtitleLayer: React.FC = () => {
  const frame = useCurrentFrame();

  const current = subtitles.find((s) => frame >= s.startFrame && frame < s.endFrame);
  if (!current) return null;

  const opacity = interpolate(
    frame,
    [
      current.startFrame,
      current.startFrame + FADE_FRAMES,
      current.endFrame - FADE_FRAMES,
      current.endFrame,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 140 }}>
      <div
        style={{
          opacity,
          maxWidth: '80%',
          textAlign: 'center',
          fontFamily: theme.fonts.subtitle,
          fontSize: 40,
          lineHeight: 1.3,
          color: theme.colors.foreground,
          textShadow: '0 2px 12px rgba(0,0,0,0.8)',
        }}
      >
        {current.text}
      </div>
    </AbsoluteFill>
  );
};
