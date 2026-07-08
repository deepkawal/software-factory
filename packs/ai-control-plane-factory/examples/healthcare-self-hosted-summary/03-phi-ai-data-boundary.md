# PHI AI Data Boundary

## Boundary

- Trusted systems: EHR integration, VPC summary service, clinical audit store.
- Data leaving boundary: none expected.
- Model route: self-hosted/VPC required.
- Logs: company-owned clinical audit destination.

## Controls

- PHI/ePHI is filtered from unsupported fields before prompt construction.
- Retrieved content is limited to the active patient context.
- Output is marked draft and requires clinician review before use.
- External API fallback is prohibited.

