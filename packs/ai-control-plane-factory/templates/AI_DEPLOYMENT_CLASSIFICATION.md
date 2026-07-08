# AI Deployment Classification

## Workload Summary

- Request:
- Owner:
- AI system name:
- Users or services:
- Production path:

## Data Classes Processed

- [ ] PHI/ePHI
- [ ] PII/NPI
- [ ] SSN
- [ ] Customer financial information
- [ ] Proprietary source code
- [ ] Secrets
- [ ] Regulated documents
- [ ] Production data
- [ ] Synthetic or public data only

## Model Route

- [ ] External API allowed
- [ ] Approved private endpoint required
- [ ] Self-hosted/VPC required
- [ ] Air-gapped required

Rationale:

## Governance Requirements

- Audit-log ownership requirement:
- Vendor/BAA/DPA requirement:
- Data retention requirement:
- Human approval requirement:
- Release evidence owner:

## Review Questions

- What is the most sensitive data class the model can receive?
- Can sensitive data be filtered before model invocation?
- Does any prompt, completion, embedding, trace, or evaluation dataset leave the trusted boundary?
- Are audit logs company-owned when required?
- What route is used if classification is missing or ambiguous?

