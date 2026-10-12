# AI-LOG.md — CSC13008 IA#1

## 2026-10-11 — project rules and implementation contract
Tool: OpenAI Codex.

Asked for: Draft and review `AGENTS.md` and `BRIEF.md`, then shorten them and separate stable repository rules from the task-specific `cartTotal` contract.

Kept: The rules/contract split, the project-specific workflow, the complete `cartTotal` behaviour, the worked example, and the specification-based acceptance tests.

Changed: I asked Codex to shorten both drafts, make the no-dependency rule explicit, rename the planned `lint` command to `syntax:check`, clarify the CI gate, and separate the invalid-quantity acceptance cases in `BRIEF.md`.

Rejected: The longer draft that duplicated the `cartTotal` contract in `AGENTS.md` and repeated workflow, validation, constraints, and definition-of-done sections in `BRIEF.md`.

By hand: I reviewed both drafts, selected the final structure, and checked them against the assignment requirements and this repository.

## 2026-10-12 — dependency-free quality gate
Tool: OpenAI Codex.

Asked for: Add `scripts/check-format.js` and the package scripts for syntax checking, format checking, and the combined quality gate.

Kept: The dependency-free Node.js checker, the separate `syntax:check` and `format:check` commands, and the single `npm run gate` command used to run all checks.

Changed: The indentation check was limited to JavaScript, JSON, and YAML after valid Markdown list continuations exposed a false positive. The semicolon check was also expanded to detect semicolons anywhere in JavaScript code while ignoring strings and comments.

Rejected: Applying the 2-space indentation rule to Markdown because Markdown permits other indentation for nested and continued content.

By hand: I reviewed the proposed checks, approved the final formatting scope, and checked that the gate produced the expected result.

## 2026-10-12 — GitHub Actions CI
Tool: OpenAI Codex.

Asked for: Add CI that runs the repository quality gate on GitHub.

Kept: A single Node.js 22 job that runs `npm run gate` on pushes and pull requests with read-only repository permissions.

Changed: `AGENTS.md` was updated to describe the quality gate and CI as configured rather than planned.

Rejected: Dependency installation, caching, test matrices, deployment steps, and secrets because this assignment is dependency-free and only requires the quality gate.

By hand: I reviewed the workflow against `AGENTS.md` and confirmed that its triggers, Node.js version, permissions, and quality-gate command match the intended CI setup.
