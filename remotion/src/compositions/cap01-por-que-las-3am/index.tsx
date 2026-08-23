import { Cap01PorQueLasTresAM } from './Composition';
import { EPISODE_DURATION_IN_FRAMES } from './scenes/timing';

const INTRO_DURATION_IN_FRAMES = 90;

export const cap01PorQueLasTresAM = {
  id: 'cap01-por-que-las-3am',
  component: Cap01PorQueLasTresAM,
  durationInFrames: INTRO_DURATION_IN_FRAMES + EPISODE_DURATION_IN_FRAMES,
  fps: 30,
  width: 1920,
  height: 1080,
};
