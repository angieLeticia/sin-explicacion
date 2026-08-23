import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
// 4K disponible si el material fuente (B-roll) lo permite (ver guion.md):
// cambiar la Composition a 3840x2160 y correr `remotion render` de nuevo,
// no hace falta tocar el resto del proyecto.
