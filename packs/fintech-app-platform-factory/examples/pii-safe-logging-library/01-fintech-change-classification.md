# Fintech Change Classification

## Change Summary

- Request: Ship `app-platform-logging`, a shared mobile/web logging library with
  default redaction for regulated customer data.
- Owning team: App Platform
- Consumers: iOS, Android, Web, backend product teams
- Release target: staged internal beta, then canary by product surface

## Platform Surface

- [x] Mobile SDK
- [x] Web SDK
- [ ] Backend service library
- [ ] GraphQL edge gateway
- [ ] Auth library
- [x] Logging / telemetry library
- [ ] Payments library
- [ ] KYC / identity library
- [ ] Fraud / risk library
- [ ] Compliance library
- [x] Release management tooling
- [x] QA automation / validation tooling

## Data Touched

- [x] SSN
- [x] Government ID
- [x] Name
- [x] Date of birth
- [x] Address
- [x] Phone/email
- [x] Bank account
- [x] Card data
- [x] Device ID
- [x] IP address
- [x] Geolocation
- [x] Recipient data
- [x] Transaction history
- [x] Transaction instructions
- [x] Risk score
- [x] Sanctions/watchlist result
- [x] Customer support notes

## Regulatory / Risk Impact

- [x] Customer financial information
- [x] State privacy
- [x] GDPR/international privacy
- [ ] KYC
- [ ] AML
- [ ] Sanctions
- [ ] Remittance disclosure
- [x] PCI/payment data
- [ ] Money movement
- [x] Bank/processor contractual controls

## AI Impact

- [x] AI for developer productivity only
- [ ] AI processes synthetic data
- [ ] AI processes customer PII/NPI
- [ ] AI influences fraud/risk/KYC decision
- [ ] AI influences transfer hold/release/decline
- [ ] AI generates customer-facing content

## Required Review Lanes

- [x] Privacy
- [x] Security
- [x] Compliance
- [ ] AML/sanctions
- [ ] Fraud/risk
- [ ] Payments/ledger
- [ ] Consumer disclosure
- [x] Mobile security
- [ ] GraphQL/API security
- [ ] Partner/vendor risk
- [ ] AI governance
- [x] Release management
- [x] QA

## Release Risk

- Classification: High
- Rationale: A shared logging library can either prevent or amplify sensitive
  data leakage across many product teams.
