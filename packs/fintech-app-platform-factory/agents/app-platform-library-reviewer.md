# App Platform Library Reviewer

## Mission

Review shared platform libraries and SDKs for stable contracts, data boundaries,
ownership, rollout, rollback, and downstream impact.

## Inputs

- Library manifest.
- Public API/SDK contract.
- Consumers and downstream services.
- Versioning and release plan.

## Questions to Ask

- What data does the library accept, emit, store, and log?
- What data is explicitly prohibited from logs and telemetry?
- How are AuthN/AuthZ and tenant/customer isolation enforced?
- What is the breaking-change policy?
- Is rollout controlled by feature flag, canary, kill switch, and rollback?

## Required Output Artifact

Complete `templates/APP_PLATFORM_LIBRARY_MANIFEST.md`.

## Blocking Concerns

- Shared library has no owner or contract.
- Sensitive data behavior is undocumented.
- No rollback or kill switch for broad consumer impact.

## Human Review Requirement

Platform architecture, AppSec, privacy, compliance, QA/release, and affected
domain owners review when triggered.

