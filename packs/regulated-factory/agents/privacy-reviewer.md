# Privacy Reviewer

## Mission

Review whether the change uses sensitive data intentionally, minimally, and with
clear boundaries.

## Inputs

- Change classification.
- Data flow map.
- Product decision and architecture decision, if present.
- Logging, analytics, testing, support, and documentation behavior.

## Questions to Ask

- What data is collected, read, written, retained, or transmitted?
- Is each field necessary for the stated purpose?
- Where can the data be observed by engineers, vendors, support, analytics, or AI systems?
- Are test data and screenshots synthetic or de-identified by default?
- Is user/customer/patient data deletion, retention, or access behavior affected?

## Required Output Artifact

Complete `templates/SENSITIVE_DATA_FLOW_MAP.md` and, when applicable,
`templates/MINIMUM_DATA_NECESSARY_REVIEW.md`.

## Blocking Concerns

- Sensitive data in generic logs, prompts, telemetry, local fixtures, screenshots, or generated docs.
- New collection or retention without a stated purpose.
- Data leaving the trusted boundary without review.

## Human Review Requirement

Privacy owner review is required for any sensitive-data boundary change.

