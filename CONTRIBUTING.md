# Contributing

Thanks for your interest in contributing. This guide explains how to contribute to the repository as an open-source project and what maintainers expect from contributions.

Table of contents
- [Get started](#get-started)
- [Development workflow](#development-workflow)
- [Branching & commit guidelines](#branching--commit-guidelines)
- [Coding standards](#coding-standards)
- [Testing & CI](#testing--ci)
- [Submitting a pull request](#submitting-a-pull-request)
- [Review process](#review-process)
- [Maintainers & code ownership](#maintainers--code-ownership)
- [Reporting security issues](#reporting-security-issues)

Get started

- Fork the repository and create a topic branch for your change.
- Keep changes small and focused: one feature/bugfix per PR.
- Run the project locally and ensure your change works in development.

Development workflow

1. Sync your fork with the upstream `main` branch frequently.
2. Create a short-lived feature branch named using the convention below.
3. Write or update tests for any user-facing behavior or edge cases.
4. Run linters and formatters locally before pushing.

Branching & commit guidelines

- Branch names: `feat/<short-desc>`, `fix/<issue-number>-short-desc`, `chore/<area>`.
- Commit messages: use imperative, scoped prefixes, and keep the subject under 72 characters. Example:

```
feat(auth): add refresh token endpoint

Add refresh token handling and associated tests.
```

- Keep commits small and logically grouped. Squash WIP commits before merging if requested.

Coding standards

- Follow the existing TypeScript patterns in `backend/` and `frontend/`.
- Use `npm run format` (or the repo's formatting command) to autoformat code.
- Run `npm run lint` (backend/frontend) and fix all lint errors before submitting a PR.

Testing & CI

- Add unit and integration tests for bug fixes and new features where practical.
- Ensure tests pass locally and on CI before requesting a review.
- If your change touches the Prisma schema, include migration notes and verify migrations run cleanly.

Submitting a pull request

- Push your branch to your fork and open a PR against `main` with the following information:
	- Short summary of the change.
	- Motivation and context (why the change is needed).
	- How to test the change locally (commands and environment variables).
	- Screenshots or logs when relevant.

- Use descriptive titles and link any related issues (e.g., `Fixes #123`).

Review process

- Reviewers will verify code quality, test coverage, and alignment with project goals.
- Address review comments by updating the PR; include tests for requested changes.
- After approval, maintainers may merge using squash or merge strategies as appropriate.

Maintainers & code ownership

- Core modules (backend API, database schema, and critical frontend routes) have designated owners; maintainers may assign reviewers based on ownership.
- If you’re unsure who to ping, add a comment requesting maintainers to triage the PR.

Reporting security issues

- Do **not** open public issues for security vulnerabilities—see `SECURITY.md` for secure reporting instructions.

Renaming, restructuring, and large refactors

- For large refactors or API changes, open an issue or RFC to discuss design before implementation.
- Break large work into smaller PRs when possible.

Thanks for contributing!

