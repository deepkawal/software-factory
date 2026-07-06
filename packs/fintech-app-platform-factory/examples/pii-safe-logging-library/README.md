# PII-Safe Logging Library Example

Scenario: App Platform ships a shared mobile/web logging library used by product
teams. The library must prevent SSN, bank account, card data, tokens,
transaction instructions, and recipient details from leaking into logs.

This example shows how the fintech app-platform pack routes a shared library
change through classification, library contract review, PII data-flow review,
SSN handling, mobile SDK security, release risk, and release evidence.

## Artifacts

1. [`01-fintech-change-classification.md`](01-fintech-change-classification.md)
2. [`02-app-platform-library-manifest.md`](02-app-platform-library-manifest.md)
3. [`03-pii-data-flow-map.md`](03-pii-data-flow-map.md)
4. [`04-ssn-handling-review.md`](04-ssn-handling-review.md)
5. [`05-mobile-sdk-security-review.md`](05-mobile-sdk-security-review.md)
6. [`06-release-risk-review.md`](06-release-risk-review.md)
7. [`07-release-evidence-package.md`](07-release-evidence-package.md)

Human owners still approve Privacy, Security, Compliance, QA, and release
readiness. The factory produces the review packet; it does not replace those
teams.
