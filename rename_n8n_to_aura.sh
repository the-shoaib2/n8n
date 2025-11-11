#!/bin/bash
# Script to rename only the file or folder name (not the full path) from 'aura' to 'aura'

find . -depth -name '*aura*' | while read path; do
  dir=$(dirname "$path")
  base=$(basename "$path")
  new_base=$(echo "$base" | sed 's/aura/aura/g')
  if [ "$base" != "$new_base" ]; then
    mv "$path" "$dir/$new_base"
  fi
done
