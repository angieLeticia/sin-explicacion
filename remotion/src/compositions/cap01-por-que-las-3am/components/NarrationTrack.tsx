import { Audio, staticFile } from 'remotion';
import { narration } from '../data/narration';

/**
 * Pista de narración generada con ElevenLabs. El archivo mp3 se coloca en
 * public/cap01-por-que-las-3am/audio/narracion.mp3 (todavía no existe en el repo).
 */
export const NarrationTrack: React.FC = () => {
  return <Audio src={staticFile(`cap01-por-que-las-3am/audio/${narration.file}`)} />;
};
