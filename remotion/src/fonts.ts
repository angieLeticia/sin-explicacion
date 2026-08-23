// Carga de tipografías vía @remotion/google-fonts — no requiere subir archivos de fuente.
// Importar `loadFonts()` una vez desde Root.tsx antes de registrar las composiciones.

import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadInterTight } from '@remotion/google-fonts/InterTight';
import { loadFont as loadPublicSans } from '@remotion/google-fonts/PublicSans';

export const loadFonts = () => {
  loadFraunces();
  loadInterTight();
  loadPublicSans();
};
