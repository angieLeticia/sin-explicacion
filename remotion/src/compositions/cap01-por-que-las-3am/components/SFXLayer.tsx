import { Audio, Sequence, staticFile } from 'remotion';
import { sfxCues } from '../data/sfxCues';

const DEFAULT_CUE_FRAMES = 30;

/**
 * Efectos posicionados en los timestamps exactos del guion (data/sfxCues.ts).
 * Los archivos van en public/cap01-por-que-las-3am/sfx/ con el nombre indicado
 * en cada cue (`file`) — todavía no existen en el repo. Hasta que estén, este
 * layer no rompe el render: Remotion Studio tolera un staticFile ausente en
 * preview, pero renderMedia SÍ va a fallar si falta algún archivo referenciado
 * acá — completar la carpeta de SFX antes de exportar.
 */
export const SFXLayer: React.FC = () => {
  return (
    <>
      {sfxCues.map((cue) => (
        <Sequence
          key={cue.id}
          from={cue.frame}
          durationInFrames={cue.durationInFrames ?? DEFAULT_CUE_FRAMES}
          name={`${cue.id}-${cue.type}`}
        >
          <Audio src={staticFile(`cap01-por-que-las-3am/sfx/${cue.file}`)} />
        </Sequence>
      ))}
    </>
  );
};
