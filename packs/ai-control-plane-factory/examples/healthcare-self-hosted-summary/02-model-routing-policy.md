# Model Routing Policy

## Policy Summary

- AI system: healthcare-self-hosted-summary.
- Owner: Clinical Platform.
- Policy version: 2026-07-01.
- Default route when data class is unknown: block until classified.

## Routing Table

| Data class | Allowed model route | Approved models | Approved vendors | Prohibited routes | Fallback behavior | Escalation behavior |
|------------|---------------------|-----------------|------------------|-------------------|-------------------|---------------------|
| PHI/ePHI | Self-hosted/VPC required | clinical-summary-vpc | Internal platform | External API | Block request | Privacy and Security review |
| PII/NPI | Self-hosted/VPC required | clinical-summary-vpc | Internal platform | External API | Block request | Privacy review |
| Regulated documents | Self-hosted/VPC required | clinical-summary-vpc | Internal platform | External API | Block request | Compliance review |

