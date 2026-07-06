# Release Risk Review

## Risk Classification

- [ ] Low
- [ ] Medium
- [x] High

## Why

This library centralizes telemetry behavior for many apps. A defect can create a
broad sensitive-data leak or break operational visibility during incident
response.

## Rollout

- [x] Internal dogfood
- [x] Canary by app surface
- [x] Feature flag
- [x] Kill switch
- [x] Rollback to prior SDK version

## Required Evidence

- Contract tests for event schemas
- Redaction tests for sensitive field names and synthetic values
- Mobile storage/session tests
- Telemetry destination approval
- Privacy, Security, Compliance, and QA signoff

## Go / No-Go

- Go only after redaction tests, canary dashboards, and kill switch are verified.
