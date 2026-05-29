# FRONTEND.md

This file defines stable frontend expectations so agents do not invent UI patterns unpredictably.

## UI Stack

- Framework: Next.js App Router
- Styling: Tailwind CSS
- UI library: React Spectrum / Spectrum 2 direction
- Package manager: pnpm
- Project structure: feature-based monorepo

## UI Principles

- Optimize for clarity before novelty.
- Search inputs must be easy to understand for operations/logistics users.
- Keep interaction flows discoverable and restartable.
- Prefer reusable components in `packages/ui` over one-off variants.
- Accessibility checks are part of normal verification, not polish work.

## Feature Structure

Feature code in `apps/web` should follow:

```txt
src/features/[feature-name]/
  components/
  hooks/
  services/
  types/
  utils/
  index.js
```

For the schedule search feature:

```txt
src/features/schedule-search/
  components/
    ScheduleSearchForm.jsx
    ScheduleResultsTable.jsx
    ScheduleEmptyState.jsx
    ScheduleErrorState.jsx
  hooks/
    useScheduleSearch.js
  services/
    searchSchedules.js
  index.js
```

## Component Rules

- Use React Spectrum components through wrappers in `packages/ui` when practical.
- Use Tailwind for layout and spacing.
- Do not mix multiple design systems for the same component role.
- Keep table states explicit:
  - empty
  - loading
  - success
  - error
  - partial result
  - retry

## Search Form UX

Required fields:

- Loading port
- Destination/export port

Optional filters:

- Carrier line
- Date range
- Future: direct/transshipment
- Future: source type

## Validation

- Required ports must be validated before search.
- Date range must reject end date earlier than start date.
- Invalid fields must show inline feedback.
- Search button should clearly show disabled/loading state.

## Verification Expectations

- Validate the primary search journey.
- Validate empty result state.
- Validate provider error state.
- Validate mobile/tablet layout.
- Validate keyboard navigation for form fields.
- Record browser/runtime validation steps in the relevant execution plan.
