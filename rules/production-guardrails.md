# Production Guardrails

The enforceable engineering standard for AI-assisted code in this factory. Where
`engineering-principles.md` governs **code craft** (DRY, SoC, SRP, don't-swallow-errors,
decision discipline) and `group-rules.md` governs **how agents operate** (token/model
governance, ask-before-irreversible), this file governs **what makes code production-ready**:
security, architecture, data, reliability, performance, AI safety, observability, operations,
testing, and developer experience.

These rules are **opinionated and enforceable**. They are written so a human reviewer or an
agent (Builder / Reviewer / Validator) can grade a change against them and so the
`tools/decisions.mjs` gate can require a record for anything deferred.

---

## 0. How to use this document

### 0.1 Architecture tiers

A rule applies to a project only if the project has the **tier** the rule targets. Declare a
project's tiers once (in its `CLAUDE.md` or `PROJECT_MANIFEST.md`); audits grade only the
matching rules. This is the single most important fix from a real production audit: it stops a
client-only app from being marked as "failing RLS" when it has no database.

| Tier | Present when the project has… |
|------|-------------------------------|
| `client` | a browser/native UI |
| `public-endpoint` | any externally reachable HTTP/GraphQL/webhook surface |
| `server` | server-side application code (route handlers, services) |
| `database` | persistent multi-row storage |
| `ai-endpoint` | a live call to an LLM / model provider |
| `queue` | async jobs, message bus, background workers |
| `infra` | owned CI/CD, cloud config, IaC |

> **Tier honesty.** A `localStorage`-only single-device store is **not** a `database` tier; an
> in-process pure function is **not** a `public-endpoint`. Do not over-claim tiers to feel
> covered, and do not under-claim to skip work. When a project gains a tier (e.g. V2 adds
> persistence), the previously-N/A rules become live — see §0.3.

### 0.2 Rule anatomy & severity

Each rule carries: **Severity** (🔴 Critical / 🟠 High / 🟡 Medium), **Applies to** (tiers),
**Required when** / **N/A when** (the condition that makes it live), the **Rule**, **Required
controls**, and **Validation** (how a reviewer or test proves it).

- 🔴 **Critical** — a violation is a release blocker. No merge.
- 🟠 **High** — must be addressed or explicitly deferred via the ledger (§0.3).
- 🟡 **Medium** — strong default; deviation needs a one-line rationale.

### 0.3 Deferred Control Ledger (the mechanism that replaces "we'll add it later")

A control that is legitimately N/A for the current tier but becomes mandatory when the
architecture evolves **must not** be a TODO or a memory. Record it in
`docs/decisions/deferred-controls.md` (or a PD) with the milestone that unblocks it. The
`tools/decisions.mjs` gate fails if a ledgered control's blocking milestone ships without the
control closing.

| Control | Rule | Deferred until | Blocking release? | Tracking record |
|---------|------|----------------|-------------------|-----------------|
| Row-Level Security | S2 | adds `database` tier | Yes | e.g. `PROJ-ADR-NNN` |
| Rate limiting | S3 | adds `public-endpoint`/`ai-endpoint` | Yes | … |
| Server authorization | S4 | adds `server` + multi-user | Yes | … |
| Audit logging | O2 | first production deploy | Yes | … |

A deferred 🔴 control is **still 🔴**; the ledger schedules it, it does not downgrade it.

---

## 1. Security

### S1 — No secrets in source · 🔴 Critical · all tiers
**Rule:** Tokens, API keys, private keys, signing secrets, and credentials are never committed.
Secrets live in a secret manager / platform env injection. `.env*` with real values is never committed.
**Required controls:** `.gitignore` excludes `.env*`; secret scanning in CI **and** a pre-commit
hook; production secrets in a vault/secret manager; documented rotation; rotate any leaked
credential immediately and treat the leak as an incident.
**Validation:** `git ls-files` shows no secret-bearing files; CI secret scan is green; a planted
test secret is caught by the hook.

### S2 — Least-privilege data access (RLS) · 🔴 Critical · `database`
**Required when:** multi-user OR shared persistent storage. **N/A:** single-tenant in-memory /
client-only / `localStorage`.
**Rule:** Every table with user or business data enforces authorization **at the database layer**.
Default = deny. No `USING (true)` / "allow all" policies. Every SELECT/INSERT/UPDATE/DELETE policy
states ownership or role explicitly (e.g. `user_id = auth.uid()`).
**Required controls:** RLS enabled on every such table from migration #1; policies reviewed in
every migration; tenant isolation enforced in the DB, not the app.
**Validation:** automated test proves an unauthorized user is **denied** read/write of another
user's row.

### S3 — Rate limiting on every public surface · 🔴 Critical · `public-endpoint`, `ai-endpoint`
**N/A:** client-only apps with no owned endpoints.
**Rule:** Every externally reachable endpoint is rate limited — REST, GraphQL, auth, password
reset, search, webhooks, file uploads, and **AI endpoints especially**. One malicious script must
never exhaust compute or run up cloud/model bills.
**Required controls:** per-IP and per-user limits; burst protection; `Retry-After` headers; abuse
detection/alerting. For `ai-endpoint`, combine with AI2 spend caps.
**Validation:** load test confirms limits engage and return 429 with retry headers.

### S4 — Authorization on every sensitive action · 🔴 Critical · `server`
**Required when:** any multi-user or resource-owned operation. **N/A:** single-user client trusting itself.
**Rule:** Authentication (who you are) is not authorization (what you may do). Every sensitive
operation re-verifies on the **server** that the authenticated principal may act on the target
resource. Never trust client-provided IDs, URL params, hidden UI, or frontend role checks.
**Required controls:** check ownership, role, permission, subscription tier, org membership, tenant
isolation — server-side, per request.
**Validation:** `DELETE /posts/123` is rejected when the caller does not own post 123 (test).

### S5 — Treat every client request as malicious until verified · 🔴 Critical · `client`, `server`
**Rule:** Never trust client data. Validate IDs, payloads, query params, headers, form input, and
file uploads on the **server** (client validation is UX, not a control). Reject unexpected fields.
**Required controls:** schema validation (e.g. zod) at the boundary; input sanitization; length /
range / enum bounds; allow-list, not deny-list. Even client-only apps validate untrusted inputs
they re-load (e.g. `localStorage`, query string, file import) before trusting them.
**Validation:** malformed / oversized / extra-field payloads are rejected with a 4xx and a clear message.

### S6 — Secure by default · 🔴 Critical · all tiers
**Rule:** The default configuration is secure with no extra developer action. Access denied unless
granted; HTTPS only; secure + `HttpOnly` + `SameSite` cookies; CSRF protection; security headers
(CSP, HSTS, X-Content-Type-Options, X-Frame-Options); secrets encrypted; audit logging on.
**Required controls:** for static/edge-hosted clients, set security headers at the host/CDN layer
(a pure static export gets no server `headers()` — use platform config). A CSP is the cheapest
hardening of any client that re-renders stored or external data.
**Validation:** a header scan shows the expected set; cookies have the secure flags.

---

## 2. Architecture

> Extends `engineering-principles.md` (DRY, SoC, SRP, Clear Abstractions). These three add the
> **enforcement** dimension — AI writes good code but erodes architecture, so we gate it.

### A1 — Single Source of Truth · 🟠 High · all tiers
**Rule:** Each business rule exists in exactly one place. Never duplicate validation,
authorization, pricing, permissions, or business calculations across UI/API/service/DB.
**Validation:** a rule changes in exactly one file; grep finds no parallel copy of the logic.

### A2 — Layered architecture / dependency direction · 🟠 High · `server`, `client`
**Rule:** No UI → Database. Dependencies flow one way: UI → API → Service → Repository → Database.
Inner layers never import outer ones; no business logic in the UI; no SQL scattered through
components. No circular dependencies.
**Validation:** an import-boundary lint (or a single typed seam, e.g. a typed `api-client.ts`)
enforces the direction; dependency-cycle check is clean.

### A3 — Shared, typed contracts · 🟠 High · all tiers
**Rule:** Types/DTOs are defined once in a shared module and imported everywhere. Never redefine a
DTO per layer or per service. Boundaries expose small stable interfaces (the swap seam), not
internals.
**Validation:** one canonical type per concept; consumers import it; no duplicated shape definitions.

---

## 3. Data

### D1 — Schema & input validation · 🔴 Critical · `server`, `database`
**Rule:** Validate schema, type, length, enum, and range on every write path, server-side. Persist
nothing unvalidated. (Pairs with S5 for transport-level trust.)
**Validation:** a schema validator guards each mutation; out-of-range/invalid-enum inputs rejected.

### D2 — Data lifecycle · 🟠 High · `database`
**Rule:** Every dataset has a defined retention, archival, deletion, and backup policy, and a
documented stance on PII / GDPR / data-subject deletion. Encrypt PII at rest.
**Required controls:** classify PII; backups tested for restore; user-deletion path implemented.
**Validation:** a retention/deletion policy doc exists and a deletion request is honored end-to-end.

### D3 — Schema evolution · 🟠 High · `database`
**Rule:** Every migration is reversible, backward-compatible (expand/contract; no breaking column
drops in one step), backfill-safe, and reviewed — including for RLS (S2).
**Validation:** migration has an applied **and** a rollback path; deploy is zero-downtime.

---

## 4. Reliability

### R1 — Bound every external call · 🟠 High · `server`, `client`, `ai-endpoint`, `queue`
**Rule:** Every network/IO/model call has an explicit timeout, a bounded retry with exponential
backoff **and jitter**, and a circuit breaker for repeated failures. No unbounded `await
external()`. (Pairs with engineering-principles "Don't Swallow Errors": handle, log, surface.)
**Validation:** calls specify timeouts; retries are capped; a downstream-down test trips the breaker
instead of hanging.

### R2 — Idempotency · 🟠 High · `public-endpoint`, `server`, `queue`
**Rule:** POST/PATCH, webhooks, and queue consumers are idempotent — a retry or duplicate delivery
causes no double effect. Use idempotency keys or natural dedup keys.
**Validation:** replaying the same request/message twice yields one effect (test).

### R3 — Graceful degradation · 🟠 High · `server`, `client`
**Rule:** A third-party outage is not an application outage. Define fallback behavior (cached/last-
known value, queued retry, reduced feature) for every dependency.
**Validation:** with a dependency forced down, the app degrades to the defined fallback, not a crash.

### R4 — Concurrency safety · 🔴 Critical · `server`, `database`
**Rule:** Operations that can interleave must not corrupt shared state. Concurrent writes to the
same row/aggregate use a transaction or optimistic locking (version column or a guarded
`UPDATE … WHERE`); read-modify-write is atomic (single statement, `SELECT … FOR UPDATE`, or
compare-and-set), never a check-then-act gap on a shared resource. No "read, decide in app, write
back" on data another request can change between the read and the write. (Distinct from R2: R2 is
about *duplicate delivery*; R4 is about *interleaving* of distinct concurrent operations — lost
updates, double-spend, TOCTOU.)
**Required controls:** wrap multi-step mutations in a transaction with an appropriate isolation
level; protect counters/balances/inventory and any "check then create/update" with atomic SQL or a
version/`WHERE` guard; for cross-request invariants, hold the invariant in the database, not in
process memory.
**Worked examples:** check-then-act, optimistic locking, and transactions — with ❌/✅ patterns —
in [Appendix A](#appendix-a--r4-concurrency-safety-worked-examples).
**Validation:** a test fires two concurrent writes to the same record and the result is one
consistent value (the lost update is rejected or serialized), not a silent overwrite.

---

## 5. Performance & Scale

### P1 — Efficient data access · 🟠 High · `database`, `server`
**Rule:** No N+1 queries, no DB calls inside loops, no repeated identical queries, no unjustified
full-table scans, no missing indexes on frequently filtered columns. Batch / eager-load / join.
**Validation:** query count is bounded per request; `EXPLAIN` shows index use on hot paths.

### P2 — Pagination & query limits · 🟠 High · `public-endpoint`, `database`
**Rule:** List/search endpoints paginate and cap result size by default. No unbounded "return
everything" responses.
**Validation:** a list endpoint enforces a max page size and a default limit.

### P3 — Caching & async processing · 🟡 Medium · `server`
**Rule:** Cache where data is read-heavy and tolerant of staleness (with explicit invalidation);
move slow/expensive work to async jobs; use connection pooling and lazy loading. Response times
stay acceptable as data and users grow.
**Validation:** cache hit-path and invalidation are tested; long work runs off the request path.

---

## 6. AI Safety

> The biggest gap in generic checklists, and central to *this* factory. Complements
> `group-rules.md` token/agent governance.

### AI1 — AI outputs are untrusted input · 🔴 Critical · `ai-endpoint`
**Rule:** Treat every LLM/model response exactly like user input: validate against a schema,
sanitize before rendering, and verify before acting. Never `eval`, never execute model output
directly, never interpolate it into SQL/shell/HTML without escaping. Structured output is validated
at the tool-call layer, not trusted on faith.
**Validation:** model output passes a schema check before use; an injection/garbage response is
rejected, not executed.

### AI2 — Token budget governance · 🔴 Critical · `ai-endpoint`
**Rule:** Every AI request defines max tokens, a timeout, a retry policy, a **daily/total spend
cap**, and a **per-user quota**. A runaway prompt or abusive user cannot generate a surprise bill.
**Required controls:** hard `max_tokens`; per-user and global spend ceilings that throw when hit; a
kill switch (see OP2). Mirrors the agent token governance in `group-rules.md`.
**Validation:** exceeding the cap is rejected; spend is tracked and alertable.

### AI3 — Prompt versioning · 🟠 High · `ai-endpoint`
**Rule:** Prompts are source code: version-controlled, reviewed, and diffable. No prompt strings
edited in place without history. Material prompt changes are recorded (ADR/PD) when they change
behavior contracts.
**Validation:** prompts live in tracked files; a prompt change shows in diff/history.

### AI4 — Human approval for high-risk AI actions · 🔴 Critical · `ai-endpoint`, `server`
**Rule:** An AI/agent never performs an irreversible or outward-facing action without explicit
human confirmation: deleting data, moving money, deploying to production, changing permissions,
sending external communications. Extends `group-rules.md` "ask before irreversible."
**Validation:** these actions are gated behind a confirmation step; an agent attempting one unprompted is blocked.

---

## 7. Observability

### O1 — Structured, correlated logs · 🟠 High · `server`, `public-endpoint`, `queue`
**Rule:** Every request carries a request ID, user ID (when known), and a correlation/trace ID
propagated across services. Logs are structured (JSON), not `console.log` strings. Latency is
recorded. (Even client-only apps should not *silently* swallow failures — surface or count them.)
**Validation:** a request can be traced end-to-end by correlation ID across logs.

### O2 — Error tracking, metrics, alerts, health · 🟠 High · `server`, `infra`
**Rule:** Every service ships error tracking (e.g. Sentry), metrics (latency, error rate,
throughput), alerts on SLO breach, an audit trail for sensitive actions, and health checks.
"Failures you can't observe can't be fixed."
**Validation:** an induced error appears in error tracking; a health endpoint responds; an alert fires on threshold breach.

---

## 8. Operations & Supply Chain

### OP1 — Dependency hygiene · 🟠 High · all tiers
**Rule:** Commit the lockfile; enable Dependabot/Renovate; run a vulnerability scan in CI; triage
alerts within an SLA (don't let highs sit untriaged); scan licenses; gate new dependencies on
review (prefer the existing stack — see `group-rules.md` defaults).
**Validation:** lockfile committed; CI audit green or alerts ledgered with owner + date; no untriaged high/critical.

### OP2 — Cost governance · 🟠 High · `ai-endpoint`, `infra`
**Rule:** Every expensive service (model APIs, cloud compute, storage egress) has quotas, budgets,
alerts, a cost dashboard, and a **kill switch**. No surprise bills.
**Validation:** a budget alert is configured; the kill switch disables spend without a deploy.

### OP3 — Secrets lifecycle · 🟠 High · `server`, `infra`
**Rule:** Beyond S1's "don't commit": rotation schedule, scoped least-privilege credentials,
separate secrets per environment, and revoke-on-leave. Secret scanning runs continuously.
**Validation:** secrets differ per environment; a rotation has been exercised; scanning is enabled.

---

## 9. Testing

### T1 — The test matrix (not just "tests") · 🔴 Critical · all tiers
**Rule:** Every feature carries the tests its tiers require — AI usually writes only the happy path.
Required by tier:

| Test type | Required when |
|-----------|---------------|
| Unit | always |
| Integration | `server`, `database`, `queue` |
| Authorization | `server` + multi-user (proves denial of unauthorized access — see S2/S4) |
| Failure-path | always (timeouts, downstream-down, invalid input, quota exceeded) |
| Load | `public-endpoint`, `ai-endpoint` (proves S3/AI2 limits and P-rules under volume) |

Pairs with `engineering-principles.md` TDD and "Product Decisions Are Testable."
**Validation:** the matrix rows for the change's tiers exist and pass in CI.

---

## 10. Developer Experience & Maintainability

### DX1 — Conventions enforced, not hoped for · 🟡 Medium · all tiers
**Rule:** Linting, formatting, and naming conventions are enforced in CI and pre-commit, not left
to discretion. Match existing file style (`group-rules.md`).
**Validation:** `lint` and `format:check` are CI gates.

### DX2 — Decision discipline · 🟠 High · all tiers
**Rule:** Major architecture choices → ADRs; product/business rules → PDs; code marked with its
record ID; no undocumented tradeoffs. Governed in full by `engineering-principles.md`; restated here
because it is a production-readiness gate, enforced by `tools/decisions.mjs`.
**Validation:** `tools/decisions.mjs` passes with 0 errors; new tradeoffs have records.

### DX3 — PR template, Definition of Done, ownership · 🟠 High · all tiers
**Rule:** A `.github/pull_request_template.md` carries the tier-scoped checklist (§11); each area has
a documented owner (CODEOWNERS); "done" means the §11 gate is met, not "it runs."
**Validation:** PRs include the completed checklist; CODEOWNERS exists.

---

## 11. Production Readiness — the master gate

A change is production-ready (not demo-ready) only when, **for the tiers it touches**, every
applicable rule above is satisfied or ledgered (§0.3). Reviewer/Validator agents grade against this;
humans confirm before merge.

### Tier-scoped AI Code Review Checklist

Grade only the rows whose tier the change touches; mark the rest **N/A (tier)**.

| Check | Rule | Tier | Status |
|-------|------|------|--------|
| No secrets committed | S1 | all | ☐ |
| RLS enabled & tested | S2 | `database` | ☐ |
| Authorization enforced server-side | S4 | `server` | ☐ |
| Rate limiting configured | S3 | `public-endpoint`/`ai-endpoint` | ☐ |
| Input validated & sanitized | S5/D1 | `client`/`server` | ☐ |
| Secure-by-default config + headers | S6 | all | ☐ |
| Single source of truth / layering / shared types | A1–A3 | all | ☐ |
| External calls bounded (timeout/retry/breaker) | R1 | all | ☐ |
| Idempotent mutations | R2 | `public-endpoint`/`queue` | ☐ |
| Concurrency-safe writes (txn/optimistic lock, no check-then-act) | R4 | `server`/`database` | ☐ |
| Graceful degradation / fallbacks | R3 | `server`/`client` | ☐ |
| Efficient queries, pagination, indexes | P1–P2 | `database` | ☐ |
| AI output validated; tokens/spend capped; prompts versioned; high-risk gated | AI1–AI4 | `ai-endpoint` | ☐ |
| Structured logs, correlation IDs, error tracking, health, alerts | O1–O2 | `server` | ☐ |
| Dependency hygiene; cost governance; secrets lifecycle | OP1–OP3 | all/`infra` | ☐ |
| Test matrix for the change's tiers | T1 | all | ☐ |
| Lint/format/decision records/PR template | DX1–DX3 | all | ☐ |
| Deferred controls recorded in the ledger | §0.3 | all | ☐ |

> If a 🔴 row is unchecked and not ledgered with a blocking milestone, the change does not merge.

---

## Appendix A — R4 Concurrency safety: worked examples

Three canonical interleaving bugs and the fix for each. The principle is the same throughout: let
the database enforce the invariant; never close a check-then-act gap in application code.

### A.1 Check-then-act → DB-enforced uniqueness
"Register a username if it's free" — `SELECT … WHERE name = ?`, see no row, then `INSERT`. Two
requests run the `SELECT` concurrently, both see nothing, both `INSERT` → duplicate.
- ❌ **Wrong:** the read and the write are separate steps with a gap another request slips through.
- ✅ **Right:** a `UNIQUE` constraint plus `INSERT … ON CONFLICT DO NOTHING` (or catch the unique
  violation), so exactly one request wins and the other is rejected, not a silent duplicate.

### A.2 Lost update → optimistic locking
"Edit a record I just read" — load row at `version = 5`, change it in the app, write back. Another
request also loaded `version = 5` and wrote first.
- ❌ **Wrong:** `UPDATE … SET … WHERE id = ?` blindly overwrites their change (lost update).
- ✅ **Right:** carry the version you read and guard the write —
  `UPDATE … SET …, version = 6 WHERE id = ? AND version = 5`. The second writer's `WHERE` matches 0
  rows (version is now 6); detect the 0-row result, reject or re-read-and-retry, so no one's edit is
  silently clobbered.

### A.3 Partial multi-write → transaction
"Move $100 from account A to B" — two writes that must both land or neither.
- ❌ **Wrong:** `UPDATE A SET balance = balance - 100`, then separately
  `UPDATE B SET balance = balance + 100`; a crash or error between them debits A without crediting B
  (money vanishes), and a concurrent reader can see the half-applied state.
- ✅ **Right:** run both statements in one transaction (`BEGIN … COMMIT`) so they commit atomically
  and roll back together on failure; use relational arithmetic (`balance = balance - 100`), not a
  read-balance-then-write-new-total in app code, which reintroduces the A.2 lost-update gap. For
  invariants like "balance must not go negative," enforce them inside the transaction (a guarded
  `WHERE balance >= 100` or a `CHECK` constraint).
