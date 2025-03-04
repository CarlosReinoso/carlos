#!/bin/bash

# Define the source and output folders
SOURCE_FOLDER="C:/Users/jrpca/Downloads/wetransfer_3_2025-03-04_0906"
OUTPUT_FOLDER="C:/Users/jrpca/Documents/web-agency/grace-art/src/lib/imgConversion"

# Ensure the output folder exists
mkdir -p "$OUTPUT_FOLDER"

# Loop through all PDF files in the source folder
for file in "$SOURCE_FOLDER"/*.pdf; do 
  echo "Processing $file..."

  # Get the base filename (without path and extension)
  filename=$(basename "$file" .pdf)

  # Convert PDF to PNG (all pages)
  gs -dNOPAUSE -sDEVICE=png16m -r300 -o "$OUTPUT_FOLDER/${filename}-%03d.png" "$file"

  # Convert PNGs to JPGs using FFmpeg and save all in one folder
  for img in "$OUTPUT_FOLDER/${filename}"-*.png; do
    ffmpeg -i "$img" -q:v 2 "${img%.png}.jpg"
    rm "$img"  # Optional: Remove PNG after conversion to save space
  done

  echo "$file converted successfully!"
done
