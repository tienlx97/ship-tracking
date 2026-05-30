# ARCHITECTURE.md

Agent-readable architecture map for this Next.js project.

This file is intentionally short. It tells agents where things live, what boundaries must not be crossed, and how to verify work. Detailed rules belong near the code they affect.

---

## 1. System Shape

- App type: Next.js web application
- Language: TypeScript
- Styling: Tailwind CSS
- UI library: HeroUI
- Server state: TanStack React Query
- Structure: Feature-based
- Routing: Next.js App Router
- Services: Shared server/client-safe services live under `src/lib/services`

Primary source of truth:

- Architecture map: `ARCHITECTURE.md`
- Agent entrypoint: `AGENTS.md`
- Product specs: `docs/PRODUCT.md`
- Feature rules: `src/features/<feature>/README.md`
- Shared UI rules: `src/components/README.md`
- API/data rules: `src/lib/api/README.md`

If a rule is not in the repo, agents must treat it as unknown.

---

## 2. Repository Map

```txt
.
├── src/
│   ├── app/                 # Next.js routes, layouts, route handlers
│   ├── features/            # Business features
│   ├── components/          # Shared UI and layout components
│   ├── lib/                 # App infrastructure, services, shared logic
│   ├── types/               # Global TypeScript types
│   ├── styles/              # Global styles and theme files
│   └── middleware.ts        # Auth/session/routing middleware
│
├── docs/
│   ├── ARCHITECTURE.md      # This file
│   ├── PRODUCT.md           # 
│   └── RELIABILITY.md       # 
│
├── tests/                   # Unit, integration, and E2E tests
├── public/                  # Static assets
├── AGENTS.md                # Agent operating guide
├── init.sh                  # Bash startup/verification path
├── init.ps1                 # Windows PowerShell startup/verification path
└── package.json
````

---

## 3. Runtime Flow

```txt
User
  → src/app route
  → feature page/component
  → React Query hook
  → feature API function
  → shared HTTP client
  → backend API / route handler
```

Rules:

* `src/app` owns routing only.
* `src/features` owns business behavior.
* `src/components` owns reusable UI.
* `src/lib` owns shared infrastructure.
* `src/types` owns shared type definitions.

---

## 4. Feature Structure

Each feature follows this shape:

```txt
src/features/<feature>/
├── api/              # API functions and React Query hooks
├── components/       # Feature-specific UI
├── hooks/            # Feature-specific hooks
├── schemas/          # Zod/form validation schemas
├── types/            # Feature-specific types
├── README.md         # Feature behavior, constraints, known flows
└── index.ts          # Public exports only
```

Example:

```txt
src/features/users/
├── api/users.api.ts
├── api/users.query.ts
├── components/UserTable.tsx
├── components/UserForm.tsx
├── schemas/user.schema.ts
├── types/user.types.ts
├── README.md
└── index.ts
```

Feature rules:

* A feature must not import another feature’s internal files.
* Cross-feature access must go through that feature’s `index.ts`.
* Shared logic used by 2+ features moves to `src/lib`.
* Shared UI used by 2+ features moves to `src/components`.

---

## 5. Import Boundaries

Allowed dependency direction:

```txt
src/app
  → src/features
  → src/components
  → src/lib
  → src/types
```

Rules:

* `src/app` may import from `features`, `components`, `lib`, and `types`.
* `src/features` may import from its own folder, `components`, `lib`, and `types`.
* `src/components` may import from `lib`, `types`, HeroUI, and React.
* `src/lib` must not import from `app`, `features`, or `components`.
* `src/types` must not import from app code.

Do not create circular dependencies.

---

## 6. Routing Rules

Routes live in `src/app`.

```txt
src/app/
├── layout.tsx
├── page.tsx
├── providers.tsx
├── (public)/
├── (dashboard)/
└── api/
```

Rules:

* Keep `page.tsx` thin.
* Route files should compose feature components.
* Do not place business logic directly in route files.
* Use route groups for public/protected layouts.
* Use `loading.tsx`, `error.tsx`, and `not-found.tsx` where needed.

Example:

```tsx
import { UsersPage } from "@/features/users";

export default function Page() {
  return <UsersPage />;
}
```

---

## 7. Data Rules

Use TanStack React Query for server state.

```txt
src/features/<feature>/api/
├── <feature>.api.ts      # raw API calls
└── <feature>.query.ts    # React Query hooks
```

Rules:

* API functions do not call React hooks.
* React Query hooks call API functions.
* Query keys must be stable and colocated with the feature.
* Mutations must invalidate or update affected queries.
* Do not use React Query for local UI state.
* Parse/validate external data at boundaries when practical.

---

## 8. UI Rules

Use HeroUI as the base component system.

Shared UI lives here:

```txt
src/components/
├── ui/
├── layout/
└── feedback/
```

Rules:

* Use HeroUI for base components.
* Use Tailwind CSS for layout and custom styling.
* Wrap repeated UI patterns in `src/components/ui`.
* Feature-specific UI stays inside the feature.
* Do not duplicate table, modal, button, input, or form patterns across features.

---

## 9. State Rules

Use the right state tool:

* Server/API data: React Query
* Local component state: `useState`
* Derived state: compute from props/query data
* Form state: form library or controlled inputs
* Global client state: only when truly shared across distant screens

Do not add global state unless local state is insufficient.

---

## 10. Verification

Before declaring work complete, run:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

On Windows environments where `bash init.sh` cannot run because WSL has no
installed Linux distribution, run the equivalent startup verification with:

```powershell
.\init.ps1
```

For UI or flow changes, also run:

```bash
pnpm test:e2e
```

Definition of done:

* TypeScript passes
* Lint passes
* Tests pass
* Build passes
* Changed behavior is covered by test or explicit manual verification
* Related docs are updated if architecture, commands, or feature behavior changed

Do not mark a task complete only because code was written.

---

## 11. Documentation Placement

Use progressive disclosure:

```txt
AGENTS.md                         # How agents should work
ARCHITECTURE.md                   # High-level map
docs/product-specs/               # Product behavior
docs/decisions/                   # Architecture decisions
src/features/<feature>/README.md  # Feature-specific rules
src/lib/<area>/README.md          # Infrastructure-specific rules
```

Rules:

* Keep root docs short.
* Put detailed rules near the code they affect.
* Update docs in the same change as code.
* Remove stale docs instead of preserving misleading information.

---

## 12. Agent Fresh Session Test

A new agent should be able to answer these using only repo files:

1. What is this app?
2. How is the code organized?
3. Where should a new feature be added?
4. How do I run and verify the app?
5. What files define product behavior?

If the answer is not discoverable in the repo, add or update documentation.
