# AI Data Boundary Review: AI-Assisted Patient Summary

## AI Use Case

- Feature: draft pre-visit summary for clinic staff.
- Data: approved PHI/ePHI field subset.
- Model/provider: approved healthcare AI provider with BAA before production.
- Human owner: Clinical Platform.

## Controls

- [x] PHI/ePHI allowed only inside approved model boundary.
- [x] Prompt and completion retention disabled or covered by approved retention terms.
- [x] No prompt/completion content in application logs.
- [x] Summary is clinician-facing only.
- [x] Clinician can edit, ignore, or discard.
- [x] No autonomous diagnosis, order, billing, or patient instruction.

## Decision

- [x] Approved pending BAA/vendor confirmation and clinical safety signoff.

