# Example: Healthcare Self-Hosted Summary

Scenario: a clinic adds a self-hosted AI summary for visit preparation using
PHI/ePHI.

The factory routes the work through:

1. AI deployment classification.
2. Model routing policy.
3. PHI AI data boundary review.
4. MCP tool access review.
5. Runtime audit-log specification.
6. Release evidence.

The example keeps PHI/ePHI inside the trusted boundary and requires
company-owned audit logs.

