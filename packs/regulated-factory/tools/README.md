# Regulated Factory Pack Tools

The shared pack keeps tool-specific examples in the top-level
`tools/regulated/` directory so healthcare and fintech packs can share the same
checks.

Run from the repository root:

```bash
node tools/regulated/check-sensitive-data-logs.mjs
node tools/regulated/check-ai-data-boundary.mjs
node tools/regulated/check-required-domain-artifacts.mjs
node tools/regulated/check-release-evidence.mjs
```

