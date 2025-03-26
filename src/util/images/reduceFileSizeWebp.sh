#!/bin/bash
shopt -s nullglob

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_FOLDER="$SCRIPT_DIR/../../../public"

echo "Script directory: $SCRIPT_DIR"
echo "Output folder: $(realpath "$OUTPUT_FOLDER")"

mkdir -p "$OUTPUT_FOLDER"

extensions=("jpg" "jpeg" "png" "avif" "svg" "cr2" "CR2")


for ext in "${extensions[@]}"; do
  for file in "$SCRIPT_DIR"/*.$ext; do
    [ -e "$file" ] || continue

    filename=$(basename "$file")
    filename_no_ext="${filename%.*}"

    echo "Processing: $file"

  if [[ "$file" == *.cr2 || "$file" == *.CR2 ]]; then
  echo "Detected CR2 RAW file. Converting to JPG first..."
  temp_jpg="$OUTPUT_FOLDER/${filename_no_ext}.jpg"
  
  if magick "$file" -quality 95 "$temp_jpg" 2>/dev/null; then
    echo "✔️ Converted CR2 → JPG: $temp_jpg"

    if ffmpeg -i "$temp_jpg" -compression_level 6 -q:v 50 "$OUTPUT_FOLDER/${filename_no_ext}.webp" 2>/dev/null; then
      echo "✔️ Converted JPG → WebP: $OUTPUT_FOLDER/${filename_no_ext}.webp"
      rm "$temp_jpg"  # optional cleanup
    else
      echo "❌ Failed to convert JPG to WebP"
    fi
  else
    echo "❌ Failed to convert CR2 to JPG"
  fi


  # AVIF Handling
  elif [[ "$file" == *.avif ]]; then
    echo "Detected AVIF file. Attempting FFmpeg conversion..."
    if ffmpeg -i "$file" -c:v libwebp -compression_level 6 -q:v 50 "$OUTPUT_FOLDER/${filename_no_ext}.webp" 2>/dev/null; then
      echo "Converted (FFmpeg): $file → $OUTPUT_FOLDER/${filename_no_ext}.webp"
    else
      echo "⚠️ FFmpeg failed for AVIF, using ImageMagick..."
      magick "$file" -quality 75 "$OUTPUT_FOLDER/${filename_no_ext}.webp"
      echo "Converted (ImageMagick): $file → $OUTPUT_FOLDER/${filename_no_ext}.webp"
    fi

  # Default handling (jpg, png, etc.)
  else
    if ffmpeg -i "$file" -compression_level 6 -q:v 50 "$OUTPUT_FOLDER/${filename_no_ext}.webp" 2>/dev/null; then
      echo "Converted: $file → $OUTPUT_FOLDER/${filename_no_ext}.webp"
    else
      echo "❌ Failed to convert: $file"
    fi
  fi
  done
done



