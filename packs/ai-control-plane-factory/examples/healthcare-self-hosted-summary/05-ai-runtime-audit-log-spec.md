# AI Runtime Audit Log Spec

## Required Events

| Field | Required | Notes |
|-------|----------|-------|
| Request ID | Yes | Summary request ID |
| User/service identity | Yes | Clinic staff identity |
| Agent identity | Yes | clinical-summary-agent |
| Model used | Yes | clinical-summary-vpc |
| Route used | Yes | self-hosted/VPC |
| Data classification | Yes | PHI/ePHI |
| Prompt policy result | Yes | policy decision |
| Tool calls requested | Yes | chart read requests |
| Tool calls allowed/blocked | Yes | field scope decision |
| Sensitive-data filter result | Yes | PHI field filtering result |
| Output validation result | Yes | clinical safety checks |
| Human approval result | Yes | clinician review status |
| Evidence links | Yes | classification, routing, tool access, release packet |

