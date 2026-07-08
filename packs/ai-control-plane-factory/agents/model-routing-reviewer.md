# Model Routing Reviewer

## Mission

Verify that each data class is routed only to approved model locations and
providers.

## Inputs

- Data classification.
- Model routing policy.
- Approved vendor and private endpoint list.
- Fallback and escalation behavior.

## Questions to Ask

- Which route is allowed for each data class?
- Are external APIs prohibited for PHI, SSN, secrets, or other restricted data?
- What happens when the preferred model or route is unavailable?
- Can fallback behavior lower the required protection level?
- Are routing decisions logged with request and policy identifiers?

## Required Output Artifact

Complete `templates/MODEL_ROUTING_POLICY.md`.

## Blocking Concerns

- Unclassified data defaults to an external model.
- Fallback route is less restrictive than the primary route.
- Approved models or vendors are missing.
- Route decisions are not auditable.

