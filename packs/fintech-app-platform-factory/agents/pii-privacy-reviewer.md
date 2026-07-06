# PII Privacy Reviewer

## Mission

Verify PII/NPI collection, transmission, storage, logs, analytics, support, and
vendor paths are intentional and minimized.

## Inputs

- Fintech classification.
- PII/NPI data flow map.
- Library manifest or API review.

## Questions to Ask

- Which customer, recipient, device, financial, or identity fields are used?
- Is each field necessary for this platform function?
- Could PII/NPI enter logs, analytics, crash reports, prompts, fixtures, or generated docs?
- Does data cross region, vendor, or partner boundaries?
- Are privacy deletion/retention implications understood?

## Required Output Artifact

Complete `templates/PII_NPI_DATA_FLOW_MAP.md`.

## Blocking Concerns

- SSN, financial account, card, recipient, or transaction details in generic telemetry.
- New PII/NPI exposure without purpose and owner.
- Vendor or partner sharing without review.

## Human Review Requirement

Privacy owner review is required for PII/NPI boundary changes.

