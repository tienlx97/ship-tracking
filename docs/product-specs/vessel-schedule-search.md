# Vessel Schedule Search

## Goal

Allow company users to search vessel schedules by loading port, export/discharge port, carrier line, and date range.

## Primary Users

- Operations staff
- Export/logistics staff
- Sales or customer service staff who need to quickly check possible sailing schedules

## Entry Conditions

- User opens the web app.
- User has access to the schedule search page.
- At least one schedule data provider is available:
  - MVP: mock/local data provider
  - Future: carrier API provider
  - Future: crawler-backed provider

## User Flow

1. User opens the schedule search page.
2. User enters or selects:
   - Loading port
   - Destination/export/discharge port
3. User optionally filters by:
   - Carrier line
   - Departure date range
4. User submits the search.
5. System returns matching vessel schedules.
6. User reviews:
   - Carrier line
   - Vessel name / voyage
   - ETD
   - ETA
   - Transit time
   - Routing type
   - Source provider
   - Last updated time
7. User can refine filters and search again.

## Search Inputs

| Field | Required | Notes |
|------|----------|-------|
| Loading Port | Yes | Use normalized port object, not free text only |
| Destination / Export Port | Yes | Use normalized port object |
| Carrier Line | No | Multi-select if possible |
| Date Range | No | Default to next 30 days in MVP |
| Direct / Transshipment | No | Future filter |
| Source | No | Future filter for API, crawler, manual upload |

## Result Fields

| Field | Description |
|------|-------------|
| Carrier Line | Shipping line name |
| Vessel | Vessel name if available |
| Voyage | Voyage number if available |
| Loading Port | Origin/loading port |
| Destination Port | Destination/discharge port |
| ETD | Estimated time of departure |
| ETA | Estimated time of arrival |
| Transit Time | Calculated or provider-supplied |
| Route | Direct or transshipment |
| Source | Mock/API/crawler/manual |
| Last Updated | Timestamp of latest provider update |

## Acceptance Criteria

- User can search by loading port and destination port.
- User can filter by carrier line.
- User can filter by date range.
- Empty results show a helpful message, not a blank table.
- Loading state is visible while search is running.
- Errors explain whether the issue is user input, unavailable provider, or unknown failure.
- Results show data source and last updated time.
- UI works on desktop and tablet widths.

## Failure States

| State | User Feedback |
|------|---------------|
| Missing required port | Show validation beside the field |
| Invalid date range | Explain that end date must be after start date |
| No schedules found | Show empty state with search refinement suggestions |
| Provider unavailable | Show recoverable error and allow retry |
| Partial provider failure | Show available results and indicate failed provider(s) |

## Out of Scope For MVP

- User login
- Server-side crawler
- Paid carrier API integration
- Booking creation
- Rate/freight quotation
- Email notification
- Admin data management