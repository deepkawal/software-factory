# <PREFIX>-PD-<NNN>: <Title>

Status: Proposed          # Proposed | Accepted | Superseded | Rejected
Supersedes: —
Superseded-by: —

## Decision

<The product/business rule, stated precisely enough to test.>

## Reason

<Why the product behaves this way. The business/user rationale.>

## Impact

<What this constrains in the product and the code; what it rules in or out.>

## Enforced by

- test: `<path/to/test>`        # every Accepted PD links to an enforcing test
- code: `// <PREFIX>-PD-<NNN>` on the relevant constant(s) and check(s)

<!--
  Rules (see engineering-principles.md → Knowledge & decisions):
  - IDs are project-prefixed and monotonic (PROJ-PD-001).
  - Append-only: never edit Decision/Reason after Accepted; supersede instead.
  - A PD with no enforcing test is a gap, not a record.
-->
