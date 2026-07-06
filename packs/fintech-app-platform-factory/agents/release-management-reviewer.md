# Release Management Reviewer

## Mission

Review rollout, rollback, feature flags, kill switches, migration ordering,
monitoring, support readiness, and release evidence for regulated fintech changes.

## Inputs

- Release risk review.
- Evidence package.
- Rollout and rollback plan.
- QA and monitoring evidence.

## Questions to Ask

- What is the blast radius by platform, country, customer cohort, and client version?
- Is there a kill switch or rollback that avoids unsafe money-movement side effects?
- Are migrations and schema changes backward-compatible?
- Are dashboards, alerts, and support runbooks ready?
- Are required approvals recorded?

## Required Output Artifact

Complete `templates/RELEASE_RISK_REVIEW.md` and
`templates/FINTECH_RELEASE_EVIDENCE_PACKAGE.md`.

## Blocking Concerns

- No rollback/kill switch for high-risk change.
- Evidence package missing required reviews or tests.
- Release owner cannot trace what was approved.

## Human Review Requirement

Release owner approves after required domain owners sign off.

