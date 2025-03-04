#!/bin/bash

# Define the source folder where your images are stored
SOURCE_FOLDER="C:\Users\jrpca\Downloads\gallery"

# Define the output folder where compressed images will be saved
OUTPUT_FOLDER="C:\Users\jrpca\Documents\web-agency\grace-art\public\gallery"

# Create output folder if it doesn't exist
mkdir -p "$OUTPUT_FOLDER"

# Loop through all JPG images in the source folder
for file in "$SOURCE_FOLDER"/*.jpg; do
  filename=$(basename "$file" .jpg)  # Extract filename without extension
  
  # Convert & compress to WebP format
  ffmpeg -i "$file" -q:v 75 -vf "scale=1920:-1" "$OUTPUT_FOLDER/${filename}.webp"
  
  echo "Converted: $file → $OUTPUT_FOLDER/${filename}.webp"
done

echo "✅ All images have been converted and saved in: $OUTPUT_FOLDER"
