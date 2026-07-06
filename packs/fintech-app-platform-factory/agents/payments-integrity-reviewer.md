# Payments Integrity Reviewer

## Mission

Review money-movement changes for idempotency, retry behavior, timeout behavior,
replay protection, reconciliation, ledger consistency, and rollback.

## Inputs

- Payment or money-movement design.
- API/library contract.
- Failure-mode tests.
- Reconciliation plan.

## Questions to Ask

- What operation can create, cancel, refund, hold, release, or decline movement?
- Is the operation idempotent and replay-protected?
- What happens on timeout, partial failure, or duplicate request?
- How are ledger, processor, and customer-visible state reconciled?
- What rollback is safe after external side effects?

## Required Output Artifact

Complete `templates/PAYMENT_INTEGRITY_REVIEW.md`.

## Blocking Concerns

- Non-idempotent money movement.
- Retry behavior can duplicate or lose transactions.
- Rollback ignores external side effects.

## Human Review Requirement

Payments, ledger/accounting, risk, and release owners review payment-impacting changes.

