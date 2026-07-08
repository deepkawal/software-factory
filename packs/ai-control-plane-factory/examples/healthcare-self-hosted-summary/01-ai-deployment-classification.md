# AI Deployment Classification

## Workload Summary

- Request: Self-hosted clinical summary for staff before visits.
- Owner: Clinical Platform.
- AI system name: healthcare-self-hosted-summary.
- Users or services: Clinic staff workflow.
- Production path: VPC-hosted summary service.

## Data Classes Processed

- [x] PHI/ePHI
- [x] PII/NPI
- [x] Regulated documents
- [x] Production data

## Model Route

- [ ] External API allowed
- [ ] Approved private endpoint required
- [x] Self-hosted/VPC required
- [ ] Air-gapped required

## Governance Requirements

- Audit-log ownership requirement: company-owned clinical audit logs.
- Vendor/BAA/DPA requirement: BAA required for any processor.
- Data retention requirement: prompt and output retained only in approved clinical logging path.
- Human approval requirement: clinician review before patient-facing or care-plan use.
- Release evidence owner: Healthcare release owner.

