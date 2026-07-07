# AI Software Factory

> Exploring what software engineering looks like when AI becomes a first-class collaborator.

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

Regulated organizations need an additional layer. In healthcare, speed cannot
bypass PHI/ePHI safeguards, minimum necessary data use, clinical workflow safety,
vendor boundaries, and audit evidence. In fintech and money movement, speed
cannot bypass PII/SSN protections, customer financial information safeguards,
KYC/AML/sanctions controls, payment integrity, consumer disclosure behavior,
platform-library contracts, and release traceability.

This repository includes regulated-domain packs that extend the core factory
with domain-specific agents, rules, templates, examples, and lightweight
CI-style checks. These packs help engineering teams identify privacy, security,
compliance, clinical workflow, AI governance, and release-evidence questions
earlier in the SDLC. They do not replace required review by Legal, Compliance,
Privacy, Security, Clinical, Risk, AML, or Regulatory teams.

- [`packs/regulated-factory`](packs/regulated-factory/) — shared privacy,
  security, AI-governance, vendor-risk, and release-evidence overlay.
- [`packs/healthcare-clinic-factory`](packs/healthcare-clinic-factory/) —
  healthcare/clinic software pack for PHI/ePHI, minimum necessary use, clinical
  workflow safety, FHIR/interoperability, vendor/BAA prompts, and release evidence.
- [`packs/healthcare-clinic-factory/examples/clinic-patient-summary-ai-assist`](packs/healthcare-clinic-factory/examples/clinic-patient-summary-ai-assist/) —
  example route for an AI-assisted clinic patient summary.
- [`packs/fintech-app-platform-factory`](packs/fintech-app-platform-factory/) —
  Remitly-like App Platform pack for shared SDKs, GraphQL edge, release
  management, QA, PII/SSN controls, KYC/AML/sanctions routing, payment integrity,
  and remittance disclosure impact.
- [`packs/fintech-app-platform-factory/examples/pii-safe-logging-library`](packs/fintech-app-platform-factory/examples/pii-safe-logging-library/) and
  [`packs/fintech-app-platform-factory/examples/graphql-edge-gateway-change`](packs/fintech-app-platform-factory/examples/graphql-edge-gateway-change/) —
  concrete fintech app-platform examples.
- [`tools/regulated`](tools/regulated/) — lightweight Node checks for sensitive
  data logging, AI data boundaries, required artifacts, and release evidence.

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
