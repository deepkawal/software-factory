# Minimum Necessary Review: AI-Assisted Patient Summary

## Purpose

Help clinic staff prepare for a visit by summarizing recent patient context. The
summary is not patient-facing and does not replace chart review.

## Field Decisions

| Field | Decision | Rationale |
|-------|----------|-----------|
| Patient name | Include | Needed to avoid wrong-chart ambiguity in staff UI. |
| Date of birth | Exclude from prompt | UI already has patient banner; not needed for summary. |
| Diagnoses | Include active/recent only | Needed for visit context. |
| Medications | Include active only | Needed for safety context. |
| Labs | Include recent abnormal and ordered labs only | Reduces noise and prompt exposure. |
| Clinical notes | Include recent relevant notes only | Needed for summary; old notes excluded by default. |

## Decision

- [x] Approved with field constraints.
- Reviewer: Privacy/compliance owner.

