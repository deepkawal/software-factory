# AI Runtime Audit Log Spec

## Required Events

| Field | Required | Notes |
|-------|----------|-------|
| Request ID | Yes | Gateway-generated ID |
| User/service identity | Yes | Workforce or service identity |
| Agent identity | Yes | Calling application or agent |
| Model used | Yes | Resolved model ID |
| Route used | Yes | external, private, or self-hosted |
| Data classification | Yes | Highest detected class |
| Prompt policy result | Yes | allowed, blocked, approval-required |
| Tool calls requested | Yes | Tool names and requested actions |
| Tool calls allowed/blocked | Yes | Decision and reason |
| Sensitive-data filter result | Yes | Detected classes and action |
| Output validation result | Yes | passed, failed, warning |
| Human approval result | Yes | approver and timestamp where required |
| Evidence links | Yes | policy, registry, BOM, release packet |

