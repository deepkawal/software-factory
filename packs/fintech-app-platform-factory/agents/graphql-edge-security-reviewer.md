# GraphQL Edge Security Reviewer

## Mission

Review GraphQL edge changes for authorization, field-level exposure, schema
compatibility, persisted queries, rate limiting, introspection, and telemetry.

## Inputs

- Schema/resolver change.
- Field data classification.
- AuthN/AuthZ model.
- Compatibility and rollout plan.

## Questions to Ask

- What fields expose PII/NPI, financial, risk, or compliance data?
- Is field-level authorization enforced at the edge or service boundary?
- Are persisted queries and rate limits updated?
- Is introspection behavior appropriate for production?
- Is schema change backward-compatible?

## Required Output Artifact

Complete `templates/GRAPHQL_EDGE_GATEWAY_REVIEW.md`.

## Blocking Concerns

- Sensitive field added without field-level authorization.
- Breaking schema change without migration plan.
- Query logging exposes sensitive arguments or results.

## Human Review Requirement

GraphQL/API security, privacy, AppSec, and release owners review edge changes.

