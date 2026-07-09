# AI Software Factory

> Exploring what software engineering looks like when AI becomes a first-class collaborator.

> Enterprise-oriented reference architecture and executable starter kit for
> governed AI-native software delivery in regulated FinTech environments.

---

## Executive Summary

For decades, engineering organizations have invested in developer platforms, CI/CD, automation, observability, and internal tooling to make engineers more productive. AI-native development is the next step in that same line of work: specialized AI agents participating across the software lifecycle while engineers stay accountable for the technical and business decisions.

AI Software Factory is my exploration of what that looks like in practice. Instead of treating AI as a coding assistant, it models a full engineering organization — Product, Architecture, Engineering, Review, QA, Documentation, and Operations — where each function has a specialized AI collaborator. The aim is ordinary: less friction, more consistency, and more engineering time spent on business problems instead of mechanics.

The work is grounded in MealBrain and other production-quality applications and prototypes: AI-native engineering, human-governed delivery, ADR/PD discipline, and a 10-agent Gas City pipeline applied to shipped product work.

---

## Why I Built This

Throughout my career at Microsoft, Expeditors, Niantic, and Epic Games, I repeatedly found myself building internal engineering platforms that made engineers more productive.

Those platforms evolved over time:

- Engineering automation
- Developer productivity platforms
- CI/CD platforms
- Internal developer platforms
- AI-powered engineering workflows

After leading Platform Engineering at Epic Games, I wanted to explore the next logical evolution:

**What happens when AI becomes another member of the engineering organization?**

AI Software Factory is my attempt to answer that question.

---

## Engineering Philosophy

A few principles shape the design.

### AI augments engineers

Engineers keep ownership of architecture, product decisions, security, and production quality. The agents take on more of the mechanical work around those decisions, but the accountability doesn't move.

### Platforms compound

Developer productivity compounds: an hour saved for every engineer, every week, adds up fast across an organization. So I build AI as a platform capability — maintained centrally, wired into the workflow — rather than a collection of point tools bolted on team by team.

### Deterministic workflows matter

Engineering organizations run on predictability. The goal here isn't autonomous software delivery; it's repeatable, governed workflows that use AI at each step and produce the same shape of output every time.

### Context is the product

As models converge in capability, the differentiator moves to the context you feed them. Documentation, architecture, standards, ADRs, coding conventions, and accumulated organizational knowledge are the real assets — the factory is only as good as the context behind it.

---

## Vision

Traditional software organizations look like this:

```
Idea
  ↓
Product Management
  ↓
Architecture
  ↓
Engineering
  ↓
Code Review
  ↓
Testing
  ↓
Deployment
  ↓
Operations
```

AI-native organizations augment every stage:

```
Product Manager  ──▶  Product Manager Agent
       ↓
Architect        ──▶  Architect Agent
       ↓
Engineering      ──▶  Developer Agent
       ↓
Code Review      ──▶  Reviewer Agent
       ↓
QA               ──▶  QA Agent
       ↓
Documentation    ──▶  Documentation Agent
       ↓
Deployment       ──▶  Release Agent
```

Every stage still has a human owner. The agent accelerates the work; the person owns the decision.

---

## Current Capabilities

The Software Factory currently explores:

- Product requirement generation
- Architecture documentation
- ADR generation
- Task decomposition
- Code implementation
- Code review
- Testing strategy
- Documentation generation
- Development workflows
- Multi-agent orchestration

> **Technical deep-dive:** for the concrete implementation — the multi-agent pipeline,
> agent roster, decision-record discipline, the `decisions.mjs` CI gate, and model-tier
> mapping — see [`docs/README-technical.md`](docs/README-technical.md).

## Regulated Domain Packs

The core AI Software Factory is intentionally domain-neutral. It defines the
repeatable SDLC structure: intake, product reasoning, architecture,
implementation, review, validation, release, and operational feedback.

Regulated organizations need additional layers. Design-time governance catches
privacy, security, AI-governance, vendor, domain-risk, and release-evidence
questions before implementation and deployment. Runtime AI control-plane
governance makes sure model routing, prompt and tool policy, MCP access,
sensitive-data filtering, token and cost limits, observability, and audit logs
are enforced while AI systems execute.

In healthcare, speed cannot bypass PHI/ePHI safeguards, minimum necessary data
use, clinical workflow safety, vendor boundaries, and audit evidence. In fintech
and money movement, speed cannot bypass PII/SSN protections, customer financial
information safeguards, KYC/AML/sanctions controls, payment integrity, consumer
disclosure behavior, platform-library contracts, and release traceability.

This repository includes regulated-domain packs that extend the core factory
with domain-specific agents, rules, templates, examples, and lightweight
CI-style checks. These packs help engineering teams identify privacy, security,
compliance, clinical workflow, AI governance, and release-evidence questions
earlier in the SDLC. They do not replace required review by Legal, Compliance,
Privacy, Security, Clinical, Risk, AML, or Regulatory teams.

- [`packs/regulated-factory`](packs/regulated-factory/) — shared privacy,
  security, AI-governance, vendor-risk, and release-evidence overlay.
- [`packs/ai-control-plane-factory`](packs/ai-control-plane-factory/) —
  vendor-neutral runtime AI governance pack for governed AI endpoints, model
  routing, prompt/tool policy, MCP access control, sensitive-data filtering,
  runtime audit logs, AI system registry, AI Bill of Materials, and token/cost
  budget controls.
- [`packs/healthcare-clinic-factory`](packs/healthcare-clinic-factory/) —
  healthcare/clinic software pack for PHI/ePHI, minimum necessary use, clinical
  workflow safety, FHIR/interoperability, vendor/BAA prompts, and release evidence.
- [`packs/healthcare-clinic-factory/examples/clinic-patient-summary-ai-assist`](packs/healthcare-clinic-factory/examples/clinic-patient-summary-ai-assist/) —
  example route for an AI-assisted clinic patient summary.
- [`packs/fintech-app-platform-factory`](packs/fintech-app-platform-factory/) —
  FinTech application-platform pack for shared SDKs, GraphQL edge where
  applicable, release management, QA, PII/SSN controls, KYC/AML/sanctions
  routing, payment integrity, and remittance disclosure impact.
- [`packs/fintech-app-platform-factory/examples/pii-safe-logging-library`](packs/fintech-app-platform-factory/examples/pii-safe-logging-library/) and
  [`packs/fintech-app-platform-factory/examples/graphql-edge-gateway-change`](packs/fintech-app-platform-factory/examples/graphql-edge-gateway-change/) —
  concrete fintech app-platform examples.
- [`tools/regulated`](tools/regulated/) — lightweight Node checks for sensitive
  data logging, AI data boundaries, required artifacts, and release evidence.
- [`tools/ai-control-plane`](tools/ai-control-plane/) — lightweight Node checks
  for AI system registry, model routing policy, MCP/tool access review, and AI
  runtime audit-log specifications.

Together, the repository now covers:

1. Core AI-native SDLC.
2. Regulated design-time governance.
3. Runtime AI control plane governance.
4. Healthcare and fintech domain overlays.

## FinTech Platform Compatibility

The FinTech direction for this repository is a composable platform model, not a
single fixed workflow for one business model. The factory is intended to support
digital payments, cross-border payments and remittances, banking and BaaS,
lending, wealth, insurance, cards and wallets, financial-data platforms,
fraud/identity/risk systems, FinTech application-platform teams, and internal
developer platforms for regulated products.

The target architecture separates reusable concerns:

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

Controls are conditional. A service or change should activate controls based on
declared business model, product capability, data class, jurisdiction,
regulatory obligations, service criticality, external partner dependencies, AI
usage, and customer-fund exposure. The repository must not assume every FinTech
organization moves money directly, maintains a ledger, performs KYC/AML
internally, stores cardholder data, issues credit, operates a bank, uses
GraphQL, ships mobile applications, follows identical regulations, or needs the
same approval workflow.

The current repository contains an early FinTech application-platform pack and
regulated-factory overlay. It does not yet implement the full multi-pack target
architecture. The detailed roadmap is in
[`docs/ENTERPRISE_READINESS_ROADMAP.md`](docs/ENTERPRISE_READINESS_ROADMAP.md),
and starter control definitions are in
[`docs/FINTECH_CONTROL_CATALOG.md`](docs/FINTECH_CONTROL_CATALOG.md).

### FinTech Capability Profile

FinTech packs should be selected by a machine-readable capability profile. This
schema is a starter contract and should evolve into validated metadata consumed
by agents, checks, release gates, and evidence tooling.

```yaml
fintech_profile:
  business_models:
    - payments
    - remittance

  capabilities:
    money_movement: true
    customer_funds: true
    financial_ledger: true
    cardholder_data: false
    lending_decisions: false
    investment_advice: false
    insurance_underwriting: false
    digital_wallet: true
    partner_banking: true

  regulated_processes:
    kyc: true
    aml: true
    sanctions_screening: true
    fraud_decisioning: true
    credit_underwriting: false

  data_classes:
    pii: true
    financial_account_information: true
    payment_credentials: true
    government_identifiers: true
    credit_information: false
    investment_information: false
    insurance_information: false

  channels:
    web: true
    mobile: true
    api: true
    graphql: false

  jurisdictions:
    - placeholder

  service_tier:
    default: tier_1
```

The profile should determine which controls apply, which agents participate,
which reviews and tests are required, what evidence must be retained, which
approvals are required, and which release gates are enforced.

### Current FinTech Coverage

| Domain | Current status | Repository evidence | Major gaps |
| --- | --- | --- | --- |
| Common FinTech governance | Early starter coverage | [`packs/regulated-factory`](packs/regulated-factory/), [`packs/fintech-app-platform-factory/templates/FINTECH_CHANGE_CLASSIFICATION.md`](packs/fintech-app-platform-factory/templates/FINTECH_CHANGE_CLASSIFICATION.md), [`tools/regulated`](tools/regulated/) | No validated capability profile, policy-as-code engine, evidence ledger, jurisdiction model, or risk-tier enforcement. |
| Payments and money movement | Partial review templates only | [`packs/fintech-app-platform-factory/agents/payments-integrity-reviewer.md`](packs/fintech-app-platform-factory/agents/payments-integrity-reviewer.md), [`packs/fintech-app-platform-factory/templates/PAYMENT_INTEGRITY_REVIEW.md`](packs/fintech-app-platform-factory/templates/PAYMENT_INTEGRITY_REVIEW.md) | No executable transaction state machine, ledger invariants, duplicate-prevention tests, settlement model, or reconciliation workflow. |
| Remittance | Narrow impact-review coverage | [`packs/fintech-app-platform-factory/agents/remittance-disclosure-reviewer.md`](packs/fintech-app-platform-factory/agents/remittance-disclosure-reviewer.md), [`packs/fintech-app-platform-factory/templates/REMITTANCE_DISCLOSURE_IMPACT_REVIEW.md`](packs/fintech-app-platform-factory/templates/REMITTANCE_DISCLOSURE_IMPACT_REVIEW.md) | No reusable remittance pack, corridor model, disclosure generation, exchange-rate versioning, or partner-bank workflow. |
| Lending | Not implemented | [`docs/ENTERPRISE_READINESS_ROADMAP.md`](docs/ENTERPRISE_READINESS_ROADMAP.md) | Needs lending pack, credit-policy metadata, underwriting traceability, adverse-action workflow, fair-lending review, and model governance. |
| Banking | Not implemented | [`docs/ENTERPRISE_READINESS_ROADMAP.md`](docs/ENTERPRISE_READINESS_ROADMAP.md) | Needs banking pack, account lifecycle, balance controls, holds, statements, partner-bank integration, and core reconciliation. |
| Cards and wallets | Not implemented | [`docs/ENTERPRISE_READINESS_ROADMAP.md`](docs/ENTERPRISE_READINESS_ROADMAP.md) | Needs cards/wallets pack, tokenization boundaries, authorization/clearing/settlement flows, wallet integrity, disputes, and PCI scoping. |
| Wealth | Not implemented | [`docs/ENTERPRISE_READINESS_ROADMAP.md`](docs/ENTERPRISE_READINESS_ROADMAP.md) | Needs wealth pack for suitability, order integrity, market-data provenance, trade lifecycle, restrictions, and disclosure evidence. |
| Insurance | Not implemented | [`docs/ENTERPRISE_READINESS_ROADMAP.md`](docs/ENTERPRISE_READINESS_ROADMAP.md) | Needs insurance pack for quote, underwriting, policy, claims, pricing, eligibility, coverage, and sensitive-data boundaries. |
| Fraud and risk | Partial routing coverage | [`packs/fintech-app-platform-factory/agents/kyc-aml-sanctions-reviewer.md`](packs/fintech-app-platform-factory/agents/kyc-aml-sanctions-reviewer.md), [`packs/fintech-app-platform-factory/templates/KYC_AML_SANCTIONS_IMPACT_REVIEW.md`](packs/fintech-app-platform-factory/templates/KYC_AML_SANCTIONS_IMPACT_REVIEW.md) | No case-management scenario, rule/model registry, suspicious-activity integration, sanctions evidence workflow, or manual-review operating model. |
| Platform engineering | Partial app-platform coverage | [`packs/fintech-app-platform-factory`](packs/fintech-app-platform-factory/), [`docs/README-technical.md`](docs/README-technical.md) | Needs reusable SDK governance, API compatibility automation beyond examples, developer portal model, adoption metrics, progressive delivery, and artifact provenance. |

### Applicability Model

FinTech controls should be activated by declared facts rather than broad labels.
Examples:

- `money_movement` activates idempotency, duplicate prevention, partner retry,
  and operational rollback evidence.
- `customer_funds` activates stronger release, reconciliation, and incident
  readiness requirements.
- `cardholder_data` activates PCI-scoped access, logging, and boundary reviews.
- `lending_decisions` activates credit-policy, adverse-action, fair-lending,
  model-validation, and decision-traceability controls.
- `graphql: true` activates GraphQL schema, authorization, and client
  compatibility checks; it is otherwise not required.

### Compatibility Packs

The target model is a set of optional packs. Existing packs should be reused
where they fit; new directories should be added only when the implementation is
ready.

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

Each pack should eventually define applicability criteria, risk questions,
required decisions, required controls, tests, reviewers, retained evidence,
release gates, operational checks, and example scenarios.

### Reference Implementation Strategy

The reference implementation should be a shared FinTech platform with modular
scenarios rather than only a remittance example.

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
that exercises strong integrity requirements. Beneficiary or recipient handling
is one useful scenario: add a sensitive beneficiary field across an API, shared
SDK, application service, persistence layer, logging model, and release
workflow. Future scenarios should include payment retry and duplicate
prevention, ledger reconciliation failure, credit-policy update, fraud-model
rollout, customer-data access change, card or wallet transaction dispute, and
partner-bank integration change.

### Non-Goals

This repository does not provide:

- Universal regulatory compliance.
- Legal interpretation for every jurisdiction.
- A complete banking, payment, lending, wealth, insurance, card, wallet, or
  remittance platform.
- Certification for PCI DSS, SOC 2, SOX, GLBA, GDPR, or any other framework.
- Replacement for accountable human control owners.
- A single workflow that fits every FinTech company.

---

## Lessons Learned

Building AI-native engineering workflows has reinforced several observations.

- Prompt engineering alone does not scale.
- Documentation quality directly impacts AI quality.
- Human review remains essential.
- AI performs best within clearly defined responsibilities.
- Engineering workflows benefit from multiple specialized agents rather than one general-purpose assistant.
- Governance becomes increasingly important as AI capabilities grow.

---

## Intended Audience

This repository is intended for:

- CTOs
- VP Engineering
- Platform Engineering organizations
- Developer Experience teams
- AI Engineering teams
- Engineering leaders exploring AI-native development

---

## Future Direction

Near-term areas of exploration include:

- Autonomous backlog refinement
- Architecture-aware code generation
- Engineering knowledge graphs
- AI-assisted release management
- Organizational memory
- Multi-agent software delivery pipelines
- AI governance and responsible engineering workflows

---

## About Me

I am an Engineering Director with sixteen years of experience building internal engineering platforms, developer productivity systems, CI/CD platforms, and AI-enabled engineering workflows across Microsoft, Expeditors, Niantic, and Epic Games.

The focus has stayed the same throughout: build platforms that make engineers more effective. This is where that work goes next.

---

## Connect

- [LinkedIn](https://www.linkedin.com/in/singhkawaldeep/)
- [GitHub](https://github.com/deepkawal)
