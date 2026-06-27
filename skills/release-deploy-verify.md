---
name: release-deploy-verify
description: >-
  Land a merged PR all the way to verified production — merge, wait for CI, deploy,
  confirm prod health, then watch briefly for regressions (land-and-deploy + canary in
  one). Use when the user wants to "ship to prod", "deploy and verify", "land this PR",
  or "confirm production is healthy after deploy". This step performs OUTWARD-FACING,
  hard-to-reverse actions — it ALWAYS confirms before merging and before deploying. Do
  NOT use to open a PR (the factory's release-gate does that) or for local-only testing.
---

# Release · Deploy · Verify

You take an **already-reviewed, green PR** and land it to **verified production**. The
factory's `release-gate` opens the PR and stops at the human merge gate by design; this
skill is the operator-driven step that runs *after* that gate — it never bypasses it.

## Hard rule: this is outward-facing

Merging, pushing, and deploying are **irreversible and outward-facing** (`group-rules.md`
safety rule). **Confirm with the operator before merging and again before deploying to
production.** Approval to merge is not approval to deploy. Never self-merge a PR the
operator hasn't approved, and never promote to prod without an explicit go.

## Procedure

1. **Pre-flight the PR.** Confirm: CI green, required reviews satisfied, branch up to
   date with base, no merge conflicts. Re-run the rig's tests + `node
   ../factory-skills/tools/decisions.mjs check` if there's any doubt. Red ⇒ stop, hand
   back (or to `/investigate`). Do not merge to "see if CI passes."

2. **Merge (with confirmation).** On operator go, merge to `main` (squash/standard per
   the project's convention; respect branch protection). Confirm the merge commit.

3. **Wait for CI on main.** Watch the post-merge pipeline to completion. A green PR can
   still fail on main (different env, integration). Do not deploy until main is green.

4. **Deploy (with confirmation).** On operator go, deploy via the project's documented
   path — the exact command lives in the project's `CLAUDE.md` / docs (e.g. a Vercel,
   container, or platform-CLI flow). Use the project's actual current command — verify
   against `CLAUDE.md`, don't assume.

5. **Verify prod health.** After the deploy reports READY, prove production actually
   works — don't trust "READY":
   - HTTP 200 on the canonical URL and key routes.
   - The headline user flow works in a real browser (the core end-to-end path a user
     takes, persisted across reload; sign-in if the auth tier is live).
   - Guarded/health endpoints return expected status (e.g. `/api/...` guarded, security
     headers present).
   - No new console errors / 5xx in the logs.

6. **Canary watch.** Briefly monitor after deploy (console errors, perf regressions,
   error-rate). If a regression appears, **roll back first** (redeploy the prior good
   deployment / Vercel promote previous), then `/investigate` — never debug forward on a
   broken prod.

## Output

- **Merged:** PR #, merge commit sha, new `main` sha.
- **Deployed:** deployment id + URL, READY confirmation.
- **Verified:** the checks you actually ran and their results (status codes, the flow
  you clicked, log state) — report failures plainly, never claim green you didn't see.
- **Watch result:** clean, or the regression + the rollback you performed.

## Factory integration

- **Operator skill** — the deploy/verify tail the autonomous pipeline intentionally
  leaves to a human. Closes the SHIP phase gap (gstack `/land-and-deploy` + `/canary`).
- After a successful land, the rig's docs may have drifted — follow up by de-staling
  CLAUDE.md / decision records (the `document-release` gap) so the next build starts from
  truth.
- ⚠️ Do not run git ops on the monorepo working tree while the factory is mid-build —
  agents share `main` and the builder branches off it (see factory-rig-topology).
