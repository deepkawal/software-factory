# START HERE

> **The 10-minute rule:** if a new engineer or AI agent can't get oriented in 10 minutes from this
> file, it isn't doing its job. Everything below links to the authoritative doc — this is a map, not a copy.

---

### 1. What is this?
A reusable **agentic software factory**: a multi-agent build pipeline that takes a unit of work
("a bead") from intake all the way to an opened pull request, while enforcing engineering quality
and a durable decision record. It's a [Gas City](https://github.com/) pack (`packs/core-factory/`)
plus the shared experts, rules, and decision-record tooling that keep it honest.
→ `docs/FACTORY_WIRING.md`

### 2. Why does it exist?
To make AI-driven software delivery **repeatable and accountable** — not a one-shot prompt, but a
pipeline where every change is triaged, reviewed by role-specialized agents, gated on real tests,
and recorded as a decision you can trace back from the code. It is **hybrid**: autonomous for
routine work, human-in-the-loop for architectural change. → `docs/FACTORY_WIRING.md` §"The two lanes"

### 3. What's in the box?
- ✅ **The pipeline** — `packs/core-factory/`: 10 cooperating agents (intake-pm → product-reviewer →
  planner → architect → architecture-reviewer → designer → builder → code-reviewer → validator →
  release-gate), the `mol-core-delivery` formula, and the infra orders that run them.
- ✅ **Domain experts** — `experts/`: api, web, ios, android, devops senior-engineer guidance, loaded
  on demand by the builder/designer.
- ✅ **Rules** — `rules/`: engineering principles, operating/governance rules, and a tier-aware
  production-guardrails standard.
- ✅ **Decision discipline** — `templates/` (ADR + PD) and `tools/decisions.mjs`, the zero-dep verifier.
- ✅ **Skills** — `skills/`: investigate, qa-exploratory, release-deploy-verify.

→ This is a *snapshot*. The single owner of pipeline wiring is `docs/FACTORY_WIRING.md`.

### 4. What's the architecture?
One **city** (the factory) hosts many **rigs** (projects); this pack is imported per-rig as `factory`.
A work bead flows one direction through the pipeline; **two lanes** decide how much human oversight it
gets:
`intake-pm triages → (minor) build autonomously → PR` **or** `(major) architect writes an ADR →
external review → human accepts → build → PR`. Agents are **scale-to-zero** — they materialize when a
bead is routed to them, do the work, and exit. → `docs/FACTORY_WIRING.md`; diagram in
`docs/factory-wiring-diagram.html`.

### 5. Where do I start reading?
`README.md` → `docs/FACTORY_WIRING.md` → `rules/engineering-principles.md` +
`rules/group-rules.md` → `rules/production-guardrails.md` → the agent prompts under
`packs/core-factory/agents/*/prompt.template.md`.

### 6. How do I run it?
You need [Gas City](https://github.com/) (`gc`) installed and a project ("rig"). From your city dir:
```bash
gc import add --rig <rig> --name factory <path>/factory-skills/packs/core-factory
gc doctor          # expect config-valid + config-refs green
gc restart         # bring the agent roster up
gc sling <rig>/factory.intake-pm "<your request>" --on mol-core-delivery
```
The **decisions** verifier runs standalone (Node ≥ 18), no `gc` required:
```bash
node tools/decisions.mjs check    # gate: 0 errors = pass
```
→ full per-rig install in `docs/FACTORY_WIRING.md` §Install.

### 7. Where are the agents defined?
`packs/core-factory/agents/<name>/` — each has an `agent.toml` (pool/provider/dispatch) and a
`prompt.template.md` (the role's instructions). The 10 roles and what each owns are in
`docs/FACTORY_WIRING.md` §Agents.

### 8. What's the knowledge discipline?
**Code is the source of truth** for anything derivable — never hand-documented. Everything else is a
**decision record**: ADRs (`docs/decisions/`, technical "why") and PDs (`docs/product-decisions/`,
product "why") in the *consuming project*. Append-only, supersede-don't-edit, namespaced monotonic IDs
(`PROJ-ADR-001`), and code carries `// PROJ-ADR/PD-NNN` markers. `tools/decisions.mjs check` enforces
no dangling/stale/orphan markers and PD↔test coverage.

### 9. How do the model tiers work?
Set per agent via the `provider` field in `agent.toml`. Default mapping: **Opus** for the architect
(deep reasoning), **Sonnet** for builder/planner/reviewers/validator/release-gate/designer, **Haiku**
for intake-pm triage. Escalate to Opus only for deep reasoning — never silently upgrade.
→ `rules/group-rules.md` + `docs/FACTORY_WIRING.md` §Model tiers.

### 10. How do I contribute?
Branch off `main` → implement → Conventional Commits → push → open a PR → **stop** (the maintainer owns
the merge — that's the release gate, same discipline the factory itself follows). A change to factory
behavior should explain its rationale; a change to the rules should say what it stops going wrong.
→ `CONTRIBUTING.md`.

---

**Unfamiliar term?** (bead, sling, rig, marker, the gate, scale-to-zero…) → `docs/FACTORY_WIRING.md`
defines them inline.

**The one rule that explains everything:** *this factory records decisions, not descriptions.* If you
change a tradeoff, write an ADR; if you change a rule, write a PD with a test; mark the code with
`// PROJ-ADR/PD-NNN`. Facts you can derive from code aren't documented — derive them.
