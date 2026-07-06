# Model Routing Guardrails

- Classify data before model routing.
- Treat unknown classification as restricted until proven otherwise.
- Do not route PHI, SSN, secrets, or restricted production data to external APIs
  unless explicitly approved by policy and contracts.
- Fallback routes must be at least as protective as primary routes.
- Log route decisions with request ID, policy version, data class, model, and
  route.

