# Carrier Data Sources Reference

## Purpose

Track planned vessel schedule data sources by carrier line.

## Source Types

| Source Type | Description | MVP Status |
|------------|-------------|------------|
| Mock | Local fixture data | Active |
| Manual Upload | Human-uploaded schedule file | Planned |
| Carrier API | Official shipping line API | Planned |
| Crawler | Data collected from public carrier schedule pages | Planned |
| Third-party Aggregator | External schedule platform/API | Planned |

## Carrier Registry

| Carrier | Source Type | Access Method | Status | Notes |
|--------|-------------|---------------|--------|-------|
| TBD | Mock | Local JSON | Active | Used for MVP UI |
| TBD | Carrier API | TBD | Research | Requires API access review |
| TBD | Crawler | TBD | Research | Must run server-side, not browser-side |

## Required Normalized Fields

| Field | Required | Notes |
|------|----------|-------|
| carrierCode | Yes | Internal stable code |
| carrierName | Yes | Display name |
| vesselName | No | May be missing from some providers |
| voyageNumber | No | May be missing from some providers |
| loadingPort | Yes | Normalized port |
| destinationPort | Yes | Normalized port |
| etd | Yes | ISO datetime if possible |
| eta | No | ISO datetime if available |
| transitDays | No | Calculated if ETA and ETD exist |
| routingType | No | Direct / transshipment |
| sourceType | Yes | mock/api/crawler/manual |
| sourceName | Yes | Provider name |
| lastUpdatedAt | Yes | Provider update timestamp |

## Rules

- Never expose carrier API keys in frontend code.
- Never put crawler code in browser UI.
- Every provider must return normalized schedule results.
- Every result must include source and last updated metadata.
- If provider data is partial, preserve confidence/status fields instead of pretending data is complete.
