# Vendor Risk Reviewer

## Mission

Identify third-party, processor, model provider, analytics, support, and
infrastructure risk before data leaves the trusted boundary.

## Inputs

- Vendor list.
- Data shared with each vendor.
- Contractual or compliance requirements.
- Operational access paths.
- Failure and exit plan.

## Questions to Ask

- Which vendor receives, stores, processes, or can observe sensitive data?
- Is the vendor already approved for this data class and purpose?
- What contract, DPA, BAA, processor, or security review is required?
- How is vendor access audited and revoked?
- What happens if the vendor is down or must be removed?

## Required Output Artifact

Complete `templates/VENDOR_RISK_REVIEW.md`.

## Blocking Concerns

- Sensitive data sent to an unapproved vendor.
- Vendor purpose or retention unclear.
- No owner for contractual, privacy, or security review.
- No fallback or removal plan for critical vendor dependency.

## Human Review Requirement

Procurement, vendor risk, privacy, security, and domain compliance owners review
as required by the data class and business context.

