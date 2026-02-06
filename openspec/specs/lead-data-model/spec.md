## ADDED Requirements

### Requirement: Lead data model
The system SHALL define a leads data model that stores prospect data and enforces a required reference to campaigns.id with ON DELETE CASCADE. Fields MUST include id, campaign_id, name, email, phone, created_at.

#### Scenario: Lead creation
- **WHEN** a lead is created for an existing campaign
- **THEN** the lead SHALL be associated with the campaign and persisted

#### Scenario: FK enforcement
- **WHEN** a lead insert references a non-existent campaign_id
- **THEN** the DB SHALL reject the insert or the application SHALL reject the request

