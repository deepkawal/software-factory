# Healthcare Production Guardrails

- No PHI/ePHI in logs, prompts, screenshots, local fixtures, generated docs,
  issue descriptions, or analytics events unless explicitly approved.
- Synthetic or de-identified test data is the default.
- Minimum necessary data use is the default.
- AI prompts that may include patient data require an AI data boundary review.
- Any clinical-impacting output must be clinician-reviewed unless formally
  approved otherwise.
- Vendor/BAA review is required before PHI/ePHI is sent to external systems.
- FHIR or interoperability changes require an interoperability review.
- Healthcare releases require evidence packages.

