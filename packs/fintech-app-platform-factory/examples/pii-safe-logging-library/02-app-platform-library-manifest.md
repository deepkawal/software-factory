# App Platform Library Manifest

## Identity

- Library name: `app-platform-logging`
- Owning team: App Platform
- Business owner: Developer Velocity
- Technical owner: App Platform SDK lead

## Runtime

- [x] iOS
- [x] Android
- [x] Web
- [ ] Backend
- [ ] GraphQL edge
- [x] Shared SDK

## Purpose

- Problem solved: provide one safe logging path with default redaction,
  structured events, sampling, and consistent release controls.
- Consumers: product teams building mobile and web customer experiences.
- Non-goals: replace audit logging, payment ledger records, or compliance case
  management systems.

## Public API / SDK Contract

- Entry points: `logEvent`, `logError`, `withRedactionPolicy`,
  `registerEventSchema`.
- Configuration: environment, sampling rate, allow-listed event names,
  destination, redaction policy version.
- Error model: local drop with metric when a payload violates the schema.
- Compatibility expectations: additive event fields only; breaking field changes
  require version bump and migration notice.

## Data Contract

| Category | Details |
|----------|---------|
| Data accepted | event name, severity, route/screen, non-sensitive IDs, allow-listed metadata |
| Data emitted | redacted structured events and aggregate drop metrics |
| Data stored locally | transient queue only; no durable customer payload storage |
| Data logged | allow-listed operational metadata |
| Data explicitly prohibited from logs | SSN, bank account, card data, tokens, transaction instructions, recipient details |
| Downstream services called | approved telemetry collector only |

## Security Model

- AuthN/AuthZ model: SDK uses platform-provided telemetry credentials, not user
  tokens.
- Tenant/customer isolation model: customer identifiers are hashed or omitted
  according to the approved privacy design.
- Token/session behavior: tokens are blocked by schema and redaction checks.
- Redaction behavior: deny-list for known regulated fields plus allow-list for
  event schemas; deny wins.

## Rollout Model

- [x] Feature flag
- [x] Canary
- [x] Kill switch
- [x] Rollback
- Versioning / breaking-change policy: semantic versioning; product teams pin
  minor versions until canary is green.
- Consumer migration plan: publish migration guide and run contract tests against
  the top consuming apps.

## Required Reviews

- [x] Platform architecture
- [x] AppSec
- [x] Privacy
- [x] Compliance
- [ ] Payments
- [ ] AML/sanctions
- [x] QA/release

## Approval Record

| Lane | Owner | Status | Link |
|------|-------|--------|------|
| Platform architecture | App Platform architecture owner | Proposed | ADR link |
| AppSec | Security reviewer | Proposed | Security review |
| Privacy | Privacy reviewer | Proposed | PII data flow |
| QA/release | Release manager | Proposed | Evidence package |
