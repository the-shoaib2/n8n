#!/bin/bash
# Rename all files and folders containing 'n8n' to 'aura' (case-sensitive)
# Only changes base name, keeps directory structure.
# Logs in color for clarity.

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Scanning for files and folders containing 'n8n'...${NC}"

find . -depth -name '*n8n*' | while read -r path; do
  dir=$(dirname "$path")
  base=$(basename "$path")
  new_base=$(echo "$base" | sed 's/n8n/aura/g')

  if [ "$base" != "$new_base" ]; then
    new_path="$dir/$new_base"

    # Handle conflicts safely
    if [ -e "$new_path" ]; then
      echo -e "${RED}⚠️  Skipping: ${NC}$path → ${new_path} (already exists)"
    else
      mv "$path" "$new_path"
      echo -e "${GREEN}✅ Renamed:${NC} $path → ${new_path}"
    fi
  fi
done

echo -e "${YELLOW}✨ Rename complete!${NC}"
