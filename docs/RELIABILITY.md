# RELIABILITY.md

## Reliability Goals

- Search UI must remain usable even when one provider fails.
- Partial results should be shown when possible.
- Provider errors should be visible but not destructive.
- Data freshness should be shown clearly.

## Expected States

| State | Required Behavior |
|------|-------------------|
| Loading | Show progress while search is running |
| Success | Show normalized results |
| Empty | Explain that no matching schedules were found |
| Error | Explain the failure and allow retry |
| Partial | Show available results and failed providers |

## Data Freshness

Each schedule result should include:

- source type
- source name
- last updated timestamp

## Future Reliability Work

- Retry rules per carrier provider
- Provider health dashboard
- Background refresh jobs
- Data freshness alerts
