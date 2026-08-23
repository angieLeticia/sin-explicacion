# sin-explicación

Contenido para redes sociales — foco en video, pensado para reutilizar entre plataformas (TikTok, Reels, Shorts, YouTube).

## Estructura

```
content/videos/<proyecto>/
  guion/          # guiones y notas de cada video
  assets/         # material crudo: clips, audio, imágenes
  exports/
    tiktok/
    reels/
    shorts/
    youtube/
```

Cada video vive en su propia carpeta bajo `content/videos/`, con todo lo suyo adentro: guion, material crudo y las exportaciones finales por plataforma.

## Scripts

- `scripts/nuevo_video.py <nombre-proyecto>` — crea la estructura de carpetas para un video nuevo.
- `scripts/organizar_export.py <archivo> --proyecto <nombre-proyecto> --plataforma <tiktok|reels|shorts|youtube>` — mueve un archivo exportado a su carpeta correspondiente, renombrado de forma consistente.

### Ejemplo de flujo

```bash
python3 scripts/nuevo_video.py receta-facil
# ... grabás, editás, exportás el video ...
python3 scripts/organizar_export.py ~/Descargas/video_final.mp4 --proyecto receta-facil --plataforma tiktok
```

Esto deja el archivo en `content/videos/receta-facil/exports/tiktok/receta-facil.mp4`.
