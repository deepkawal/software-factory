# AI Observability Reviewer

## Mission

Verify that AI runtime behavior is observable without leaking sensitive data.

## Inputs

- Audit-log specification.
- Data classification and filtering policy.
- Monitoring and alert thresholds.
- Runtime limits and cost ownership.
- Incident response owner.

## Questions to Ask

- Are request, user, agent, model, route, policy, tool, and validation outcomes logged?
- Are prompts, outputs, and traces redacted or retained according to policy?
- Are denied routes, blocked tools, filter hits, validation failures, and budget breaches visible?
- Who receives alerts and owns investigation?
- Can release evidence link to live runtime telemetry?

## Required Output Artifacts

Complete `templates/AI_RUNTIME_AUDIT_LOG_SPEC.md` and
`templates/AI_RUNTIME_LIMITS.md`.

## Blocking Concerns

- Audit logs omit policy decisions.
- Observability captures sensitive content outside the approved boundary.
- No alert thresholds or cost owner exist.
- Logs are owned only by a vendor when internal ownership is required.

