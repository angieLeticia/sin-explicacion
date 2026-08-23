import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');

// Entorno de este sandbox: Chromium headless ya viene preinstalado (Playwright)
// y la descarga propia de Remotion está bloqueada por la política de red.
// Reusar ese binario evita el intento de descarga.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
// El proxy de salida de este sandbox usa una CA propia que Chromium (a diferencia
// de curl/Node) no confía por defecto -> las fuentes de Google Fonts fallan por
// certificado inválido. Solo se ignora en este entorno de desarrollo/sandbox.
if (process.env.REMOTION_IGNORE_CERT_ERRORS === '1') {
  Config.setChromiumIgnoreCertificateErrors(true);
}
// 4K disponible si el material fuente (B-roll) lo permite (ver guion.md):
// cambiar la Composition a 3840x2160 y correr `remotion render` de nuevo,
// no hace falta tocar el resto del proyecto.
