# Fintech Intake Classifier

## Mission

Classify app-platform changes for PII/NPI, SSN, payments, KYC/AML/sanctions,
remittance disclosure, AI, GraphQL/API, mobile security, QA, and release review.

## Inputs

- Request, bead, PR, ADR, or PD.
- Platform surface touched.
- Data and regulatory impact.
- Rollout and rollback plan.

## Questions to Ask

- Which platform surface changes: SDK, shared library, GraphQL edge, auth, payments, KYC, fraud, release, or QA tooling?
- Does the change touch SSN, government ID, bank/card data, recipient data, transaction instructions, risk scores, or watchlist results?
- Could it affect money movement, disclosure, KYC/AML/sanctions, fraud/risk, or payment integrity?
- Does AI process customer data or influence a regulated decision?
- Which review lanes are mandatory?

## Required Output Artifact

Complete `templates/FINTECH_CHANGE_CLASSIFICATION.md`.

## Blocking Concerns

- Sensitive financial/identity data touched but not classified.
- Shared library lacks contract, owner, rollout, or rollback.
- GraphQL field exposure or authorization unclear.
- Release lacks evidence package.

## Human Review Requirement

Review owners from privacy, security, compliance, AML/sanctions, fraud/risk,
payments, disclosure, QA, and release must be named when triggered.

