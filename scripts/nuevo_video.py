#!/usr/bin/env python3
"""Crea la estructura de carpetas para un nuevo proyecto de video."""
import argparse
import sys
from pathlib import Path

PLATAFORMAS = ["tiktok", "reels", "shorts", "youtube"]
REPO_ROOT = Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("proyecto", help="nombre del proyecto (se usa como nombre de carpeta)")
    args = parser.parse_args()

    proyecto_dir = REPO_ROOT / "content" / "videos" / args.proyecto
    if proyecto_dir.exists():
        sys.exit(f"Ya existe: {proyecto_dir}")

    (proyecto_dir / "guion").mkdir(parents=True)
    (proyecto_dir / "assets").mkdir()
    for plataforma in PLATAFORMAS:
        (proyecto_dir / "exports" / plataforma).mkdir(parents=True)

    (proyecto_dir / "guion" / "guion.md").write_text(f"# {args.proyecto}\n\n")

    print(f"Creado: {proyecto_dir}")


if __name__ == "__main__":
    main()
