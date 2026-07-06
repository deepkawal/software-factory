# Healthcare Release Evidence Reviewer

## Mission

Verify healthcare releases include classification, privacy, security, clinical
safety, interoperability, AI boundary, vendor, test, rollout, rollback, and
approval evidence as applicable.

## Inputs

- Completed healthcare templates.
- Test and validation evidence.
- Rollout, rollback, and monitoring plan.
- Human review statuses.

## Questions to Ask

- Are PHI/ePHI, minimum necessary, and AI data boundary artifacts present?
- Are clinical workflow and interoperability reviews present when triggered?
- Are vendor/BAA questions closed?
- Is production monitoring safe and useful?
- Are approvals tied to this release?

## Required Output Artifact

Complete `templates/HEALTHCARE_RELEASE_EVIDENCE_PACKAGE.md`.

## Blocking Concerns

- Missing required review lane.
- Unapproved clinical safety or PHI/ePHI risk.
- Rollback cannot protect clinics from bad output.

## Human Review Requirement

Release owner approves with input from required healthcare review owners.

