# PRODUCT_SENSE.md

This file captures durable product judgment that agents cannot infer reliably
from code alone.

## Product Core

- Primary user: `Logistics, export operations, sales support, and customer service staff who need to check vessel schedules for company shipments.`
- Job to be done: `Find reliable vessel schedule options by loading port, destination/export port, carrier line, and date range without manually checking many carrier websites one by one.`
- Main frustration `to remove: Slow, fragmented, and inconsistent schedule lookup across different shipping lines, websites, files, and future API/crawler sources.`
- Quality bar for acceptance: `A user can search, compare, and understand schedule results with clear source, freshness, loading state, empty state, and error feedback.`

## Product Rules

- Favor user-visible reliability over feature count.
- Treat ambiguous behavior as a spec gap, not as permission to guess.
- If implementation changes what users see or trust, update the matching spec.
- Use product specs for concrete flows, and use this file for cross-cutting
  product priorities.

## No-Go Patterns

- Hidden destructive actions
- Silent failure without user feedback
- Unclear source of truth for visible state
- Features that cannot be explained in one sentence