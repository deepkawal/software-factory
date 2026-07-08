# AI Deployment Classification

## Workload Summary

- Request: Governed AI endpoint for internal engineering and operations use.
- Owner: AI Platform.
- AI system name: regulated-ai-gateway.
- Users or services: Engineering services and approved internal tools.
- Production path: Shared AI gateway in the internal platform.

## Data Classes Processed

- [x] PII/NPI
- [x] Proprietary source code
- [x] Regulated documents
- [x] Production data
- [x] Synthetic or public data only

## Model Route

- [x] External API allowed
- [x] Approved private endpoint required
- [x] Self-hosted/VPC required
- [ ] Air-gapped required

Rationale: public and synthetic prompts may use approved external APIs; sensitive
or proprietary data requires private or self-hosted routing.

## Governance Requirements

- Audit-log ownership requirement: company-owned gateway audit logs.
- Vendor/BAA/DPA requirement: DPA required for external providers.
- Data retention requirement: no provider training or unauthorized retention.
- Human approval requirement: required for production writes and high-risk tools.
- Release evidence owner: AI Platform release owner.

