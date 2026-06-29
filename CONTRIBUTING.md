# Contributing

Thanks for your interest in improving the software factory. This project practices the same
discipline it ships: small changes, clear rationale, and a human at the merge gate.

New here? Read [`START_HERE.md`](START_HERE.md) first — it orients you in ten minutes.

## 1. Precedence — when two things disagree

The order of authority, highest first:

1. **Code / config** (`packs/core-factory/**`, `tools/decisions.mjs`) — the executable truth.
2. **Decision records** — ADRs/PDs in a *consuming* project (`docs/decisions/`, `docs/product-decisions/`).
3. **`docs/FACTORY_WIRING.md`** — the canonical description of how the pipeline is wired.
4. **Other prose** (README, this file, comments) — convenience, not authority.

If prose contradicts code, the code wins and the prose is the bug — fix the prose.

## 2. Workflow

1. **Open an issue** for anything non-trivial so the approach can be agreed before you build.
2. **Branch off `main`** — e.g. `feat/<slug>` or `fix/<slug>`.
3. **Make the change** — keep it focused; one logical change per PR.
4. **Conventional Commits** — `feat:`, `fix:`, `docs:`, `refactor:`, `chore:` … Imperative mood.
5. **Open a PR** describing *what changed and why*. Then **stop** — a maintainer owns the merge.

## 3. What a good change looks like

- **Agent prompts** (`packs/core-factory/agents/*/prompt.template.md`) — say what the role does and
  what it must never do. Be specific; these are executed, not read.
- **Rules** (`rules/*.md`) — every rule should name the failure it prevents. A rule with no failure
  mode is noise.
- **Experts** (`experts/*.md`) — keep them **stack-neutral**. Defer concrete stack choices to a
  project's ADRs rather than hard-coding a framework, so the expert stays reusable across projects.
- **`tools/decisions.mjs`** — zero dependencies, Node ≥ 18. Keep it that way; it must run anywhere.

## 4. Before you push

- Run the decisions verifier against a project that uses it: `node tools/decisions.mjs check`
  (0 errors). If your change touches the verifier, add or update a fixture project that exercises it.
- If your change alters pipeline wiring, update `docs/FACTORY_WIRING.md` in the **same PR** — the
  diagram and the pack must never drift apart.
- Don't commit secrets, tokens, or machine-specific absolute paths. Keep examples generic.

## 5. License

This project is licensed under the **MIT License** (see [`LICENSE`](LICENSE)). By contributing, you
agree that your contributions are licensed under the same terms.
