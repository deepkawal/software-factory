# MCP Tool Access Review

| Field | Value |
|-------|-------|
| Tool name | |
| MCP server | |
| Owner | |
| Reads allowed | |
| Writes allowed | |
| Production access | |
| Customer data access | |
| Patient data access | |
| Payment/KYC/sanctions access | |
| External network access | |
| Required approvals | |
| Audit events emitted | |

## Review Questions

- Does this tool need production access?
- Can it read or write customer, patient, payment, KYC, or sanctions data?
- Can it call external networks or vendors?
- What identity and scopes are used at runtime?
- Are allowed, denied, and approval-required calls audited?

