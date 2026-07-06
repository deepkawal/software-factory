# Regulated Checks

Small zero-dependency Node.js checks that demonstrate how regulated-domain
review artifacts can be made visible in CI. They are intentionally conservative:
they surface likely risks and missing evidence, then point the reviewer to the
right human-owned artifact.

These checks do not replace Legal, Compliance, Privacy, Security, Clinical,
Risk, AML, or Regulatory review.

## Run

From the repository root:

```bash
node tools/regulated/check-sensitive-data-logs.mjs
node tools/regulated/check-ai-data-boundary.mjs
node tools/regulated/check-required-domain-artifacts.mjs
node tools/regulated/check-release-evidence.mjs
```

Pass a path to scan a consuming project:

```bash
node tools/regulated/check-sensitive-data-logs.mjs ../my-app
```

## What They Check

- `check-sensitive-data-logs.mjs`: scans markdown, JS/TS, JSON, and YAML-like
  files for risky sensitive-data terms outside obvious policy/template/example
  content.
- `check-ai-data-boundary.mjs`: warns when AI/prompt/model language appears
  near sensitive-data terms without an AI data-boundary review artifact nearby.
- `check-required-domain-artifacts.mjs`: verifies healthcare and fintech example
  scenarios include the expected review artifacts.
- `check-release-evidence.mjs`: verifies regulated scenarios include release
  evidence packages.

Treat warnings as routing signals. A finding usually means "attach the right
artifact or document why this path is not in scope."
