# Fintech Change Classification

## Change Summary

- Request: Add `customer.profile.preferredName` to the GraphQL edge schema.
- Owning team: App Platform
- System touched: GraphQL edge gateway
- Consumers: mobile and web profile, support, onboarding flows

## Platform Surface

- [ ] Mobile SDK
- [ ] Web SDK
- [ ] Backend service library
- [x] GraphQL edge gateway
- [ ] Auth library
- [ ] Logging / telemetry library
- [ ] Payments library
- [ ] KYC / identity library
- [ ] Fraud / risk library
- [ ] Compliance library
- [ ] Release management tooling
- [x] QA automation / validation tooling

## Data Touched

- [ ] SSN
- [ ] Government ID
- [x] Name
- [ ] Date of birth
- [ ] Address
- [ ] Phone/email
- [ ] Bank account
- [ ] Card data
- [ ] Device ID
- [ ] IP address
- [ ] Geolocation
- [ ] Recipient data
- [ ] Transaction history
- [ ] Transaction instructions
- [ ] Risk score
- [ ] Sanctions/watchlist result
- [ ] Customer support notes

## Regulatory / Risk Impact

- [x] Customer financial information
- [x] State privacy
- [x] GDPR/international privacy
- [ ] KYC
- [ ] AML
- [ ] Sanctions
- [ ] Remittance disclosure
- [ ] PCI/payment data
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
- [ ] Mobile security
- [x] GraphQL/API security
- [ ] Partner/vendor risk
- [ ] AI governance
- [x] Release management
- [x] QA

## Release Risk

- Classification: Medium
- Rationale: The field is PII-adjacent and broadly consumed, but it does not
  affect money movement or risk decisions.
