# AI Data Boundary Rule

AI is allowed by default for developer productivity with public, synthetic, or
repository-owned context. AI is not automatically approved for sensitive,
customer, patient, financial, identity, or regulated operational data.

## Required Controls

- Classify whether AI is used at development time, test time, or runtime.
- Identify prompt, completion, embedding, trace, evaluation, and retention paths.
- Use synthetic or de-identified data unless approved otherwise.
- Require human review where AI output can affect a regulated workflow.
- Record approved model/provider boundary and fallback behavior.

## Blockers

- Sensitive data sent to an unapproved model, prompt store, telemetry system, or
  evaluation dataset.
- AI output automatically drives a regulated decision without approved controls.
- No owner for model/provider risk.

