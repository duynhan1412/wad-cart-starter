# AI-LOG.md — CSC13008 IA#1

## 2026-10-11 — project rules and implementation contract
Tool: OpenAI Codex.

Asked for: Draft and review `AGENTS.md` and `BRIEF.md`, then separate stable repository rules from the task-specific `cartTotal` contract.

Kept: The rules/contract split, the project-specific workflow, the complete `cartTotal` behaviour, the worked example, and the specification-based acceptance tests.

Changed: I requested shorter drafts, an explicit no-dependency rule, the `syntax:check` command instead of a misleading `lint` command, a clearer CI gate, and separate invalid-quantity cases in `BRIEF.md`.

Rejected: A longer draft that duplicated the `cartTotal` contract in `AGENTS.md` and repeated workflow, validation, constraints, and completion criteria in `BRIEF.md`.

By hand: I reviewed both drafts, selected the final structure, and checked them against the assignment requirements and this repository.

## 2026-10-12 — dependency-free quality gate
Tool: OpenAI Codex.

Asked for: Add `scripts/check-format.js` and the package scripts for syntax checking, format checking, and the combined quality gate.

Kept: The dependency-free Node.js checker, separate `syntax:check` and `format:check` commands, and one `npm run gate` command for all checks.

Changed: The 2-space indentation check was limited to JavaScript, JSON, and YAML after valid Markdown continuation indentation caused a false positive. The semicolon check was made code-aware so semicolons in strings and comments are ignored.

Rejected: Applying the 2-space indentation rule to Markdown, which permits different indentation for nested and continued content.

By hand: I reviewed the proposed checks, approved their final scope, and checked the gate output.

## 2026-10-12 — GitHub Actions CI
Tool: OpenAI Codex.

Asked for: Add CI that runs the repository quality gate on GitHub.

Kept: One Node.js 22 job that runs `npm run gate` on pushes and pull requests with read-only repository permissions.

Changed: `AGENTS.md` was updated to describe the quality gate and CI as configured rather than planned.

Rejected: Dependency installation, caching, test matrices, deployment steps, and secrets because the repository is dependency-free and the assignment only requires the quality gate.

By hand: I reviewed the workflow and its GitHub Actions results, including the expected red test run and the final green quality-gate run.

## 2026-10-12 — cartTotal specification tests
Tool: OpenAI Codex.

Asked for: Replace the starter test with independent, specification-based tests for the public behaviours in `BRIEF.md`.

Kept: Ten separate tests covering the worked example, numeric return type, empty cart, subtotal-based shipping, the exact free-shipping threshold, whole-dong rounding, negative price, and each invalid quantity case.

Changed: The worked-example value and return type are tested separately so each test fails for one clear reason. A below-threshold case whose VAT-inclusive amount exceeds the threshold was added to verify that shipping is decided before VAT.

Rejected: Combining invalid quantities into one test because `0`, a negative value, and `1.5` are independent cases in the brief.

By hand: I reviewed the proposed cases, checked their expected results against the brief, and approved separating each invalid-quantity case.

## 2026-10-12 — cartTotal implementation
Tool: OpenAI Codex.

Asked for: Implement `cartTotal` so the specification-based tests pass.

Kept: A direct loop that validates each item while accumulating the subtotal, followed by explicit VAT, shipping, and rounding calculations.

Changed: Shipping is selected from the subtotal before VAT, including when VAT alone raises the amount above the free-shipping threshold.

Rejected: Extra input validation, helper abstractions, and external dependencies because they are outside the contract.

By hand: I reviewed the implementation against the worked example and the required error cases.

## 2026-10-12 — self-assessment and evidence review
Tool: OpenAI Codex.

Asked for: Draft `SELF_ASSESSMENT_REPORT.md`, update this log, and improve its wording without changing the substance of the recorded work.

Kept: One evidence-backed row per rubric criterion, the claimed total, the green local quality gate, and the successful GitHub Actions run.

Changed: The earlier entries were tightened to name specific decisions, rejected alternatives, and review work more clearly. The report was also reorganized to match the required submission template exactly.

Rejected: Vague evidence, unsupported deductions, a chat transcript, and claims that work was written by hand when it was produced with assistance.

By hand: I reviewed the claimed score and evidence before accepting this draft.
