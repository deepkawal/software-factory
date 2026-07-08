# AI Deployment Classification

## Workload Summary

- Request: Hybrid model routing for support and operations AI workflows.
- Owner: Fintech Platform.
- AI system name: fintech-hybrid-model-routing.
- Users or services: Support tools and operations services.
- Production path: AI gateway with external and VPC routes.

## Data Classes Processed

- [x] PII/NPI
- [x] SSN
- [x] Customer financial information
- [x] Regulated documents
- [x] Production data
- [x] Synthetic or public data only

## Model Route

- [x] External API allowed
- [x] Approved private endpoint required
- [x] Self-hosted/VPC required
- [ ] Air-gapped required

## Governance Requirements

- Audit-log ownership requirement: company-owned logs for all regulated requests.
- Vendor/BAA/DPA requirement: DPA required for approved external APIs.
- Data retention requirement: no regulated prompt or output retained by external providers.
- Human approval requirement: required for payment, KYC, sanctions, or account-impacting actions.
- Release evidence owner: Fintech release owner.

