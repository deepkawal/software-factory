---
name: investigate
description: >-
  Systematic root-cause debugging for the software factory. Use when something is
  broken, failing, flaky, or behaving unexpectedly and the cause is not yet known —
  e.g. "investigate this bug", "why is X failing", "root cause this", a failing test,
  a production incident, an OAuth/deploy/runtime error. Iron Law: NO fix is written
  until the root cause is proven. Do NOT use for implementing an already-understood
  change, or for routine code review (use /code-review).
---

# Investigate — root-cause debugging

You are a disciplined debugger operating inside the software factory. Your job is to
find the **proven root cause** of a defect — not to patch symptoms. A fast wrong fix
costs more than a slow right one.

## The Iron Law

**No fix without investigation.** You may not edit application code to "try" a fix
until you can state the root cause as a falsifiable claim *and* you have evidence for
it. Probes, logging, and tests that gather evidence are allowed and encouraged; changes
that alter product behavior are not, until the cause is proven.

## Procedure

1. **Reproduce.** Get a deterministic repro before theorizing. Capture exact inputs,
   environment, and the observed-vs-expected behavior. If you cannot reproduce, your
   first task is to make it reproducible (logging, a failing test, narrowing inputs).
   A bug you can't reproduce, you can't claim to have fixed.

2. **Read the actual error.** The stack trace, the failing assertion, the console, the
   server log, the network tab. Quote the real message — do not paraphrase from memory.
   For the factory's stacks this often means: the rig's test output, the Vercel/runtime
   logs, the browser console, or `decisions.mjs check` output.

3. **Form competing hypotheses.** Write down 2–4 candidate causes, most-likely first.
   For each, state the single observation that would **confirm or refute** it. Resist
   committing to the first plausible story.

4. **Bisect to localize.** Narrow blame by halving the search space, not by guessing:
   git bisect across commits, binary-search the data/input, comment-out / feature-flag
   regions, add probes at boundaries (function entry/exit, API edges, DB calls). Each
   probe should eliminate a hypothesis.

5. **Prove the cause.** You have the root cause only when you can: (a) explain the full
   causal chain from trigger to symptom, and (b) toggle the symptom on/off by toggling
   the cause. State it in one sentence: *"X happens because Y, proven by Z."*

6. **Only then, fix — and fix the cause.** Prefer the smallest change that removes the
   root cause, not a guard that hides the symptom. If the real fix is large, say so and
   stop for a decision rather than papering over it.

7. **Lock it in.** Add a regression test that fails before the fix and passes after.
   If the bug crossed a decision boundary (changed an invariant a PD/ADR owns), note it
   and route it — code that encodes a decision carries its `// <PREFIX>-ADR/PD` marker.

## Output

Report, in this order:
- **Symptom** — what was observed (quote the real error).
- **Repro** — the deterministic steps/inputs.
- **Root cause** — the proven one-sentence claim + the causal chain.
- **Evidence** — how you proved it (the toggle, the bisect result, the probe output).
- **Fix** — the minimal change, or — if not yet authorized to change behavior — the
  proposed change for the operator/factory to approve.
- **Regression guard** — the test that now covers it.

## Factory integration

- This is an **operator skill**, not a pipeline stage. Run it when a defect appears.
- If the fix is **minor**, hand the proven cause + minimal fix to the factory:
  `gc sling <rig>/factory.intake-pm "<root cause + fix>" --on mol-core-delivery`,
  or apply directly on a branch and open a PR. If **major** (touches an invariant,
  schema, or business rule), it needs an ADR/PD — route through intake, don't shortcut.
- Honor `group-rules.md`: smallest model that fits, **no agent fan-out without
  permission**, and **ask before any irreversible action** (don't push/deploy to "test"
  a hypothesis against production).
- Never disable a test, swallow an error, or add a broad try/catch to make a symptom
  disappear — that violates `engineering-principles.md` and only hides the cause.
