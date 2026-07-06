# AI Runtime Audit Log Spec

## Required Events

| Field | Required | Notes |
|-------|----------|-------|
| Request ID | Yes | Gateway-generated ID |
| User/service identity | Yes | Support or operations identity |
| Agent identity | Yes | fintech-support-agent |
| Model used | Yes | resolved external, private, or VPC model |
| Route used | Yes | route selected by data class |
| Data classification | Yes | highest detected class |
| Prompt policy result | Yes | allowed, blocked, approval-required |
| Tool calls requested | Yes | support and KYC tool requests |
| Tool calls allowed/blocked | Yes | tool decision and reason |
| Sensitive-data filter result | Yes | SSN, financial data, and PII detection |
| Output validation result | Yes | account-impacting validation |
| Human approval result | Yes | required approval result |
| Evidence links | Yes | classification, routing, data boundary, release packet |

