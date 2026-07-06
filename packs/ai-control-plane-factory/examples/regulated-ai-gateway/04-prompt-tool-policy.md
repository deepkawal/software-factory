# Prompt Tool Policy

## Prompt Trust Boundary

- System instructions: owned by AI Platform and immutable at runtime.
- Developer instructions: reviewed through pull request.
- User input: untrusted.
- Retrieved content: untrusted unless source is allow-listed.
- Tool output: untrusted until validated.
- Untrusted content handling: cannot change route, permissions, or approval policy.

## Tool Call Permissions

| Tool or MCP server | Read allowed | Write allowed | Approval required | Block conditions |
|--------------------|--------------|---------------|-------------------|------------------|
| docs-search | Internal docs | No | No | restricted collection without route approval |
| release-status | Release metadata | No | No | none |
| ticket-reader | Ticket fields | No | Yes for sensitive queues | PHI, SSN, or secrets detected |

## Runtime Controls

- User input handling: classify and filter before model route selection.
- Retrieved content handling: cite source and validate collection classification.
- Output validation: validate links, policy claims, and tool-produced facts.
- Human approval requirements: required before production writes or sensitive queue access.
- Block conditions: prompt injection, route mismatch, secret detection, unauthorized tool request.

