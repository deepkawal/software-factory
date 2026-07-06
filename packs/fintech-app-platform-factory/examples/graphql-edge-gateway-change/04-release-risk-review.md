# Release Risk Review

## Risk Classification

- [ ] Low
- [x] Medium
- [ ] High

## Why

The change adds a customer profile field to a shared edge gateway. The primary
risks are overexposure, authorization gaps, telemetry leakage, and client schema
compatibility.

## Rollout

- [x] Persisted query rollout
- [x] Feature flag for consuming screens
- [x] Canary by client version
- [x] Rollback by disabling field usage

## Required Evidence

- GraphQL authorization test
- Schema compatibility test
- Persisted query update evidence
- Telemetry redaction review
- Privacy and GraphQL/API security signoff

## Go / No-Go

- Go only after field-level authorization and backwards compatibility checks
  pass.
