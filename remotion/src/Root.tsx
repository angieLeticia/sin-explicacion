import { Composition } from 'remotion';
import { cap01PorQueLasTresAM } from './compositions/cap01-por-que-las-3am';
import { loadFonts } from './fonts';

loadFonts();

/**
 * Registro de composiciones. Cada episodio nuevo se agrega acá como una
 * <Composition> más, importando su propio módulo desde
 * src/compositions/<episodio>/index.tsx — sin tocar los episodios existentes.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={cap01PorQueLasTresAM.id}
        component={cap01PorQueLasTresAM.component}
        durationInFrames={cap01PorQueLasTresAM.durationInFrames}
        fps={cap01PorQueLasTresAM.fps}
        width={cap01PorQueLasTresAM.width}
        height={cap01PorQueLasTresAM.height}
      />
    </>
  );
};
