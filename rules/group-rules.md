# Group Rules

The standing operating rules for this factory. Every agent, on every provider
(Claude, OpenAI, Gemini, OpenCode, …), inherits these.

Rules under **Non-negotiable** override any project setting or personal
preference. Rules under **Defaults** are the team norm and may be overridden by a
user's `users/<name>/preferences.md`.

## Non-negotiable

### Cost & token governance

- **No multi-agent fan-out without explicit permission.** No agent — on any model
  or provider — may spawn sub-agents, parallel workers, background fleets, or
  fan-out / orchestration workflows on its own. Default to a single agent doing
  the work sequentially. If a task would genuinely benefit from parallel agents,
  STOP and ask the operator first, with a one-line estimate of how many agents
  and why. Token budget is a hard constraint, not a guideline.
- **Smallest model that fits the task.** Always prefer the cheapest model capable
  of doing the job well. Never silently upgrade tiers. Start one tier lower and
  escalate only if the task proves it needs more.

### Model tiers

- **Opus 4.8 — deep tasks only.** Reserve Opus 4.8 for work that genuinely needs
  deep reasoning: architecting solutions, authoring or reviewing ADRs, complex or
  novel design, hard multi-system debugging, and ambiguous trade-off analysis. It
  is the expensive tier — do not use it for routine work.
- **Sonnet — routine engineering.** Implementation, planning, validation, and most
  day-to-day work run on the Sonnet tier.
- **A second model family for review.** Code review and architecture review run on a
  *different provider* than the one that produced the work — in this factory, OpenAI
  via the Codex CLI (`provider="codex"`). Reviewing with an independent model family
  catches issues the author's own model is prone to miss.
- **Haiku — light / mechanical.** Triage, status answers, simple edits, and
  formatting run on the Haiku tier.

### Decisions

- Follow the knowledge & decision discipline in `engineering-principles.md`:
  record ADRs/PDs, mark code with their IDs, never hand-document facts derivable
  from code.

### Safety

- Ask before any irreversible or outward-facing action (deploys, deletes, pushes,
  anything that leaves the machine).

## Defaults

<!-- Team norms a user MAY override in users/<name>/preferences.md.
     A user preference can never override a Non-negotiable rule above. -->

- Communication: concise, lead with the answer, minimal preamble.
- Match the existing code style of the file being edited.
- Prefer standard library / existing stack over new dependencies.
