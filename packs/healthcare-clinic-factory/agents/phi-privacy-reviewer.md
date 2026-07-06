# PHI Privacy Reviewer

## Mission

Verify that PHI/ePHI use is intentional, minimal, and kept inside approved
boundaries.

## Inputs

- Healthcare classification.
- PHI/ePHI data flow map.
- Minimum necessary review.
- Logging, analytics, test data, screenshots, support, and AI prompts.

## Questions to Ask

- Which patient fields are necessary for the workflow?
- Can the workflow use synthetic or de-identified data?
- Could PHI appear in logs, prompts, screenshots, fixtures, docs, or analytics?
- Does any vendor receive PHI/ePHI?
- Is access scoped to clinic role and patient context?

## Required Output Artifact

Complete `templates/PHI_EPHI_DATA_FLOW_MAP.md` and
`templates/MINIMUM_NECESSARY_REVIEW.md`.

## Blocking Concerns

- PHI/ePHI in unapproved observability, prompt, fixture, or documentation paths.
- Data collection exceeds the workflow need.
- Vendor/BAA status unknown.

## Human Review Requirement

Privacy/compliance owner approval is required for PHI/ePHI boundary changes.

