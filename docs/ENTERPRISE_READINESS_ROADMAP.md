# Enterprise Readiness Roadmap

This roadmap defines the work required to mature the Software Factory into a
reusable, domain-aware FinTech software factory. It is a planning document, not
a claim that the repository is already enterprise-ready or certified for any
regulatory framework.

Target positioning:

> An enterprise-oriented reference architecture and executable starter kit for
> governed AI-native software delivery in regulated FinTech environments.

The target architecture is composable. Core software-factory capabilities,
enterprise governance, common FinTech controls, business-model-specific packs,
and organization-specific policy overlays should be independently selectable.

```text
Core AI-Native Software Factory
        |
        v
Enterprise Governance and Security Layer
        |
        v
Common FinTech Control Layer
        |
        +-------------------------------+
        |               |               |
        v               v               v
Payments Pack     Lending Pack     Banking Pack
        |               |               |
        +---------------+---------------+
                        |
                        v
             Organization Policy Overlay
```

Specific companies may be useful examples of a broader category, but this
roadmap is not modeled on, endorsed by, affiliated with, or derived from any
specific company's proprietary systems.

## FinTech Platform Compatibility Roadmap

### Roadmap Conventions

Status values:

- `planned`: documented target, not implemented.
- `partial`: some templates, agents, examples, or checks exist.
- `active`: implementation work is underway.
- `implemented`: executable behavior and validation exist in the repository.

Priority values:

- `P0`: required before regulated FinTech reference use.
- `P1`: required for realistic pilot use.
- `P2`: required for broader domain coverage.
- `P3`: maturity and scale improvement.

Applicability must be driven by the declared FinTech capability profile,
including business model, capabilities, regulated processes, data classes,
jurisdictions, channel, service tier, partner dependencies, AI usage, and
customer-fund exposure.

### Track A: Common FinTech Foundation

| Initiative | Applicability | Objective | Current state | Target state | Deliverables | Acceptance criteria | Dependencies | Risks | Owner | Priority | Status | Evidence produced |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Capability profile | All FinTech services and packs | Declare the facts that select controls, agents, tests, evidence, approvals, and gates. | Example profile is documented in the README; no schema or validator exists. | Versioned YAML/JSON schema with validation and pack-resolution behavior. | `fintech_profile` schema, examples, validator, CI check, profile-to-pack mapping. | Services without a valid profile fail checks; enabled controls are explainable from profile facts. | Control catalog, pack metadata. | Overbroad defaults could create unusable review burden. | Platform Governance | P0 | planned | Validated profile, control-selection report. |
| Data classification | Services handling sensitive financial or customer data | Classify PII, financial account data, payment credentials, government IDs, credit, investment, insurance, and derived risk data. | PII/SSN templates and logging checks exist. | Data-class taxonomy drives logging, retention, encryption, AI endpoint, and evidence requirements. | Classification taxonomy, data-flow map updates, logging policy checks. | Sensitive classes cannot be introduced without classification and approved handling. | Capability profile, security controls. | Missing data classes may bypass controls. | Security and Privacy | P0 | partial | Data-flow map, logging scan result, approval record. |
| Identity and access | Customer, employee, partner, and service access paths | Define identity, authorization, customer isolation, privileged access, account recovery, consent, and session requirements. | Security and privacy review templates exist; no FinTech identity pack exists. | Identity controls are selected by customer data, customer funds, privileged access, and partner access. | Identity control pack, cross-customer isolation tests, privileged-access review. | Customer-scoped resources require isolation evidence; privileged changes require designated review. | Data classification, API governance. | Authorization gaps can create cross-customer exposure. | Identity Platform | P0 | planned | AuthZ test results, review signoff. |
| Risk classification | Material changes, high-tier services, money movement, customer funds, AI decisions | Classify operational, compliance, customer-impact, and financial-impact risk. | Release-risk and regulated change templates exist. | Risk score selects reviewer set, release gates, rollout plan, rollback evidence, and incident readiness. | Risk taxonomy, scoring rules, release template integration. | Tier and risk classifications are present in release evidence for gated changes. | Capability profile, release gates. | Risk scores may be gamed or inconsistently applied. | Risk and Release Governance | P0 | partial | Risk classification, release evidence package. |
| Human approvals | Triggered controls requiring accountable review | Ensure the factory routes decisions to accountable human owners. | Templates ask for owner review; no approval workflow exists. | Profile-driven approval requirements with named owners and traceable decisions. | Reviewer registry, approval matrix, evidence artifact. | Required approvals are listed and cannot be marked complete without owner attribution. | Risk classification, evidence ledger. | Treating AI output as approval would weaken accountability. | Governance | P0 | partial | Approval matrix, signoff evidence. |
| Evidence ledger | Material regulated workflow actions | Retain attributable evidence for classifications, reviews, tests, approvals, release gates, and incidents. | Release evidence package templates and lightweight checks exist. | Append-only evidence model with links to artifacts, owners, timestamps, and versions. | Evidence schema, CLI/check, example packages. | Release evidence checks verify required artifacts for selected controls. | Capability profile, control catalog. | Evidence can become checkbox-only without quality review. | Audit and Compliance | P0 | partial | Evidence package, audit trail. |
| Policy-as-code | Repeatable control selection and release gates | Make control activation deterministic and reviewable. | Rules are markdown-based; Node checks cover selected artifacts. | Policy files compile profile facts into required controls, reviewers, tests, and gates. | Policy schema, evaluator, test fixtures. | Same profile and change facts produce stable required-control output. | Capability profile, control catalog. | Policy complexity may outpace usability. | Platform Governance | P1 | planned | Policy evaluation report. |
| Secure agent runtime | AI-assisted SDLC handling sensitive context | Bound agent access to data, tools, prompts, models, and approved endpoints. | AI data boundary template/check exists in regulated tools. | Agent runtime controls enforce approved endpoints, context boundaries, secret handling, and prompt artifact retention. | Runtime policy, model endpoint allowlist, secret checks, prompt evidence rules. | Sensitive data classes cannot be sent to unapproved AI endpoints. | Data classification, AI controls. | Leakage through prompts or tool output. | AI Governance | P0 | partial | AI data boundary review, endpoint approval evidence. |
| Supply-chain security | Released artifacts and dependencies | Establish provenance, dependency, SBOM, signing, and vulnerability requirements. | Core delivery concepts exist; no FinTech supply-chain pack exists. | Releases include provenance, SBOM, dependency policy, and artifact integrity evidence. | SBOM requirement, provenance template, dependency check integration. | Tiered release evidence includes SBOM/provenance links. | Release gates, CI integration. | Untracked generated code or dependencies. | Security Engineering | P1 | planned | SBOM, provenance attestation. |
| Reliability tiers | Services with customer, money, or operational impact | Map service criticality to testing, rollout, rollback, SLO, and incident obligations. | Production guardrails mention tiers; FinTech tier mapping is not complete. | Tier rules drive release gates, monitoring, rollback, operational readiness, and incident evidence. | Tier taxonomy, release checklist, operational-readiness template. | Tier-0 and tier-1 services cannot release without rollback and readiness evidence. | Risk classification, observability. | Overclassifying everything as high tier can reduce adoption. | SRE and Release | P0 | partial | SLO/readiness evidence, rollback plan. |
| Incident readiness | High-tier or customer-impacting services | Prepare response for customer harm, financial impact, data exposure, partner failure, and AI incidents. | Release templates include monitoring and support notes. | Incident playbooks and escalation evidence are selected by capability and tier. | Incident taxonomy, runbook template, partner escalation checklist. | Selected incident runbook exists before release for tiered services. | Reliability tiers, partner dependency model. | Missing partner escalation path delays recovery. | SRE and Operations | P1 | partial | Runbook, escalation matrix. |

### Track B: Payments and Money Movement

| Initiative | Applicability | Objective | Current state | Target state | Deliverables | Acceptance criteria | Dependencies | Risks | Owner | Priority | Status | Evidence produced |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Idempotency | `money_movement: true` or external payment partner calls | Prevent repeated requests from creating duplicate financial effects. | Payment integrity reviewer/template exists. | Idempotency keys, replay behavior, and tests are required for applicable operations. | Payment pack, idempotency test fixtures, release gate. | Duplicate request test proves one financial effect. | Capability profile, payment scenario. | Partner retries can bypass local controls. | Payments Platform | P0 | partial | Test result, design review. |
| Transaction state machines | Money movement, refunds, reversals, settlement | Make transaction lifecycle explicit and testable. | Not implemented. | State transitions are versioned, guarded, and observable. | State-machine model, transition tests, event schema. | Invalid transitions fail tests; state diagram is present in evidence. | Payment reference app. | Ambiguous states create reconciliation errors. | Payments Platform | P0 | planned | State diagram, transition test report. |
| Ledger integrity | `financial_ledger: true` or `customer_funds: true` | Preserve accounting invariants and immutable financial events. | Reviewer asks ledger questions; no ledger model exists. | Ledger invariants are executable tests with immutable event history. | Ledger module, invariant tests, mutation restrictions. | Tests prove balanced entries and immutable event behavior. | Transaction state machine. | Incorrect invariants can encode accounting defects. | Ledger Engineering | P0 | planned | Ledger invariant report. |
| Reconciliation | Processor, bank, ledger, customer-visible state | Detect and resolve mismatches. | Template mentions reconciliation. | Scheduled and event-driven reconciliation scenarios produce exception evidence. | Reconciliation workflow, exception model, operational dashboard stub. | Simulated mismatch produces tracked exception and release evidence. | Ledger, partner model. | Silent mismatches can create customer harm. | Payments Operations | P1 | partial | Reconciliation report. |
| Settlement | Payment networks, banks, wallets, processors | Track settlement obligations and timing. | Not implemented. | Settlement states, cutoffs, and partner files/events are modeled where applicable. | Settlement scenario, cutoff config, tests. | Settlement evidence covers expected and delayed partner behavior. | Partner dependency model. | Time-zone/cutoff mistakes. | Payments Operations | P2 | planned | Settlement evidence. |
| Partner failure handling | External processors, banks, identity, fraud, or payment services | Handle retries, timeouts, partial failures, and degraded partners. | Release templates mention rollback and monitoring. | Partner failure scenarios are required for critical integrations. | Retry policy, circuit-breaker requirements, partial-failure playbook. | Test proves no duplicate financial effect after timeout/retry. | Idempotency, transaction state machine. | Inconsistent partner semantics. | Platform Reliability | P0 | planned | Failure-mode test result. |
| Duplicate prevention | Money movement and ledger-producing events | Prevent duplicate events from producing duplicate financial effects. | Payment reviewer exists. | Event deduplication is required for relevant event streams. | Dedup policy, event identity rules, tests. | Duplicate event fixture produces no duplicate ledger entry. | Idempotency, ledger. | Replayed events without stable identity. | Payments Platform | P0 | partial | Dedup test result. |
| Fee and rate versioning | Fees, FX, remittance, pricing, settlement | Preserve customer-visible economics and explainability. | Remittance disclosure template exists. | Rates, fees, and policies are versioned and retained with transaction decisions. | Versioned pricing schema, evidence links, tests. | Historical transaction can resolve the exact fee/rate version used. | Transaction model. | Missing historical versions breaks dispute evidence. | Product and Finance Platform | P1 | partial | Version retention evidence. |
| Refunds and reversals | Money movement, card, wallet, payments | Support compensating financial actions safely. | Not implemented. | Refund/reversal workflows use state machines, ledger invariants, and evidence. | Refund scenario, reversal tests, customer-impact review. | Reversal test preserves ledger invariants and customer-visible state. | Ledger, state machine. | Partial reversal complexity. | Payments Platform | P1 | planned | Reversal test report. |

### Track C: Banking and Accounts

| Initiative | Applicability | Objective | Current state | Target state | Deliverables | Acceptance criteria | Dependencies | Risks | Owner | Priority | Status | Evidence produced |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Account lifecycle | `business_models` includes `banking` or `partner_banking: true` | Model opening, verification, restrictions, closure, and dormancy. | Not implemented. | Banking pack defines lifecycle controls and evidence. | Banking pack, account lifecycle templates, scenario tests. | Lifecycle transitions and required reviews are profile-driven. | Capability profile, identity controls. | Partner-bank obligations vary by program. | Banking Platform | P2 | planned | Lifecycle review. |
| Balance controls | Accounts, wallets, stored value, customer funds | Protect balance correctness and visibility. | Ledger work planned; no balance model exists. | Balance reads derive from controlled ledger or balance authority. | Balance invariant tests, stale-read handling, reconciliation checks. | Balance-impacting changes require invariant evidence. | Ledger integrity. | Race conditions and stale balances. | Banking/Ledger Engineering | P0 | planned | Balance invariant report. |
| Holds | Deposits, cards, wallets, banking accounts | Represent pending funds and release conditions. | Not implemented. | Holds are explicit, auditable, and reconciled. | Holds model, release tests, evidence template. | Hold lifecycle tests cover placement, expiration, release, and cancellation. | Account lifecycle, ledger. | Incorrect holds can harm customers. | Banking Platform | P2 | planned | Hold lifecycle evidence. |
| Statements | Banking, card, wallet, investment accounts | Produce customer-facing records with provenance. | Not implemented. | Statement generation retains source data versions and approval evidence. | Statement scenario, snapshot rules, disclosure review. | Generated statement links to source transaction versions. | Ledger, data retention. | Incorrect statements create regulatory and customer risk. | Customer Documents | P2 | planned | Statement provenance. |
| Partner-bank integration | Sponsor bank or core banking dependency | Manage external bank workflows and evidence. | Not implemented. | Partner-bank changes require dependency, reconciliation, and incident evidence. | Partner integration template, contract tests, escalation model. | Integration change cannot release without owner and rollback path. | Partner dependency model. | Contract drift and operational handoffs. | Partner Platform | P1 | planned | Partner review package. |
| Core reconciliation | Core banking, processor, ledger, customer records | Reconcile internal and external account state. | Reconciliation planned for payments only. | Banking reconciliation scenarios produce exception evidence. | Core reconciliation workflow, mismatch fixtures. | Simulated core mismatch creates exception and owner assignment. | Partner-bank integration, ledger. | Silent core drift. | Banking Operations | P1 | planned | Core reconciliation report. |
| Interest and fee calculations | Deposit, credit, investment, wallet, or account fees | Version and test calculations. | Not implemented. | Calculation rules are versioned and explainable. | Calculation policy schema, tests, historical replay evidence. | Historical account event resolves exact policy version. | Account lifecycle, pricing versioning. | Rounding and jurisdiction variation. | Finance Platform | P2 | planned | Calculation replay evidence. |

### Track D: Lending and Credit

| Initiative | Applicability | Objective | Current state | Target state | Deliverables | Acceptance criteria | Dependencies | Risks | Owner | Priority | Status | Evidence produced |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Credit policy | `lending_decisions: true` or `credit_underwriting: true` | Version eligibility, pricing, underwriting, and manual policy rules. | Not implemented. | Lending pack records policy versions and required reviewers. | Lending pack, credit-policy schema, reviewer template. | Credit-impacting changes require policy version and owner approval. | Capability profile, evidence ledger. | Policy ambiguity can create inconsistent decisions. | Credit Risk | P0 | planned | Credit policy review. |
| Underwriting | Lending products and credit decisions | Trace inputs, decisions, models, and overrides. | Not implemented. | Underwriting decisions retain input classes, model/rule versions, and reasons. | Decision trace schema, tests, data-boundary review. | Sample decision can be replayed to policy/model version and reason codes. | Credit policy, model governance. | Sensitive data misuse or incomplete traces. | Lending Platform | P0 | planned | Decision trace evidence. |
| Decision traceability | Credit, eligibility, pricing, limits | Make material decisions explainable and auditable. | Not implemented. | Decision traces are mandatory for credit-impacting workflows. | Trace template, audit check, sample scenario. | Missing decision trace fails release evidence checks. | Evidence ledger. | Overcollection of sensitive data. | Compliance Engineering | P0 | planned | Decision trace. |
| Model governance | AI/ML credit, fraud, eligibility, pricing models | Govern model versions, validation, monitoring, and rollout. | AI data-boundary template exists; no model registry exists. | Model registry links version, validation, approvals, monitoring, and rollback. | Model-risk template, registry stub, rollout gates. | Model change includes validation evidence and rollback plan. | AI governance, data classification. | Unvalidated model drift. | Model Risk | P0 | partial | Model validation package. |
| Adverse-action workflows | Declines or materially adverse credit outcomes | Retain supported reasons and notice evidence where applicable. | Not implemented. | Adverse-action controls are selected by lending profile. | Reason-code catalog, notice evidence template, tests. | Decline scenario records supported reasons and notice evidence. | Credit policy, decision traceability. | Incorrect or unsupported reasons. | Compliance and Product | P0 | planned | Adverse-action evidence. |
| Fair-lending controls | Lending eligibility, pricing, servicing | Support fairness review and monitoring. | Not implemented. | Fair-lending review is required for credit-policy/model changes. | Review template, monitoring requirements, approval route. | Credit-impacting change lists fair-lending review status. | Model governance, credit policy. | Proxy discrimination and incomplete monitoring. | Fair Lending Owner | P1 | planned | Fair-lending review. |
| Human override | Credit decisions and exception handling | Control manual decision changes. | Not implemented. | Overrides require reason, authority, evidence, and monitoring. | Override template, authorization rules, audit report. | Override scenario produces attributable evidence. | Identity and access, decision traceability. | Uncontrolled exceptions. | Credit Operations | P1 | planned | Override audit evidence. |

### Track E: Cards and Wallets

| Initiative | Applicability | Objective | Current state | Target state | Deliverables | Acceptance criteria | Dependencies | Risks | Owner | Priority | Status | Evidence produced |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tokenization | `cardholder_data: true` or wallet/payment credential storage | Keep sensitive credentials inside approved boundaries. | PII/SSN logging controls exist; no PCI boundary model exists. | Cards/wallets pack defines tokenization and PCI-scoped access requirements. | Boundary template, tokenization controls, logging checks. | Cardholder-data changes identify PCI boundary and approved access path. | Data classification, security controls. | Boundary creep and logging leakage. | Security and Cards Platform | P0 | planned | PCI boundary review. |
| Authorization | Card or wallet authorization decisions | Govern authorization request, decision, and decline behavior. | Not implemented. | Authorization scenario models decision inputs, idempotency, and evidence. | Authorization workflow, tests, decline evidence. | Duplicate or retried authorization cannot create inconsistent state. | Wallet integrity, ledger. | Latency and partial failures. | Cards Platform | P1 | planned | Authorization test report. |
| Clearing and settlement | Card network or wallet settlement | Reconcile authorized, cleared, settled, disputed states. | Payment settlement not implemented. | Clearing/settlement state machine and reconciliation checks exist. | Card settlement scenario, reconciliation tests. | Simulated mismatch generates exception evidence. | Ledger, transaction state machine. | Network timing variation. | Cards Operations | P1 | planned | Clearing reconciliation evidence. |
| Wallet integrity | `digital_wallet: true` or stored value | Protect wallet balances and transactions. | Not implemented. | Wallet pack uses balance, ledger, and reconciliation controls. | Wallet scenario, invariant tests, operational checks. | Wallet-impacting changes require balance and ledger evidence. | Ledger and balance controls. | Race conditions, stale balances. | Wallet Platform | P0 | planned | Wallet invariant report. |
| Chargebacks | Card disputes and network workflows | Track chargeback lifecycle and evidence. | Not implemented. | Chargeback scenarios retain deadlines, evidence, and customer communication artifacts. | Chargeback template, lifecycle tests. | Sample chargeback produces required evidence package. | Cards pack, customer documents. | Missed deadlines. | Disputes Operations | P2 | planned | Chargeback evidence. |
| Disputes | Card, wallet, payments, banking | Support customer dispute intake, investigation, and resolution. | Not implemented. | Dispute workflow integrates evidence, cases, and customer communication. | Dispute scenario, case template, audit trail. | Dispute state changes are attributable and evidence-linked. | Evidence ledger, identity. | Incomplete investigation trail. | Customer Operations | P2 | planned | Dispute case evidence. |
| PCI boundary controls | Cardholder-data environments | Ensure scoped systems, logs, AI endpoints, and reviewers are explicit. | No PCI-specific implementation; non-goal states no certification. | PCI boundary controls are starter internal controls, not certification claims. | PCI boundary metadata, reviewer route, checks. | Cardholder data cannot be declared without boundary and logging review. | Data classification, tokenization. | False impression of PCI certification. | Security and Compliance | P0 | planned | Boundary and logging evidence. |

### Track F: Fraud, AML, KYC, and Sanctions

| Initiative | Applicability | Objective | Current state | Target state | Deliverables | Acceptance criteria | Dependencies | Risks | Owner | Priority | Status | Evidence produced |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Identity verification | `kyc: true`, `kyb: true`, customer identity workflows | Route collection, verification, retries, and failure behavior. | KYC/AML/sanctions reviewer and template exist. | Identity verification workflows include data, vendor, decision, and retry evidence. | Identity verification template, vendor review, scenario. | KYC-impacting change requires compliance/risk review evidence. | Identity controls, vendor risk. | Vendor behavior and data retention variation. | Compliance and Identity | P0 | partial | KYC impact review. |
| Transaction monitoring | AML, fraud, sanctions, money movement | Monitor activity and route exceptions. | Template asks AML/fraud questions; no monitoring scenario exists. | Monitoring changes include rule/model version and case-routing evidence. | Monitoring template, scenario, test fixtures. | Triggered scenario produces case or exception evidence. | Fraud-risk pack, model governance. | Missed suspicious activity. | Fraud/Risk Platform | P1 | partial | Monitoring evidence. |
| Rules and model versioning | Fraud, AML, sanctions, credit, risk decisions | Version rules/models and retain decision evidence. | AI data-boundary template exists; no rule/model registry exists. | Version registry links decisions to rule/model versions. | Registry schema, rollout template, tests. | Sample decision resolves exact rule/model version. | Model governance, evidence ledger. | Untraceable decisions. | Risk Platform | P0 | planned | Rule/model version record. |
| Case management | Fraud, AML, disputes, manual review | Track cases, queues, owners, decisions, and evidence. | Not implemented. | Case-management integration pattern is documented and scenario-backed. | Case template, state model, evidence links. | Case state changes are attributable and reviewable. | Evidence ledger, identity. | Operational queues outside factory visibility. | Risk Operations | P1 | planned | Case evidence. |
| Manual review | Fraud, KYC, AML, sanctions, credit exceptions | Control human review decisions and overrides. | Templates route reviews; no workflow exists. | Manual review controls include authority, reason, and evidence retention. | Manual-review template, approval policy. | Manual-review outcome includes owner and supported reason. | Human approvals, case management. | Rubber-stamp approvals. | Risk Operations | P0 | partial | Manual review record. |
| Suspicious-activity workflow integration | AML-relevant processes where applicable | Support handoff to accountable compliance workflows without claiming legal conclusions. | Not implemented. | Integration points are documented with evidence boundaries. | Workflow handoff template, role matrix. | AML-impacting changes name downstream workflow owner. | Transaction monitoring, case management. | Legal interpretation varies by jurisdiction. | AML Compliance | P1 | planned | Workflow handoff evidence. |
| Sanctions controls | Sanctions screening and watchlist workflows | Govern screening inputs, vendors, results, retries, and overrides. | KYC/AML/sanctions template exists. | Sanctions-impacting changes require designated review and evidence. | Sanctions review template updates, scenario tests. | Screening change includes vendor, retry, and override evidence. | Vendor risk, case management. | False positives/negatives. | Sanctions Compliance | P0 | partial | Sanctions impact review. |
| Audit evidence | Fraud, AML, KYC, sanctions, manual review | Retain attributable evidence for decisions and changes. | Release evidence template exists. | Domain-specific evidence is required by activated controls. | Evidence catalog mapping, checks. | Missing required evidence fails release check. | Evidence ledger, control catalog. | Incomplete evidence retention. | Audit and Compliance | P0 | partial | Audit evidence package. |

### Track G: Wealth and Insurance Extensions

| Initiative | Applicability | Objective | Current state | Target state | Deliverables | Acceptance criteria | Dependencies | Risks | Owner | Priority | Status | Evidence produced |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Suitability | `investment_advice: true` or advisor/robo-advisor workflows | Trace suitability inputs, restrictions, disclosures, and recommendations. | Not implemented. | Wealth pack activates suitability review and decision evidence. | Wealth pack, suitability template, sample scenario. | Advice-impacting change requires suitability evidence. | Capability profile, data classification. | Unsupported recommendations. | Wealth Product/Compliance | P2 | planned | Suitability review. |
| Order integrity | Trading or investment order workflows | Preserve order lifecycle, provenance, and customer intent. | Not implemented. | Order states and market-data provenance are explicit. | Order lifecycle scenario, tests, evidence template. | Sample order can trace lifecycle and source data. | Wealth pack, evidence ledger. | Market timing and stale data issues. | Wealth Platform | P2 | planned | Order integrity evidence. |
| Policy and claims workflows | `insurance_underwriting: true` or claims processing | Govern quote, policy, claims, and coverage decisions. | Not implemented. | Insurance pack defines lifecycle controls and decision evidence. | Insurance pack, policy/claims templates, scenarios. | Claims or policy-impacting change requires evidence and owner approval. | Capability profile, model governance. | Sensitive health/financial data exposure. | Insurance Platform | P2 | planned | Policy/claims evidence. |
| Underwriting controls | Insurance or lending underwriting | Version rules, models, inputs, and overrides. | Lending underwriting planned; insurance not implemented. | Underwriting control pattern supports lending and insurance variants. | Shared underwriting template, domain overlays. | Underwriting decision traces include policy/model versions. | Model governance, decision traceability. | Domain-specific rules may diverge. | Risk Platform | P1 | planned | Underwriting trace. |
| Model governance | Wealth, insurance, credit, fraud models | Govern model versioning, validation, monitoring, and rollout. | AI data-boundary checks exist only at starter level. | Model-risk workflow applies to domain-specific packs. | Model governance templates, registry, rollout gates. | Model-impacting changes include validation and monitoring evidence. | Secure agent runtime, data classification. | Unmonitored drift. | Model Risk | P0 | partial | Model validation package. |
| Customer disclosure evidence | Wealth, insurance, remittance, lending, fees | Retain customer-facing disclosure versions. | Remittance disclosure template exists. | Disclosure evidence pattern supports multiple FinTech domains. | Disclosure version schema, template, tests. | Customer-impacting disclosure change resolves version and approval. | Evidence ledger, product policy. | Missing historical disclosures. | Product Compliance | P1 | partial | Disclosure evidence. |

### Track H: FinTech Application Platform

| Initiative | Applicability | Objective | Current state | Target state | Deliverables | Acceptance criteria | Dependencies | Risks | Owner | Priority | Status | Evidence produced |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Shared SDKs | Platform teams providing client/server SDKs | Govern sensitive data handling, rollout, compatibility, and ownership. | App-platform library manifest and PII safe logging example exist. | SDK changes have profile-aware contract, privacy, security, and release evidence. | SDK manifest schema, examples, compatibility checks. | SDK release evidence names data classes, owners, and rollout plan. | Data classification, release gates. | Client fragmentation. | App Platform | P0 | partial | SDK manifest, release evidence. |
| API and GraphQL governance | API services; GraphQL only when declared | Detect breaking API changes and enforce field-level authorization. | GraphQL example, reviewer, and rules exist. | API governance supports REST/event/GraphQL variants based on channel profile. | API compatibility checks, schema diff evidence, authZ tests. | Breaking changes are detected before merge for declared API surfaces. | Identity and access, SDK governance. | Assuming GraphQL where not used. | API Platform | P0 | partial | API diff and authZ evidence. |
| Mobile platform controls | `mobile: true` channels | Govern mobile SDK security, logging, version compatibility, and rollout. | Mobile security reviewer/template exists. | Mobile controls activate only for mobile surfaces. | Mobile control pack, client compatibility template. | Mobile-impacting change includes minimum version and rollback evidence. | SDK governance, release management. | Unsupported client versions. | Mobile Platform | P1 | partial | Mobile security review. |
| Developer portal | Internal developer platforms | Make packs, profiles, controls, and evidence discoverable. | Not implemented. | Developers can select a domain pack and generate required artifacts. | Portal concept, docs IA, starter CLI command. | Example workflow generates profile, reviews, and evidence packet. | Capability profile, policy-as-code. | Portal drift from source of truth. | Developer Experience | P2 | planned | Generated workflow packet. |
| Golden paths | Reusable service/change templates | Reduce variance for regulated service delivery. | Core factory and examples exist. | Golden paths exist for common, payments, fraud, lending, cards/wallets, and platform changes. | Templates, examples, validation checks. | New scenario can be started from a documented path. | Pack metadata, reference app. | Templates become stale. | Platform Engineering | P1 | partial | Golden-path artifacts. |
| Release orchestration | Gated regulated changes | Combine profile, risk, tests, approvals, and evidence into repeatable release flow. | Release templates and checks exist. | Release gates are policy-driven and tier-aware. | Release orchestrator rules, checks, examples. | Required evidence is computed and validated from profile and risk. | Policy-as-code, evidence ledger. | Manual bypasses. | Release Engineering | P0 | partial | Release evidence package. |
| Progressive delivery | High-tier services, customer-fund or customer-data impact | Roll out safely with canaries, monitoring, rollback, and customer-impact criteria. | Release templates mention rollout/monitoring. | Progressive delivery requirements activate by tier and capability. | Rollout template, monitoring criteria, rollback evidence. | Tier-0/tier-1 release includes rollout and rollback evidence. | Reliability tiers, observability. | Inadequate rollback for financial effects. | SRE/Release | P1 | partial | Rollout plan, rollback evidence. |
| Platform adoption model | Multi-team organizations | Track where packs are enabled and how teams comply. | Not implemented. | Adoption metadata reports services, packs, owners, exceptions, and maturity. | Adoption schema, report, exceptions register. | Report lists enabled packs and open exceptions by owner. | Capability profile, policy-as-code. | Compliance theater without adoption metrics. | Platform Governance | P2 | planned | Adoption report. |

## Compatibility Pack Model

The desired pack layout is:

```text
packs/
├── fintech-common/
├── payments/
├── remittance/
├── banking/
├── lending/
├── cards-wallets/
├── wealth/
├── insurance/
├── fraud-risk/
└── organization-overlays/
```

The current repository already has `packs/regulated-factory` and
`packs/fintech-app-platform-factory`. Those should be treated as reusable
starting points, not as proof that all FinTech domains are implemented.

Each future pack should define:

- Applicability criteria.
- Risk questions.
- Required decisions.
- Required controls.
- Required tests.
- Required reviewers.
- Required evidence.
- Release gates.
- Operational checks.
- Example scenarios.

## Reference Implementation Strategy

The reference implementation should be a modular FinTech platform:

```text
reference-fintech-platform/
├── common/
├── identity/
├── api-gateway/
├── customer-profile/
├── payments/
├── ledger/
├── fraud-risk/
├── lending/
├── cards-wallets/
├── observability/
├── infrastructure/
└── release-evidence/
```

The first executable scenario may focus on payments or money movement because
it exercises idempotency, duplicate prevention, partial failure, financial
state, reconciliation, and rollback evidence. That scenario should not define
the whole factory. Beneficiary or recipient handling should be treated as one
example workflow, not the identity of the platform.

Future reference scenarios:

1. Payment retry and duplicate prevention.
2. Ledger reconciliation failure.
3. Credit-policy update.
4. Fraud-model rollout.
5. Customer-data access change.
6. Card or wallet transaction dispute.
7. Partner-bank integration change.

## Explicit Limitations

This roadmap does not claim universal compliance, legal interpretation,
certification for PCI DSS, SOC 2, SOX, GLBA, GDPR, or any other framework, or a
complete production implementation of a regulated financial platform. Human
control owners remain accountable for final decisions.
