#!/usr/bin/env bash
# repool-routed — re-pool OPEN workflow step beads that the graph.v2 dispatcher
# pre-assigned to a scale-to-zero pool session that was never spawned.
#
# Deadlock it fixes: such a bead is open + gc.routed_to=<pool> + assignee=<pool
# session name>. The session-reconciler counts only open+routed+UNASSIGNED beads as
# pool work, so it never spawns the agent. orphan-sweep only handles in_progress
# beads, so it never clears these. We clear the stale assignee (keeping the route)
# so the reconciler counts the bead and spawns the pool agent, which claims it.
#
# Guard: never re-pool work a LIVE session is actively claiming.
set -euo pipefail

SESS=$(mktemp) || exit 0
trap 'rm -f "$SESS"' EXIT

RIGS=$(gc rig list --json 2>/dev/null | jq -r '.rigs[]? | select(.hq==false) | .name' 2>/dev/null || true)

# Live (non-closed) session identities, HQ + every rig.
gc session list --json 2>/dev/null >>"$SESS" || true
while IFS= read -r r; do
  [ -z "$r" ] && continue
  gc --rig "$r" session list --json 2>/dev/null >>"$SESS" || true
done <<<"$RIGS"
LIVE=$(jq -r -s '.[].sessions[]? | select(.closed==false)
  | [.id,.session_name,.alias,.agent_name][] | select(. != null and . != "")' "$SESS" 2>/dev/null || true)

is_live() { [ -n "$1" ] && [ -n "$LIVE" ] && printf '%s\n' "$LIVE" | grep -Fxq -- "$1"; }

sweep() {
  gc bd list "$@" --status=open --json --limit=0 2>/dev/null \
    | jq -r '.[]? | select((.metadata."gc.routed_to" // "") != "" and (.assignee // "") != "")
        | "\(.id)\t\(.assignee)"' 2>/dev/null \
    | while IFS=$'\t' read -r id who; do
        if ! is_live "$who"; then
          gc bd update "$id" --assignee="" 2>/dev/null && echo "repool-routed: re-pooled $id (was assigned to $who)"
        fi
      done
}

sweep                                   # HQ scope
while IFS= read -r r; do
  [ -z "$r" ] && continue
  sweep --rig "$r"                      # each rig scope
done <<<"$RIGS"
