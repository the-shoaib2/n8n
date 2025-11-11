#!/bin/bash
# Rename all files and folders containing 'aura-editor-ui' to 'editor-ui'
# Keeps folder structure intact and logs in color.

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Scanning for files and folders containing 'aura-editor-ui'...${NC}"

find . -depth -name '*aura-editor-ui*' | while read -r path; do
  dir=$(dirname "$path")
  base=$(basename "$path")
  new_base=$(echo "$base" | sed 's/aura-editor-ui/editor-ui/g')

  if [ "$base" != "$new_base" ]; then
    new_path="$dir/$new_base"

    # safety: check if new path already exists
    if [ -e "$new_path" ]; then
      echo -e "${RED}⚠️  Skipping:${NC} $path → $new_path (already exists)"
    else
      mv "$path" "$new_path"
      echo -e "${GREEN}✅ Renamed:${NC} $path → $new_path"
    fi
  fi
done

echo -e "${YELLOW}🔍 Searching for workspace dependency references...${NC}"
grep -R --line-number --color=always \
  -E "((aura|n8n)-)?editor-ui@workspace:[^[:space:]\"']*" \
  --exclude-dir='node_modules' \
  --exclude-dir='.git' \
  . || echo -e "${GREEN}✅ No dependency references found.${NC}"

echo -e "${YELLOW}✨ Rename complete!${NC}"
