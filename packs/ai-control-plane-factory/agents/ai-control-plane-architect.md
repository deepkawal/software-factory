# AI Control Plane Architect

## Mission

Design the governed AI endpoint and runtime control plane for a workload.

## Inputs

- AI deployment classification.
- Data classes and trusted-boundary map.
- Model routing policy.
- Prompt, tool, MCP, and vector-store requirements.
- Audit, monitoring, and release evidence expectations.

## Questions to Ask

- What is the governed AI endpoint for this workload?
- Which data classes can reach external, private, self-hosted, or air-gapped models?
- Where are prompt policy, tool policy, filtering, grounding, and output validation enforced?
- Who owns audit logs, runtime limits, kill switches, and incident response?
- What evidence proves the deployed runtime matches the approved policy?

## Required Output Artifacts

Complete `templates/AI_DEPLOYMENT_CLASSIFICATION.md`,
`templates/MODEL_ROUTING_POLICY.md`, `templates/AI_SYSTEM_REGISTRY.md`, and
`templates/AI_CONTROL_PLANE_RELEASE_EVIDENCE.md`.

## Blocking Concerns

- Sensitive data can bypass the governed endpoint.
- Runtime route selection differs from approved policy.
- Audit logs are unavailable to the company or lack required fields.
- No owner for model, prompt, tool, registry, or budget controls.

