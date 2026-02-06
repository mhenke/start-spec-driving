## ADDED Requirements

### Requirement: Lead dashboard
The system SHALL provide a lead dashboard listing leads joined with campaign title, sorted newest-first, with pagination and filters by campaign.

#### Scenario: Lead list sorting
- **WHEN** the lead dashboard is fetched
- **THEN** leads SHALL be returned sorted by created_at DESC and include campaign title

#### Scenario: Pagination
- **WHEN** many leads exist
- **THEN** the API SHALL support pagination parameters and return paged results

