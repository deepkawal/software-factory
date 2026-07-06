# Fintech Release Evidence Package

## Change

- Add `customer.profile.preferredName` to the GraphQL edge gateway.

## Evidence

- [x] Fintech change classification completed.
- [x] GraphQL edge gateway review completed.
- [x] PII/NPI data flow map completed.
- [x] Release risk review completed.
- [x] Authorization tests identified.
- [x] Schema compatibility tests identified.
- [x] Telemetry behavior reviewed.
- [x] Rollback path documented.

## Human Review

| Lane | Required | Status |
|------|----------|--------|
| Privacy | Yes | Proposed |
| GraphQL/API security | Yes | Proposed |
| Compliance | Yes | Proposed |
| QA/release | Yes | Proposed |

## Release Notes

Roll out through persisted query updates and consuming-screen feature flags.
Monitor GraphQL errors, authorization denials, and client compatibility metrics.
