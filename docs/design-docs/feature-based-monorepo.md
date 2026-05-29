# Feature-Based Monorepo Design

## Status

Accepted for MVP.

## Context

The product starts as a frontend-only vessel schedule lookup web app. It must remain ready for future server-side carrier API integrations and crawler-backed providers.

The repository uses:

- Next.js for the web app
- Tailwind CSS for utility styling
- React Spectrum / Spectrum 2 direction for accessible UI components
- pnpm workspace for monorepo package management
- Feature-based structure for product code

## Decision

Use a monorepo with one current app and several shared packages:

```txt
apps/web
packages/ui
packages/config
packages/domain
packages/data-sources
packages/mocks
```

Inside `apps/web`, product code should be grouped by feature:

```txt
apps/web/src/features/schedule-search
apps/web/src/features/port-selector
apps/web/src/features/carrier-filter
```

Shared, cross-feature logic belongs in packages only when it is reusable and stable.

## Runtime Boundaries

### MVP

- `apps/web` renders the search UI.
- `packages/mocks` provides mock schedule data.
- `packages/data-sources` defines provider interfaces.
- No secrets are stored in the frontend.
- No production crawler runs in the browser.

### Future

- Carrier API adapters move to a server-side runtime.
- Crawlers move to server jobs or workers.
- `apps/web` continues to consume provider contracts, not carrier-specific code.

## Data Provider Contract

The UI should not know whether results came from mock data, a carrier API, manual upload, or crawler-backed storage.

## Package Responsibilities

| Package | Responsibility |
|--------|----------------|
| `packages/domain` | Shared types, schemas, and pure domain helpers |
| `packages/data-sources` | Provider contracts and adapter interfaces |
| `packages/mocks` | Mock schedules and development fixtures |
| `packages/ui` | React Spectrum wrappers and shared UI primitives |
| `packages/config` | Shared TypeScript, ESLint, Tailwind config |

## Dependency Direction

Allowed:

```txt
apps/web -> packages/ui
apps/web -> packages/domain
apps/web -> packages/data-sources
apps/web -> packages/mocks

packages/data-sources -> packages/domain
packages/mocks -> packages/domain
packages/ui -> packages/domain only when needed
```

Not allowed:

```txt
packages/domain -> apps/web
packages/domain -> packages/ui
packages/ui -> apps/web
packages/data-sources -> apps/web
```

## Tradeoffs

### Benefits

- Easy to start with frontend-only MVP.
- Keeps future API/crawler work from polluting UI code.
- Makes carrier-specific integrations replaceable.
- Makes AI agents easier to guide because each folder has clear ownership.

### Costs

- Slightly more structure than a single Next.js app.
- Requires discipline to avoid moving unstable code into shared packages too early.

## Update Trigger

Update this document when:

- A backend app is added.
- A crawler/worker runtime is added.
- Carrier API integration begins.
- Package boundaries change.
