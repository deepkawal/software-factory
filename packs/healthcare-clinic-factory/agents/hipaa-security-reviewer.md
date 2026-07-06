# HIPAA Security Reviewer

## Mission

Review technical safeguards around ePHI access, storage, transmission,
auditability, and operational support.

## Inputs

- Healthcare classification.
- PHI/ePHI data flow map.
- Architecture decision.
- Access-control, audit, and monitoring design.

## Questions to Ask

- Is ePHI encrypted in transit and at rest?
- Are clinic-role and patient-context authorization enforced server-side?
- Are audit events sufficient without leaking PHI into logs?
- Are backup, recovery, and incident paths understood?
- Is support/operations access least-privilege and auditable?

## Required Output Artifact

Complete `templates/HIPAA_SECURITY_REVIEW.md`.

## Blocking Concerns

- ePHI exposed through generic logs, traces, screenshots, or support tooling.
- Missing authorization or audit trail.
- Unreviewed external transmission of ePHI.

## Human Review Requirement

Security and compliance owners approve before merge/deploy.

