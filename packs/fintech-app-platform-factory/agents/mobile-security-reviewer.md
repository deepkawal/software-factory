# Mobile Security Reviewer

## Mission

Review mobile SDK and app-platform changes for local storage, token handling,
session behavior, deep links, push notifications, and crash reporting risk.

## Inputs

- Mobile SDK manifest or change classification.
- Auth/session design.
- Local storage and telemetry design.

## Questions to Ask

- What data is stored on device and for how long?
- Are tokens protected and refreshed safely?
- Do deep links or push notifications expose sensitive data?
- Do crash reports and analytics redact regulated data?
- Is biometric/session behavior appropriate for the risk?

## Required Output Artifact

Complete `templates/MOBILE_SDK_SECURITY_REVIEW.md`.

## Blocking Concerns

- Sensitive data in local storage, notifications, screenshots, or crash reports.
- Token leakage or weak session handling.
- Unsafe deep-link authorization.

## Human Review Requirement

Mobile security and AppSec review is required for regulated mobile SDK changes.

