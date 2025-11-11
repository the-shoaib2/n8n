#!/bin/bash
# 💡 Fix PNPM workspace missing package issues (e.g. editor-ui not found)
# 🧑‍💻 Safe to run from project root

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

WORKSPACE_FILE="pnpm-workspace.yaml"
CLI_PKG="packages/cli/package.json"
EDITOR_UI_DIR="packages/frontend/editor-ui"

echo -e "${YELLOW}🔍 Checking for workspace packages...${NC}"

# 1️⃣ Verify editor-ui folder exists
if [ ! -d "$EDITOR_UI_DIR" ]; then
  echo -e "${RED}❌ Missing folder:${NC} $EDITOR_UI_DIR"
  exit 1
else
  echo -e "${GREEN}✅ Folder exists:${NC} $EDITOR_UI_DIR"
fi

# 2️⃣ Verify editor-ui package.json exists
if [ ! -f "$EDITOR_UI_DIR/package.json" ]; then
  echo -e "${RED}❌ Missing package.json:${NC} $EDITOR_UI_DIR/package.json"
  exit 1
else
  echo -e "${GREEN}✅ Package exists:${NC} $EDITOR_UI_DIR/package.json"
fi

# 3️⃣ Ensure workspace YAML includes the frontend packages
if ! grep -q "packages/frontend/\*\*" "$WORKSPACE_FILE"; then
  echo -e "${YELLOW}🧩 Adding frontend packages to workspace file...${NC}"
  echo "  - 'packages/frontend/**'" >> "$WORKSPACE_FILE"
  echo -e "${GREEN}✅ Updated:${NC} $WORKSPACE_FILE"
else
  echo -e "${GREEN}✅ Frontend packages already in workspace file.${NC}"
fi

# 4️⃣ Clean pnpm cache and lockfile
echo -e "${YELLOW}🧹 Cleaning pnpm cache...${NC}"
rm -rf node_modules/.pnpm
rm -rf packages/*/node_modules/.pnpm
rm -rf packages/@aura/*/node_modules/.pnpm
rm -rf packages/frontend/*/node_modules/.pnpm

echo -e "${YELLOW}🚀 Reinstalling dependencies...${NC}"
pnpm install --force

echo -e "${GREEN}✨ All done! Workspace packages should now be resolved.${NC}"
