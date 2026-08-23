# Checklist de post-producción — Sin Explicación

Estándar del canal para todos los episodios, a partir del Capítulo 01 ("Por qué las 3:00 a.m."). Correr esta lista completa antes de exportar a cualquier plataforma.

## Audio

- [ ] **Normalización de loudness:** −16 LUFS integrado para el master de YouTube/narración (contenido hablado, no musical). Para TikTok/Reels/Shorts, renormalizar a −14 LUFS integrado (estándar de esas plataformas).
- [ ] **True peak:** no superar −1 dBTP en ningún master.
- [ ] Voz narrada limpia de ruido de fondo (noise floor por debajo de −50 dB en los silencios).
- [ ] SFX y música nunca por encima de −20 dB relativo a la voz durante la narración activa (excepto los golpes/stingers puntuales marcados en el guion).
- [ ] Verificar que ningún "silencio dramático" quedó en silencio real de −∞ (dejar noise floor/room tone mínimo para que no se sienta como corte de audio roto).
- [ ] Sample rate 48kHz / 24-bit en el master.

## Subtítulos

- [ ] Estilo consistente en todos los episodios: misma tipografía (ver sección Tipografía del guion), mismo tamaño, mismo color/contorno.
- [ ] Máximo 2 líneas por bloque, ~42 caracteres por línea.
- [ ] Posicionados en zona segura (safe area) para que no los tape la UI de cada plataforma (TikTok/Reels/Shorts tienen zonas de UI distintas de YouTube).
- [ ] Sincronía verificada línea por línea contra el audio final (no contra el guion original — el TTS puede correr el timing).
- [ ] Subtítulos quemados (burned-in) en los exports de TikTok/Reels/Shorts; `.srt` separado disponible para YouTube.

## Video / look

- [ ] Grano aplicado de forma consistente (mismo filtro/seed que episodios anteriores una vez que exista un episodio previo — este capítulo define el look base).
- [ ] Grano sutil: no debe leerse como ruido de compresión ni tapar detalle en las zonas oscuras predominantes del video.
- [ ] Sin B-roll en exceso en las zonas de "edición por remoción" marcadas en el guion — verificar contra la sección correspondiente antes de exportar.
- [ ] Verificación de sincronía audio / subtítulos / B-roll en una pasada completa, sin adelantar, antes del export final.
- [ ] Resolución mínima 1920x1080, 30fps. Verificar que no haya drift de frame rate entre clips de B-roll de distintas fuentes.

## Antes de exportar

- [ ] Ver el video completo una vez, de punta a punta, sin cortar — confirmar que el ritmo pausado se sostiene y no hay tramos que se sientan "vacíos" por error (a diferencia de los vacíos intencionales de la edición por remoción).
- [ ] Confirmar que la frase de cierre del canal es la definitiva (revisar si hay una versión distinta a la propuesta en el guion del capítulo).
- [ ] Exportar máster en 16:9 y recortar/reencuadrar para 9:16 (TikTok/Reels/Shorts) — no generar el 9:16 desde cero, para mantener consistencia de framing.
- [ ] Correr `scripts/organizar_export.py` para cada plataforma después de exportar.
