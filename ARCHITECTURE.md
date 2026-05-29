# ARCHITECTURE.md

This file is the top-level map of the system. It should stay concise and point
to deeper documents when needed.

## System Shape

- Product: `Vessel Schedule Lookup`
- Primary user workflow: `User searches vessel schedules by loading port, discharge/export port, carrier line, and date range.`
- Runtime surfaces: `web`
- Source of truth for product behavior: `docs/product-specs/`

## Domain Map

| Domain | Purpose | Primary Entry Points | Related Spec |
|--------|---------|----------------------|--------------|
| Schedule Search | Search, filter, normalize, and display vessel schedules | `apps/web/src/features/schedule-search` | `docs/product-specs/vessel-schedule-search.md` |
| Ports | Port option model, display names, codes, aliases | `packages/domain/src/ports` | `docs/product-specs/vessel-schedule-search.md` |
| Carrier Lines | Carrier line catalog and provider selection | `packages/domain/src/carriers` | `docs/references/carrier-data-sources.md` |
| Data Sources | Adapter contracts for mock data, crawler data, and future carrier APIs | `packages/data-sources` | `docs/design-docs/feature-based-monorepo.md` |
| Shared UI | Reusable React Spectrum and Tailwind UI wrappers | `packages/ui` | `docs/FRONTEND.md` |

## Layer Model

Use a fixed directional model so agents do not invent ad hoc architecture:

`Types -> Config -> Repo -> Service -> Runtime -> UI`

Current frontend-only rule:

- UI may call mock or browser-safe schedule providers.
- UI must not contain carrier-specific crawling logic.
- UI must not store carrier API secrets.
- Carrier-specific API/crawler logic must live behind provider contracts and move to a server/runtime boundary when implemented.

Cross-cutting concerns should enter through explicit provider or adapter
boundaries instead of reaching across layers directly.

## Hard Dependency Rules

- Lower layers must not depend on higher layers.
- UI must not bypass runtime or service contracts.
- Carrier-specific data access must enter through provider adapters.
<!-- - Data access must enter through repositories or equivalent adapters. -->
- Shared utilities must remain generic and must not accumulate domain logic.
- New dependencies should be justified in the matching plan or design doc.

## Cross-Cutting Interfaces

| Concern | Approved Boundary | Notes |
|--------|-------------------|-------|
| UI Components | `packages/ui` | React Spectrum wrappers and shared visual primitives |
| Styling | `apps/web/src/app/globals.css`, `packages/config/tailwind` | Tailwind utilities; avoid one-off CSS unless justified |
| Domain Types | `packages/domain` | Shared types for ports, carriers, filters, schedules |
| External APIs | `packages/data-sources` | Contracts now; real API/crawler adapters later |
| Mock Data | `packages/mocks` | Used by frontend-only MVP |
| Logging | `apps/web/src/lib/logger` | No raw console usage in committed feature code |

## Current Hot Spots

- Carrier schedule data is not yet backed by server-side API or crawler infrastructure.
- API availability differs by carrier line.
- Browser-only crawling is not allowed for production behavior.
- Port naming and carrier naming must be normalized before reliable search.

## Change Checklist

When you touch architecture-relevant code:

1. Update this file if the domain map or allowed boundaries changed.
2. Update the related design doc in `docs/design-docs/` if the reasoning changed.
3. Add or update an executable check if the rule should be enforced mechanically.
4. Update the related product spec if user-visible behavior changed.
