# PII/SSN Logging and Telemetry

Observability must not become a second data warehouse for regulated financial
and identity data.

## Prohibited by Default

- SSN, government ID, bank account, routing number, card number, tokens, and
  transaction instructions in logs, analytics, crash reports, prompts, fixtures,
  screenshots, support tickets, or generated docs.
- Recipient details and customer support notes in generic telemetry.
- Raw GraphQL variables or response bodies from regulated workflows.

## Preferred Signals

- Event name.
- Correlation ID.
- Redacted customer/session identifier.
- Status code or reason category.
- Latency, retry count, and failure class.

