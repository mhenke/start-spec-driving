## ADDED Requirements

### Requirement: Campaign Card UI
The system MUST provide a visual card for a single leasing campaign.

#### Scenario: Displaying Primary Details
- **WHEN** a campaign card is rendered
- **THEN** it MUST display:
  - **Title** (if present, as a marketing hook)
  - Vehicle **Brand** and **Model**
  - **Monthly Price** (formatted in NOK with "/ mnd" suffix)
  - **Campaign Type** label (mapped to "Privat" or "Næring")
  - **Image** (or a placeholder if broken/missing)

#### Scenario: Detail Page Link
- **WHEN** the "Se detaljer" button is clicked
- **THEN** navigation MUST occur to the `/campaign/$id` route for that campaign

### Requirement: Norwegian Localization
The system MUST format numerical and enum data for the Norwegian locale.

#### Scenario: Currency Formatting
- **WHEN** a price is displayed
- **THEN** it MUST be formatted using Norwegian rules:
  - Use space as thousands separator
  - Append "kr / mnd"
  - No decimals for the monthly price

#### Scenario: Campaign Type Mapping
- **WHEN** the `campaign_type` is "private"
- **THEN** it MUST be displayed as "Privat"
- **WHEN** the `campaign_type` is "business"
- **THEN** it MUST be displayed as "Næring"

### Requirement: Accessibility
The campaign card MUST be accessible to screen readers.

#### Scenario: Semantic Structure
- **WHEN** a card is rendered
- **THEN** it MUST use the `<article>` tag
- **AND** the image MUST have descriptive `alt` text or be marked as decorative
- **AND** the "Se detaljer" button MUST have an `aria-label` including the campaign title
