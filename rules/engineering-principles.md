# Engineering Principles

These apply to all code in this project — frontend and server.

## Process & discipline

- **Think Before Coding** – never assume undocumented APIs, configs, or behavior;
  verify or ask. If a task's requirements are ambiguous, ask clarifying questions
  before writing code.
- **Consider First Principles** – assess the current architecture against the one
  you'd build if you started over from scratch.
- **TDD (Test-Driven Development)** – establish clear test or verification criteria
  first; write the tests before the implementation. The work isn't done until the
  tests pass and the local build/verification steps succeed.
- **Surgical Changes** – modify only the minimum necessary lines to achieve the
  goal. Don't refactor adjacent or unrelated files unless explicitly asked. Match
  the existing style, even where you'd write it differently.

## Design & structure

- **KISS (Keep It Simple)** – keep solutions as simple as possible.
- **YAGNI (You're Not Gonna Need It)** – avoid speculative complexity,
  over-engineering, and helper functions or abstractions written for a future
  that hasn't arrived.
- **DRY (Don't Repeat Yourself), with judgment** – eliminate genuinely duplicated
  logic by extracting shared utilities and modules — but not at the cost of
  readability or premature abstraction. When DRY and simplicity conflict, prefer
  the clearer code; a little duplication beats the wrong abstraction.
- **Separation of Concerns** – each module handles one distinct responsibility.
- **Single Responsibility Principle (SRP)** – every class/module/function/file has
  exactly one reason to change.
- **Clear Abstractions & Contracts** – expose intent through small, stable
  interfaces; hide implementation details.
- **Low Coupling, High Cohesion** – keep modules self-contained; minimize
  cross-dependencies.
- **Scalability & Statelessness** – design components to scale horizontally;
  prefer stateless services where possible.
- **Leverage Types** – use the type system so the compiler catches errors at
  build-time instead of run-time.
- **Observability & Testability** – build in logging, metrics, and tracing;
  ensure components can be unit- and integration-tested.

## Quality bar

- **Don't Swallow Errors** – don't silently catch exceptions, fill in missing
  required values, mask deserialization with nulls or empty lists, or ignore
  timeouts/hangs. Track all errors in a centralized log and surface them to the
  user when action is needed.
- **No Placeholder Code** – this is production code, not toys.
- **No Comments for Removed Functionality** – the source implements current
  requirements only; it is not a changelog.

## Knowledge & decisions

- **Code Is the Source of Truth** – facts derivable from code (APIs, classes,
  schema, dependencies, module structure) are never duplicated in prose. Derive
  them on demand with tooling (ast-grep, tree-sitter, codanna), not hand-written
  docs that drift.
- **Record Decisions, Not Descriptions** – the "why" behind a choice does not
  live in code, so it must be written down. Technical/architecture choices →
  ADRs in `docs/decisions/`. Product/business rules → Product Decisions in
  `docs/product-decisions/`.
- **Decision Records Are Append-Only** – never edit an Accepted record's
  Decision, Rationale, or Alternatives. To change a decision, write a new record
  that supersedes it (`Supersedes` / `Superseded-by`). Only Status and links are
  mutable.
- **Mark Code With Its Decision** – code that exists because of a decision
  carries a marker on the relevant class/constant/test (`// PROJ-ADR-007`,
  `// PROJ-PD-014`), so anyone can go code → record → rationale without loading
  large documents.
- **Namespaced, Monotonic IDs** – every record ID is project-prefixed and
  allocated in order (`PROJ-ADR-001`, `NPO-PD-003`). No two records share an ID.
- **No Undocumented Decisions** – introducing an architectural tradeoff or a
  business rule without a corresponding record is incomplete work.
- **Product Decisions Are Testable** – every Product Decision links to the
  test(s) that enforce it. A PD with no enforcing test is a gap, not a record.
