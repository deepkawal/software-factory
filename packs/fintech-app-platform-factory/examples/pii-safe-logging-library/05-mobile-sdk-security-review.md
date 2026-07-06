# Mobile SDK Security Review

## Surfaces

- [x] iOS SDK
- [x] Android SDK
- [ ] Push notifications
- [ ] Deep links
- [x] Crash reporting interaction

## Review Questions

- Does the SDK persist events locally? If yes, for how long?
- Are tokens or session identifiers ever accepted by the logging API?
- Can product teams bypass the redaction layer?
- Does crash reporting attach logs that could include sensitive payloads?
- Are dropped events observable without exposing dropped content?

## Controls

- [x] Transient queue uses platform storage protections.
- [x] Queue is bounded and cleared on logout.
- [x] Token-like fields are blocked.
- [x] Redaction tests run on iOS and Android.
- [x] Kill switch can disable network send without app release.

## Release Decision

- Status: Proposed
- Required owner: Mobile security reviewer
