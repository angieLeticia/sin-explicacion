import { AbsoluteFill, Sequence } from 'remotion';

/**
 * Espacio reservado para la intro del canal. La intro se edita manualmente
 * fuera de este proyecto — este componente solo reserva el tiempo y muestra
 * un placeholder visible mientras se trabaja en el resto de la composición.
 */
export const IntroPlaceholder: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  return (
    <Sequence durationInFrames={durationInFrames} name="IntroPlaceholder">
      <AbsoluteFill style={{ backgroundColor: '#000' }}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333',
            fontFamily: 'monospace',
            fontSize: 28,
          }}
        >
          INTRO — se agrega manualmente
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};
