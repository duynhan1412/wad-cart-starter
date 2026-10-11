# Project rules

## Purpose

- This file defines how work is performed in this repository.
- `BRIEF.md` is the source of truth for the `cartTotal` contract and acceptance
  criteria. Do not duplicate or extend that contract here.

## Tooling

- Use Node.js 22 or newer and JavaScript ES modules.
- Use the built-in `node:test` module for tests.
- Keep the project dependency-free. Never add external packages.

## Repository layout

- `src/cart.js` contains the implementation.
- `test/cart.test.js` contains specification-based tests.
- `scripts/check-format.js` is the dependency-free format check when the
  quality gate is configured.
- `.github/workflows/ci.yml` runs the quality gate when CI is configured.
- `BRIEF.md`, `AI-LOG.md`, and `SELF_ASSESSMENT_REPORT.md` are assignment
  evidence.

Implementation changes are limited to files allowed by the current brief.
Updating `AI-LOG.md` with an honest record is allowed as a separate evidence
change. Do not make unrelated changes.

## Code style

- Use 2-space indentation, single quotes, and no semicolons.
- Use named exports; do not introduce default exports.
- Prefer small, readable code over unnecessary abstractions.

## Commands and quality gate

- `npm test` runs the test suite and must pass before the task is complete.
- Once configured, `npm run syntax:check` checks JavaScript syntax.
- Once configured, `npm run format:check` checks repository formatting.
- Once configured, `npm run gate` runs syntax checking, format checking, and tests.
- CI must use Node.js 22, run `npm run gate` on pushes and pull requests, and pass on the submitted commit.

## Workflow

1. Read `BRIEF.md` and inspect the existing files.
2. Run the current tests before making changes.
3. Add or update specification-based tests first. Each test should verify one
   public behaviour and fail for one clear reason.
4. Make the smallest implementation change that satisfies the brief.
5. Run `npm test` and, when available, `npm run gate`.
6. Review the complete diff and remove unrelated changes.
7. Update `AI-LOG.md` with what was kept, changed, rejected, and written by
   hand.

## Never

- Never change the public API or invent requirements beyond `BRIEF.md`.
- Never weaken or remove a valid test to make the gate pass.
- Never commit `.env`, credentials, API keys, personal data, or `node_modules`.
- Never force-push, rewrite Git history, or delete repository data without
  explicit human approval.
