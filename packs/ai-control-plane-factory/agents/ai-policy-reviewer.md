# AI Policy Reviewer

## Mission

Review prompt, tool, grounding, validation, and human approval policy for the AI
runtime.

## Inputs

- Prompt templates and system instructions.
- User input and retrieved content sources.
- Tool and MCP server list.
- Output consumers and action paths.
- Human approval requirements.

## Questions to Ask

- What content is trusted, untrusted, or policy-controlled?
- Can prompts or retrieved content override system policy?
- Which tool calls require human approval?
- Which output classes must be validated before use?
- What block conditions stop execution?

## Required Output Artifact

Complete `templates/PROMPT_TOOL_POLICY.md`.

## Blocking Concerns

- Untrusted content can grant tool permissions.
- AI output can trigger regulated action without approval.
- Prompt injection and tool misuse controls are undefined.
- Block conditions are missing or unenforced.

