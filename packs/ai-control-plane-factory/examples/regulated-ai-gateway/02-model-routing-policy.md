# Model Routing Policy

## Policy Summary

- AI system: regulated-ai-gateway.
- Owner: AI Platform.
- Policy version: 2026-07-01.
- Default route when data class is unknown: self-hosted/VPC required.

## Routing Table

| Data class | Allowed model route | Approved models | Approved vendors | Prohibited routes | Fallback behavior | Escalation behavior |
|------------|---------------------|-----------------|------------------|-------------------|-------------------|---------------------|
| Public/synthetic | External API allowed | Approved general models | Approved AI vendors | Unapproved vendors | Retry approved external route | AI Platform review |
| Proprietary source code | Approved private endpoint required | Private code model | Approved private endpoint vendors | Public external route | Self-hosted/VPC route | Security review |
| PII/NPI | Self-hosted/VPC required | Internal general model | Internal platform | External API | Block request | Privacy review |
| Production data | Self-hosted/VPC required | Internal general model | Internal platform | External API | Block request | Security review |

## Review Questions

- Fallback behavior never lowers protection below the primary route.
- Route decisions are logged with request ID, policy version, and data class.

