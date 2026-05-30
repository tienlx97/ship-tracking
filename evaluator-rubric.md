# Evaluator Rubric

Use this rubric after implementation and before final acceptance. It is written
for the current Contract Builder Next.js repository and should be applied
against repo artifacts, not chat-only claims.

## Scoring

Each category is scored from 0 to 2.

- **2:** Meets the standard with repo evidence.
- **1:** Partially meets the standard, with a limited or clearly documented gap.
- **0:** Does not meet the standard, lacks evidence, or creates a blocker.

Suggested verdict:

- **Accept:** 11-14 points, no blocking issue.
- **Revise:** 7-10 points, or missing non-critical evidence.
- **Block:** 0-6 points, failed required verification, broken startup path without
  documented fallback, scope drift, or unsafe/incomplete handoff.

## Required Baseline

Before scoring a change, confirm the startup and verification state:

| Check | Expected Result | Evidence Location |
|-------|-----------------|-------------------|
| `bash init.sh` | Runs successfully, or fails only with the known missing-WSL blocker on this Windows machine | `claude-progress.md` |
| `powershell -ExecutionPolicy Bypass -File .\init.ps1` | Passes when `bash init.sh` is blocked by missing WSL | `claude-progress.md` |
| `pnpm verify` | Passes typecheck, lint, tests, and build for code changes | terminal output, then `claude-progress.md` |
| Feature evidence | Target feature status and evidence are updated when feature work changes behavior | `feature_list.json` |

Do not accept a feature based only on code being present.

## Category Rubric

| Category | Question | Score Guidance | Score | Notes |
|----------|----------|----------------|-------|-------|
| Product correctness | Does the implementation match `docs/PRODUCT.md` and the requested feature? | 2 = exact fit; 1 = minor documented gap; 0 = mismatched or undocumented behavior |  |  |
| Architecture boundaries | Does the change respect `docs/ARCHITECTURE.md` dependency direction and feature structure? | 2 = clean boundaries; 1 = small local ambiguity; 0 = circular or cross-feature/internal coupling |  |  |
| Verification evidence | Did required checks actually run and get recorded? | 2 = required checks pass and evidence recorded; 1 = partial checks with documented reason; 0 = missing/failed checks |  |  |
| Scope discipline | Did the session stay inside the chosen feature or documented supporting fix? | 2 = scoped; 1 = small justified support change; 0 = unrelated refactor or hidden behavior change |  |  |
| Reliability and restartability | Can a fresh session install, test, and continue without repair? | 2 = restartable via documented path; 1 = known environment blocker with verified fallback; 0 = broken or undocumented |  |  |
| Maintainability | Are code, tests, docs, and naming clear enough for the next agent? | 2 = agent-legible and documented near code; 1 = understandable but thin; 0 = hard to inspect or stale docs |  |  |
| Handoff readiness | Are `claude-progress.md`, `feature_list.json`, and relevant docs updated? | 2 = all required artifacts current; 1 = minor doc gap; 0 = stale or missing handoff |  |  |

## Contract Builder-Specific Checks

Use these checks when the changed feature touches contract behavior.

| Area | Acceptance Standard |
|------|---------------------|
| Required fields | Contract metadata, buyer, seller, commercial, bank, and shipping fields match `docs/PRODUCT.md`. |
| Payment milestones | Percentages must total 100%, and amounts must derive from contract value and percentages. |
| Bank presets | Presets may populate fields, but user review/editing remains possible before export. |
| Template wording | Fixed legal text from the CIF template must remain separate from user-entered data. |
| Export | `.docx` output and filename rules must include project code or contract number and project name. |
| Future scope | Payment request, proforma invoice, and PDF export must not be silently implemented as MVP behavior. |

## Automatic Blockers

Mark the change as **Block** if any of these are true:

- `pnpm verify` fails for a code change and no narrower blocker is documented.
- `bash init.sh` fails for a new reason other than the known missing-WSL blocker.
- The Windows fallback `init.ps1` fails when `bash init.sh` is blocked by WSL.
- A feature is marked `passing` without evidence in `feature_list.json` or
  `claude-progress.md`.
- The change rewrites fixed legal contract wording without a product requirement.
- The change modifies unrelated user or generated files without explanation.
- The handoff omits unresolved risks or leaves the next session unable to choose
  the next step from repo artifacts.

## Verdict

- Total score:
- Verdict: Accept / Revise / Block
- Required fixes:
- Missing evidence:
- Next review trigger:
