# Regulated Factory Pack

The core factory is domain-neutral. It defines the repeatable AI-native SDLC:
intake, product reasoning, architecture, implementation, review, validation,
release, and operational feedback.

The regulated factory is an overlay for teams building software where privacy,
security, AI governance, vendor boundaries, and release evidence matter before a
change reaches production. It helps engineering teams identify regulated-domain
questions earlier and produce review artifacts in a consistent shape.

These packs help engineering teams identify privacy, security, compliance,
clinical workflow, AI governance, and release-evidence questions earlier in the
SDLC. They do not replace required review by Legal, Compliance, Privacy,
Security, Clinical, Risk, or Regulatory teams.

## How to Use

1. Run normal core-factory intake.
2. Use `regulated-intake-classifier` when a change touches sensitive data,
   AI/model boundaries, vendors, external integrations, or production release risk.
3. Route the work to the relevant reviewer agents.
4. Attach the required templates to the ADR, PD, pull request, or release packet.
5. Block merge/deploy until human owners sign off on required review lanes.

## Common Questions

- What sensitive data is touched?
- Is AI being used only for developer productivity, or does it process regulated
  or customer data?
- What data leaves the trusted boundary?
- What vendors are involved?
- Could logs, prompts, analytics, screenshots, test fixtures, or generated docs
  leak sensitive data?
- What human approvals are required?
- What release evidence must exist before merge or deploy?

## Pack Relationship

- `packs/core-factory`: domain-neutral AI-native delivery system.
- `packs/regulated-factory`: shared regulated SDLC overlay.
- `packs/healthcare-clinic-factory`: healthcare/clinic controls built on this overlay.
- `packs/fintech-app-platform-factory`: fintech/app-platform controls built on this overlay.

