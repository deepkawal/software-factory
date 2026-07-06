# Regulated Production Guardrails

These rules extend `rules/production-guardrails.md` for regulated environments.
They do not replace Legal, Compliance, Privacy, Security, Risk, Clinical, or
Regulatory review.

## Rules

- Sensitive data is classified at intake before implementation.
- Minimum necessary data use is the default.
- Sensitive data must not appear in logs, prompts, analytics events, screenshots,
  local fixtures, generated docs, crash reports, or issue descriptions unless
  explicitly approved for that channel.
- External vendors and processors require review before receiving sensitive data.
- AI use that touches sensitive data or regulated workflows requires an AI data
  boundary review.
- Production changes require an evidence package linking classification, reviews,
  test results, rollout, rollback, monitoring, and approvals.
- Deferred regulated controls must be recorded in an ADR, PD, or release evidence
  package with an owner and blocking milestone.

