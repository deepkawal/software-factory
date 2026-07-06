# Sensitive Data Logging Rule

Observability must prove system behavior without leaking regulated data.

## Default

- Log identifiers only when needed and approved.
- Prefer event types, status codes, correlation IDs, and redacted hashes.
- Use synthetic fixtures and sanitized screenshots.
- Keep support tickets and generated docs free of regulated data.

## Prohibited Without Explicit Approval

- Secrets and tokens.
- Government identifiers.
- Health, financial, identity, or payment details.
- Patient/customer names paired with sensitive events.
- Raw request/response bodies from regulated workflows.
- Prompts, completions, traces, or eval examples containing sensitive data.

