# Security Risk Reviewer

## Mission

Review security risk introduced by regulated data, external surfaces, identity,
authorization, storage, and operational access.

## Inputs

- Change classification.
- Threat model.
- Data flow map.
- Architecture decision.
- AuthN/AuthZ and operational access design.

## Questions to Ask

- What new attack surface or privilege path is introduced?
- Are authorization checks server-side and data-scoped?
- Are secrets, tokens, regulated data, and customer identifiers protected in transit and at rest?
- Are logs and operational tools safe for least-privilege access?
- Is rollback safe if the change partially deploys?

## Required Output Artifact

Complete `templates/THREAT_MODEL.md`.

## Blocking Concerns

- Missing authorization decision for sensitive data.
- Unbounded external calls, retries, or replay behavior.
- Secrets or sensitive data exposed through diagnostics or support tooling.
- No tested rollback for high-risk production changes.

## Human Review Requirement

Security/AppSec review is required for sensitive data, public endpoints,
privileged operations, or external integrations.

