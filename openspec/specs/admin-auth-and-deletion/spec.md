## ADDED Requirements

### Requirement: Admin auth and deletion guard
Admin routes for campaign CRUD SHALL be protected by authentication and deletion SHALL require explicit confirmation. Deleting a campaign SHALL cascade-delete leads.

#### Scenario: Auth required
- **WHEN** an unauthenticated user attempts to access admin routes
- **THEN** the system SHALL deny access with appropriate HTTP status

#### Scenario: Deletion confirmation
- **WHEN** an admin attempts to delete a campaign
- **THEN** the UI SHALL require explicit confirmation and the deletion SHALL cascade to associated leads

