# SSN Handling Review

## Classification

- [x] SSN may be encountered only as accidental input
- [ ] SSN is intentionally processed
- [ ] SSN is stored
- [ ] SSN is sent to a vendor

## Controls

- [x] SSN fields are prohibited by event schema.
- [x] Common SSN key names and value patterns are redacted before transport.
- [x] Crash reports and screenshots are out of scope for this logger and must
  keep their own redaction controls.
- [x] Tests include synthetic SSN-like values only.
- [x] Documentation says SSN must never be logged, prompted, fixture-seeded, or
  copied into support tickets.

## Required Human Review

- Privacy: Required
- Security: Required
- Compliance: Required

## Blocking Concerns

- No merge if SSN can pass through generic telemetry.
- No release if redaction failure metrics are not monitored during canary.
