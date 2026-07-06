# Model Routing Policy

## Policy Summary

- AI system:
- Owner:
- Policy version:
- Default route when data class is unknown:

## Routing Table

| Data class | Allowed model route | Approved models | Approved vendors | Prohibited routes | Fallback behavior | Escalation behavior |
|------------|---------------------|-----------------|------------------|-------------------|-------------------|---------------------|
| Public/synthetic | | | | | | |
| Proprietary source code | | | | | | |
| PII/NPI | | | | | | |
| PHI/ePHI | | | | | | |
| SSN | | | | | | |
| Customer financial information | | | | | | |
| Secrets | | | | | | |
| Production data | | | | | | |

## Review Questions

- Can fallback behavior ever route data to a less protective model path?
- Are route decisions logged with request ID, policy version, and data classification?
- Who approves new models, vendors, or private endpoints?
- What happens when a required private or self-hosted route is unavailable?

