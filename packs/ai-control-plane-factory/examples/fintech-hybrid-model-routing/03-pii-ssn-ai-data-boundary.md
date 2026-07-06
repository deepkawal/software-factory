# PII/SSN AI Data Boundary

## Boundary

- Trusted systems: AI gateway, VPC regulated-support model, support case service, audit warehouse.
- Data leaving boundary: only public or synthetic prompts may use external APIs.
- Model route: SSN and customer financial information require self-hosted/VPC.
- Logs: company-owned audit warehouse.

## Controls

- SSN and customer financial information trigger VPC route selection.
- KYC, sanctions, and payment context requires restricted tool policy.
- External fallback is prohibited for regulated data classes.
- Human approval is required for account-impacting recommendations.

