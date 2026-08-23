import { AbsoluteFill, Sequence } from 'remotion';
import { BRollSequence } from './components/BRollSequence';
import { GrainOverlay } from './components/GrainOverlay';
import { IntroPlaceholder } from './components/IntroPlaceholder';
import { NarrationTrack } from './components/NarrationTrack';
import { SFXLayer } from './components/SFXLayer';
import { SubtitleLayer } from './components/SubtitleLayer';
import { Cierre } from './scenes/Cierre';
import { Desarrollo } from './scenes/Desarrollo';
import { Gancho } from './scenes/Gancho';
import { Giro } from './scenes/Giro';
import { SCENE_TIMING } from './scenes/timing';

const INTRO_DURATION_IN_FRAMES = 90; // 3s a 30fps — placeholder, la intro real la agrega el canal

/**
 * Composición del Capítulo 01. Orden de capas, de atrás hacia adelante:
 * B-roll -> escenas (chrome específico de cada tramo) -> subtítulos -> grano.
 * El audio (narración + SFX) no tiene representación visual pero comparte
 * el mismo sistema de frames absolutos que el resto de los layers.
 */
export const Cap01PorQueLasTresAM: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <IntroPlaceholder durationInFrames={INTRO_DURATION_IN_FRAMES} />

      <Sequence from={INTRO_DURATION_IN_FRAMES} name="Episodio">
        <BRollSequence />

        <Sequence from={SCENE_TIMING.gancho.from} durationInFrames={SCENE_TIMING.gancho.durationInFrames} name="Gancho">
          <Gancho durationInFrames={SCENE_TIMING.gancho.durationInFrames} />
        </Sequence>

        <Sequence
          from={SCENE_TIMING.desarrollo.from}
          durationInFrames={SCENE_TIMING.desarrollo.durationInFrames}
          name="Desarrollo"
        >
          <Desarrollo />
        </Sequence>

        <Sequence from={SCENE_TIMING.giro.from} durationInFrames={SCENE_TIMING.giro.durationInFrames} name="Giro">
          <Giro durationInFrames={SCENE_TIMING.giro.durationInFrames} />
        </Sequence>

        <Sequence from={SCENE_TIMING.cierre.from} durationInFrames={SCENE_TIMING.cierre.durationInFrames} name="Cierre">
          <Cierre durationInFrames={SCENE_TIMING.cierre.durationInFrames} />
        </Sequence>

        <SubtitleLayer />
        <SFXLayer />
        <NarrationTrack />
      </Sequence>

      <GrainOverlay />
    </AbsoluteFill>
  );
};
