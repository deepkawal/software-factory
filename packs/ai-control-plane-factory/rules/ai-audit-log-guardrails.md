# AI Audit Log Guardrails

- Emit audit events for request identity, agent identity, model, route, data
  class, prompt policy, tool decisions, filters, validations, approvals, and
  evidence links.
- Protect logs according to the highest data class represented in the event.
- Redact or avoid storing sensitive prompt and completion content unless policy
  requires protected retention.
- Keep audit logs available to company incident response and compliance owners.
- Alert on denied routes, blocked tools, filter hits, validation failures, and
  budget breaches.

