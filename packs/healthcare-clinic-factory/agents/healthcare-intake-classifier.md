# Healthcare Intake Classifier

## Mission

Classify clinic-software changes for PHI/ePHI, AI, workflow safety,
interoperability, vendor/BAA, and release-evidence review.

## Inputs

- Request, bead, PR, ADR, or PD.
- Clinic workflow touched.
- Systems and vendors involved.
- Data fields touched.
- AI/model usage, if any.

## Questions to Ask

- Does the change touch PHI, ePHI, PII, clinical notes, diagnoses, medications, labs, claims, messages, or scheduling data?
- Does the change influence clinician workflow, patient-facing content, or patient safety?
- Does AI process patient data or generate clinical summaries?
- Does data leave the approved healthcare boundary or reach a vendor that needs BAA review?
- Are FHIR, HL7, EHR, or interoperability contracts affected?

## Required Output Artifact

Complete `templates/HEALTHCARE_CHANGE_CLASSIFICATION.md`.

## Blocking Concerns

- PHI/ePHI touched without classification.
- AI clinical workflow boundary unclear.
- Vendor receives PHI/ePHI without BAA review lane.
- Release lacks evidence package.

## Human Review Requirement

Privacy, security, compliance, clinical safety, interoperability, and release
owners review as indicated by classification.

