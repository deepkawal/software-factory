# Fintech Production Guardrails

- SSN must never appear in logs, analytics events, crash reports, prompts,
  screenshots, fixtures, support tickets, or generated documentation.
- Bank account, card data, tokens, transaction instructions, and recipient
  details must not pass through generic telemetry.
- Shared libraries must declare accepted data, emitted data, logged data,
  storage behavior, downstream calls, rollout model, rollback path, owner, and
  required reviewers.
- GraphQL edge changes must review authorization, field-level data exposure,
  schema changes, persisted queries, rate limiting, introspection behavior, and
  backwards compatibility.
- Mobile SDKs must review local storage, token handling, biometric/session
  behavior, deep links, push notifications, and crash reporting.
- Payment-related changes must document idempotency, retry behavior, timeout
  behavior, replay protection, reconciliation, and rollback.
- Remittance disclosure changes must review amount, fees, FX rate, amount
  received, delivery time, cancellation, refund, and error-resolution language.
- KYC/AML/sanctions-impacting changes must go through compliance/risk review.
- Every regulated release needs evidence.

