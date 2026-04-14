---
name: commit
description: Stage relevant changes and create a git commit with a conventional-style message. Only runs when the user explicitly invokes /commit.
---

# /commit

Create a git commit for the current changes.

## Steps

1. Run in parallel:
   - `git status` (no `-uall`)
   - `git diff` (staged + unstaged)
   - `git log -n 10 --oneline` to match the repo's commit style
2. Review what would be committed:
   - Skip files that likely hold secrets (`.env`, credentials, keys).
   - Do not blanket-add with `git add -A`/`git add .` — stage files by name.
   - If `$ARGUMENTS` is non-empty, treat it as the commit message (or message hint) from the user.
3. Draft a concise 1–2 sentence commit message focused on the *why*. Follow this repo's existing style from `git log` (the project uses short imperative subjects like "Improve SEO", "Add CLAUDE.md file").
4. Stage the intended files:
5. Run `git status` after to confirm success.
6. Do **not** push. Do **not** amend. If a pre-commit hook fails, fix the root cause and create a **new** commit.

## Guardrails

- Never use `--no-verify`, `--amend`, or force flags.
- Never commit `.env`, credentials, or large binaries — warn the user instead.
- If there is nothing to commit, say so and stop — do not create empty commits.
- Do **not** add a `Co-Authored-By: Claude` trailer. Commits should look authored solely by the user.
