# Stack Reference

## Package Manager

- pnpm
- Workspace file: `pnpm-workspace.yaml`
- Root should own workspace scripts.

## Framework

- Next.js App Router
- Javascript
- Frontend-first MVP
- Server/API runtime planned but not implemented yet

## Styling

- Tailwind CSS
- Shared Tailwind conventions should live in `packages/config`
- Global styles should stay minimal

## UI Library

- React Spectrum / Spectrum 2 direction
- Use wrapper components in `packages/ui`
- Do not import UI library components directly across all features unless the pattern is stable

## Monorepo Layout

```txt
apps/
  web/

packages/
  ui/
  config/
  domain/
  data-sources/
  mocks/
```

## Standard Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

## Notes

- The current product is frontend-only.
- External carrier APIs and crawlers must not be implemented directly inside browser UI code.
- Data source logic must go through provider contracts.
