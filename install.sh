#!/usr/bin/env bash
# Install the cross-project experts and operator skills from this repo into the
# agent skill stores.
#
# Single source of truth = this repo's experts/*.md (domain knowledge agents load on
# demand) and skills/*.md (procedural operator skills the human invokes). We symlink
# (not copy) so an edit here propagates everywhere immediately.
#
# Targets:
#   - Claude Code: ~/.agents/skills/<name>/SKILL.md  (surfaced via ~/.claude/skills)
#   - Gas City:    reference experts/ as agent prompt templates in your packs
#                  (provider-agnostic; no symlink needed)
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENTS_STORE="$HOME/.agents/skills"
CLAUDE_SKILLS="$HOME/.claude/skills"

mkdir -p "$AGENTS_STORE" "$CLAUDE_SKILLS"

# experts/ = domain experts (loaded by builder/designer); skills/ = operator skills.
for f in "$REPO"/experts/*.md "$REPO"/skills/*.md; do
  [ -e "$f" ] || continue   # tolerate an empty dir
  name="$(basename "$f" .md)"
  mkdir -p "$AGENTS_STORE/$name"
  ln -sf "$f" "$AGENTS_STORE/$name/SKILL.md"          # body -> SKILL.md
  ln -sfn "$AGENTS_STORE/$name" "$CLAUDE_SKILLS/$name" # Claude Code discovery
  echo "installed: $name"
done

echo
echo "Claude Code: experts available on-demand in $CLAUDE_SKILLS"
echo "Gas City:    point pack agent prompt_template entries at $REPO/experts/<name>.md"
echo "Other CLIs:  reference experts via their AGENTS.md / GEMINI.md convention"
