## ADDED Requirements

### Requirement: Norwegian Localization
The system SHALL display all UI elements and data in Norwegian.

#### Scenario: Currency formatting
- **WHEN** a monthly price or downpayment is displayed
- **THEN** it MUST be formatted using the `nb-NO` locale (e.g., "kr 4 500")

### Requirement: Public Campaign Grid
The system SHALL display a grid of active, verified campaigns on the home page.

#### Scenario: Grid display and sorting
- **WHEN** a user visits the home page
- **THEN** they MUST see a list of campaigns showing image, brand, model, and monthly price
- **AND** the campaigns MUST be sorted by `created_at` in descending order

### Requirement: Campaign Detail View
The system SHALL provide a dedicated page for viewing full details of a single campaign.

#### Scenario: Viewing technical specs and source link
- **WHEN** a user navigates to `/campaign/:id`
- **THEN** they MUST see all technical data points (duration, km/year, downpayment, etc.) and a lead form
- **AND** if a `source_url` exists, a button labeled "Se original annonse" MUST be visible to open the link in a new tab
