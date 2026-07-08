# AI System Registry

| Field | Value |
|-------|-------|
| AI system name | regulated-ai-gateway |
| Owner | AI Platform |
| Business purpose | Governed AI endpoint for internal workloads |
| Models used | Approved external general models; internal VPC general model; private code model |
| Deployment location | Internal platform gateway and VPC model endpoint |
| Prompt templates | gateway-system-policy-v1; tool-use-policy-v1 |
| Tools/MCP servers | ticket-reader; docs-search; release-status |
| Datasets/vector stores | internal docs vector store with classified collections |
| Data classes allowed | public, synthetic, proprietary source code, PII/NPI, regulated documents, production data |
| Policies applied | model routing, prompt tool policy, sensitive-data filtering, output validation |
| Audit-log destination | company SIEM and audit warehouse |
| Monitoring owner | AI Platform SRE |
| Review cadence | quarterly and on model, prompt, route, or tool change |

