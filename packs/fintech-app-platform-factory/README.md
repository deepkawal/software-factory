# Fintech App Platform Factory Pack

This pack extends the core factory and regulated-factory overlay for a
Remitly-like App Platform organization.

It is aimed at platform teams that own app infrastructure, GraphQL edge gateway,
shared mobile/web/backend libraries, release management, QA strategy, and
developer velocity across product teams.

These assets help engineering teams surface fintech and money-movement questions
earlier in the SDLC. They do not replace required review by Legal, Compliance,
Privacy, Security, Risk, AML, Fraud, Payments, or Regulatory teams.

## Use It For

- PII/NPI and SSN handling review.
- App-platform library contracts and rollout models.
- GraphQL edge authorization and field exposure review.
- Mobile SDK security review.
- Payment integrity, idempotency, and reconciliation review.
- KYC/AML/sanctions and remittance disclosure impact routing.
- QA and release evidence for regulated platform changes.

## Examples

- `examples/pii-safe-logging-library`: shared mobile/web logging library that
  prevents sensitive data leakage.
- `examples/graphql-edge-gateway-change`: GraphQL edge change adding a customer
  profile field with PII exposure and release-risk review.

