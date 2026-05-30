# Quality Document

A quality snapshot for each product domain and architectural layer. Both agents
and humans can use this document to quickly understand where the codebase is
strong and where it needs work.

**Update cadence:** After each significant session, or before starting a new
phase of work.

**Last reviewed:** 2026-05-30

**Current baseline:** `bash init.sh` is blocked on this Windows machine because
WSL has no installed Linux distribution. The verified equivalent is:

```powershell
powershell -ExecutionPolicy Bypass -File .\init.ps1
```

**Grading scale:**

- **A**: All verification passing, clean architecture, agent-legible, stable tests
- **B**: Verification passing, mostly clean, minor gaps in legibility or test coverage
- **C**: Partially working, known gaps, some code areas hard for agents to understand
- **D**: Not working, or major structural issues
- **N/A**: Not implemented yet

---

## Product Domains

| Domain | Grade | Verification | Agent Legibility | Test Stability | Key Gaps | Last Updated |
|--------|-------|--------------|------------------|----------------|----------|--------------|
| Project Structure | A | `pnpm verify` passed; `init.ps1` passed | High: documented in `docs/ARCHITECTURE.md`, `src/*/README.md`, and `feature_list.json` | Stable: Jest structure test has 3 passing tests | Bash startup still depends on WSL | 2026-05-30 |
| MVP Product Spec | B | Manual documentation review captured in `feature_list.json` | High: `docs/PRODUCT.md` defines CIF sale contract MVP and future scope | N/A: documentation-only | Needs implementation-backed tests once workflow begins | 2026-05-30 |
| CIF Contract Data Entry | N/A | Not implemented | Product requirements documented | No tests yet | Build form, schema, required-field validation | - |
| Payment Milestones | N/A | Not implemented | Product requirements documented | No tests yet | Validate total percentage equals 100 and calculate amounts | - |
| Bank Presets | N/A | Not implemented | Product requirements documented | No tests yet | Define preset data source and editable review behavior | - |
| DOCX Contract Export | N/A | Not implemented | Product requirements documented | No tests yet | Add template handling, variable replacement, filename rules | - |

## Architectural Layers

| Layer | Grade | Boundary Enforcement | Agent Legibility | Key Gaps | Last Updated |
|-------|-------|----------------------|------------------|----------|--------------|
| Next.js App Router | B | Route files are thin and import feature entry points | High: `src/app/page.tsx` composes `ContractWorkspace` | No real routes beyond `/`; no error/loading states yet | 2026-05-30 |
| Features | B | Public export exists through `src/features/contracts/index.ts` | High: `src/features/contracts/README.md` explains scope | Feature folders for API/hooks/schemas/types will be added when behavior exists | 2026-05-30 |
| Shared Components | B | Shared UI has its own documented folder | Medium: README exists, but no reusable components yet | Add shared UI only after repeated usage appears | 2026-05-30 |
| Services | B | Shared service layer exists under `src/lib/services` | High: README and health service exist | Real contract/document services not implemented | 2026-05-30 |
| API Infrastructure | B | `src/lib/api` is reserved for shared clients/helpers | Medium: README exists, no implementation yet | Define route/API conventions when backend work starts | 2026-05-30 |
| Verification Tooling | A | `pnpm verify` runs typecheck, lint, tests, and build | High: commands documented in architecture and package scripts | `bash init.sh` remains environment-blocked without WSL | 2026-05-30 |

## Current Verification Evidence

- `bash init.sh`: attempted on 2026-05-30; blocked by missing WSL Linux distribution.
- `powershell -ExecutionPolicy Bypass -File .\init.ps1`: passed on 2026-05-30.
- `pnpm typecheck`: passed on 2026-05-30.
- `pnpm lint`: passed on 2026-05-30.
- `pnpm test`: passed on 2026-05-30.
- `pnpm build`: passed on 2026-05-30.
- `pnpm verify`: passed on 2026-05-30.
- Test tooling: Jest through Next.js `next/jest`; Vitest is not used.

## Active Quality Risks

- Reliability docs still describe earlier Electron/document-indexing concepts and
  should be realigned before implementing logging or clean-state behavior.
- No product workflow code exists yet beyond the scaffold workspace.
- No E2E tests exist yet because no user workflow has been implemented.
- `init.sh` is not directly runnable on the current Windows machine until WSL is
  installed or the standard startup path is changed.

## Change History

### 2026-05-30

- Changes: Replaced stale quality snapshot with Contract Builder-specific domains
  and Next.js architectural layers.
- Domains promoted: Project Structure to A; MVP Product Spec to B.
- Demoted: Removed stale Document Import, Document Management, Document Indexing,
  Q&A Flow, Grounded Answers, Main Process, Preload, and Renderer rows because
  they do not match this app.
- New gaps identified: Reliability docs need realignment; product workflows,
  DOCX export, and E2E coverage are not implemented yet.
- Gaps closed: Quality Document now matches the current repo architecture,
  verification commands, and recorded feature evidence.
- Changes: Replaced Vitest with Next.js Jest integration for structure tests.
- Gaps closed: Next.js 16/Turbopack and Tailwind CSS v4 configuration decisions
  are documented in `docs/ARCHITECTURE.md`.
