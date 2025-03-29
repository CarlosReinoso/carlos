#!/bin/bash

# === Script directory ===
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# === Auto-detect MP3 and image ===
INPUT_MP3=$(find "$SCRIPT_DIR" -maxdepth 1 -iname "*.mp3" | head -n 1)
COVER_IMAGE=$(find "$SCRIPT_DIR" -maxdepth 1 \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | head -n 1)

# === Error handling ===
if [ -z "$INPUT_MP3" ]; then
  echo "❌ No MP3 file found in $SCRIPT_DIR"
  exit 1
fi

if [ -z "$COVER_IMAGE" ]; then
  echo "❌ No image file (jpg/jpeg/png) found in $SCRIPT_DIR"
  exit 1
fi

# === Metadata ===
TITLE="Away"
ARTIST="Carlos Reinoso"
ALBUM="Reflections"
GENRE="Ambient"
DATE="2025"
ALBUM_ARTIST="Carlos Reinoso"
COPYRIGHT="© 2025 Carlos Reinoso. All rights reserved."
PUBLISHER="Carlos Reinoso"
ENCODED_BY="http://carlosreinoso.co.uk/music"

# === Output ===
OUTPUT_FOLDER="$SCRIPT_DIR/../../../public"
mkdir -p "$OUTPUT_FOLDER"

BASENAME=$(basename "$INPUT_MP3" .mp3)
OUTPUT_FILENAME="${BASENAME}.mp3"
OUTPUT_MP3="$OUTPUT_FOLDER/$OUTPUT_FILENAME"

# === ffmpeg tagging ===
ffmpeg -i "$INPUT_MP3" -i "$COVER_IMAGE" \
  -map 0 -map 1 -c copy -id3v2_version 3 \
  -metadata title="$TITLE" \
  -metadata artist="$ARTIST" \
  -metadata album="$ALBUM" \
  -metadata genre="$GENRE" \
  -metadata date="$DATE" \
  -metadata album_artist="$ALBUM_ARTIST" \
  -metadata copyright="$COPYRIGHT" \
  -metadata publisher="$PUBLISHER" \
  -metadata encoded_by="$ENCODED_BY" \
  "$OUTPUT_MP3"

echo "✅ Tagged MP3 saved to: $OUTPUT_MP3"
