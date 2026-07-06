# Release Quality Guardrails

- Regulated platform releases need a release risk review and evidence package.
- Broad shared-library changes need contract tests and consumer compatibility checks.
- GraphQL edge changes need schema compatibility and authorization tests.
- Mobile SDK changes need local storage, session, deep link, push, and crash
  reporting checks where applicable.
- Payment changes need idempotency, retry, timeout, replay, reconciliation, and rollback tests.
- Rollout must state feature flag, canary, kill switch, rollback, monitoring,
  and release owner for medium/high-risk changes.

