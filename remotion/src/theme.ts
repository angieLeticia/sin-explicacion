// Paleta y tipografía compartida entre episodios (ver guion.md, sección 5, para la justificación).
// Fuentes cargadas vía @remotion/google-fonts en fonts.ts — no requieren archivos de fuente propios.

export const theme = {
  colors: {
    background: '#08080a',
    foreground: '#f2f0ec',
    muted: '#8a8680',
    accent: '#b23b2e',
  },
  fonts: {
    // Títulos de capítulo / texto grande en pantalla: Fraunces (serif editorial, gratuita).
    serif: 'Fraunces, Georgia, serif',
    // Lower thirds / rótulos de datos: sans grotesca. Inter Tight vía Google Fonts
    // (alternativa gratuita a Neue Montreal/General Sans, ver guion.md sección 5).
    sans: 'Inter Tight, Inter, sans-serif',
    // Subtítulos: sans muy legible en mobile, distinta de los lower thirds.
    subtitle: 'Public Sans, Arial, sans-serif',
  },
};
