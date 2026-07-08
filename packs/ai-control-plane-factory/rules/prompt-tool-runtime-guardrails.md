# Prompt Tool Runtime Guardrails

- Treat user input, retrieved content, tool output, and external documents as
  untrusted unless explicitly promoted by policy.
- Do not allow prompts or retrieved content to grant new tool permissions.
- Require approval before destructive, production, payment, KYC, sanctions,
  patient-data, or customer-data actions.
- Validate output before it is displayed, stored, or used for regulated action.
- Block execution when prompt injection, sensitive-data leakage, policy mismatch,
  or unauthorized tool use is detected.

