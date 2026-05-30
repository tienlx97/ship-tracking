# AGENTS.md

This repository is designed for long-running coding-agent work. The goal is not
to maximize raw code output. The goal is to leave the repo in a state where the
next session can continue without guessing.

## Startup Rules

Before writing any code, complete these steps in order:

1. **Read this file completely.** It defines the boundaries and conventions for this project.
2. **Read `claude-progress.md`** for the latest verified state and next step.
3. **Read `docs/ARCHITECTURE.md`** to understand the full structure and data flow.
4. **Read `docs/PRODUCT.md`** to understand the complete feature requirements.
5. **Read `docs/RELIABILITY.md`** to understand logging, observability, and clean state requirements.
6. **Read `feature_list.json`** to see the current state of all features.
7. **Review** recent commits with `git log --oneline -5`.
8. **Run `bash init.sh`** to verify the project builds and initializes cleanly.
9. **Run the required smoke or end-to-end verification** before starting new work.

If baseline verification is already failing, fix that first. Do not stack new
feature work on top of a broken starting state.

## Working Rules

- Work on one feature at a time.
- Do not mark a feature complete just because code was added.
- Keep changes within the selected feature scope unless a blocker forces a
  narrow supporting fix.
- Do not silently change verification rules during implementation.
- Prefer durable repo artifacts over chat summaries.

## Docs Hierarchy

The `docs/` directory is organized for agent readability:

```
docs/
  ARCHITECTURE.md   -- project structure, data flow, full pipeline
  PRODUCT.md        -- Feature requirements and user-facing behavior
  RELIABILITY.md    -- Logging, observability, clean state, benchmarking
```

When adding new features, update the relevant doc before writing code.

## Required Artifacts

- `feature_list.json`: source of truth for feature state
- `claude-progress.md`: session log and current verified status
- `init.sh`: standard startup and verification path
- `session-handoff.md`: optional compact handoff for larger sessions

## Definition Of Done

A feature is done only when all of the following are true:

1. The target behavior is implemented
2. The required verification actually ran
3. Evidence is recorded in `feature_list.json` or `claude-progress.md`
4. The repository remains restartable from the standard startup path
5. docs/ARCHITECTURE.md and/or docs/PRODUCT.md are updated.

## End Of Session

Before ending a session:

1. Update `claude-progress.md`.
2. Update `feature_list.json`.
3. Record any unresolved risk or blocker.
4. Commit with a descriptive message once the work is in a safe state.
5. Leave the repo clean enough for the next session to run `./init.sh`
   immediately.