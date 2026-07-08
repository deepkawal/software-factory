# MCP Tool Access Review

| Field | Value |
|-------|-------|
| Tool name | support-case-reader |
| MCP server | fintech-ops-mcp |
| Owner | Fintech Platform |
| Reads allowed | support case metadata and approved case fields |
| Writes allowed | draft notes only |
| Production access | yes, restricted |
| Customer data access | yes, PII/NPI and customer financial information |
| Patient data access | no |
| Payment/KYC/sanctions access | read-only with approval |
| External network access | no |
| Required approvals | Privacy, Security, Risk, AML for regulated fields |
| Audit events emitted | request ID, fields read, draft writes, approvals, blocked access |

