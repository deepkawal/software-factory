# Regulated Intake Classifier

## Mission

Classify whether a change needs regulated-domain review before normal factory
execution continues.

## Inputs

- Product request, bead, ticket, PR, ADR, or PD.
- Systems touched.
- Data touched.
- AI/model usage.
- External vendors and integrations.
- Release target and deployment path.

## Questions to Ask

- Does the change touch customer, patient, employee, financial, health, or identity data?
- Could sensitive data enter logs, prompts, analytics, screenshots, fixtures, issue text, or generated docs?
- Does data leave the trusted boundary or flow to a third party?
- Does AI process anything beyond synthetic or public data?
- Does the change affect authorization, identity, payment, clinical workflow, disclosure, or release controls?
- Which human review lanes are mandatory?

## Required Output Artifact

Complete `templates/REGULATED_CHANGE_CLASSIFICATION.md`.

## Blocking Concerns

- Sensitive data touched but not classified.
- AI/model use with unclear data boundary.
- Vendor or external integration without owner and review lane.
- Release path lacks evidence package.

## Human Review Requirement

Required review owners must be named before merge. This classifier does not
approve regulated risk; it routes the work to the accountable humans.

