---
name: qa-exploratory
description: >-
  Exploratory QA — drive the running app like a real user to find the bugs that
  scripted tests miss, then report (and optionally fix) them. Use when the user wants
  to "QA the app", "test this like a user", "find bugs in the UI", do a pre-ship sweep,
  or verify a feature actually works end-to-end in the browser. Two modes: report-only
  (default) and fix. Do NOT use for writing unit tests or for debugging a known failure
  (use /investigate) — this is open-ended discovery against the live app.
---

# QA — exploratory testing

You test the **running application**, not the source. Scripted e2e (Playwright) proves
the paths you already thought of; your job is to find the ones you didn't — the empty
state, the double-click, the back button, the long input, the offline reload, the
second occasion, the stale cache.

## Modes

- **report-only (default):** find and document bugs. Make **no** code changes. Produce a
  clean bug report the factory can turn into beads.
- **fix:** when the operator says "and fix them", fix each confirmed bug with an atomic
  commit per bug and re-verify in the browser. Anything that touches a business rule or
  invariant is out of scope for a quick fix — file it as a bead instead.

State which mode you're in before you start.

## Procedure

1. **Launch the real app.** Prefer the project's run skill / documented command (for a
   Vercel app, the deployed URL or `vercel dev`; otherwise the dev server). Drive it with
   a real browser (the factory has Chromium installed; Playwright e2e config points at
   `$PLAYWRIGHT_CHROMIUM_PATH` / `/snap/bin/chromium`). Confirm it loads before testing.

2. **Map the surface.** List the screens, flows, and interactive elements. Derive flows
   from the project's CLAUDE.md / PDs (the *intended* behavior) so you test against the
   contract, not your assumptions.

3. **Attack each flow.** For every flow, exercise the states scripted tests skip:
   - **Three states of every view:** loading, error, empty (a view that only renders
     success is incomplete — per `web-expert`).
   - **Boundaries:** empty input, very long input, special characters, 0 / 1 / many.
   - **Sequencing:** back/forward, refresh mid-flow, double-submit, rapid clicks.
   - **Persistence:** reload and confirm state survives (e.g. localStorage —
     onboarding → menu → weekly plan should persist; per-occasion edits must not leak
     across occasions — that was a real shipped bug).
   - **Cross-cutting:** responsive/mobile width, keyboard-only nav, obvious a11y gaps.

4. **Confirm before reporting.** Reproduce each bug a second time and capture exact
   steps. Distinguish a real defect from intended behavior by checking the PD/spec — if
   unclear, flag it as a question, not a bug.

## Output — the bug report

For each finding:
- **Title** — one line, specific.
- **Severity** — blocker / major / minor / polish.
- **Steps to reproduce** — exact, numbered.
- **Expected vs actual** — and the PD/spec it violates, if any.
- **Evidence** — screenshot path or the console/network error.

End with a one-line summary count by severity, and — for report-only mode — a ready
`gc sling` line per blocker/major so the operator can route fixes into the factory.

## Factory integration

- **Operator skill**, run before ship or after a UI bead merges — complements the
  validator (which runs scripted tests + `decisions check`), it does not replace it.
- In **fix** mode, honor `group-rules.md`: smallest model, **no fan-out without
  permission**, **ask before irreversible actions**. Keep fixes minimal and atomic; do
  not refactor under the banner of QA.
- A confirmed-but-not-understood bug → hand to `/investigate` for root cause; a
  rule/invariant change → route through `factory.intake-pm` so it gets a PD/ADR.
- Grade UI work against `production-guardrails.md` for the project's declared tiers
  (e.g. `client`) — don't mark a localStorage app as failing `database`-tier rules.
