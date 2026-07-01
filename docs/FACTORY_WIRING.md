# Factory Wiring — at a glance

The `core-factory` Gas City pack: a **hybrid** software factory (autonomous for routine
work, human-in-the-loop for major changes). One **city** hosts many **rigs** (projects);
this pack is imported per-rig as `factory`. Formula: `mol-core-delivery` (graph.v2).

![Agentic AI Autonomous Software Factory](factory-wiring-diagram.png)

> The full-resolution, interactive source is [`factory-wiring-diagram.html`](factory-wiring-diagram.html).
> The ASCII view below is the quick reference.

## Pipeline

```
 work bead
    │
    ▼
┌──────────┐   ┌────────────────┐   ┌─────────┐   ┌───────────┐   ┌────────────────────────┐
│ intake-pm│──▶│ product-reviewer│──▶│ planner │──▶│ architect │──▶│ architecture-reviewer  │
│  [H/gate]│   │   [R] → PD      │   │         │   │ [O] → ADR │   │ [R] ★EXTERNAL GATE★    │
└──────────┘   └────────────────┘   └─────────┘   └───────────┘   └───────────┬────────────┘
  triage:                                            major lane only            │ major: ADR must be
  change_class                                       writes ADR(Proposed)       │ Accepted before build
  needs_design                                                                  ▼
        ┌────────────────────────────────────────────────────────────────────────────────┐
        ▼                                                                                    
   ┌──────────┐        ┌─────────┐   ┌──────────────┐   ┌───────────┐   ┌──────────────┐
   │ designer │───────▶│ builder │──▶│ code-reviewer │──▶│ validator │──▶│ release-gate │──▶ PR
   │ [gated]  │        │ +expert │   │  [R] markers  │   │  [G] gate │   │ [G] ★HUMAN★  │   │
   └──────────┘        └─────────┘   └──────────────┘   └───────────┘   └──────────────┘   ▼
   needs_design=true   loads          quality + decision  tests +         opens PR,        human
   → /inhabited-design  *-expert      markers + `decisions  `decisions`    never merges     merges
   (lite); else pass    skill         check` (≤3 loops)     check          (branch protec.)  to main
```

## Component markers

| Mark | Meaning |
|------|---------|
| `[H]` | front gate — triages every bead |
| `[R]` | one of the **three reviewers** (Product · Architecture · Code) |
| `[O]` | **Opus tier** intended (deep reasoning) — see Model tiers |
| `[G]` | quality **gate** — blocks progress until green |
| `★HUMAN★` | human-in-the-loop gate (design approval; PR merge) |
| `+expert` | loads a domain expert skill at runtime |

## Agents (10) — role · owns

| Agent | Role | Owns / produces |
|-------|------|-----------------|
| **intake-pm** | triage + Grill-Me | sets `change_class` (minor/major) + `needs_design` |
| **product-reviewer** `[R]` | product intent | **Product Decisions** (`docs/product-decisions/`) |
| **planner** | decomposition | `docs/plans/<slug>.md` + acceptance criteria |
| **architect** `[O]` | architecture (major) | **ADRs** (`docs/decisions/`) Proposed + **review packet** (`docs/reviews/<id>-review-packet.md`) |
| **architecture-reviewer** `[R]` | external-review gate (OpenAI / Codex) | reviews the packet itself on Codex; records feedback in `docs/reviews/`; parks for operator ADR Accept |
| **designer** | UI/UX (gated) | `docs/designs/<slug>/index.html` via inhabited-design plugin |
| **builder** `+expert` | implementation | feature branch + code + `// <PREFIX>-ADR/PD` markers |
| **code-reviewer** `[R]` | code quality | verdict; verifies markers + runs `decisions check` |
| **validator** `[G]` | verification | runs tests + `decisions check` + acceptance criteria |
| **release-gate** `[G]` | delivery | opens PR; **stops** — human merges (branch protection) |

## The two lanes (hybrid)

- **Minor** (bug fix / small change): runs autonomously to a PR. **One** human gate — the merge.
- **Major** (new subsystem / arch / schema / business rule): architect writes an ADR + a
  self-contained review packet → architecture-reviewer **reviews it on Codex (OpenAI)** and
  records the feedback → **human approves** (ADR `Proposed → Accepted`) before build.
  **Two** human gates — design approval + merge. (Requires the `codex` CLI installed +
  authenticated; the per-provider codex overlay supplies the session hooks. `provider="codex"`
  is already the default for both reviewers.)

Lane is chosen by `metadata.change_class` (set by intake-pm). UI work additionally gets the
**designer** stage via `metadata.needs_design=true` (else it passes through, no token cost).

## Knowledge discipline (the factory's memory)

- **Code is source of truth** for derivable facts — never hand-documented; derive with tools.
- **ADRs** (`docs/decisions/`) = technical "why". **PDs** (`docs/product-decisions/`) = product "why".
  Append-only; supersede, never edit. Namespaced monotonic IDs (`PROJ-ADR-007`).
- **Code markers** `// PROJ-ADR-007` / `// PROJ-PD-014` link code → record → rationale.
- **`tools/decisions.mjs check`** verifies: no dangling/stale markers, no orphan Accepted
  records, every Accepted PD has a passing test. Run by code-reviewer + validator (CI gate).

## Shared assets (sibling `factory-skills/` repo)

| Path | What |
|------|------|
| `experts/*.md` | domain experts (api, web, ios, android, devops) — builder/designer load on demand |
| `rules/group-rules.md` | Non-negotiable (token/agent governance, model tiers) + Defaults |
| `rules/engineering-principles.md` | code quality + knowledge/decision discipline |
| `templates/{ADR,PD}_TEMPLATE.md` | record templates |
| `tools/decisions.mjs` | the decisions verifier |

## Model tiers (per `group-rules.md`; set via agent `provider`)

| Tier / provider | Agents | Why |
|------|--------|-----|
| **Opus** | architect | deep architectural reasoning |
| **Sonnet** | builder, planner, product-reviewer, validator, release-gate, designer | routine engineering |
| **OpenAI (Codex)** | code-reviewer, architecture-reviewer | independent external review — a second model family checks the work |
| **Haiku** | intake-pm | light triage |

> **Code review and architecture review run on a second model family (OpenAI Codex).**
> Reviewing with a different provider than the one that produced the work gives an independent
> perspective — it catches issues the author's own model is prone to miss. The
> architecture-reviewer reviews the architect's packet itself and records feedback, but never
> self-accepts: the operator still owns the ADR `Proposed → Accepted` move. Requires the
> `codex` CLI installed + authenticated; `provider="codex"` is already the default for both
> reviewers (the per-provider codex overlay supplies the session hooks).

No multi-agent fan-out without explicit permission; prefer the smallest model that fits.

## Infrastructure mechanics

- **`orders/repool-routed.toml`** (20s exec order) — re-pools open routed step beads the
  graph.v2 dispatcher pre-assigned to unspawned scale-to-zero pool sessions. Without it the
  pipeline deadlocks (reconciler counts only open+routed+**unassigned** beads as pool work).
- **`overlay/per-provider/claude/.claude/settings.json`** — enables the inhabited-design
  plugin durably for every claude agent session (composed in at spawn).
- Agents are **scale-to-zero** (min=0): they materialize when a bead is routed to them, do the
  work, and exit ("done means gone"). Idle = correct resting state.

## Install (per rig)

```bash
gc import add --rig <rig> --name factory <path>/factory-skills/packs/core-factory
gc doctor          # expect config-valid + config-refs green
gc restart         # bring the agent roster up
gc sling <rig>/factory.intake-pm "<request>" --on mol-core-delivery
```
