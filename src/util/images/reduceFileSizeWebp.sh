#!/bin/bash

# Define the source folder where your images are stored
SOURCE_FOLDER="C:\Users\jrpca\Downloads\heroImages"

# Define the output folder where compressed images will be saved
OUTPUT_FOLDER="C:\Users\jrpca\Documents\web-agency\carlos\public\web-dev"

# Create output folder if it doesn't exist
mkdir -p "$OUTPUT_FOLDER"

for file in "$SOURCE_FOLDER"/*.{jpg,jpeg,png}; do
  # Check if file exists (to prevent errors when no matching files are found)
  [ -e "$file" ] || continue

  filename=$(basename "$file")  # Extract filename with extension
  filename_no_ext="${filename%.*}"  # Remove extension

  # Convert & compress to WebP format
  ffmpeg -i "$file" -q:v 75 -vf "scale=1920:-1" "$OUTPUT_FOLDER/${filename_no_ext}.webp"

  echo "Converted: $file → $OUTPUT_FOLDER/${filename_no_ext}.webp"
done


echo "✅ All images have been converted and saved in: $OUTPUT_FOLDER"
