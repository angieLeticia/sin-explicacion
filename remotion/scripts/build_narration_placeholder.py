#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sintetiza la narración completa con espeak-ng (placeholder offline, NO ElevenLabs
-- esa API está bloqueada por la política de red de este sandbox), mide las
duraciones reales, y regenera todos los archivos de datos de Remotion (subtitles.ts,
sfxCues.ts, brollCues.ts, scenes/timing.ts, narration.ts) mas los componentes que
tenian frames hardcodeados (Desarrollo.tsx, Cierre.tsx) para que coincidan EXACTO
con el audio real, en vez del placeholder por conteo de palabras.
"""
import json, subprocess, math, os, sys

REPO = "/home/user/sin-explicacion"
COMP_DIR = f"{REPO}/remotion/src/compositions/cap01-por-que-las-3am"
PUBLIC_AUDIO = f"{REPO}/remotion/public/cap01-por-que-las-3am/audio"
TMP = "/tmp/claude-0/-home-user-sin-explicacion/e85db1ad-0e1f-55b3-b6a9-07fc228e1a0a/scratchpad/narration_lines"
os.makedirs(TMP, exist_ok=True)
os.makedirs(PUBLIC_AUDIO, exist_ok=True)

FPS = 30

lines = json.load(open("/tmp/claude-0/-home-user-sin-explicacion/e85db1ad-0e1f-55b3-b6a9-07fc228e1a0a/scratchpad/lines_final.json"))

TTS_OVERRIDES = {
    "L04": "Mirás el techo. Mirás el teléfono. Y ahí está: las tres en punto. O tres y tres. O tres y diecisiete.",
    "L08": "Esta noche vamos a buscarlo. Esto es Después de la Medianoche. Capítulo uno: Por qué las tres de la madrugada.",
    "L31": "Y es también, por el diseño natural del sueño, cuando pasás más tiempo en fase erre-e-eme: la fase de los sueños vívidos y, para algunas personas, de la parálisis del sueño. Ese instante en el que la mente se despierta, pero el cuerpo sigue apagado.",
}

DEFAULT_GAP = 0.30
GAP_AFTER = {
    "L01": 0.50,
    "L08": 1.50,
    "L32": 1.00,
    "L43": 1.00,
    "L52": 0.67,
    "L53": 0.0,
}
OUTRO_TAIL_SECONDS = 4.0

def run(cmd):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print("CMD FAILED:", cmd, file=sys.stderr)
        print(r.stderr, file=sys.stderr)
        sys.exit(1)
    return r.stdout

def ffprobe_duration(path):
    out = run(f'ffprobe -v error -show_entries format=duration -of csv=p=0 "{path}"')
    return float(out.strip())

def synth_line(line_id, text, path):
    text_escaped = text.replace('"', '\\"')
    run(f'espeak-ng -v es-419 -s 152 -p 28 -g 4 -w "{path}" "{text_escaped}"')

def gen_silence(path, seconds):
    seconds = max(seconds, 0.001)
    run(f'ffmpeg -y -f lavfi -i "anullsrc=r=44100:cl=mono" -t {seconds:.3f} -ar 44100 -ac 1 "{path}" -hide_banner -loglevel error')

# --- 1. Sintetizar cada línea y medir duración real ---
line_info = []  # list of dict: id, section, text, wav, duration
for d in lines:
    lid = d["id"]
    text = TTS_OVERRIDES.get(lid, d["text"])
    wav_path = f"{TMP}/{lid}.wav"
    synth_line(lid, text, wav_path)
    dur = ffprobe_duration(wav_path)
    line_info.append({"id": lid, "section": d["section"], "text": d["text"], "wav": wav_path, "duration": dur})

print("Synthesized", len(line_info), "lines. Total raw speech seconds:", sum(l["duration"] for l in line_info))

# --- 2. Construir línea de tiempo real (segundos) y lista de concatenación ---
cursor = 0.0
frames = {}  # id -> (startFrame, endFrame)  [endFrame = fin del habla, sin el gap]
concat_entries = []  # rutas de wav en orden para concatenar

for i, l in enumerate(line_info):
    lid = l["id"]
    start_frame = round(cursor * FPS)
    cursor += l["duration"]
    end_frame = round(cursor * FPS)
    frames[lid] = (start_frame, end_frame)
    concat_entries.append(l["wav"])

    gap = GAP_AFTER.get(lid, DEFAULT_GAP)
    if gap > 0:
        gap_path = f"{TMP}/gap_after_{lid}.wav"
        gen_silence(gap_path, gap)
        concat_entries.append(gap_path)
        cursor += gap

total_speech_frame = round(cursor * FPS)  # incluye el gap final (0 para L53)
outro_tail_path = f"{TMP}/outro_tail.wav"
gen_silence(outro_tail_path, OUTRO_TAIL_SECONDS)
concat_entries.append(outro_tail_path)
cursor += OUTRO_TAIL_SECONDS
EPISODE_TOTAL_FRAMES = round(cursor * FPS)

print("L53 span:", frames["L53"], "| total speech+gaps frame:", total_speech_frame, "| episode total frames (con cola):", EPISODE_TOTAL_FRAMES)

# --- 3. Concatenar todo en narracion.wav -> narracion.mp3 ---
# Usamos el filtro `concat` (no el demuxer) para evitar corrupción de duración
# por mezclar wavs a distinto sample rate (espeak-ng escribe a 22050Hz, los
# silencios generados a 44100Hz) -- `aformat` normaliza cada tramo antes de unir.
inputs = " ".join(f'-i "{p}"' for p in concat_entries)
filter_parts = "".join(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=mono[a{i}];" for i in range(len(concat_entries)))
concat_refs = "".join(f"[a{i}]" for i in range(len(concat_entries)))
filter_complex = f'{filter_parts}{concat_refs}concat=n={len(concat_entries)}:v=0:a=1[out]'

narracion_wav = f"{TMP}/narracion.wav"
run(f'ffmpeg -y {inputs} -filter_complex \'{filter_complex}\' -map "[out]" -ar 44100 -ac 1 "{narracion_wav}" -hide_banner -loglevel error')
final_dur = ffprobe_duration(narracion_wav)
print("narracion.wav duration:", final_dur, "s (", round(final_dur*FPS), "frames )")

narracion_mp3 = f"{PUBLIC_AUDIO}/narracion.mp3"
run(f'ffmpeg -y -i "{narracion_wav}" -codec:a libmp3lame -qscale:a 4 -ar 44100 -ac 1 "{narracion_mp3}" -hide_banner -loglevel error')
print("Wrote", narracion_mp3, "duration:", ffprobe_duration(narracion_mp3))

# --- 4. Guardar el mapeo de frames para el siguiente paso (generar los .ts) ---
out = {
    "frames": frames,
    "episodeTotalFrames": EPISODE_TOTAL_FRAMES,
    "narracionDurationSeconds": final_dur,
}
with open("/tmp/claude-0/-home-user-sin-explicacion/e85db1ad-0e1f-55b3-b6a9-07fc228e1a0a/scratchpad/real_frames.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

print("OK")
