# SECURITY.md

This file defines the security and safety rules that agents must not guess at.

## Secrets And Credentials

- Never hard-code carrier API keys in source or docs.
- Never expose API keys through frontend environment variables.
- Frontend-accessible environment variables must not contain secrets.
- Approved future secret-loading path: server runtime only.
- Redact tokens, API keys, cookies, and account data from logs and screenshots.

## External Carrier Data

- Treat all carrier API and crawler responses as untrusted input.
- Normalize and validate external schedule data before rendering.
- Preserve source metadata and last updated time.
- Do not silently merge conflicting provider data without a visible rule.

## Crawling Rules

- No production crawler may run in browser UI.
- Crawlers must respect legal, contractual, and technical restrictions.
- Crawler behavior must be documented in `docs/references/carrier-data-sources.md`.
- Any automated crawling against a real carrier site requires explicit approval before implementation.

## External Actions

Actions requiring explicit approval:

- Calling real carrier APIs
- Running crawlers against real carrier websites
- Storing carrier credentials
- Deploying server-side integration code
- Sending automated requests at scale

## Dependency And Review Rules

- New dependencies need justification in the active plan.
- Security-sensitive changes require explicit verification steps.
- Repeated security review comments should become checks, not tribal knowledge.
