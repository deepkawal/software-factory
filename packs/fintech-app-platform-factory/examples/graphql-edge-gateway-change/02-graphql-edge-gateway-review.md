# GraphQL Edge Gateway Review

## Change

- Field: `customer.profile.preferredName`
- Resolver source: customer profile service
- Persisted query impact: new persisted query versions required for mobile and
  web clients.

## Review Questions

- Is the field authorized at customer, tenant, and support-role boundaries?
- Can another customer, recipient, or support user infer this value?
- Is field-level exposure documented in the schema change notes?
- Are persisted queries updated without breaking older clients?
- Is introspection behavior unchanged in production?
- Are rate limits and complexity limits still valid?
- Does telemetry log field presence only, not field value?

## Controls

- [x] Field resolver uses server-side authorization.
- [x] Schema diff reviewed by GraphQL/API security.
- [x] Persisted query compatibility tested.
- [x] Production introspection remains disabled or explicitly approved.
- [x] Telemetry excludes the field value.
- [x] Backward compatibility verified for existing clients.

## Blocking Concerns

- No merge if field-level authorization is missing.
- No deploy if old mobile clients fail schema compatibility tests.
