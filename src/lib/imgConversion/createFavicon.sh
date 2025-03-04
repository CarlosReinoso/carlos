#!/bin/bash

# Define the public folder path
PUBLIC_DIR="./public"

# Find the favicon file (supports multiple formats)
FAVICON_FILE=$(find "$PUBLIC_DIR" -type f -iname "favicon.*" ! -name "favicon.ico" | head -n 1)

# Check if favicon file exists
if [[ -z "$FAVICON_FILE" ]]; then
    echo "❌ No favicon file found in $PUBLIC_DIR"
    exit 1
fi

echo "✅ Found favicon: $FAVICON_FILE"

# Define output ICO file
OUTPUT_ICO="./src/app/favicon.ico"


# Create temporary directory for resized images
TEMP_DIR=$(mktemp -d 2>/dev/null || mktemp -d -t 'favicon_tmp')
echo "📂 Using temp directory: $TEMP_DIR"

# Generate multiple favicon sizes
echo "🔄 Generating different favicon sizes..."
ffmpeg -i "$FAVICON_FILE" -vf scale=16:16 "$TEMP_DIR/favicon-16.png"
ffmpeg -i "$FAVICON_FILE" -vf scale=32:32 "$TEMP_DIR/favicon-32.png"
ffmpeg -i "$FAVICON_FILE" -vf scale=48:48 "$TEMP_DIR/favicon-48.png"
ffmpeg -i "$FAVICON_FILE" -vf scale=64:64 "$TEMP_DIR/favicon-64.png"
ffmpeg -i "$FAVICON_FILE" -vf scale=128:128 "$TEMP_DIR/favicon-128.png"

# Detect ImageMagick version for Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    CONVERT_CMD="magick convert"  # Use "magick convert" on Windows
else
    CONVERT_CMD="convert"  # Use "convert" on macOS/Linux
fi

# Check if ImageMagick is installed
if command -v magick >/dev/null 2>&1 || command -v convert >/dev/null 2>&1; then
    echo "🎨 Merging images into favicon.ico using ImageMagick..."
    $CONVERT_CMD "$TEMP_DIR/favicon-16.png" "$TEMP_DIR/favicon-32.png" "$TEMP_DIR/favicon-48.png" "$TEMP_DIR/favicon-64.png" "$TEMP_DIR/favicon-128.png" "$OUTPUT_ICO"
    
    # Check if conversion was successful
    if [[ -f "$OUTPUT_ICO" ]]; then
        echo "✅ High-quality favicon.ico created successfully!"
    else
        echo "❌ ImageMagick conversion failed, falling back to FFmpeg..."
        ffmpeg -i "$FAVICON_FILE" -vf scale=64:64 -y "$OUTPUT_ICO"
    fi
else
    echo "⚠️ ImageMagick not found, using FFmpeg instead..."
    ffmpeg -i "$FAVICON_FILE" -vf scale=64:64 -y "$OUTPUT_ICO"
fi

# Check final output
if [[ -f "$OUTPUT_ICO" ]]; then
    echo "✅ favicon.ico is ready!"
else
    echo "❌ Conversion failed."
    exit 1
fi

# Clean up temp files
rm -rf "$TEMP_DIR"
echo "🧹 Temporary files deleted."
