# Model Routing Policy

## Policy Summary

- AI system: fintech-hybrid-model-routing.
- Owner: Fintech Platform.
- Policy version: 2026-07-01.
- Default route when data class is unknown: approved private endpoint required.

## Routing Table

| Data class | Allowed model route | Approved models | Approved vendors | Prohibited routes | Fallback behavior | Escalation behavior |
|------------|---------------------|-----------------|------------------|-------------------|-------------------|---------------------|
| Public/synthetic | External API allowed | approved general model | approved external vendors | unapproved vendors | private endpoint | AI Platform review |
| PII/NPI | Approved private endpoint required | private support model | approved private endpoint vendors | public external route | self-hosted/VPC | Privacy review |
| SSN | Self-hosted/VPC required | regulated-support-vpc | internal platform | external API | block request | Privacy and Security review |
| Customer financial information | Self-hosted/VPC required | regulated-support-vpc | internal platform | external API | block request | Risk review |
| Payment/KYC/sanctions | Self-hosted/VPC required | regulated-support-vpc | internal platform | external API | block request | AML/Risk review |

