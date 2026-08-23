import { AbsoluteFill } from 'remotion';
import { ChapterTitle } from '../components/ChapterTitle';

/**
 * L01–L08 (00:00–00:58). Edición por remoción: sin B-roll propio acá
 * (ver brollCues.ts, cue `broll-gancho`, remove: true) — solo el título
 * de capítulo entrando sobre el plano oscuro fijo.
 */
export const Gancho: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <AbsoluteFill>
      <ChapterTitle
        numero={1}
        titulo="Por qué las 3:00 a.m."
        clasificacion="No Concluyente"
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
