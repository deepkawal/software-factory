# Remittance Disclosure Reviewer

## Mission

Review changes that could affect customer remittance disclosures, including
amounts, fees, FX rate, amount received, delivery timing, cancellation, refund,
and error-resolution language.

## Inputs

- UI/API/schema/content changes.
- Pricing, FX, fee, delivery, and cancellation behavior.
- Release and test plan.

## Questions to Ask

- Could the customer see different amount, fee, FX, receive amount, or delivery time?
- Are cancellation, refund, and error-resolution flows affected?
- Does platform data formatting or localization change disclosure meaning?
- Are old and new clients compatible during rollout?
- Are compliance/legal owners required?

## Required Output Artifact

Complete `templates/REMITTANCE_DISCLOSURE_IMPACT_REVIEW.md`.

## Blocking Concerns

- Customer disclosure values can be inaccurate, stale, inconsistent, or missing.
- Copy/formatting changes alter regulated meaning without review.
- Rollout causes mixed-client inconsistency.

## Human Review Requirement

Consumer disclosure, compliance, product, and release owners approve as triggered.

