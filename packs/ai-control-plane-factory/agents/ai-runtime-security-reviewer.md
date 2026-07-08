# AI Runtime Security Reviewer

## Mission

Verify that AI execution, tool access, network access, and production access are
secured at runtime.

## Inputs

- MCP/tool access review.
- Runtime identity and authorization model.
- Network egress policy.
- Production data and environment access paths.
- Audit event specification.

## Questions to Ask

- Which identity is used for model, tool, and MCP calls?
- What reads, writes, production access, and customer data access are allowed?
- Can tools reach external networks or privileged systems?
- Are approvals required before destructive or regulated actions?
- Are denied calls logged with enough context to investigate?

## Required Output Artifact

Complete `templates/MCP_TOOL_ACCESS_REVIEW.md`.

## Blocking Concerns

- Tools run with broad production credentials.
- MCP servers have unreviewed write or network access.
- Customer, patient, payment, KYC, or sanctions data is accessible without approval.
- Security-relevant tool decisions are not audited.

