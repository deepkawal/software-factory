# PII/NPI Data Flow Map

## Scope

- Change: shared logging library
- Trusted boundary: mobile/web app runtime to approved telemetry collector
- Out of scope: audit logs, ledger events, KYC case-management systems

## Data Entering the Library

| Data | Source | Intended handling |
|------|--------|-------------------|
| Screen/action metadata | App UI | Allow-listed |
| Device and app metadata | SDK runtime | Allow-listed with sampling |
| Customer identifiers | Product app | Hash or omit unless approved |
| SSN, bank account, card data, tokens | Product app bugs or misuse | Block and drop |
| Transaction instructions and recipient details | Product app bugs or misuse | Block and drop |

## Boundary Controls

- [x] Event schema allow-list
- [x] Sensitive field deny-list
- [x] Redaction before network send
- [x] Local drop metric for rejected payloads
- [x] Canary monitoring for redaction failures

## Open Questions

- Who owns redaction policy versioning after initial release?
- Which telemetry destinations are approved for international users?
