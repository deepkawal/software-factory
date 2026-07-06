# AI Control Plane Factory Pack

This pack adds runtime AI governance to the Software Factory.

The core, regulated, healthcare, and fintech packs define design-time and
release-time governance. This pack defines how regulated organizations should
route, secure, observe, and audit AI execution while systems are running.

It is vendor-neutral. It does not require a specific model provider, gateway, or
runtime product. It captures the architectural pattern: a governed AI endpoint
that applies model routing, prompt and tool policy, sensitive-data filtering,
grounding and output validation, token and cost budgets, company-owned audit
logs, and release evidence tied back to runtime policy.

## Use It For

- Governed AI endpoints and gateways.
- External, private, self-hosted, VPC, and air-gapped model routing.
- Runtime prompt and tool policy enforcement.
- MCP/tool access control.
- Sensitive-data filtering before and after model calls.
- Grounding, output validation, and human approval gates.
- Token, runtime, retry, tool-call, and cost budget enforcement.
- AI system registry and AI Bill of Materials.
- Audit logs owned by the company.
- Release evidence that proves runtime policy is deployed.

## Routing Philosophy

External APIs are acceptable for non-sensitive workloads when vendor, retention,
logging, and contractual requirements are satisfied.

Self-hosted or approved private models may be required for PHI, SSN, customer
financial information, proprietary source code, secrets, production data,
regulated documents, or workloads requiring internal audit-log ownership.

Hybrid routing allows sensitive workloads to stay inside the trusted boundary
while lower-risk workloads use approved external models. The goal is not to slow
teams down. The goal is to provide a golden path for AI usage in regulated
engineering environments.

## Pack Relationship

- `packs/core-factory`: domain-neutral AI-native delivery system.
- `packs/regulated-factory`: regulated SDLC and release governance overlay.
- `packs/ai-control-plane-factory`: runtime AI routing, policy, audit, and cost
  governance layer.
- `packs/healthcare-clinic-factory`: PHI/ePHI and clinical workflow overlay.
- `packs/fintech-app-platform-factory`: PII/SSN, money movement, and app-platform
  overlay.

## How to Use

1. Classify the AI workload with `AI_DEPLOYMENT_CLASSIFICATION.md`.
2. Define approved routes in `MODEL_ROUTING_POLICY.md`.
3. Register the system in `AI_SYSTEM_REGISTRY.md`.
4. Capture model, prompt, tool, dataset, and dependency inventory in
   `AI_BILL_OF_MATERIALS.md`.
5. Define prompt, tool, MCP, audit-log, and runtime-limit controls.
6. Attach release evidence before production rollout.

