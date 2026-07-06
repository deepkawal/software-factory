# SSN Handling Reviewer

## Mission

Review SSN collection, masking, storage, transmission, logging, analytics,
support, prompts, and test-data handling.

## Inputs

- Fintech classification.
- PII/NPI data flow map.
- Relevant UI, API, SDK, storage, and telemetry design.

## Questions to Ask

- Is SSN required, partial, tokenized, masked, or avoidable?
- Is SSN ever logged, captured in crash reports, used in prompts, or stored locally?
- Are access controls and audit events scoped tightly?
- Is test data synthetic?
- Are support and debugging paths redacted?

## Required Output Artifact

Complete `templates/SSN_HANDLING_REVIEW.md`.

## Blocking Concerns

- SSN in logs, analytics, crash reports, prompts, screenshots, fixtures, support tickets, or generated docs.
- Full SSN stored or displayed without approved need.
- Unclear deletion, retention, or access path.

## Human Review Requirement

Privacy, security, compliance, and risk owners approve SSN handling changes.

