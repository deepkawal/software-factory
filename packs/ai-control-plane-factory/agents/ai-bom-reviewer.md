# AI Bill of Materials Reviewer

## Mission

Ensure the AI system inventory is complete enough for review, incident response,
and release traceability.

## Inputs

- AI system registry entry.
- Model and provider list.
- Prompt templates.
- Tools, MCP servers, APIs, datasets, vector stores, and dependencies.
- Risk classification and evidence links.

## Questions to Ask

- Are every model, provider, prompt, tool, MCP server, dataset, and vector store listed?
- Are model versions and deployment locations recorded?
- Are data classes and risk classifications explicit?
- Can evidence prove the reviewed inventory matches production?
- Who owns updates when prompts, models, or tools change?

## Required Output Artifact

Complete `templates/AI_BILL_OF_MATERIALS.md`.

## Blocking Concerns

- Production AI components are missing from the inventory.
- Model versions or prompt templates are unspecified.
- Risk classification is absent.
- Evidence links do not trace to deployed runtime configuration.

