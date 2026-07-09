# FinTech Control Catalog

This catalog defines internal starter controls for a reusable FinTech software
factory. These are not official regulatory control identifiers, do not provide
legal interpretation, and do not certify compliance with PCI DSS, SOC 2, SOX,
GLBA, GDPR, or any other framework.

Controls are selected from a declared FinTech capability profile and
organization-specific policy overlays. They should be activated based on
business model, product capability, data class, jurisdiction, service
criticality, external partner dependencies, AI usage, and customer-fund
exposure.

Example applicability expression:

```yaml
applies_when:
  any:
    - capability: money_movement
    - capability: customer_funds
```

Status values:

- `starter`: described in this catalog but not yet enforced.
- `partial`: represented by existing templates, agents, examples, or checks.
- `target`: intended future enforcement behavior.

## FIN-COM: Common Controls

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-COM-001 | Every service must declare its FinTech capability profile. | `applies_when: { any: [{ business_model: fintech }, { data_class: sensitive_financial_data }, { capability: customer_funds }] }` | Schema validation and profile-to-control selection. | Validated `fintech_profile`, selected-controls report. | Platform Governance | starter |
| FIN-COM-002 | Controls must be activated conditionally, not assumed globally for every FinTech service. | `applies_when: { any: [{ business_model: fintech }] }` | Policy evaluator explains why each control applies. | Policy evaluation report. | Platform Governance | starter |
| FIN-COM-003 | Material regulated changes must classify risk, service tier, affected data classes, and customer impact. | `applies_when: { any: [{ service_tier: tier_0 }, { service_tier: tier_1 }, { capability: customer_funds }, { data_class: pii }] }` | Release-risk review gate. | Change classification and release-risk review. | Risk and Release Governance | partial |

## FIN-SEC: Security and Privacy

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-SEC-001 | Sensitive financial data must not appear in unapproved logs. | `applies_when: { any: [{ data_class: pii }, { data_class: payment_credentials }, { data_class: cardholder_data }, { data_class: financial_account_information }, { data_class: government_identifiers }] }` | Logging scanners, code review, telemetry allowlist. | Sensitive-data logging scan, data-flow map. | Security and Privacy | partial |
| FIN-SEC-002 | Data minimization and retention decisions must be documented for sensitive financial data. | `applies_when: { any: [{ data_class: pii }, { data_class: credit_information }, { data_class: investment_information }, { data_class: insurance_information }] }` | Data-flow review and retention policy check. | Data-flow map, retention rationale. | Privacy | starter |
| FIN-SEC-003 | Sensitive data must use approved encryption and residency controls where required by profile and policy overlay. | `applies_when: { any: [{ data_class: payment_credentials }, { data_class: financial_account_information }, { jurisdiction: regulated }] }` | Architecture review and infrastructure policy checks. | Architecture decision, policy evaluation report. | Security Engineering | starter |

## FIN-ID: Identity and Access

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-ID-001 | Customer-scoped resources must enforce cross-customer isolation. | `applies_when: { any: [{ data_class: pii }, { capability: customer_funds }, { capability: customer_accounts }] }` | Authorization tests and security review. | AuthZ test results, security review. | Identity Platform | starter |
| FIN-ID-002 | Privileged access to regulated workflows must be attributable and reviewed. | `applies_when: { any: [{ regulated_process: kyc }, { regulated_process: aml }, { capability: financial_ledger }, { capability: lending_decisions }] }` | Access review and audit logging. | Access review record, audit event sample. | Security and Compliance | starter |
| FIN-ID-003 | Account recovery, session security, device trust, and consent behavior must be reviewed when customer identity or funds are affected. | `applies_when: { any: [{ capability: customer_funds }, { regulated_process: kyc }, { channel: mobile }, { channel: web }] }` | Identity/security review route. | Identity impact review. | Identity Platform | starter |

## FIN-PAY: Payments and Money Movement

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-PAY-001 | Money-movement operations must support idempotent processing. | `applies_when: { any: [{ capability: money_movement }] }` | Payment integrity review and duplicate-request tests. | Idempotency test result, payment integrity review. | Payments Platform | partial |
| FIN-PAY-002 | Duplicate events must not produce duplicate financial effects. | `applies_when: { any: [{ capability: money_movement }, { capability: financial_ledger }] }` | Event identity, deduplication tests, release gate. | Duplicate-event test result. | Payments Platform | partial |
| FIN-PAY-003 | Transaction-state machines must define valid states, invalid transitions, retries, partial failures, reversals, and terminal states. | `applies_when: { any: [{ capability: money_movement }] }` | State-machine tests and architecture review. | State diagram, transition test report. | Payments Platform | starter |
| FIN-PAY-004 | Fee, rate, and disclosure versions must be retained for customer-impacting payment decisions. | `applies_when: { any: [{ business_model: remittance }, { capability: money_movement }, { capability: customer_funds }] }` | Versioned policy references and release evidence. | Fee/rate version evidence, disclosure review. | Product Compliance | partial |

## FIN-LED: Ledger and Reconciliation

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-LED-001 | Ledger entries must preserve defined accounting invariants. | `applies_when: { any: [{ capability: financial_ledger }, { capability: customer_funds }] }` | Ledger invariant tests. | Ledger invariant report. | Ledger Engineering | starter |
| FIN-LED-002 | Financial events must be immutable or corrected through explicit compensating events. | `applies_when: { any: [{ capability: financial_ledger }, { capability: money_movement }] }` | Event-store policy and mutation checks. | Event immutability evidence. | Ledger Engineering | starter |
| FIN-LED-003 | Reconciliation must compare internal ledger, partner, processor, and customer-visible state where applicable. | `applies_when: { any: [{ capability: financial_ledger }, { capability: partner_banking }, { capability: money_movement }] }` | Reconciliation job, exception workflow. | Reconciliation report and exception evidence. | Finance Operations | starter |

## FIN-BNK: Banking and Accounts

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-BNK-001 | Account lifecycle changes must define opening, verification, restrictions, closure, and dormancy behavior where relevant. | `applies_when: { any: [{ business_model: banking }, { capability: partner_banking }] }` | Banking pack lifecycle review. | Account lifecycle evidence. | Banking Platform | starter |
| FIN-BNK-002 | Balance-impacting changes must include balance integrity and stale-read controls. | `applies_when: { any: [{ capability: customer_funds }, { capability: digital_wallet }, { business_model: banking }] }` | Balance invariant tests and release gate. | Balance invariant report. | Banking/Ledger Engineering | starter |
| FIN-BNK-003 | Partner-bank and core-banking integration changes must include contract, reconciliation, and escalation evidence. | `applies_when: { any: [{ capability: partner_banking }] }` | Partner integration review. | Partner-bank review package. | Partner Platform | starter |

## FIN-LND: Lending and Credit

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-LND-001 | Credit decisions must retain policy and model versions. | `applies_when: { any: [{ capability: lending_decisions }, { regulated_process: credit_underwriting }] }` | Decision trace and model registry check. | Credit decision trace, policy/model version record. | Credit Risk | starter |
| FIN-LND-002 | Adverse-action decisions must be traceable to supported reasons. | `applies_when: { any: [{ capability: lending_decisions }, { regulated_process: credit_underwriting }] }` | Reason-code validation and evidence check. | Adverse-action evidence. | Compliance and Lending Product | starter |
| FIN-LND-003 | Fair-lending review is required for credit-policy, underwriting, pricing, eligibility, and model changes. | `applies_when: { any: [{ capability: lending_decisions }, { regulated_process: credit_underwriting }] }` | Reviewer route and approval gate. | Fair-lending review. | Fair Lending Owner | starter |

## FIN-CRD: Cards and Wallets

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-CRD-001 | Cardholder-data access must remain within declared PCI boundaries. | `applies_when: { any: [{ data_class: cardholder_data }] }` | Boundary review, logging restrictions, endpoint allowlist. | PCI boundary review. | Security and Cards Platform | starter |
| FIN-CRD-002 | Card and wallet authorization workflows must define authorization, clearing, settlement, reversal, and dispute states where applicable. | `applies_when: { any: [{ capability: digital_wallet }, { business_model: cards_wallets }, { data_class: cardholder_data }] }` | State-machine and reconciliation tests. | Authorization and settlement evidence. | Cards/Wallet Platform | starter |
| FIN-CRD-003 | Wallet balance changes must preserve wallet and ledger integrity. | `applies_when: { any: [{ capability: digital_wallet }, { capability: customer_funds }] }` | Balance and ledger invariant tests. | Wallet invariant report. | Wallet Platform | starter |

## FIN-FRD: Fraud and Risk

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-FRD-001 | Fraud rules and models must be versioned and auditable. | `applies_when: { any: [{ regulated_process: fraud_decisioning }] }` | Rule/model registry and release gate. | Rule/model version record, validation evidence. | Fraud/Risk Platform | starter |
| FIN-FRD-002 | Manual review workflows must retain owner, authority, reason, decision, and supporting evidence. | `applies_when: { any: [{ regulated_process: fraud_decisioning }, { regulated_process: kyc }, { regulated_process: aml }, { regulated_process: sanctions_screening }] }` | Case-management or manual-review evidence check. | Manual review record. | Risk Operations | starter |
| FIN-FRD-003 | Model-risk controls must apply when AI or ML influences fraud, risk, credit, KYC, AML, sanctions, underwriting, or customer-impacting decisions. | `applies_when: { any: [{ ai_usage: decisioning }, { regulated_process: fraud_decisioning }, { capability: lending_decisions }] }` | Model validation, monitoring, approval gate. | Model validation package. | Model Risk | starter |

## FIN-AML: AML, KYC, and Sanctions

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-AML-001 | Changes affecting KYC, AML, or sanctions workflows require designated review. | `applies_when: { any: [{ regulated_process: kyc }, { regulated_process: aml }, { regulated_process: sanctions_screening }] }` | KYC/AML/sanctions impact review gate. | KYC/AML/sanctions impact review. | Compliance and AML/Sanctions | partial |
| FIN-AML-002 | Screening, monitoring, retry, override, and failure behavior must be documented for relevant workflows. | `applies_when: { any: [{ regulated_process: aml }, { regulated_process: sanctions_screening }] }` | Workflow review and release evidence. | Monitoring/screening workflow evidence. | AML/Sanctions Compliance | starter |
| FIN-AML-003 | Suspicious-activity workflow integrations must define evidence boundaries and accountable owners without claiming legal conclusions. | `applies_when: { any: [{ regulated_process: aml }] }` | Compliance workflow handoff review. | Handoff evidence and owner matrix. | AML Compliance | starter |

## FIN-WLT: Wealth

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-WLT-001 | Investment-advice workflows must retain suitability inputs, restrictions, recommendation versions, and disclosure evidence. | `applies_when: { any: [{ capability: investment_advice }] }` | Suitability review and decision trace. | Suitability review, disclosure version. | Wealth Product/Compliance | starter |
| FIN-WLT-002 | Investment order workflows must preserve order lifecycle, customer intent, market-data provenance, and restriction checks. | `applies_when: { any: [{ business_model: wealth }, { data_class: investment_information }] }` | Order lifecycle tests and data provenance review. | Order integrity evidence. | Wealth Platform | starter |

## FIN-INS: Insurance

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-INS-001 | Insurance quote, underwriting, policy, and claims workflows must retain decision traceability and rule/model versions. | `applies_when: { any: [{ capability: insurance_underwriting }, { business_model: insurance }] }` | Insurance pack review and decision trace. | Policy/claims evidence, underwriting trace. | Insurance Platform | starter |
| FIN-INS-002 | Sensitive health, financial, and insurance data boundaries must be declared and enforced. | `applies_when: { any: [{ data_class: insurance_information }, { capability: insurance_underwriting }] }` | Data-boundary review and logging controls. | Insurance data-flow map. | Security and Privacy | starter |

## FIN-API: API and Platform Governance

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-API-001 | Breaking API changes must be detected before merge. | `applies_when: { any: [{ channel: api }, { channel: graphql }] }` | API compatibility checks and review gate. | API diff, compatibility test report. | API Platform | partial |
| FIN-API-002 | GraphQL authorization, field exposure, and client compatibility checks apply only to services declaring GraphQL. | `applies_when: { any: [{ channel: graphql }] }` | GraphQL review and schema diff. | GraphQL review, authZ test result. | API Platform | partial |
| FIN-API-003 | Shared SDK changes must declare supported platforms, sensitive-data handling, rollout, rollback, and owner responsibilities. | `applies_when: { any: [{ capability: shared_sdk }, { channel: mobile }, { channel: web }, { channel: api }] }` | SDK manifest review and release evidence. | SDK manifest, release package. | App Platform | partial |

## FIN-AI: AI and Agent Governance

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-AI-001 | Sensitive data may only be processed by approved AI endpoints. | `applies_when: { any: [{ ai_usage: true }, { data_class: pii }, { data_class: payment_credentials }, { data_class: credit_information }, { data_class: insurance_information }] }` | AI data-boundary check and endpoint allowlist. | AI data boundary review. | AI Governance | partial |
| FIN-AI-002 | AI-generated material workflow artifacts must identify accountable human owners. | `applies_when: { any: [{ ai_usage: workflow_generation }, { ai_usage: decision_support }] }` | Review ownership gate. | Owner signoff and prompt/output evidence. | Governance | starter |
| FIN-AI-003 | AI or model-assisted decisions affecting customers must retain prompt, model, policy, input-class, and output-version evidence where permitted. | `applies_when: { any: [{ ai_usage: decisioning }, { regulated_process: fraud_decisioning }, { capability: lending_decisions }, { capability: investment_advice }, { capability: insurance_underwriting }] }` | Model-risk and evidence-ledger checks. | Decision/model evidence package. | Model Risk and AI Governance | starter |

## FIN-REL: Reliability and Release

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-REL-001 | Tier-0 releases require rollback and operational-readiness evidence. | `applies_when: { any: [{ service_tier: tier_0 }] }` | Release gate and readiness review. | Rollback plan, operational-readiness evidence. | SRE and Release Engineering | partial |
| FIN-REL-002 | Tier-1 services handling customer funds or sensitive data require monitoring and incident-readiness evidence. | `applies_when: { any: [{ service_tier: tier_1 }, { capability: customer_funds }, { data_class: sensitive_financial_data }] }` | Release evidence check. | Monitoring plan, incident runbook. | SRE and Operations | partial |
| FIN-REL-003 | Partner-dependent services must document retry, timeout, degradation, escalation, and rollback behavior. | `applies_when: { any: [{ capability: partner_banking }, { external_partner_dependency: true }] }` | Partner dependency review. | Partner failure-mode evidence. | Platform Reliability | starter |

## FIN-AUD: Evidence and Audit

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-AUD-001 | Material workflow actions must produce attributable audit evidence. | `applies_when: { any: [{ business_model: fintech }, { service_tier: tier_0 }, { service_tier: tier_1 }] }` | Evidence ledger and release evidence check. | Audit trail, evidence package. | Audit and Compliance | partial |
| FIN-AUD-002 | Required evidence must be computed from active controls, not manually guessed. | `applies_when: { any: [{ business_model: fintech }] }` | Policy-as-code evidence mapping. | Required-evidence report. | Platform Governance | starter |
| FIN-AUD-003 | Exceptions to required controls must identify owner, expiration, risk rationale, and compensating controls. | `applies_when: { any: [{ control_exception: true }] }` | Exception registry and release gate. | Exception record. | Governance and Risk | starter |

## FIN-SUP: Software Supply Chain

| Control ID | Control | Applicability | Enforcement | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-SUP-001 | Released artifacts must include provenance and an SBOM. | `applies_when: { any: [{ service_tier: tier_0 }, { service_tier: tier_1 }, { business_model: fintech }] }` | Build/release gate. | SBOM, provenance attestation. | Security Engineering | starter |
| FIN-SUP-002 | Dependencies used in regulated workflows must be scanned and risk-reviewed according to service tier. | `applies_when: { any: [{ service_tier: tier_0 }, { service_tier: tier_1 }, { data_class: sensitive_financial_data }] }` | Dependency scan and exception workflow. | Dependency scan result, exception record. | Security Engineering | starter |
| FIN-SUP-003 | Generated code and AI-assisted changes must preserve reviewability, provenance, and accountable ownership. | `applies_when: { any: [{ ai_usage: code_generation }, { business_model: fintech }] }` | Code review, prompt/output evidence, release evidence. | Code review record, AI provenance note. | Engineering Leadership | starter |
