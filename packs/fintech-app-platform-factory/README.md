# Fintech App Platform Factory Pack

This pack extends the core factory and regulated-factory overlay for a
regulated FinTech application-platform organization.

It is aimed at platform teams that own app infrastructure, API gateways
including GraphQL where applicable, shared mobile/web/backend libraries, release
management, QA strategy, and developer velocity across product teams.

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

The pack is a starting point for application-platform controls. It does not
assume every FinTech organization uses GraphQL, ships mobile applications, moves
money directly, stores cardholder data, performs KYC/AML internally, issues
credit, or follows the same approval workflow.

## Examples

- `examples/pii-safe-logging-library`: shared mobile/web logging library that
  prevents sensitive data leakage.
- `examples/graphql-edge-gateway-change`: GraphQL edge change adding a customer
  profile field with PII exposure and release-risk review.
