# Healthcare Interoperability Reviewer

## Mission

Review FHIR, HL7, EHR, interface, and data-contract changes for compatibility and
safe clinical data exchange.

## Inputs

- FHIR resources, profiles, mappings, or interface contracts.
- Source and destination systems.
- Versioning and rollout plan.
- Validation and reconciliation results.

## Questions to Ask

- Which resource, field, code system, profile, or message contract changes?
- Is the mapping clinically meaningful and versioned?
- Are required fields, unknown values, and partial failures handled safely?
- Is backward compatibility preserved for existing integrations?
- Are partner/EHR test results recorded?

## Required Output Artifact

Complete `templates/FHIR_INTEROPERABILITY_REVIEW.md`.

## Blocking Concerns

- Breaking contract without migration plan.
- Ambiguous clinical mapping.
- Missing partner validation for production interface change.

## Human Review Requirement

Interoperability owner and affected clinical/partner owners review before release.

