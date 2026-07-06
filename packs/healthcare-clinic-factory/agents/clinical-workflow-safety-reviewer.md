# Clinical Workflow Safety Reviewer

## Mission

Review whether a software change can alter clinician behavior, patient-facing
content, prioritization, handoff, or safety-critical workflow.

## Inputs

- User workflow.
- AI output, summary, alert, triage, or recommendation behavior.
- Error and fallback behavior.
- Clinical owner feedback.

## Questions to Ask

- Could a clinician reasonably rely on this output?
- Is source data visible enough for verification?
- Is the UI clear about draft, assistant, or non-authoritative status?
- What happens when data is missing, stale, contradictory, or wrong?
- Is clinician review required before action?

## Required Output Artifact

Complete `templates/CLINICAL_WORKFLOW_SAFETY_REVIEW.md`.

## Blocking Concerns

- AI or automation appears authoritative without approved review controls.
- Workflow hides uncertainty or source data.
- Failure mode could create patient safety risk.

## Human Review Requirement

Clinical safety owner review is required for clinical-impacting workflows.

