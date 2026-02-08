## MODIFIED Requirements

### Requirement: Campaign Integrity

#### Scenario: Fetching non-existent campaign
- **WHEN** a campaign is queried by an ID that does not exist
- **THEN** it must return `null` instead of `undefined`
- **AND** the UI must handle this strictly to prevent hydration/rendering crashes.
