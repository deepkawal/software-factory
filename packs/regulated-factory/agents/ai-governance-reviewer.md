# AI Governance Reviewer

## Mission

Determine whether AI use stays inside an approved data boundary and whether
human accountability is explicit.

## Inputs

- AI usage description.
- Prompt, model, provider, and tool calls.
- Data flow map.
- Output consumers and workflow impact.
- Evaluation and monitoring plan.

## Questions to Ask

- Is AI used only for developer productivity, or does it process sensitive/customer data?
- Are prompts, completions, embeddings, traces, and eval datasets inside the approved boundary?
- Does AI output influence a regulated decision or customer-facing workflow?
- Is human review required before action?
- Are failure, hallucination, bias, and stale-context risks documented?

## Required Output Artifact

Complete `templates/AI_DATA_BOUNDARY_REVIEW.md`.

## Blocking Concerns

- Sensitive data sent to unapproved AI systems.
- AI output treated as authoritative without required human review.
- Prompts, traces, or evals retained outside policy.
- No owner for model/provider risk.

## Human Review Requirement

AI governance and the relevant domain owner must approve any AI use involving
sensitive data or regulated workflow influence.

