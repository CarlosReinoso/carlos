#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_FOLDER="$SCRIPT_DIR/../../../public"

# Debugging: Check the paths
echo "Script directory: $SCRIPT_DIR"
echo "Output folder: $(realpath "$OUTPUT_FOLDER")"

# Create output folder if it doesn't exist
mkdir -p "$OUTPUT_FOLDER"

# Loop through images
for file in "$SCRIPT_DIR"/*.{jpg,jpeg,png,avif,svg}; do
  [ -e "$file" ] || continue  # Skip if file doesn't exist

  filename=$(basename "$file")
  filename_no_ext="${filename%.*}"

  echo "Processing: $file"

  # Convert AVIF properly
  if [[ "$file" == *.avif ]]; then
    if ffmpeg -i "$file" -c:v libwebp -compression_level 6 -q:v 50 "$OUTPUT_FOLDER/${filename_no_ext}.webp" 2>/dev/null; then
      echo "Converted (FFmpeg): $file → $OUTPUT_FOLDER/${filename_no_ext}.webp"
    else
      echo "⚠️ FFmpeg failed for AVIF, using ImageMagick..."
      magick "$file" -quality 75 "$OUTPUT_FOLDER/${filename_no_ext}.webp"
      echo "Converted (ImageMagick): $file → $OUTPUT_FOLDER/${filename_no_ext}.webp"
    fi
  else
    ffmpeg -i "$file" -compression_level 6 -q:v 50 "$OUTPUT_FOLDER/${filename_no_ext}.webp"
    echo "Converted: $file → $OUTPUT_FOLDER/${filename_no_ext}.webp"
  fi
done
