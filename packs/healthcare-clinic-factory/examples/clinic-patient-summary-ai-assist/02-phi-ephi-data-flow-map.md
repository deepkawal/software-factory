# PHI/ePHI Data Flow Map: AI-Assisted Patient Summary

## Data Inventory

| PHI/ePHI element | Source | Purpose | Stored? | Logged? | Vendor/external? |
|------------------|--------|---------|---------|---------|------------------|
| Patient name | EHR/profile | Identify chart context | No new storage | No | AI boundary only if approved |
| Diagnoses | EHR/problem list | Summary context | No new storage | No | AI boundary only if approved |
| Medications | EHR/med list | Summary context | No new storage | No | AI boundary only if approved |
| Recent labs | EHR/labs | Summary context | No new storage | No | AI boundary only if approved |
| Clinical notes | EHR/notes | Summary context | No new storage | No | AI boundary only if approved |

## Controls

- [x] Minimum necessary field set reviewed.
- [x] No PHI/ePHI in app logs, prompts logs, screenshots, generated docs, or analytics.
- [x] Summary output stored only as clinician-edited note if user explicitly saves it.
- [x] Prompt/completion tracing disabled unless approved for PHI/ePHI.
- [x] Access scoped to assigned clinic staff and patient context.

