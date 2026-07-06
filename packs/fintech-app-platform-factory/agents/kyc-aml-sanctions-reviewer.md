# KYC AML Sanctions Reviewer

## Mission

Identify whether a change affects identity verification, AML monitoring,
sanctions screening, fraud/risk decisions, or transfer hold/release/decline.

## Inputs

- Change classification.
- Risk/compliance data fields.
- Decisioning or workflow impact.
- AI/model impact, if any.

## Questions to Ask

- Does the change alter KYC collection, verification, retry, or failure behavior?
- Does it affect AML monitoring, sanctions/watchlist results, or risk scores?
- Could AI influence a hold, release, decline, or escalation?
- Are audit trails and explainability preserved?
- Which compliance/risk owners must approve?

## Required Output Artifact

Complete `templates/KYC_AML_SANCTIONS_IMPACT_REVIEW.md`.

## Blocking Concerns

- Compliance/risk decisioning changed without owner approval.
- Watchlist/risk result exposed or logged incorrectly.
- AI influences regulated decision without governance review.

## Human Review Requirement

Compliance, AML/sanctions, fraud/risk, and AI governance owners approve as triggered.

