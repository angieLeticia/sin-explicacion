#!/usr/bin/env python3
"""Mueve un archivo exportado a la carpeta del proyecto y plataforma correspondientes."""
import argparse
import shutil
import sys
from pathlib import Path

PLATAFORMAS = ["tiktok", "reels", "shorts", "youtube"]
REPO_ROOT = Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archivo", help="ruta al archivo de video exportado")
    parser.add_argument("--proyecto", required=True, help="nombre del proyecto")
    parser.add_argument("--plataforma", required=True, choices=PLATAFORMAS)
    args = parser.parse_args()

    origen = Path(args.archivo)
    if not origen.is_file():
        sys.exit(f"No existe el archivo: {origen}")

    destino_dir = REPO_ROOT / "content" / "videos" / args.proyecto / "exports" / args.plataforma
    if not destino_dir.is_dir():
        sys.exit(f"No existe el proyecto/plataforma: {destino_dir}\n"
                  f"Corré primero: python3 scripts/nuevo_video.py {args.proyecto}")

    destino = destino_dir / f"{args.proyecto}{origen.suffix}"
    shutil.move(str(origen), str(destino))
    print(f"Movido a: {destino}")


if __name__ == "__main__":
    main()
