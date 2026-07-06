# AI Runtime Audit Log Spec

## Required Events

| Field | Required | Notes |
|-------|----------|-------|
| Request ID | Yes | |
| User/service identity | Yes | |
| Agent identity | Yes | |
| Model used | Yes | |
| Route used | Yes | |
| Data classification | Yes | |
| Prompt policy result | Yes | |
| Tool calls requested | Yes | |
| Tool calls allowed/blocked | Yes | |
| Sensitive-data filter result | Yes | |
| Output validation result | Yes | |
| Human approval result | Yes | |
| Evidence links | Yes | |

## Review Questions

- Are logs retained inside the approved boundary?
- Are sensitive prompts, outputs, and traces redacted or protected?
- Can investigations reconstruct route, policy, tool, filter, and approval decisions?
- Who owns access, retention, and deletion policy?

