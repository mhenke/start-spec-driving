## ADDED Requirements

### Requirement: Campaign data model
The system SHALL define and maintain a campaigns data model that matches the Epic and Upwork post. Fields MUST include id, title, brand, model, monthly_price, downpayment, duration_months, km_per_year, campaign_type, verified, valid_from, valid_to, created_at, updated_at, source_url, image.

#### Scenario: Campaign creation
- **WHEN** migrations or API create a campaign
- **THEN** a campaign record SHALL exist with non-null required fields and timestamps set

#### Scenario: Numeric constraints
- **WHEN** a campaign is inserted with negative numeric fields
- **THEN** the DB SHALL reject the insert via CHECK or the application SHALL prevent it

