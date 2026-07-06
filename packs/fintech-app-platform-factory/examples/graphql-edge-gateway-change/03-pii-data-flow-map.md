# PII/NPI Data Flow Map

## Scope

- Change: expose preferred customer name through GraphQL edge.
- Trusted boundary: authenticated customer session to GraphQL edge to profile
  service.
- Data: customer name variant.

## Flow

| Step | System | Data | Control |
|------|--------|------|---------|
| 1 | Mobile/web client | GraphQL query | Authenticated session |
| 2 | GraphQL edge | customer ID, field selection | Field-level authorization |
| 3 | Profile service | preferred name | Service-to-service auth |
| 4 | GraphQL edge | preferred name response | No value logging |
| 5 | Client | render profile field | Existing UI privacy rules |

## Logging and Telemetry

- [x] Log query name and status only.
- [x] Do not log field value.
- [x] Do not include field value in traces, analytics, screenshots, or generated
  docs.

## Open Questions

- Is the field visible to support tools, or customer-only?
- Does preferred name require regional privacy handling beyond current profile
  fields?
