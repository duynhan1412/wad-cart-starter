# AI-LOG.md — CSC13008 IA#1

## 2026-10-11 — project rules and implementation contract
Tool: OpenAI Codex.

Asked for: Draft and review `AGENTS.md` and `BRIEF.md`, then shorten them and separate stable repository rules from the task-specific `cartTotal` contract.

Kept: The rules/contract split, the project-specific workflow, the complete `cartTotal` behaviour, the worked example, and the specification-based acceptance tests.

Changed: I asked Codex to shorten both drafts, make the no-dependency rule explicit, rename the planned `lint` command to `syntax:check`, clarify the CI gate, and separate the invalid-quantity acceptance cases in `BRIEF.md`.

Rejected: The longer draft that duplicated the `cartTotal` contract in `AGENTS.md` and repeated workflow, validation, constraints, and definition-of-done sections in `BRIEF.md`.

By hand: I reviewed the generated drafts, selected the final structure and wording, and verified that the rules and contract match this repository.
