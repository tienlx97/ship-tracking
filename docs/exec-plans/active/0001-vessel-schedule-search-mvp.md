# 0001 Vessel Schedule Search MVP

## Objective

Build a frontend-only MVP for vessel schedule lookup using Next.js, Tailwind CSS, React Spectrum, and pnpm monorepo structure.

## Scope

Included:

- Monorepo setup
- Next.js web app
- Feature-based schedule search module
- Mock schedule provider
- Port input fields
- Carrier line filter
- Date range filter
- Results table
- Loading, empty, error, and success states

Out of scope:

- Real carrier API integration
- Real crawler
- Authentication
- Admin portal
- Booking flow
- Database
- Server runtime

## Target Structure

```txt
apps/web
packages/ui
packages/config
packages/domain
packages/data-sources
packages/mocks
```

## Implementation Steps

1. Initialize pnpm workspace.
2. Create `apps/web` with Next.js App Router.
3. Create shared packages.
4. Define domain types for ports, carriers, and schedules.
5. Define `VesselScheduleProvider` contract.
6. Add mock provider.
7. Build schedule search UI.
8. Add form validation.
9. Add result table states.
10. Run verification.

## Verification Path

```bash
pnpm install
pnpm lint
pnpm build
pnpm dev
```

Manual checks:

- Search with valid ports.
- Search with missing loading port.
- Search with missing destination port.
- Search with invalid date range.
- Search with no matching result.
- Search with carrier filter.
- Search with date range filter.
- Confirm loading and error states are visible.

## Risks And Blockers

| Risk | Mitigation |
|-----|------------|
| Carrier data shape differs by source | Use normalized domain model |
| UI becomes coupled to mock data | Use provider contract |
| Future API keys leak to frontend | Server-only rule in SECURITY.md |
| Search logic becomes hard to replace | Keep provider adapters isolated |

## Open Decisions

- Final naming: destination port, export port, or discharge port?
- Supported carrier lines for first real integration.
- Whether to add manual Excel upload before real API/crawler.
- Whether to use Turborepo for task orchestration.

## Progress Log

- Initial repository documentation and skeleton created.
