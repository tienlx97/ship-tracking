# QUALITY_SCORE.md

This document tracks whether the repository is getting stronger or weaker over
time.

## Grading Scale

- `A`: verified, legible, stable, boundaries enforced
- `B`: working with minor gaps
- `C`: partially working, notable confusion or instability
- `D`: broken, unsafe, or structurally unclear

## Product Domains

| Domain | Grade | Verification | Agent Legibility | Test Stability | Key Gaps | Last Updated |
|--------|-------|-------------|-----------------|---------------|----------|-------------|
| Schedule Search | B | Product spec and MVP flow defined; executable checks pending implementation | Clear: feature entry point, inputs, result fields, and states documented | Not yet verified with automated tests | Needs implemented UI validation, result table verification, and manual browser check | 2026-05-29 |
| Ports | B | Normalized port model defined; mock ports available | Clear: port code, name, country, aliases documented | Not yet verified with lookup tests | Needs alias matching, port search UX, and real port source strategy | 2026-05-29 |
| Carrier Lines | C | Carrier concept defined; real carrier registry not yet completed | Partial: carrier codes and provider boundary documented | Not yet verified | Needs supported carrier list, provider status, and source ownership | 2026-05-29 |
| Data Sources | B | Provider contract defined; mock provider planned/created | Clear: UI must consume provider contract, not carrier-specific logic | Not yet verified with contract tests | Needs real API/crawler adapters moved to server runtime later | 2026-05-29 |
| Shared UI | C | Frontend rules documented; wrapper package exists as skeleton | Partial: React Spectrum + Tailwind direction defined | Not yet verified | Needs actual reusable UI wrappers and accessibility checks | 2026-05-29 |

## Architectural Layers

| Layer | Grade | Boundary Enforcement | Agent Legibility | Key Gaps | Last Updated |
|-------|-------|---------------------|-----------------|----------|-------------|
| Types | B | Domain types belong in `packages/domain`; lower layers do not depend on UI | Clear: schedule, port, carrier, provider types documented | Needs schema validation if external data sources are added | 2026-05-29 |
| Config | C | `packages/config` reserved for shared config; root workspace exists | Partial: structure defined, package still mostly placeholder | Needs shared TypeScript, ESLint, and Tailwind presets | 2026-05-29 |
| Services | B | Data access must go through `VesselScheduleProvider` contract | Clear: mock/API/crawler/manual sources hidden behind provider interface | Needs contract tests and failure-state handling per provider | 2026-05-29 |
| Runtime | C | Frontend-only MVP boundary documented; server/crawler runtime not implemented | Clear: browser cannot run production crawler or hold secrets | Needs future backend/worker decision before real integrations | 2026-05-29 |
| UI | B | Feature-based UI path defined under `apps/web/src/features/schedule-search` | Clear: required states and components documented | Needs completed React Spectrum wrappers, responsive QA, and accessibility verification | 2026-05-29 |

## Benchmark Snapshots

| Date | Harness Variant | Completion Rate | Retries | Defects Before Review | Notes |
|------|-----------------|----------------|--------|-----------------------|------|
| 2026-05-29 | baseline | - | - | - | Initial harness structure created from template; no coding benchmark run yet |
| 2026-05-29 | improved | - | - | - | Product, architecture, frontend, security, references, and MVP plan added |

## Simplification Log

| Date | Component Removed | Outcome | Decision |
|------|-------------------|---------|----------|
| 2026-05-29 | Real carrier API implementation from MVP scope | unchanged | keep removed until server-side runtime and credentials strategy are approved |
| 2026-05-29 | Browser-side production crawler from MVP scope | improved | keep removed for security, reliability, and maintainability |
| 2026-05-29 | Booking, freight quotation, authentication, and admin portal from MVP scope | improved | keep removed to protect core schedule search focus |
