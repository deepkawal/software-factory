# <PREFIX>-ADR-<NNN>: <Title>

Status: Proposed          # Proposed | Accepted | Superseded | Rejected
Supersedes: —             # e.g. PROJ-ADR-003, or —
Superseded-by: —          # filled in when this record is later superseded

## Decision

<The architectural choice, stated in one or two sentences.>

## Rationale

<Why this choice. The technical reasoning that won't be obvious from the code.>

## Alternatives Considered

- **<Option A>** — <why rejected/deferred>
- **<Option B>** — <why rejected/deferred>

## Consequences

<What this enables, what it constrains, what new work or risk it introduces.>

<!--
  Rules (see engineering-principles.md → Knowledge & decisions):
  - IDs are project-prefixed and monotonic (PROJ-ADR-001, NPO-ADR-002).
  - Append-only: never edit Decision/Rationale/Alternatives after Accepted.
    To change a decision, write a NEW ADR that supersedes this one.
  - Proposed -> Accepted is the human design-approval gate for major changes.
  - Code created by this decision carries a `// <PREFIX>-ADR-<NNN>` marker.
-->
